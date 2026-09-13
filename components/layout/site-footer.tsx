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

export function SiteFooter({ companyName, address }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#041028] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
            Websites, apps, ERP, billing, SaaS, and SEO. Offices in Nepal, India, and the United States.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#f0c43a]">
            {ORBIT_BRAND.address}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {ORBIT_FOOTER_QUICK.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#f0c43a]">
                  › {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {ORBIT_FOOTER_SERVICES.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#f0c43a]">
                  › {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact Us</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {ORBIT_BRAND.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="hover:text-[#f0c43a]">
                  {phone.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${ORBIT_BRAND.email}`} className="hover:text-[#f0c43a]">
                {ORBIT_BRAND.email}
              </a>
            </li>
            <li>
              <a href={ORBIT_BRAND.webmail} target="_blank" rel="noreferrer" className="hover:text-[#f0c43a]">
                Business Mail
              </a>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
            {ORBIT_BRAND.social.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {year} {companyName}. All rights reserved.
      </div>
    </footer>
  );
}
