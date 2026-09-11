import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { IconGlobe, IconMail } from "@/components/home/hero-icons";
import { NavLinks } from "@/components/layout/nav-links";
import { BRAND_CONTACT } from "@/lib/home-content";
import type { FallbackNavItem } from "@/lib/site";

type SiteHeaderProps = {
  companyName: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
};

export function SiteHeader({ items }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/55 text-[#171c24] shadow-[0_8px_28px_rgba(36,28,14,0.05)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-3 sm:px-8 lg:h-[84px] lg:flex-row lg:items-center lg:gap-8 lg:py-0">
        <BrandLogo priority />
        <nav aria-label="Primary" className="lg:flex-1 lg:flex lg:justify-center">
          <NavLinks items={items} variant="headerGlass" />
        </nav>
        <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
          <a
            href={BRAND_CONTACT.webmail}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 text-[12px] font-semibold backdrop-blur-xl"
          >
            <IconMail className="h-4 w-4" />
            Business Mail
          </a>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#e1b325] px-5 text-[13px] font-semibold text-[#1a1408] shadow-[0_8px_18px_rgba(180,140,20,0.22)]"
          >
            Get a Quote
            <span aria-hidden="true">→</span>
          </Link>
          <p className="hidden items-center gap-2 pl-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-[#5d574c] xl:flex">
            <IconGlobe className="h-8 w-8 text-[#c4a04a]" />
            <span>
              Global Solutions
              <span className="mt-0.5 block font-medium tracking-[0.08em]">For a Better Tomorrow</span>
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
