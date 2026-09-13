"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const overlay = pathname === "/";

  return (
    <main id="main-content" className={overlay ? "flex-1" : "flex-1 pt-[84px]"}>
      {children}
    </main>
  );
}
