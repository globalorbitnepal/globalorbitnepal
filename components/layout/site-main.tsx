import type { ReactNode } from "react";

export function SiteMain({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="flex-1 pt-[84px]">
      {children}
    </main>
  );
}
