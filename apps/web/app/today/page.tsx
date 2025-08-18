
"use client";
import { useState } from "react";
import { KRW } from "@osm/lib";

export default function TodayPage() {
  const [sum, setSum] = useState(0);
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">오늘</h2>
        <div className="text-sm text-muted">오늘 합계 <b>{KRW(sum)}원</b></div>
      </header>
      <button
        className="w-full py-3 rounded-2xl shadow-1 bg-[var(--ll-color-primary)] text-white"
        aria-label="지출 추가"
        onClick={()=>(document.getElementById("quick-add") as HTMLDialogElement | null)?.showModal()}>
        + 지출 추가
      </button>
      <dialog id="quick-add" className="rounded-2xl p-0">
        <QuickAddSheet onSaved={(a)=>{ setSum(s=>s+a); }} />
      </dialog>
    </section>
  );
}

function QuickAddSheet({ onSaved }:{ onSaved:(amount:number)=>void }) {
  const [amount,setAmount]=useState<number>(0);
  const [category,setCategory]=useState("식비");
  return (
    <form method="dialog" className="p-4 w-80">
      <h3 className="text-lg font-semibold mb-3">지출 추가</h3>
      <input autoFocus inputMode="numeric" pattern="[0-9]*"
        className="w-full border border-border rounded-xl px-3 py-2 mb-2"
        placeholder="금액(원)"
        onChange={(e)=>setAmount(Number((e.target.value as string).replaceAll(/[^0-9]/g,'')))} />
      <div className="flex gap-2 mb-3">
        {["식비","카페","배달"].map(c=>(
          <button key={c} type="button"
            className={`px-3 py-1.5 rounded-full border ${category===c?'bg-[var(--ll-color-primary)] text-white':'border-border'}`}
            onClick={()=>setCategory(c)}>{c}</button>
        ))}
      </div>
      <button className="w-full py-2 rounded-xl bg-[var(--ll-color-primary)] text-white"
        onClick={()=>onSaved(amount)}>저장</button>
    </form>
  );
}
