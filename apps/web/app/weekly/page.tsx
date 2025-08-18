
import { CsvExportButton } from "../../components/CsvExportButton";
import { SharePresetModal } from "../../components/SharePresetModal";
import { OverspendBadge } from "../../components/OverspendBadge";
import Link from "next/link";
import { Card } from "../../components/Card";

export default function WeeklyPage(){
  const exceededBy = 0; // TODO: bind real data
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">주간 리포트</h2>
        <div className="flex gap-3">
          <CsvExportButton />
          <SharePresetModal />
        </div>
      </header>
      <div className="flex items-center gap-2 text-sm">
        <label className="text-muted">주 선택</label>
        <select className="border border-border rounded-xl px-2 py-1">
          <option>이번 주</option>
          <option>지난 주</option>
        </select>
      </div>
      <Card className="p-4">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-sm text-muted mb-1">2024-08-19 ~ 08-25</div>
            <div className="text-2xl font-bold">₩ 0</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full border border-border">전주 대비 +0%</span>
            <OverspendBadge exceededBy={exceededBy} />
          </div>
        </div>
        <hr className="my-4 border-border" />
        <div className="text-sm text-muted mb-2">TOP 3</div>
        <div className="space-y-2">
          {[{c:"식비",v:0},{c:"카페",v:0},{c:"배달",v:0}].length===0 ? (
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-full bg-border rounded" />
              <div className="h-3 w-10/12 bg-border rounded" />
              <div className="h-3 w-8/12 bg-border rounded" />
            </div>
          ) : (
            [{c:"식비",v:0},{c:"카페",v:0},{c:"배달",v:0}].map(({c,v})=> (
              <div key={c} className="text-sm">
                <div className="flex items-center justify-between">
                  <span>{c}</span><span className="text-muted">₩{v}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--ll-border)]"><div className="h-2 bg-[var(--ll-action)]" style={{width:"4%"}}/></div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 text-sm">제안: 오늘부터 5초 기록을 시작해요.</div>
      </Card>
    </section>
  );
}
