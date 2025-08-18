"use client";
import React, { PropsWithChildren } from "react";

export function Toast({ children, action }:{ children: React.ReactNode; action?: React.ReactNode }){
  return (
    <div role="status" aria-live="polite" className="fixed bottom-20 inset-x-0 flex justify-center z-30">
      <div className="max-w-screen-sm mx-auto px-4 w-full">
        <div className="rounded-xl border border-border bg-surface shadow-2 px-3 py-2 flex items-center justify-between">
          <span className="text-sm">{children}</span>
          {action}
        </div>
      </div>
    </div>
  );
}
