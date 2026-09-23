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
    <header className={`pointer-events-none inset-x-0 top-0 z-50 text-white ${home ? "relative" : "fixed"}`}>
      <div
        className={`pointer-events-auto mx-auto transition-all duration-300 ${
          home
            ? "max-w-none rounded-none border-b border-white/10 bg-[#06101f] px-0"
            : "mt-0 max-w-none rounded-none border-b border-white/12 bg-[#06101f]/82 px-0 backdrop-blur-2xl"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-2 px-4 sm:h-[78px] sm:gap-4 sm:px-5 lg:h-[82px] lg:px-8 xl:px-14">
          <BrandLogo priority />
          <nav
            aria-label="Main navigation"
            className="hidden flex-1 justify-center lg:flex"
          >
            <div className="orbit-nav-glass inline-flex items-center rounded-full px-2 py-1.5">
              <NavLinks items={items} variant="headerPremium" />
            </div>
          </nav>
          <Link
            href="/contact"
            className="ml-auto hidden h-11 items-center gap-2 rounded-full bg-[#f0c43a] px-6 text-[14px] font-bold text-[#1a1408] shadow-[0_10px_28px_rgba(240,196,58,0.28)] transition-colors hover:bg-[#ffe38a] lg:inline-flex"
          >
            Get Started
            <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-md lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-white/10 bg-[#06101f]/95 px-5 py-4 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 text-[15px] font-semibold">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-3 py-2.5 ${
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
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#f0c43a] px-6 text-sm font-bold text-[#1a1408]"
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
