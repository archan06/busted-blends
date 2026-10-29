import { busyOn, createBooking, freeSlots, json, nyDate, parseBooking, validDate } from "./_lib.js";

// POST /api/book { start, name, phone } → puts the cut on Alex's Google Calendar
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  // Honeypot: the hidden "website" field is only ever filled in by bots
  if (body?.website) return json({ error: "Couldn't book." }, 400);
  const b = parseBooking(body);
  if (typeof b === "string") return json({ error: b }, 400);
  const date = nyDate(Date.parse(b.start));
  if (!validDate(date)) return json({ error: "Pick a day in the next 30 days." }, 400);
  try {
    // Re-check against the live calendar: the slot must still be open and on the 30-minute grid
    // shortcut: two people booking the same slot in the same second can both get it; fine at this volume
    if (!freeSlots(date, await busyOn(date)).includes(b.start)) return json({ error: "That time just got taken. Pick another." }, 409);
    await createBooking(b.start, b.name, b.phone);
    return json({ ok: true, start: b.start });
  } catch (e) {
    console.error(e);
    return json({ error: "Couldn't book right now. Text me instead." }, 502);
  }
}
