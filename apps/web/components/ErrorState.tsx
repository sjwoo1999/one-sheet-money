import React from "react";

export function ErrorState({ message="문제가 발생했어요", onRetry }:{ message?: string; onRetry?: ()=>void }){
  return (
    <div role="alert" className="text-center text-[var(--ll-text)] p-6">
      <div className="text-sm font-medium mb-2">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-xl border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-focus)]"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}



