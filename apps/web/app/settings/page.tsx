
export default function SettingsPage(){
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">설정</h2>
      </header>
      <form className="space-y-3 max-w-sm">
        <div>
          <label className="block text-sm mb-1">이메일</label>
          <input className="w-full border border-border rounded-xl px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm mb-1">통화</label>
          <select className="w-full border border-border rounded-xl px-3 py-2">
            <option>KRW</option>
            <option>USD</option>
          </select>
        </div>
        <button className="w-full py-2 rounded-xl bg-[var(--ll-color-primary)] text-white">저장</button>
      </form>
      <p className="text-sm text-muted">알림 및 데이터 내보내기 옵션은 추후 추가됩니다.</p>
    </section>
  );
}
