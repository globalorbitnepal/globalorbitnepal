"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <main
      id="main-content"
      className={`overflow-x-clip ${home ? "flex-1" : "flex-1 pt-[clamp(6.25rem,11vw,9rem)]"}`}
    >
      {children}
    </main>
  );
}
