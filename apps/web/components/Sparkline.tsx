import React from "react";

interface SparklineProps extends Omit<React.SVGAttributes<SVGSVGElement>, "values"> {
  data: number[]; // 0..1 normalized or any positive numbers
  height?: number;
  width?: number;
  strokeColor?: string; // token-based color
}

export function Sparkline({
  data,
  height = 32,
  width = 120,
  strokeColor = "var(--ll-action)",
  ...props
}: SparklineProps) {
  if (!data || data.length === 0) {
    return (
      <svg width={width} height={height} {...props} aria-hidden="true" />
    );
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = width / Math.max(1, data.length - 1);

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / span) * (height - 2) - 1;
    return `${x},${y}`;
  });

  const d = `M ${points[0]} L ${points.slice(1).join(" ")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...props}>
      <path d={d} fill="none" stroke={strokeColor} strokeWidth={2} />
    </svg>
  );
}


