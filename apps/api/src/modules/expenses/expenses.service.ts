import { Injectable } from "@nestjs/common";

@Injectable()
export class ExpensesService {
  async create(body: { amount: number; category: string; note?: string; ts?: string }){
    const ts = body.ts ?? new Date().toISOString();
    const { addExpense } = await import("./store");
    addExpense({ amount: body.amount, category: body.category, note: body.note, ts });
    return { ok: true };
  }
  async list(filters?: { from?: string; to?: string; category?: string }){
    const { listExpenses } = await import("./store");
    const items = listExpenses().filter((e)=>{
      const inFrom = !filters?.from || e.ts >= filters.from;
      const inTo = !filters?.to || e.ts <= filters.to;
      const inCat = !filters?.category || e.category === filters.category;
      return inFrom && inTo && inCat;
    });
    const total = items.reduce((s,e)=> s + e.amount, 0);
    return { items, total };
  }
}
