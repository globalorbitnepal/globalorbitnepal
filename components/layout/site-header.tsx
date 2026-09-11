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

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.8h3.2l1.2 3.2-1.8 1.8a12.5 12.5 0 0 0 6.1 6.1l1.8-1.8 3.2 1.2v3.2c0 .9-.7 1.7-1.6 1.8C10.2 20.1 3.9 13.8 2.7 5.4 2.6 4.5 3.4 3.8 4.3 3.8H6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader({ items, email, phone }: SiteHeaderProps) {
  const displayPhone = phone || BRAND_CONTACT.phone;
  const displayEmail = email || BRAND_CONTACT.email;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4dac8]/80 bg-[#fbf8f1]/72 text-[#141c24] shadow-[0_10px_40px_rgba(40,30,16,0.06)] backdrop-blur-2xl">
      <div className="hidden border-b border-[#e4dac8]/70 lg:block">
        <div className="mx-auto flex h-8 max-w-[1600px] items-center justify-between px-8 text-[11px] font-medium text-[#5c564c]">
          <p className="tracking-[0.22em] uppercase">Ideas · Build · Grow Globally</p>
          <div className="flex items-center gap-5">
            <a className="inline-flex items-center gap-1.5" href={`tel:${displayPhone.replace(/\s/g, "")}`}>
              <PhoneIcon />
              {displayPhone}
            </a>
            <a className="inline-flex items-center gap-1.5" href={`mailto:${displayEmail}`}>
              <IconMail className="h-3.5 w-3.5" />
              {displayEmail}
            </a>
            <Link href="/contact">Client Portal</Link>
            <Link href="/contact">Support</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-2 sm:px-8 lg:h-[84px] lg:flex-row lg:items-center lg:gap-8 lg:py-0">
        <BrandLogo priority />
        <nav aria-label="Primary" className="lg:flex-1">
          <NavLinks items={items} variant="headerGlass" />
        </nav>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={BRAND_CONTACT.webmail}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#d7ccb8] bg-white/45 px-4 text-[12px] font-semibold backdrop-blur-md"
          >
            <IconMail className="h-4 w-4" />
            Business Mail
          </a>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#d4a017] px-5 text-[12px] font-semibold text-[#1a1408] shadow-[0_8px_20px_rgba(180,140,20,0.2)]"
          >
            Get a Quote
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
