"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <main id="main-content" className={home ? "flex-1" : "flex-1 pt-[clamp(4.75rem,8vw,6.5rem)]"}>
      {children}
    </main>
  );
}
