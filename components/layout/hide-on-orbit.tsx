"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isOrbitAdminPath } from "@/lib/is-orbit-admin-route";

export function HideOnOrbit({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isOrbitAdminPath(pathname)) return null;
  return children;
}
