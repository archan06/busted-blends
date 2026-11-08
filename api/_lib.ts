// Shared booking + Google Calendar code. Files starting with _ are not deployed as Vercel functions.
import { createHash, createSign, timingSafeEqual } from "node:crypto";

export const TZ = "America/New_York";
export const OPEN = 10 * 60; // 10:00 AM, minutes after midnight
export const CLOSE = 20 * 60 + 30; // 8:30 PM: the last cut starts at 7:45
export const SLOT = 45; // minutes
export const DAYS_AHEAD = 30;
const MIN = 60_000;

const env = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env var ${k}`);
  return v;
};

// ---------- Time (Vercel runs in UTC, the shop runs on New York time) ----------

/** Minutes New York is ahead of UTC at instant `ms` (negative). */
function tzOffset(ms: number) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(ms).map(x => [x.type, x.value]),
  );
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - ms) / MIN;
}

/** UTC ms for New York wall-clock `date` (YYYY-MM-DD) at `minutes` after midnight. */
export function wallToUtc(date: string, minutes: number) {
  const guess = Date.parse(`${date}T00:00:00Z`) + minutes * MIN;
  // shortcut: offset taken at the guess instant, wrong only near the 2 AM DST switch, outside open hours
  return guess - tzOffset(guess) * MIN;
}

export const nyDate = (ms: number) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(ms);
export const addDays = (date: string, n: number) =>
  new Date(Date.parse(`${date}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);

/** True for YYYY-MM-DD between today and DAYS_AHEAD days out (New York time). */
export function validDate(date: unknown, now = Date.now()): date is string {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const today = nyDate(now);
  return date >= today && date <= addDays(today, DAYS_AHEAD);
}

export type Busy = { start: string; end: string };

/** ISO start times of open SLOT-minute slots on `date` that are in the future and clear of `busy`. */
export function freeSlots(date: string, busy: Busy[], now = Date.now()) {
  const taken = busy.map(b => [Date.parse(b.start), Date.parse(b.end)]);
  const out: string[] = [];
  for (let m = OPEN; m + SLOT <= CLOSE; m += SLOT) {
    const s = wallToUtc(date, m), e = s + SLOT * MIN;
    if (s > now && !taken.some(([bs, be]) => bs < e && be > s)) out.push(new Date(s).toISOString());
  }
  return out;
}

// ---------- Google Calendar (service account, signed JWT, no SDK) ----------

let cached: { token: string; exp: number } | null = null;

async function accessToken() {
  if (cached && cached.exp > Date.now() + MIN) return cached.token;
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: env("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now, exp: now + 3600,
  })}`;
  // Env UIs often store the key's newlines as literal \n
  const key = env("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const sig = createSign("RSA-SHA256").update(unsigned).sign(key, "base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
  });
  if (!r.ok) throw new Error(`Google token ${r.status}: ${await r.text()}`);
  const j = await r.json() as { access_token: string; expires_in: number };
  cached = { token: j.access_token, exp: Date.now() + j.expires_in * 1000 };
  return cached.token;
}

async function gcal(path: string, init: RequestInit = {}) {
  const r = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...init,
    headers: { authorization: `Bearer ${await accessToken()}`, "content-type": "application/json", ...init.headers },
  });
  if (!r.ok) throw new Error(`Google Calendar ${r.status}: ${await r.text()}`);
  return r.status === 204 ? null : r.json();
}

const bookingCal = () => encodeURIComponent(env("GOOGLE_CALENDAR_ID"));

/** Busy blocks on the booking calendar plus any extra calendars (classes, work). */
export async function busyOn(date: string): Promise<Busy[]> {
  const ids = [env("GOOGLE_CALENDAR_ID"), ...(process.env.GOOGLE_BUSY_CALENDARS ?? "").split(",").map(s => s.trim()).filter(Boolean)];
  const res = await gcal("/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin: new Date(wallToUtc(date, 0)).toISOString(),
      timeMax: new Date(wallToUtc(addDays(date, 1), 0)).toISOString(),
      timeZone: TZ,
      items: ids.map(id => ({ id })),
    }),
  }) as { calendars: Record<string, { busy?: Busy[]; errors?: unknown[] }> };
  return Object.entries(res.calendars).flatMap(([id, c]) => {
    // Fail closed: a calendar we can't read could hide a class, so don't offer times
    if (c.errors?.length) throw new Error(`Can't read calendar ${id}: ${JSON.stringify(c.errors)}`);
    return c.busy ?? [];
  });
}

export type Booking = { id: string; start: string; end: string; name: string; phone: string };

export async function createBooking(start: string, name: string, phone: string) {
  const end = new Date(Date.parse(start) + SLOT * MIN).toISOString();
  return gcal(`/calendars/${bookingCal()}/events`, {
    method: "POST",
    body: JSON.stringify({
      summary: `✂️ Cut: ${name}`,
      description: `Phone: ${phone}\nBooked on the Busted Blends site`,
      start: { dateTime: start, timeZone: TZ },
      end: { dateTime: end, timeZone: TZ },
      colorId: "11",
      extendedProperties: { private: { bustedBlends: "1", name, phone } },
    }),
  });
}

type GEvent = { id: string; start: { dateTime: string }; end: { dateTime: string }; extendedProperties?: { private?: Record<string, string> } };

export async function listBookings(fromMs: number, toMs: number): Promise<Booking[]> {
  const q = new URLSearchParams({
    privateExtendedProperty: "bustedBlends=1", singleEvents: "true", orderBy: "startTime", maxResults: "500",
    timeMin: new Date(fromMs).toISOString(), timeMax: new Date(toMs).toISOString(),
  });
  const res = await gcal(`/calendars/${bookingCal()}/events?${q}`) as { items: GEvent[] };
  return res.items.map(e => ({
    id: e.id, start: e.start.dateTime, end: e.end.dateTime,
    name: e.extendedProperties?.private?.name ?? "", phone: e.extendedProperties?.private?.phone ?? "",
  }));
}

/** Deletes a site booking. Refuses events the site didn't create (classes etc). */
export async function cancelBooking(id: string) {
  const path = `/calendars/${bookingCal()}/events/${encodeURIComponent(id)}`;
  const e = await gcal(path) as GEvent;
  if (e.extendedProperties?.private?.bustedBlends !== "1") return false;
  await gcal(path, { method: "DELETE" });
  return true;
}

// ---------- HTTP helpers ----------

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export function isAdmin(req: Request) {
  const given = createHash("sha256").update(req.headers.get("x-admin-password") ?? "").digest();
  const want = createHash("sha256").update(env("ADMIN_PASSWORD")).digest();
  return timingSafeEqual(given, want);
}

/** Validates a booking request body. Returns an error message or the clean fields. */
export function parseBooking(body: unknown): string | { start: string; name: string; phone: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim().replace(/\s+/g, " ") : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const start = typeof b.start === "string" ? b.start : "";
  if (name.length < 2 || name.length > 60) return "Enter your name.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15 || !/^[\d\s()+.-]+$/.test(phone)) return "Enter a phone number I can text.";
  if (Number.isNaN(Date.parse(start))) return "Pick a time.";
  return { start: new Date(start).toISOString(), name, phone };
}
