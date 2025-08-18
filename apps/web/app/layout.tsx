import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-dvh bg-surface text-text">
        <header className="sticky top-0 z-10 backdrop-blur bg-surface/70 border-b border-border">
          <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center justify-between">
            <h1 className="text-[var(--ll-color-primary)] font-semibold">OneSheet Money</h1>
            <a href="/weekly" className="text-sm">리포트</a>
          </div>
        </header>
        <main className="mx-auto max-w-screen-sm px-4 py-4">{children}</main>
      </body>
    </html>
  );
}
