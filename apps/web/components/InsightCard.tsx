import React from "react";

type Tone = "neutral" | "positive" | "warning" | "critical";

interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  caption?: string;
  tone?: Tone;
}

function toneClasses(tone: Tone) {
  switch (tone) {
    case "positive":
      return "border-[color:var(--ll-positive)]/30";
    case "warning":
      return "border-[color:var(--ll-warning)]/40";
    case "critical":
      return "border-[color:var(--ll-critical)]/40";
    default:
      return "border-border";
  }
}

export function InsightCard({ title, value, caption, tone = "neutral", className = "", ...props }: InsightCardProps) {
  return (
    <div
      className={`rounded-2xl border bg-surface shadow-1 p-3 ${toneClasses(tone)} ${className}`}
      role="group"
      aria-label={`${title} 인사이트`}
      {...props}
    >
      <div className="text-xs text-muted mb-1">{title}</div>
      <div className="text-base font-semibold">{value}</div>
      {caption && <div className="text-xs text-muted mt-0.5">{caption}</div>}
    </div>
  );
}


