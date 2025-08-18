
export default function ShareWeeklyPage(){
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">주간 리포트 공유</h2>
      </header>
      <form className="space-y-3 max-w-sm">
        <div>
          <label className="block text-sm mb-1">메시지</label>
          <textarea className="w-full border border-border rounded-xl px-3 py-2" placeholder="이번 주 리포트를 공유합니다." />
        </div>
        <div>
          <label className="block text-sm mb-1">공개 범위</label>
          <select className="w-full border border-border rounded-xl px-3 py-2">
            <option>링크 소지자 공개</option>
            <option>비공개</option>
          </select>
        </div>
        <button className="w-full py-2 rounded-xl bg-[var(--ll-color-primary)] text-white">공유 링크 생성</button>
      </form>
      <p className="text-sm text-muted">생성된 링크로 리포트를 공유할 수 있습니다.</p>
    </section>
  );
}
