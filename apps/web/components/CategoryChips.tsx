"use client";
import { ButtonHTMLAttributes } from "react";

interface CategoryChipsProps {
  items: string[];
  selected?: string;
  onSelect?: (value: string) => void;
  ariaLabel: string;
  className?: string;
  roleListbox?: boolean;
}

export function CategoryChips({ items, selected, onSelect, ariaLabel, className = "", roleListbox = true }: CategoryChipsProps){
  return (
    <div
      className={`flex gap-2 overflow-x-auto pb-1 ${className}`}
      {...(roleListbox ? { role: "listbox", "aria-label": ariaLabel, "aria-orientation": "horizontal" as ButtonHTMLAttributes<HTMLDivElement>["aria-orientation"] } : {})}
    >
      {items.map((c) => (
        <button
          key={c}
          type="button"
          role={roleListbox ? "option" : undefined}
          aria-selected={roleListbox ? selected === c : undefined}
          className={`px-3 py-1.5 rounded-full border whitespace-nowrap ${selected === c ? 'bg-[var(--ll-action)] text-white' : 'border-border'}`}
          onClick={() => onSelect?.(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
