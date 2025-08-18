"use client";
import React from "react";

export function OverspendBadge({ exceededBy }:{ exceededBy:number }){
  if (exceededBy <= 0) return null;
  return (
    <span
      aria-label={`예산 초과 ${exceededBy.toLocaleString("ko-KR")}`}
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[var(--ll-critical)] text-white">
      예산 초과 +₩{exceededBy.toLocaleString("ko-KR")}
    </span>
  );
}
