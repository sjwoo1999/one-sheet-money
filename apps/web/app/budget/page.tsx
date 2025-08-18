
import { BudgetBar } from "../../components/BudgetBar";

export default function BudgetPage(){
  const items=[
    { label:"식비", spent: 120000, limit: 300000 },
    { label:"카페", spent: 80000, limit: 100000 },
    { label:"교통", spent: 45000, limit: 50000 }
  ];
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">예산 설정</h2>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-muted">월</label>
          <select className="border border-border rounded-xl px-2 py-1">
            <option>2024-08</option>
            <option>2024-07</option>
          </select>
        </div>
      </header>
      <div className="space-y-4">
        {items.map(i=> (
          <BudgetBar key={i.label} label={i.label} spent={i.spent} limit={i.limit} />
        ))}
        <button className="w-full py-2 rounded-xl border border-border">+ 카테고리 추가</button>
      </div>
      <p className="text-sm text-muted">예산은 월별·카테고리별로 관리됩니다.</p>
    </section>
  );
}
