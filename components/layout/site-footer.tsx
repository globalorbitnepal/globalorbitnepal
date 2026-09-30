import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { OrbitFooterSocial } from "@/components/layout/footer-social";
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
    <footer className="orbit-footer mt-auto text-white">
      <div className="orbit-footer-top">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="lg:col-span-4">
            <BrandLogo />
            <p className="mt-5 max-w-md text-[15px] leading-7 text-white/58">
              World-class websites, apps, ERP, billing, and SEO — built in Nepal, India, and the United States for
              operators who care how things look and how they run.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f0c43a]/90">
              {ORBIT_BRAND.address}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="orbit-footer-heading">Explore</h4>
            <ul className="orbit-footer-links mt-5 space-y-2.5">
              {ORBIT_FOOTER_QUICK.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="orbit-footer-heading">Services</h4>
            <ul className="orbit-footer-links mt-5 space-y-2.5">
              {ORBIT_FOOTER_SERVICES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="orbit-footer-heading">Sales offices</h4>
            <ul className="mt-5 space-y-4">
              {ORBIT_BRAND.salesOffices.map((office) => (
                <li key={office.code} className="orbit-footer-office">
                  <p className="orbit-footer-office-country">{office.country}</p>
                  <a href={office.phoneHref} className="orbit-footer-office-line">
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="orbit-footer-office-line">
                    {office.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="orbit-footer-social-row">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-5 px-4 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">Connect</p>
            <p className="mt-1 text-sm text-white/62">Follow Global Orbit for launches, SEO insights, and client stories.</p>
          </div>
          <OrbitFooterSocial />
        </div>
      </div>

      <div className="orbit-footer-bottom">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:text-left lg:px-8">
          <p className="text-xs text-white/38">
            © {year} {companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/48">
            <a href={`mailto:${ORBIT_BRAND.email}`} className="hover:text-white">
              {ORBIT_BRAND.email}
            </a>
            <a href={ORBIT_BRAND.webmail} target="_blank" rel="noreferrer" className="hover:text-white">
              Business mail
            </a>
            <a href={ORBIT_BRAND.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
