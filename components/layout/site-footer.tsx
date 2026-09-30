import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { ORBIT_BRAND, ORBIT_FOOTER_QUICK, ORBIT_FOOTER_SERVICES } from "@/lib/orbit/brand";
import type { FallbackNavItem } from "@/lib/site";

type SiteFooterProps = {
  companyName: string;
  tagline: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
  address?: string;
};

export function SiteFooter({ companyName }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="orbit-site-footer relative isolate mt-auto overflow-hidden text-white">
      <div className="orbit-site-footer-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="orbit-site-footer-grid-wrap relative z-[1]">
        <div className="orbit-site-footer-grid mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="orbit-site-footer-brand lg:col-span-4">
            <div className="orbit-site-footer-brand-panel">
              <BrandLogo />
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
                Websites, apps, ERP, billing, SaaS, and SEO — engineered in Nepal, India, and the United States.
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f0c43a]">
                {ORBIT_BRAND.address}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="orbit-site-footer-heading">Quick Links</h4>
            <ul className="orbit-site-footer-links mt-5 space-y-2.5">
              {ORBIT_FOOTER_QUICK.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="orbit-site-footer-heading">Services</h4>
            <ul className="orbit-site-footer-links mt-5 space-y-2.5">
              {ORBIT_FOOTER_SERVICES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="orbit-site-footer-heading">Sales offices</h4>
            <ul className="orbit-site-footer-offices mt-5 space-y-4">
              {ORBIT_BRAND.salesOffices.map((office) => (
                <li key={office.code} className="orbit-site-footer-office">
                  <p className="orbit-site-footer-office-country">{office.country}</p>
                  <a href={office.phoneHref} className="orbit-site-footer-office-line">
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="orbit-site-footer-office-line">
                    {office.email}
                  </a>
                </li>
              ))}
            </ul>
            <div className="orbit-site-footer-social mt-6 flex flex-wrap gap-2">
              {ORBIT_BRAND.social.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="orbit-site-footer-base relative z-[1]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:text-left lg:px-8">
          <p className="text-xs text-white/42">
            © {year} {companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
            <a href={`mailto:${ORBIT_BRAND.email}`} className="hover:text-[#f0c43a]">
              {ORBIT_BRAND.email}
            </a>
            <a href={ORBIT_BRAND.webmail} target="_blank" rel="noreferrer" className="hover:text-[#f0c43a]">
              Business mail
            </a>
            <a href={ORBIT_BRAND.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#f0c43a]">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
