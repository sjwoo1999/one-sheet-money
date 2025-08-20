import React from "react";

interface OneSheetWeeklyProps {
  rangeLabel: string;
  totalKRW: string;
  deltaPercent: number;
  top: { c: string; v: number }[];
  advice?: string;
}

export function OneSheetWeekly({ rangeLabel, totalKRW, deltaPercent, top, advice }: OneSheetWeeklyProps) {
  const deltaSign = deltaPercent > 0 ? "+" : "";
  const max = Math.max(1, ...top.map(t => t.v));
  return (
    <section
      aria-label="OneSheet 주간 리포트"
      className="mx-auto w-[800px] max-w-full p-6 bg-surface text-text"
    >
      <header className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-sm text-muted">{rangeLabel}</div>
          <div className="text-3xl font-bold mt-1">{totalKRW}</div>
        </div>
        <div className="text-sm px-3 py-1 rounded-full border border-border">
          전주 대비 {deltaSign}{Math.abs(deltaPercent)}%
        </div>
      </header>
      <article className="rounded-2xl border border-border p-4">
        <div className="text-sm text-muted mb-2">TOP 카테고리</div>
        <div className="space-y-2">
          {top.map(({ c, v }) => (
            <div key={c} className="text-sm">
              <div className="flex items-center justify-between">
                <span>{c}</span>
                <span className="text-muted">₩{v}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--ll-border)]">
                <div
                  className="h-2 bg-[var(--ll-action)]"
                  style={{ width: `${Math.max(4, (v / max) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {advice && <div className="mt-4 text-sm">제안: {advice}</div>}
      </article>
    </section>
  );
}


