export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function postExpense(input: { amount: number; category: string; note?: string; ts?: string }) {
  const res = await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Failed to save expense: ${res.status}`);
  return res.json();
}

export interface WeeklyReport {
  total: number;
  top: { c: string; v: number }[];
}

export async function getWeekly(params?: { from?: string; to?: string }): Promise<WeeklyReport> {
  const q = new URLSearchParams();
  if (params?.from) q.set("from", params.from);
  if (params?.to) q.set("to", params.to);
  const res = await fetch(`${API_BASE}/reports/weekly${q.toString()?`?${q.toString()}`:""}`);
  if (!res.ok) throw new Error(`Failed to load weekly: ${res.status}`);
  return res.json();
}

export async function getTodayTotal(params?: { from?: string; to?: string }): Promise<{ total: number }>{
  const q = new URLSearchParams();
  if (params?.from) q.set("from", params.from);
  if (params?.to) q.set("to", params.to);
  const res = await fetch(`${API_BASE}/expenses${q.toString()?`?${q.toString()}`:""}`);
  if (!res.ok) throw new Error(`Failed to load expenses: ${res.status}`);
  const data = await res.json();
  return { total: data.total ?? 0 };
}
