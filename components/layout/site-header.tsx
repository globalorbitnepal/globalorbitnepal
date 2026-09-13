"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        scrolled || open || !home ? "bg-[#06101f]/72 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[84px] max-w-[1400px] items-center gap-4 px-5 lg:px-10">
        <BrandLogo priority />
        <nav aria-label="Main navigation" className="hidden flex-1 justify-center lg:flex">
          <NavLinks items={items} variant="headerMock" />
        </nav>
        <Link
          href="/contact"
          className="ml-auto hidden h-11 items-center gap-2 rounded-full bg-[#f0c43a] px-6 text-[14px] font-semibold text-[#1a1408] lg:inline-flex"
        >
          Get Started
          <span aria-hidden="true">→</span>
        </Link>
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-[#06101f]/95 px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? "text-[#f0c43a]" : "text-white"}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#f0c43a] px-6 text-sm font-semibold text-[#1a1408]"
            onClick={() => setOpen(false)}
          >
            Get Started
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </header>
  );
}
