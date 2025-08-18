import React, { PropsWithChildren } from "react";

export function Card({ children, className="" }: PropsWithChildren<{ className?: string }>){
  return (
    <section className={`rounded-2xl shadow-2 border border-border bg-surface ${className}`}>
      {children}
    </section>
  );
}
