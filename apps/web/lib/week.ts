export function getWeekRange(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diffToMon = (day + 6) % 7; // convert so Monday is 0
  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMon);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { monday, sunday };
}

export function formatRangeKOR(date: Date) {
  const { monday, sunday } = getWeekRange(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = monday.getFullYear();
  const m1 = pad(monday.getMonth() + 1);
  const d1 = pad(monday.getDate());
  const m2 = pad(sunday.getMonth() + 1);
  const d2 = pad(sunday.getDate());
  return `${y}-${m1}-${d1} ~ ${m2}-${d2}`;
}


