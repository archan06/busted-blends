import { busyOn, freeSlots, json, validDate } from "./_lib.js";

// GET /api/slots?date=YYYY-MM-DD → { slots: ISO start times still open that day }
export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date");
  if (!validDate(date)) return json({ error: "Pick a day in the next 30 days." }, 400);
  try {
    return json({ slots: freeSlots(date, await busyOn(date)) });
  } catch (e) {
    console.error(e);
    return json({ error: "Couldn't load times." }, 502);
  }
}
