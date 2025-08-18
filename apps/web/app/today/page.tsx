
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
        className="w-full py-3 rounded-2xl shadow-1 bg-[var(--ll-action)] text-white"
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
  const [noteOpen,setNoteOpen]=useState(false);
  const [note,setNote]=useState("");
  const recent=["식비","카페","배달"];
  const all=["식비","카페","배달","교통","장보기","쇼핑"];
  function submit(){ onSaved(amount); }
  return (
    <form method="dialog" className="p-4 w-[22rem]" aria-label="지출 추가" aria-describedby="qa-desc">
      <h3 className="text-lg font-semibold mb-1">지출 추가</h3>
      <p id="qa-desc" className="text-xs text-muted mb-3">금액 입력 후 카테고리를 선택하고 저장하세요.</p>
      <input autoFocus inputMode="numeric" pattern="[0-9]*"
        className="w-full border border-border rounded-xl px-3 py-2 mb-3"
        placeholder="금액(원)"
        onChange={(e)=>setAmount(Number((e.target.value as string).replaceAll(/[^0-9]/g,'')))} />
      <div className="mb-2">
        <div className="text-xs text-muted mb-1">최근</div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {recent.map(c=> (
            <button key={c} type="button"
              className={`px-3 py-1.5 rounded-full border whitespace-nowrap ${category===c?'bg-[var(--ll-action)] text-white':'border-border'}`}
              onClick={()=>setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <div className="text-xs text-muted mb-1">전체</div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {all.map(c=> (
            <button key={c} type="button"
              className={`px-3 py-1.5 rounded-full border whitespace-nowrap ${category===c?'bg-[var(--ll-action)] text-white':'border-border'}`}
              onClick={()=>setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="mb-14">
        {!noteOpen && (
          <button type="button" className="text-sm underline" onClick={()=>setNoteOpen(true)}>+ 메모</button>
        )}
        {noteOpen && (
          <textarea className="mt-2 w-full border border-border rounded-xl px-3 py-2"
            placeholder="메모를 입력하세요" onChange={(e)=>setNote((e.target as HTMLTextAreaElement).value)} />
        )}
      </div>
      <div className="fixed bottom-4 inset-x-0 flex justify-center pointer-events-none">
        <button className="pointer-events-auto w-[22rem] py-3 rounded-2xl shadow-2 bg-[var(--ll-action)] text-white"
          onClick={submit}>저장</button>
      </div>
    </form>
  );
}
