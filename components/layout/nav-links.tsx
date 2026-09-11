"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FallbackNavItem } from "@/lib/site";

type NavLinksProps = {
  items: FallbackNavItem[];
  variant?: "header" | "headerDark" | "headerGlass" | "footer";
};

export function NavLinks({ items, variant = "header" }: NavLinksProps) {
  const pathname = usePathname();
  const isFooter = variant === "footer";
  const isDark = variant === "headerDark";
  const isGlass = variant === "headerGlass";

  return (
    <ul
      className={
        isFooter
          ? "mt-4 flex flex-col gap-2.5 text-sm"
          : "flex flex-wrap items-center gap-x-8 gap-y-2 text-[14px] font-medium"
      }
    >
      {items.map((item) => {
        const current =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        let className = "transition-colors duration-200";
        if (isFooter) {
          className += " text-white/70 hover:text-white";
        } else if (isDark) {
          className += current
            ? " text-[#d4a017] border-b-2 border-[#d4a017] pb-[3px]"
            : " text-white/90 hover:text-[#d4a017]";
        } else if (isGlass) {
          className += current
            ? " text-[#b38616] border-b-2 border-[#d4a017] pb-[3px]"
            : " text-[#1c242c] hover:text-[#b38616]";
        } else {
          className += current
            ? " text-[var(--color-ink)]"
            : " text-[var(--color-muted)] hover:text-[var(--color-ink)]";
        }

        return (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className={className}
              aria-current={current ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
