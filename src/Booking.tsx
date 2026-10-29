import { useEffect, useState, type FormEvent } from "react";

const TZ = "America/New_York";
const DAYS = 14;

const today = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
const addDays = (date: string, n: number) => new Date(Date.parse(`${date}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const days = Array.from({ length: DAYS }, (_, i) => addDays(today, i));
const dayPart = (date: string, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(Date.parse(`${date}T12:00:00Z`));
// Times always show in New York time, wherever the visitor is
export const time = (iso: string) => new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
export const longDate = (iso: string) => new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long", month: "short", day: "numeric" }).format(new Date(iso));

export default function Booking() {
  const [day, setDay] = useState(today);
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadErr, setLoadErr] = useState("");
  const [reload, setReload] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [booked, setBooked] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    setSlots(null); setLoadErr(""); setPick(null);
    fetch(`/api/slots?date=${day}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => live && setSlots(d.slots))
      .catch(() => live && setLoadErr("Couldn't load times. Text me instead."));
    return () => { live = false; };
  }, [day, reload]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSending(true); setErr("");
    try {
      const r = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ start: pick, name: f.get("name"), phone: f.get("phone"), website: f.get("website") }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) return setBooked(pick);
      setErr(d.error ?? "Couldn't book. Text me instead.");
      if (r.status === 409) setReload(n => n + 1);
    } catch {
      setErr("Couldn't book. Check your connection.");
    } finally {
      setSending(false);
    }
  }

  if (booked) return (
    <div className="bk-done" role="status">
      <p className="book-head">You're booked</p>
      <p className="bk-when">{longDate(booked)}<br />{time(booked)}</p>
      <p>30 minutes on campus at Stony Brook. Need to move it? Just text me.</p>
      <button type="button" className="bk-link" onClick={() => { setBooked(null); setReload(n => n + 1); }}>Book another</button>
    </div>
  );

  return (
    <div className="bk">
      <p className="book-head">Pick a time</p>
      <div className="bk-days" role="radiogroup" aria-label="Day">
        {days.map(d => (
          <button key={d} type="button" role="radio" aria-checked={d === day} className="bk-day" onClick={() => setDay(d)}>
            <span>{d === today ? "Today" : dayPart(d, { weekday: "short" })}</span>
            <b>{dayPart(d, { day: "numeric" })}</b>
            <span>{dayPart(d, { month: "short" })}</span>
          </button>
        ))}
      </div>

      <div className="bk-slots" aria-live="polite">
        {loadErr ? <p className="bk-msg">{loadErr}</p>
          : !slots ? <p className="bk-msg">Loading times…</p>
          : !slots.length ? <p className="bk-msg">No times left this day. Try another.</p>
          : <div role="radiogroup" aria-label="Time" className="bk-grid">
              {slots.map(s => (
                <button key={s} type="button" role="radio" aria-checked={s === pick} className="bk-slot" onClick={() => { setPick(s); setErr(""); }}>{time(s)}</button>
              ))}
            </div>}
      </div>

      {pick && (
        <form className="bk-form" onSubmit={submit}>
          <label>Name<input name="name" required minLength={2} maxLength={60} autoComplete="name" /></label>
          <label>Phone<input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 555-5555" /></label>
          {/* Honeypot: hidden from people, bots fill it in */}
          <input name="website" tabIndex={-1} autoComplete="off" className="bk-hp" aria-hidden="true" />
          {err && <p className="bk-err" role="alert">{err}</p>}
          <button className="bk-go" disabled={sending}>{sending ? "Booking…" : `Book ${longDate(pick).split(",")[0]} ${time(pick)}`}</button>
        </form>
      )}
    </div>
  );
}
