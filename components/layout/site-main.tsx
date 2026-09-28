"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <main id="main-content" className={home ? "flex-1" : "flex-1 pt-[4.5rem] sm:pt-[5rem] lg:pt-[5.5rem]"}>
      {children}
    </main>
  );
}
