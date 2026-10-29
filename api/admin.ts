import { cancelBooking, isAdmin, json, listBookings } from "./_lib.js";

const DAY = 864e5;

// GET /api/admin → bookings from 60 days back to 60 days ahead. Needs the x-admin-password header.
export async function GET(req: Request) {
  if (!isAdmin(req)) return json({ error: "Wrong password." }, 401);
  try {
    return json({ bookings: await listBookings(Date.now() - 60 * DAY, Date.now() + 60 * DAY) });
  } catch (e) {
    console.error(e);
    return json({ error: "Couldn't load bookings." }, 502);
  }
}

// DELETE /api/admin?id=<event id> → cancels a booking made on the site
export async function DELETE(req: Request) {
  if (!isAdmin(req)) return json({ error: "Wrong password." }, 401);
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return json({ error: "Missing id." }, 400);
  try {
    return (await cancelBooking(id)) ? json({ ok: true }) : json({ error: "Not a site booking." }, 403);
  } catch (e) {
    console.error(e);
    return json({ error: "Couldn't cancel." }, 502);
  }
}
