"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { NavLinks } from "@/components/layout/nav-links";
import { ORBIT_BRAND } from "@/lib/orbit/brand";
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071533]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3 lg:h-[84px] lg:px-8">
        <BrandLogo priority />
        <nav aria-label="Main navigation" className="hidden flex-1 justify-center lg:flex">
          <NavLinks items={items} variant="headerDark" />
        </nav>
        <div className="ml-auto hidden items-center gap-4 xl:flex">
          <div className="text-right text-[11px] font-semibold leading-4 text-white/85">
            {ORBIT_BRAND.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className="block hover:text-[#f0c43a]">
                {phone.label}
              </a>
            ))}
          </div>
          <Link
            href="/contact"
            className="orbit-btn-gold inline-flex h-10 items-center rounded-full px-5 text-[13px] font-semibold"
          >
            Get Started
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Open menu</span>
          <span aria-hidden="true" className="text-lg">
            ☰
          </span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-[#071533] px-4 py-4 lg:hidden">
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
            className="orbit-btn-gold mt-4 inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      ) : null}
    </header>
  );
}
