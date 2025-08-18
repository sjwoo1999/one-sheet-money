"use client";
import React, { useRef } from "react";

export function SharePresetModal(){
  const dlgRef = useRef<HTMLDialogElement>(null);
  const open = ()=> dlgRef.current?.showModal();
  const close = ()=> dlgRef.current?.close();
  return (
    <>
      <button onClick={open} className="text-sm underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-action)]">공유</button>
      <dialog ref={dlgRef} className="rounded-2xl p-0">
        <form method="dialog" className="p-4 w-[22rem]" aria-label="주간 리포트 공유" aria-describedby="share-desc">
          <h3 className="text-lg font-semibold mb-1">공유 프리셋</h3>
          <p id="share-desc" className="text-xs text-muted mb-3">형식을 선택하고 옵션을 조정하세요.</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[("정사각"),("세로"),("링크")].map(p=> (
              <button key={p} type="button" className="border border-border rounded-xl px-2 py-6 text-sm">{p}</button>
            ))}
          </div>
          <div className="space-y-2 mb-14 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" /> 금액 숨김</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> 카테고리 익명</label>
          </div>
          <div className="fixed bottom-4 inset-x-0 flex justify-center pointer-events-none">
            <button className="pointer-events-auto w-[22rem] py-3 rounded-2xl shadow-2 bg-[var(--ll-action)] text-white">공유 링크 생성</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
