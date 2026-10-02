"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isPlatformPageSlug } from "@/lib/platform-page-slugs";

export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";
  const platformDetail =
    pathname.startsWith("/orbit-software/") &&
    pathname !== "/orbit-software" &&
    isPlatformPageSlug(pathname.replace("/orbit-software/", ""));

  const topPad = home
    ? ""
    : platformDetail
      ? "pt-[clamp(7.75rem,13.5vw,11rem)]"
      : "pt-[clamp(6.25rem,11vw,9rem)]";

  return (
    <main id="main-content" className={`flex-1 overflow-x-clip ${topPad}`}>
      {children}
    </main>
  );
}
