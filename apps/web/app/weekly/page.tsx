"use client";
import { CsvExportButton } from "../../components/CsvExportButton";
import dynamic from "next/dynamic";
const SharePresetModal = dynamic(() => import("../../components/SharePresetModal").then(m => m.SharePresetModal), { ssr: false });
import { OverspendBadge } from "../../components/OverspendBadge";
import Link from "next/link";
import { Card } from "../../components/Card";
import { KpiCard } from "../../components/KpiCard";
import { Sparkline } from "../../components/Sparkline";
import { InsightCard } from "../../components/InsightCard";
import { WeekPicker } from "../../components/WeekPicker";
import { formatRangeKOR } from "../../lib/week";
import { useState } from "react";
import { PrintButton } from "../../components/PrintButton";
import { OneSheetWeekly } from "../../components/OneSheetWeekly";

export default function WeeklyPage(){
  const [anchorDate, setAnchorDate] = useState<Date>(new Date());
  const exceededBy = 0; // TODO: bind real data
  const top = [{c:"식비",v:0},{c:"카페",v:0},{c:"배달",v:0}];
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">주간 리포트</h2>
        <div className="flex gap-3">
          <CsvExportButton filename="osm-weekly.csv" rows={[ ["category","total"], ...top.map(t=>[t.c, String(t.v)]) ]} />
          <SharePresetModal />
          <PrintButton className="no-print" />
        </div>
      </header>
      <WeekPicker date={anchorDate} onChange={setAnchorDate} rangeLabel={formatRangeKOR(anchorDate)} />
      <Card className="p-4">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-sm text-muted mb-1">{formatRangeKOR(anchorDate)}</div>
            <div className="text-2xl font-bold">₩ 0</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full border border-border">전주 대비 +0%</span>
            <OverspendBadge exceededBy={exceededBy} />
          </div>
        </div>
        <hr className="my-4 border-border" />
        <div className="grid grid-cols-3 gap-2 mb-4">
          <KpiCard label="합계" value="₩ 0" delta={0} />
          <KpiCard label="카테고리 수" value={3} />
          <KpiCard label="평균/일" value="₩ 0" />
        </div>
        <div className="mb-4">
          <div className="text-sm text-muted mb-1">추이</div>
          <Sparkline data={[0, 2, 1, 3, 2, 4, 1]} width={240} height={36} />
        </div>
        <div className="text-sm text-muted mb-2">TOP 3</div>
        <div className="space-y-2">
          {[{c:"식비",v:0},{c:"카페",v:0},{c:"배달",v:0}].length===0 ? (
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-full bg-border rounded" />
              <div className="h-3 w-10/12 bg-border rounded" />
              <div className="h-3 w-8/12 bg-border rounded" />
            </div>
          ) : (
            (()=>{
              const max = Math.max(1, ...top.map(t=>t.v));
              return top.map(({c,v})=> (
              <div key={c} className="text-sm">
                <div className="flex items-center justify-between">
                  <span>{c}</span><span className="text-muted">₩{v}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--ll-border)]"><div className="h-2 bg-[var(--ll-action)]" style={{width:`${Math.max(4, (v/max)*100)}%`}}/></div>
              </div>
              ));
            })()
          )}
        </div>
        <div className="mt-4 text-sm">제안: 오늘부터 5초 기록을 시작해요.</div>
      </Card>

      <Card className="p-4">
        <div className="text-sm text-muted mb-2">분석</div>
        <div className="grid grid-cols-2 gap-2">
          <InsightCard title="지출 급증 카테고리" value="식비" caption="전주 대비 +12%" tone="warning" />
          <InsightCard title="예산 위험도" value="낮음" caption="임계치 80% 이하" tone="positive" />
        </div>
      </Card>

      {/* Print-only OneSheet layout */}
      <div className="print-only">
        <OneSheetWeekly
          rangeLabel={formatRangeKOR(anchorDate)}
          totalKRW={"₩ 0"}
          deltaPercent={0}
          top={top}
          advice="오늘부터 5초 기록을 시작해요."
        />
      </div>
    </section>
  );
}
