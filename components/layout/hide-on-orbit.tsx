"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function HideOnOrbit({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/orbit")) return null;
  return children;
}
