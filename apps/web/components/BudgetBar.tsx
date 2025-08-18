"use client";
import React from "react";

export function BudgetBar({ label, spent, limit }:{ label:string; spent:number; limit:number }){
  const ratio = limit>0 ? Math.min(spent/limit, 1) : 0;
  const status: "positive"|"warning"|"critical" = ratio < 0.8 ? "positive" : ratio <= 1 ? "warning" : "critical";
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-muted">{spent.toLocaleString("ko-KR")} / {limit.toLocaleString("ko-KR")}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--ll-border)] overflow-hidden">
        <div className={`h-full`} style={{ width: `${Math.max(ratio*100, 2)}%`, background: status==="positive"?"var(--ll-positive)":status==="warning"?"var(--ll-warning)":"var(--ll-critical)" }} />
      </div>
    </div>
  );
}
