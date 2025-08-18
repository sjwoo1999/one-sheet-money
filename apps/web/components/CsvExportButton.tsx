"use client";
export function CsvExportButton({ filename="osm-YYYY-MM-DD.csv", onClick }:{ filename?:string; onClick?:()=>void }){
  return (
    <button
      onClick={onClick}
      className="text-sm underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-action)] active:opacity-90"
      aria-label="CSV 내보내기"
    >CSV</button>
  );
}
