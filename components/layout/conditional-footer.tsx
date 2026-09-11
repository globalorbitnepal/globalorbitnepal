"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import type { ComponentProps } from "react";

export function ConditionalFooter(props: ComponentProps<typeof SiteFooter>) {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return <SiteFooter {...props} />;
}
