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
          home ? "bg-transparent" : "border-b border-white/12 bg-[#07070b]/88 backdrop-blur-2xl"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 sm:gap-5 sm:px-8 lg:px-12 ${
            home ? "h-[4.75rem] sm:h-[5.25rem]" : "h-16 sm:h-[72px] lg:h-[82px]"
          }`}
        >
          <BrandLogo priority variant={home ? "hero" : "default"} />
          <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 justify-center lg:flex">
            <div className="orbit-studio-nav inline-flex max-w-full items-center overflow-x-auto rounded-full px-2 py-1.5">
              <NavLinks items={items} variant={home ? "headerReference" : "headerPremium"} />
            </div>
          </nav>
          <Link
            href="/contact"
            className="orbit-studio-nav ml-auto hidden h-11 items-center rounded-full px-6 text-[14px] font-semibold text-white hover:bg-white/10 lg:inline-flex"
          >
            Contact Us
          </Link>
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <Link
              href="/contact"
              className="inline-flex h-9 items-center rounded-full bg-white px-3.5 text-[12px] font-bold text-[#0b0b10] sm:h-10 sm:px-4 sm:text-[13px]"
            >
              Contact
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
            className="border-t border-white/10 bg-[#07070b]/98 px-4 py-4 backdrop-blur-xl lg:hidden"
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
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-[#0b0b10]"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
