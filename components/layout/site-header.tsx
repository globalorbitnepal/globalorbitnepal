"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { NavLinks } from "@/components/layout/nav-links";
import type { FallbackNavItem } from "@/lib/site";

type SiteHeaderProps = {
  companyName: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
};

export function SiteHeader({ items }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  if (pathname.startsWith("/orbit")) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white">
      <div className="pointer-events-auto mx-auto max-w-[1440px] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
        <div className="orbit-header-glass flex min-h-[64px] items-center gap-3 rounded-full px-3 py-2 sm:min-h-[72px] sm:px-5 lg:min-h-[80px]">
          <BrandLogo priority variant={home ? "hero" : "default"} />
          <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 justify-center lg:flex">
            <NavLinks items={items} variant="headerStudio" />
          </nav>
          <div className="ml-auto flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true">{open ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
        {open ? (
          <div
            id="mobile-nav"
            className="orbit-header-glass mt-2 rounded-[28px] px-4 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1 text-[15px] font-semibold">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-3 py-3 ${
                      pathname === item.href ? "text-[#f0c43a]" : "text-white/90"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </header>
  );
}
