/* ══════════════════════════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════════════════════════ */
export const pad = (n) => (n < 10 ? "0" + n : "" + n);

export const minsToLabel = (m) => {
  const h = Math.floor(m / 60), mn = m % 60, ap = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${pad(mn)} ${ap}`;
};

export const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const startDay = (d) => { const n = new Date(d); n.setHours(0, 0, 0, 0); return n; };

export const fmtLong = (d) =>
  d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

export const fmtShort = (d) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const formatPrice = (p) => `Rs. ${p.toLocaleString()}`;

export const buildCalGrid = (v) => {
  const y = v.getFullYear(), m = v.getMonth();
  const sw = new Date(y, m, 1).getDay(), dim = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < sw; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(new Date(y, m, d));
  return cells;
};

export const genSlots = (staff, date, dur, existingSlots) => {
  if (!staff || !date) return [];
  const now = new Date(), isToday = sameDay(date, now);
  const nowM = now.getHours() * 60 + now.getMinutes();
  const dayBusy = existingSlots.filter((b) => b.sid === staff.id && sameDay(b.date, date));
  const slots = [];
  for (let t = staff.ws; t + dur <= staff.we; t += 30) {
    const blocked = dayBusy.some((b) => t < b.e && t + dur > b.s);
    const past = isToday && t <= nowM + 30;
    slots.push({ start: t, label: minsToLabel(t), avail: !blocked && !past });
  }
  return slots;
};

export const makeExistingSlots = () => {
  const t = new Date();
  const mk = (sid, dayOff, s, e) => {
    const dt = new Date(t); dt.setDate(dt.getDate() + dayOff); dt.setHours(0, 0, 0, 0);
    return { sid, date: dt, s, e };
  };
  return [
    mk("st1", 0, 11 * 60, 12 * 60),
    mk("st1", 0, 14 * 60, 16 * 60),
    mk("st2", 1, 9 * 60, 10 * 60),
    mk("st3", 1, 12 * 60, 13.5 * 60),
  ];
};
