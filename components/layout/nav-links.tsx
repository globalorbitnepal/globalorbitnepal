"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FallbackNavItem } from "@/lib/site";

type NavLinksProps = {
  items: FallbackNavItem[];
  variant?: "header" | "headerDark" | "footer";
};

export function NavLinks({ items, variant = "header" }: NavLinksProps) {
  const pathname = usePathname();
  const isFooter = variant === "footer";
  const isDark = variant === "headerDark" || isFooter;

  return (
    <ul
      className={
        isFooter
          ? "mt-4 flex flex-col gap-2.5 text-sm"
          : "flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] sm:gap-x-6 sm:text-sm"
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
            ? " text-[var(--color-gold)] border-b-2 border-[var(--color-gold)] pb-0.5"
            : " text-white/80 hover:text-[var(--color-gold)]";
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
