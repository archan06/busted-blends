// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { freeSlots, parseBooking, validDate, wallToUtc, isAdmin } from "../api/_lib.ts";

test("New York wall time → UTC across daylight saving", () => {
  assert.equal(new Date(wallToUtc("2026-10-28", 600)).toISOString(), "2026-10-28T14:00:00.000Z"); // EDT
  assert.equal(new Date(wallToUtc("2026-11-02", 600)).toISOString(), "2026-11-02T15:00:00.000Z"); // EST
});

test("slots run 10:00 AM to 7:45 PM starts, every 45 minutes", () => {
  const s = freeSlots("2026-10-28", [], 0);
  assert.equal(s.length, 14);
  assert.equal(s[0], "2026-10-28T14:00:00.000Z");
  assert.equal(s.at(-1), "2026-10-28T23:45:00.000Z"); // 7:45 PM EDT, ends 8:30
});

test("busy blocks (classes) remove every overlapping slot", () => {
  // class 11:00 AM–12:15 PM EDT kills 10:45 and 11:30; 12:15 starts right after
  const s = freeSlots("2026-10-28", [{ start: "2026-10-28T15:00:00Z", end: "2026-10-28T16:15:00Z" }], 0);
  assert.equal(s.length, 12);
  assert.ok(!s.includes("2026-10-28T15:30:00.000Z"));
  assert.ok(s.includes("2026-10-28T16:15:00.000Z"));
});

test("past slots are hidden", () => {
  const s = freeSlots("2026-10-28", [], wallToUtc("2026-10-28", 615));
  assert.equal(s[0], "2026-10-28T14:45:00.000Z");
});

test("dates must be today through 30 days out", () => {
  const now = Date.parse("2026-10-28T16:00:00Z");
  assert.ok(validDate("2026-10-28", now));
  assert.ok(validDate("2026-11-27", now));
  assert.ok(!validDate("2026-11-28", now));
  assert.ok(!validDate("2026-10-27", now));
  assert.ok(!validDate("10/28/2026", now));
});

test("booking input is validated", () => {
  const ok = parseBooking({ start: "2026-10-28T14:00:00Z", name: "  Jay   Lee ", phone: "(248) 802-3662" });
  assert.deepEqual(ok, { start: "2026-10-28T14:00:00.000Z", name: "Jay Lee", phone: "(248) 802-3662" });
  assert.equal(typeof parseBooking({ start: "2026-10-28T14:00:00Z", name: "J", phone: "2488023662" }), "string");
  assert.equal(typeof parseBooking({ start: "2026-10-28T14:00:00Z", name: "Jay", phone: "123" }), "string");
  assert.equal(typeof parseBooking({ start: "nope", name: "Jay", phone: "2488023662" }), "string");
  assert.equal(typeof parseBooking(null), "string");
});

test("admin password check", () => {
  process.env.ADMIN_PASSWORD = "hunter2-long";
  const req = (pw?: string) => new Request("http://x", { headers: pw ? { "x-admin-password": pw } : {} });
  assert.ok(isAdmin(req("hunter2-long")));
  assert.ok(!isAdmin(req("hunter2")));
  assert.ok(!isAdmin(req()));
});
