import React from "react";

export function Empty({ title="데이터가 없어요", description, action }:{ title?: string; description?: string; action?: React.ReactNode }){
  return (
    <div className="text-center text-[var(--ll-text-muted)] p-6">
      <div className="text-sm font-medium mb-1">{title}</div>
      {description && <div className="text-sm mb-3">{description}</div>}
      {action}
    </div>
  );
}



