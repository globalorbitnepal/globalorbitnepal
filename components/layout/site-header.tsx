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

  return (
    <header
      className={`pointer-events-none inset-x-0 top-0 z-50 text-white ${home ? "absolute" : "fixed"}`}
    >
      <div
        className={`pointer-events-auto w-full transition-all duration-300 ${
          home ? "bg-transparent" : "border-b border-white/12 bg-[#06101f]/82 backdrop-blur-2xl"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1720px] items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-8 lg:px-10 xl:px-12 ${
            home ? "h-[4.5rem] sm:h-[5rem] lg:h-[5.75rem]" : "h-16 sm:h-[72px] lg:h-[82px]"
          }`}
        >
          <BrandLogo priority variant={home ? "hero" : "default"} />
          <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 justify-center lg:flex">
            {home ? (
              <NavLinks items={items} variant="headerReference" />
            ) : (
              <div className="orbit-nav-glass inline-flex max-w-full items-center overflow-x-auto rounded-full px-1.5 py-1 xl:px-2 xl:py-1.5">
                <NavLinks items={items} variant="headerPremium" />
              </div>
            )}
          </nav>
          <Link
            href="/contact"
            className={`ml-auto hidden items-center gap-3 rounded-full bg-[#f0c43a] font-bold text-[#1a1408] shadow-[0_12px_32px_rgba(240,196,58,0.32)] transition-colors hover:bg-[#ffe38a] lg:inline-flex ${
              home ? "h-12 pl-7 pr-2 text-[15px]" : "h-11 gap-2 px-6 text-[14px]"
            }`}
          >
            Get Started
            {home ? (
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#12100a] text-[15px] text-[#f0c43a]"
                aria-hidden="true"
              >
                →
              </span>
            ) : (
              <span aria-hidden="true">→</span>
            )}
          </Link>
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <Link
              href="/contact"
              className="inline-flex h-9 items-center rounded-full bg-[#f0c43a] px-3.5 text-[12px] font-bold text-[#1a1408] sm:h-10 sm:px-4 sm:text-[13px]"
            >
              Get Started
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-md"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="text-lg leading-none">
                {open ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>
        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-white/10 bg-[#06101f]/98 px-4 py-4 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 text-[15px] font-semibold">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-3 py-3 ${
                      pathname === item.href ? "bg-white/8 text-[#f0c43a]" : "text-white/90"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f0c43a] px-6 text-sm font-bold text-[#1a1408]"
              onClick={() => setOpen(false)}
            >
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
