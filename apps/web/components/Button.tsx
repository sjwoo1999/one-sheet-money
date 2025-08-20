"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function Button({ variant = "primary", fullWidth, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-focus)] transition-colors";
  const variants: Record<string, string> = {
    primary: "bg-[var(--ll-action)] text-white active:opacity-90 shadow-1",
    secondary: "border border-border bg-surface text-[var(--ll-text)] hover:bg-surface/80",
    ghost: "text-[var(--ll-text)] hover:bg-surface/60",
  };
  const width = fullWidth ? "w-full" : "";
  return <button className={`${base} ${variants[variant]} ${width} ${className}`} {...props} />;
}
