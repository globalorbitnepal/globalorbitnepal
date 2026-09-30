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
      <div className="orbit-footer-accent" aria-hidden="true" />

      <div className="orbit-footer-shell">
        <div className="orbit-footer-main">
          <div className="orbit-footer-brand">
            <BrandLogo variant="footer" />
            <p className="orbit-footer-tagline">
              World-class websites, apps, ERP, billing, and SEO — engineered in Nepal, India, and the United States.
            </p>
            <p className="orbit-footer-markets">{ORBIT_BRAND.address}</p>
          </div>

          <div className="orbit-footer-columns">
            <div className="orbit-footer-col">
              <h4 className="orbit-footer-heading">Explore</h4>
              <ul className="orbit-footer-links">
                {ORBIT_FOOTER_QUICK.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="orbit-footer-col">
              <h4 className="orbit-footer-heading">Services</h4>
              <ul className="orbit-footer-links">
                {ORBIT_FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="orbit-footer-col orbit-footer-col-offices">
              <h4 className="orbit-footer-heading">Sales offices</h4>
              <ul className="orbit-footer-offices">
                {ORBIT_BRAND.salesOffices.map((office) => (
                  <li key={office.code} className="orbit-footer-office-card">
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

        <div className="orbit-footer-connect">
          <div className="orbit-footer-connect-copy">
            <h4 className="orbit-footer-connect-title">Connect with us</h4>
            <p className="orbit-footer-connect-lede">
              Follow for product launches, SEO insights, and stories from client projects worldwide.
            </p>
          </div>
          <OrbitFooterSocial />
        </div>
      </div>

      <div className="orbit-footer-bottom">
        <div className="orbit-footer-bottom-inner">
          <p className="orbit-footer-copy">
            © {year} {companyName}. All rights reserved.
          </p>
          <div className="orbit-footer-bottom-links">
            <a href={`mailto:${ORBIT_BRAND.email}`}>{ORBIT_BRAND.email}</a>
            <a href={ORBIT_BRAND.webmail} target="_blank" rel="noreferrer">
              Business mail
            </a>
            <a href={ORBIT_BRAND.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
