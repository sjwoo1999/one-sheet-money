"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Wallet, Settings as Cog } from "lucide-react";

export function BottomNav(){
  const pathname = usePathname();
  const items = [
    { href: "/today", label: "오늘", icon: <Home size={18} /> },
    { href: "/weekly", label: "주간", icon: <CalendarDays size={18} /> },
    { href: "/budget", label: "예산", icon: <Wallet size={18} /> },
    { href: "/settings", label: "설정", icon: <Cog size={18} /> }
  ];
  return (
    <nav aria-label="하단 내비게이션"
      className="fixed bottom-0 inset-x-0 z-20 border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <ul className="mx-auto max-w-screen-sm grid grid-cols-4 px-2 py-2">
        {items.map(it=> {
          const active = pathname?.startsWith(it.href);
          return (
            <li key={it.href} className="text-center">
              <Link href={it.href}
                 aria-current={active ? "page" : undefined}
                 className={`block text-[0.8rem] px-2 py-1.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ll-action)] ${active?"text-[var(--ll-action)] bg-[color:var(--ll-action)]/10":"text-[var(--ll-text)]"}`}>
                <span className="flex flex-col items-center gap-0.5">
                  <span className="opacity-90">{it.icon}</span>
                  <span className="text-[0.75rem]">{it.label}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
