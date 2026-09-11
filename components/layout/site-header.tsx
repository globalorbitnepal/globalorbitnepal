import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { IconMail } from "@/components/home/hero-icons";
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
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/55 text-[#141c24] shadow-[0_8px_30px_rgba(40,30,16,0.06)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-2 sm:px-8 lg:h-[88px] lg:flex-row lg:items-center lg:gap-6 lg:py-0">
        <BrandLogo priority />
        <nav aria-label="Primary" className="lg:flex-1 lg:flex lg:justify-center">
          <NavLinks items={items} variant="headerGlass" />
        </nav>
        <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
          <p className="hidden text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b6458] xl:block">
            Global Solutions
            <span className="mt-0.5 block font-medium tracking-[0.08em]">For a Better Tomorrow</span>
          </p>
          <a
            href={BRAND_CONTACT.webmail}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#eadfcd] bg-white/50 px-4 text-[12px] font-semibold backdrop-blur-md"
          >
            <IconMail className="h-4 w-4" />
            Business Mail
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-[#d4a017] px-5 text-[13px] font-semibold text-[#1a1408] shadow-[0_8px_20px_rgba(180,140,20,0.22)]"
          >
            Get a Quote
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
