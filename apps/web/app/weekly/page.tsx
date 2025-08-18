
export default function WeeklyPage(){
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">주간 리포트</h2>
        <button className="text-sm underline">공유</button>
      </header>
      <article className="rounded-2xl shadow-2 border border-border p-4 bg-surface">
        <div className="text-sm text-muted mb-2">이번 주 합계</div>
        <div className="text-2xl font-bold">₩ 0</div>
        <hr className="my-4 border-border" />
        <div className="text-sm text-muted mb-2">TOP 3</div>
        <ul className="list-disc ml-5 text-sm">
          <li>식비 ₩0</li><li>카페 ₩0</li><li>배달 ₩0</li>
        </ul>
        <div className="mt-4 text-sm">제안: 오늘부터 5초 기록을 시작해요.</div>
      </article>
    </section>
  );
}
