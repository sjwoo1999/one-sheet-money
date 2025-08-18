export type Expense = { id: string; amount: number; category: string; note?: string; ts: string; };
export type Budget = { id: string; month: string; category: string; limit: number; };
export type WeeklyReport = {
  id: string; week_start: string; total: number;
  top_categories: Array<{ category: string; total: number }>;
  overspend: boolean; advice: string; image_url?: string;
};
