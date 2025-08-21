
"use client";
import { useEffect, useRef, useState } from "react";
import { KRW } from "@osm/lib";
import { track } from "../../lib/analytics";
import { useRecentCategories } from "../../lib/recentCategories";
import { Button } from "../../components/Button";
import { openDialog } from "../../lib/dialog";
import { Toast } from "../../components/Toast";
import { Skeleton } from "../../components/Skeleton";
import { CategoryChips } from "../../components/CategoryChips";
import { getTodayTotal, postExpense } from "../../lib/api";

export default function TodayPage() {
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const lastAddedRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(()=>{
    let mounted = true;
    (async()=>{
      try{
        const start = new Date();
        start.setHours(0,0,0,0);
        const end = new Date();
        end.setHours(23,59,59,999);
        const { total } = await getTodayTotal({ from: start.toISOString(), to: end.toISOString() });
        if (mounted) setSum(total);
      }catch(e){
        if (mounted) setErrorMsg("오늘 합계를 불러오지 못했어요");
      }finally{
        if (mounted) setLoading(false);
      }
    })();
    return ()=>{ mounted = false; };
  },[]);

  function handleSaved(amount:number){
    setSum(s=>s+amount);
    lastAddedRef.current = amount;
    setToastOpen(true);
    track("expense_add_submit", { amount, ts: Date.now() });
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(()=> setToastOpen(false), 5000);
  }

  function undo(){
    if (!toastOpen) return;
    setSum(s=> s - lastAddedRef.current);
    lastAddedRef.current = 0;
    setToastOpen(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }

  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 className="font-semibold" style={{ fontSize: "var(--ll-fs-xl)" }}>오늘</h2>
        <div className="text-sm text-muted" aria-live="polite">오늘 합계 <b>{KRW(sum)}원</b></div>
      </header>
      {loading ? (
        <Skeleton className="h-11 w-full rounded-2xl" />
      ) : (
        <Button
          fullWidth
          aria-label="지출 추가"
          onClick={(e)=> openDialog("quick-add", e.currentTarget as HTMLElement)}>
          + 지출 추가
        </Button>
      )}
      <dialog id="quick-add" className="rounded-2xl p-0">
        <QuickAddSheet onSaved={handleSaved} onError={setErrorMsg} />
      </dialog>

      {/* Toast */}
      <div aria-live="polite" className="sr-only">{toastOpen ? "지출이 저장되었습니다" : ""}</div>
      {toastOpen && (
        <Toast action={<button className="text-sm underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-action)]" onClick={undo}>되돌리기(5s)</button>}>
          저장됨
        </Toast>
      )}
      {errorMsg && (
        <Toast>
          {errorMsg}
        </Toast>
      )}
    </section>
  );
}

function QuickAddSheet({ onSaved, onError }:{ onSaved:(amount:number)=>void; onError?:(msg:string)=>void }) {
  const [amount,setAmount]=useState<number>(0);
  const [category,setCategory]=useState("식비");
  const [noteOpen,setNoteOpen]=useState(false);
  const [note,setNote]=useState("");
  const [loading, setLoading] = useState(true);
  const recentStore = useRecentCategories();
  const recent = recentStore.list(6).length ? recentStore.list(6) : ["식비","카페","배달"];
  const all=["식비","카페","배달","교통","장보기","쇼핑"];
  useEffect(()=>{ const t = setTimeout(()=>setLoading(false), 300); return ()=> clearTimeout(t); },[]);
  async function submit(){
    onSaved(amount);
    try{
      await postExpense({ amount, category, note });
    }catch(e){
      onError && onError("저장에 실패했어요");
      console.error(e);
    }
  }
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
      <CategoryChips
  items={(recent as string[])}
  selected={category}
  onSelect={(v)=>{ setCategory(v); recentStore.add(v); }}
  ariaLabel="최근 카테고리"
  loading={loading}
  skeletonCount={3}
/>
</div>
      <div className="mb-3">
      <div className="text-xs text-muted mb-1">전체</div>
      <CategoryChips
  items={(all as string[])}
  selected={category}
  onSelect={setCategory}
  ariaLabel="전체 카테고리"
  loading={loading}
  skeletonCount={6}
/>
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
