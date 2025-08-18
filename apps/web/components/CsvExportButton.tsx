"use client";
import { downloadCsv } from "../lib/csv";

export function CsvExportButton({ filename="osm-weekly.csv", rows }:{ filename?:string; rows?:string[][] }){
  function handle(){
    const data = rows && rows.length ? rows : [["category","total"],["식비","0"],["카페","0"],["배달","0"]];
    downloadCsv(filename, data);
  }
  return (
    <button
      onClick={handle}
      className="text-sm underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-action)] active:opacity-90"
      aria-label="CSV 내보내기"
    >CSV</button>
  );
}
