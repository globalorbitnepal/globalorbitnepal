"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FallbackNavItem } from "@/lib/site";

type NavLinksProps = {
  items: FallbackNavItem[];
  variant?: "header" | "headerDark" | "headerGlass" | "headerLuxury" | "headerMock" | "headerPremium" | "footer";
};

export function NavLinks({ items, variant = "header" }: NavLinksProps) {
  const pathname = usePathname();
  const isFooter = variant === "footer";
  const isDark = variant === "headerDark";
  const isGlass = variant === "headerGlass";
  const isLuxury = variant === "headerLuxury";
  const isMock = variant === "headerMock";
  const isPremium = variant === "headerPremium";

  return (
    <ul
      className={
        isFooter
          ? "mt-4 flex flex-col gap-2.5 text-sm"
          : isPremium
            ? "flex flex-wrap items-center gap-1 text-[14px] font-bold tracking-[-0.01em]"
            : "flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px] font-medium"
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
        } else if (isPremium) {
          className += current
            ? " rounded-full bg-white/12 px-4 py-2 text-[#f0c43a] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
            : " rounded-full px-4 py-2 text-white/90 hover:bg-white/8 hover:text-white";
        } else if (isDark) {
          className += current
            ? " text-[#d4a017] border-b-2 border-[#d4a017] pb-[3px]"
            : " text-white/90 hover:text-[#d4a017]";
        } else if (isMock) {
          className += current
            ? " text-[#f0c43a] border-b-2 border-[#f0c43a] pb-[3px]"
            : " text-white/92 hover:text-[#f0c43a]";
        } else if (isLuxury) {
          className += current
            ? " text-[#f0c43a]"
            : " text-white/78 hover:text-white";
        } else if (isGlass) {
          className += current
            ? " text-[#c4a04a] border-b-2 border-[#e1b325] pb-[4px]"
            : " text-[#2a3340] hover:text-[#c4a04a]";
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
