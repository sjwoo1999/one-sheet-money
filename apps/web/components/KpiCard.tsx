import React from "react";

interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  delta?: number; // positive or negative percentage (e.g., 5 means +5%)
}

export function KpiCard({ label, value, delta, className = "", ...props }: KpiCardProps) {
  const hasDelta = typeof delta === "number" && !Number.isNaN(delta);
  const deltaSign = hasDelta ? (delta! > 0 ? "+" : delta! < 0 ? "" : "") : "";
  const deltaColor = !hasDelta
    ? "text-muted"
    : delta! > 0
    ? "text-[var(--ll-positive)]"
    : delta! < 0
    ? "text-[var(--ll-critical)]"
    : "text-muted";

  return (
    <div
      role="group"
      aria-label={`${label} 지표`}
      className={`rounded-2xl border border-border bg-surface shadow-1 p-3 ${className}`}
      {...props}
    >
      <div className="text-xs text-muted mb-1">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      {hasDelta && (
        <div className={`text-xs mt-0.5 ${deltaColor}`}
             aria-label={`전주 대비 ${deltaSign}${Math.abs(delta!)}%`}>
          전주 대비 {deltaSign}{Math.abs(delta!)}%
        </div>
      )}
    </div>
  );
}


