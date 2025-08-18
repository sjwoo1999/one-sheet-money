
export default function BudgetPage(){
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">예산 설정</h2>
      </header>
      <form className="space-y-3 max-w-sm">
        <div>
          <label className="block text-sm mb-1">월(YYYY-MM)</label>
          <input className="w-full border border-border rounded-xl px-3 py-2" placeholder="2024-08" />
        </div>
        <div>
          <label className="block text-sm mb-1">카테고리</label>
          <input className="w-full border border-border rounded-xl px-3 py-2" placeholder="식비" />
        </div>
        <div>
          <label className="block text-sm mb-1">한도(원)</label>
          <input inputMode="numeric" className="w-full border border-border rounded-xl px-3 py-2" placeholder="300000" />
        </div>
        <button className="w-full py-2 rounded-xl bg-[var(--ll-color-primary)] text-white">저장</button>
      </form>
      <p className="text-sm text-muted">예산은 월별·카테고리별로 관리됩니다.</p>
    </section>
  );
}
