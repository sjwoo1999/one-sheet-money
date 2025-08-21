import { ReportsService } from "../src/modules/reports/reports.service";

// Mock in-memory store
jest.mock("../src/modules/expenses/store", ()=>{
  const store: any[] = [];
  return {
    addExpense: (r: any)=> store.push(r),
    listExpenses: ()=> store,
    __store: store,
  };
});

describe("ReportsService", ()=>{
  const svc = new ReportsService();
  const { addExpense, __store } = require("../src/modules/expenses/store");

  beforeEach(()=>{ __store.length = 0; });

  it("aggregates total and top categories", async ()=>{
    addExpense({ amount: 1000, category: "식비", ts: "2025-08-18T12:00:00.000Z" });
    addExpense({ amount: 2000, category: "카페", ts: "2025-08-19T12:00:00.000Z" });
    addExpense({ amount: 500, category: "식비", ts: "2025-08-20T12:00:00.000Z" });

    const res = await svc.getWeekly();
    expect(res.total).toBe(3500);
    expect(res.top[0]).toEqual({ c: "카페", v: 2000 });
    expect(res.top[1]).toEqual({ c: "식비", v: 1500 });
  });

  it("filters by from/to", async ()=>{
    addExpense({ amount: 1000, category: "식비", ts: "2025-08-10T12:00:00.000Z" });
    addExpense({ amount: 2000, category: "카페", ts: "2025-08-19T12:00:00.000Z" });

    const res = await svc.getWeekly({ from: "2025-08-15T00:00:00.000Z", to: "2025-08-31T23:59:59.999Z" });
    expect(res.total).toBe(2000);
    expect(res.top).toEqual([{ c: "카페", v: 2000 }]);
  });
});
