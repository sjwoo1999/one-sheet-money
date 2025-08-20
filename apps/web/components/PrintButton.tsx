"use client";
import React from "react";

interface PrintButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function PrintButton({ label = "인쇄", className = "", ...props }: PrintButtonProps) {
  function handle() {
    if (typeof window !== "undefined") window.print();
  }
  return (
    <button
      type="button"
      onClick={handle}
      className={`text-sm underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-action)] ${className}`}
      aria-label="주간 리포트를 인쇄"
      {...props}
    >
      {label}
    </button>
  );
}


