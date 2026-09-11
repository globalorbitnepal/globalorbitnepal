import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { IconMail, IconSearch } from "@/components/home/hero-icons";
import { NavLinks } from "@/components/layout/nav-links";
import { Container } from "@/components/ui/container";
import { BRAND_CONTACT } from "@/lib/home-content";
import type { FallbackNavItem } from "@/lib/site";

type SiteHeaderProps = {
  companyName: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
};

export function SiteHeader({ items, email, phone }: SiteHeaderProps) {
  const displayPhone = phone || BRAND_CONTACT.phone;
  const displayEmail = email || BRAND_CONTACT.email;

  return (
    <header className="sticky top-0 z-50 bg-[#050505] text-white">
      <div className="hidden border-b border-white/10 bg-[#080808] text-[11px] text-white/60 lg:block">
        <Container className="flex items-center justify-between gap-4 py-[7px]">
          <p className="tracking-[0.18em] uppercase">Ideas · Build · Grow Globally</p>
          <div className="flex items-center gap-5 tracking-normal">
            <a href={`tel:${displayPhone.replace(/\s/g, "")}`}>{displayPhone}</a>
            <a href={`mailto:${displayEmail}`}>{displayEmail}</a>
            <Link href="/contact" className="hover:text-[var(--color-gold)]">
              Client Portal
            </Link>
            <Link href="/contact" className="hover:text-[var(--color-gold)]">
              Support
            </Link>
          </div>
        </Container>
      </div>
      <Container className="flex flex-col gap-3 py-2 lg:flex-row lg:items-center lg:gap-5 lg:py-1.5">
        <BrandLogo priority />
        <nav aria-label="Primary" className="lg:flex-1">
          <NavLinks items={items} variant="headerDark" />
        </nav>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/news"
            aria-label="Search news"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <IconSearch />
          </Link>
          <a
            href={`mailto:${displayEmail}`}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-xs font-medium text-white/90 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <IconMail />
            Business Mail
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-9 items-center gap-1 rounded-full bg-[var(--color-gold)] px-4 text-xs font-semibold text-[#111] hover:bg-[var(--color-gold-light)]"
          >
            Get a Quote
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
