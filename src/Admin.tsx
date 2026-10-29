import { useEffect, useState, type FormEvent } from "react";
import { longDate, time } from "./Booking";

type Booking = { id: string; start: string; end: string; name: string; phone: string };

const KEY = "bb-admin";
const read = () => { try { return sessionStorage.getItem(KEY) ?? ""; } catch { return ""; } };
const save = (pw: string) => { try { pw ? sessionStorage.setItem(KEY, pw) : sessionStorage.removeItem(KEY); } catch { /* private mode */ } };

export default function Admin() {
  const [pw, setPw] = useState(read);
  const [list, setList] = useState<Booking[] | null>(null);
  const [err, setErr] = useState("");

  async function load(password: string) {
    setErr("");
    try {
      const r = await fetch("/api/admin", { headers: { "x-admin-password": password } });
      const d = await r.json().catch(() => ({}));
      if (r.status === 401) { save(""); setPw(""); return setErr("Wrong password."); }
      if (!r.ok) return setErr(d.error ?? "Couldn't load bookings.");
      save(password); setPw(password); setList(d.bookings);
    } catch {
      setErr("Couldn't reach the server.");
    }
  }

  useEffect(() => { if (pw) load(pw); }, []);

  async function cancel(b: Booking) {
    if (!confirm(`Cancel ${b.name}'s cut on ${longDate(b.start)} at ${time(b.start)}? It comes off your Google Calendar too.`)) return;
    const r = await fetch(`/api/admin?id=${encodeURIComponent(b.id)}`, { method: "DELETE", headers: { "x-admin-password": pw } });
    if (r.ok) setList(l => l!.filter(x => x.id !== b.id));
    else setErr("Couldn't cancel that one.");
  }

  if (!list) return (
    <main className="adm adm-login">
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); load(String(new FormData(e.currentTarget).get("pw"))); }}>
        <h1 className="h2">Admin</h1>
        <label>Password<input name="pw" type="password" required autoComplete="current-password" autoFocus /></label>
        {err && <p className="bk-err" role="alert">{err}</p>}
        <button className="btn">Sign in</button>
      </form>
    </main>
  );

  const now = Date.now();
  const upcoming = list.filter(b => Date.parse(b.end) > now);
  const past = list.filter(b => Date.parse(b.end) <= now).reverse();
  const week = upcoming.filter(b => Date.parse(b.start) < now + 7 * 864e5).length;
  const month = past.filter(b => Date.parse(b.start) > now - 30 * 864e5).length;
  const regulars = new Set(list.map(b => b.phone.replace(/\D/g, ""))).size;

  const row = (b: Booking, canCancel: boolean) => (
    <li key={b.id} className="adm-row">
      <div className="adm-when"><b>{time(b.start)}</b><span>{longDate(b.start)}</span></div>
      <div className="adm-who"><b>{b.name}</b><span>{b.phone}</span></div>
      <div className="adm-acts">
        <a href={`sms:${b.phone}`}>Text</a>
        <a href={`tel:${b.phone}`}>Call</a>
        {canCancel && <button type="button" onClick={() => cancel(b)}>Cancel</button>}
      </div>
    </li>
  );

  return (
    <main className="adm">
      <header className="adm-top">
        <h1 className="h2">Your cuts</h1>
        <div className="adm-tools">
          <button type="button" className="bk-link" onClick={() => load(pw)}>Refresh</button>
          <a className="bk-link" href="https://calendar.google.com" target="_blank" rel="noopener">Google Calendar</a>
          <button type="button" className="bk-link" onClick={() => { save(""); setPw(""); setList(null); }}>Sign out</button>
        </div>
      </header>
      {err && <p className="bk-err" role="alert">{err}</p>}
      <ul className="adm-stats">
        <li><b>{upcoming.length}</b>Upcoming</li>
        <li><b>{week}</b>Next 7 days</li>
        <li><b>{month}</b>Cut in last 30 days</li>
        <li><b>{regulars}</b>Clients (60 days)</li>
      </ul>
      <h2 className="adm-h">Upcoming</h2>
      {upcoming.length ? <ul className="adm-list">{upcoming.map(b => row(b, true))}</ul> : <p className="bk-msg">No cuts booked yet.</p>}
      <h2 className="adm-h">Past 60 days</h2>
      {past.length ? <ul className="adm-list">{past.map(b => row(b, false))}</ul> : <p className="bk-msg">Nothing yet.</p>}
    </main>
  );
}
