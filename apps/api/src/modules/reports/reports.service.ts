import { Injectable } from "@nestjs/common";

@Injectable()
export class ReportsService {
  async generateWeekly(_body: unknown){ return { ok:true }; }
  async getWeekly(filters?: { from?: string; to?: string }){
    const { listExpenses } = await import("../expenses/store");
    const items = listExpenses().filter((e)=>{
      const inFrom = !filters?.from || e.ts >= filters.from;
      const inTo = !filters?.to || e.ts <= filters.to;
      return inFrom && inTo;
    });
    const total = items.reduce((s,e)=> s + e.amount, 0);
    const byCategory = new Map<string, number>();
    for (const e of items){ byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + e.amount); }
    const top = Array.from(byCategory.entries())
      .map(([c,v])=>({ c, v }))
      .sort((a,b)=> b.v - a.v)
      .slice(0,3);
    return { total, top };
  }
}
