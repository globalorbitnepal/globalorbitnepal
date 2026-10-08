import Link from "next/link";
import { PwaInstall } from "@/components/admin/pwa-install";
import { BrandLogo } from "@/components/brand/brand-logo";
import {
  FooterInstallIcon,
  FooterMailIcon,
  FooterWebmailIcon,
  FooterWhatsAppIcon,
} from "@/components/layout/footer-action-icons";
import { FooterConnectBar } from "@/components/layout/footer-connect-bar";
import {
  FooterExploreIcon,
  FooterServiceIcon,
  FooterStatIcon,
} from "@/components/layout/footer-icons";
import { OrbitFlag } from "@/components/orbit/flags";
import {
  ORBIT_BRAND,
  ORBIT_FOOTER_LEGAL,
  ORBIT_FOOTER_QUICK,
  ORBIT_FOOTER_SERVICES,
  ORBIT_FOOTER_STATS,
} from "@/lib/orbit/brand";
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
      <div className="orbit-footer-scene" aria-hidden="true">
        <div className="orbit-footer-scene-mountains" />
        <div className="orbit-footer-scene-glow" />
      </div>

      <div className="orbit-footer-accent" aria-hidden="true" />

      <div className="orbit-footer-shell">
        <div className="orbit-footer-grid">
          <div className="orbit-footer-brand">
            <BrandLogo variant="footer" />
            <p className="orbit-footer-tagline">
              World-class websites, apps, ERP, billing, and SEO — engineered in Nepal, India, and the United States.
            </p>
            <div className="orbit-footer-stats">
              {ORBIT_FOOTER_STATS.map((stat) => (
                <div key={stat.label} className="orbit-footer-stat">
                  <FooterStatIcon kind={stat.icon} />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="orbit-footer-col">
            <h4 className="orbit-footer-heading">Explore</h4>
            <ul className="orbit-footer-links orbit-footer-links-rich">
              {ORBIT_FOOTER_QUICK.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <FooterExploreIcon id={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="orbit-footer-col">
            <h4 className="orbit-footer-heading">Services</h4>
            <ul className="orbit-footer-links orbit-footer-links-rich">
              {ORBIT_FOOTER_SERVICES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <FooterServiceIcon id={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="orbit-footer-col orbit-footer-col-offices">
            <h4 className="orbit-footer-heading">Sales offices</h4>
            <ul className="orbit-footer-offices">
              {ORBIT_BRAND.salesOffices.map((office) => (
                <li key={office.code}>
                  <a href={office.phoneHref} className="orbit-footer-office-card">
                    <span className="orbit-footer-office-flag">
                      <OrbitFlag code={office.code} name={office.country} size={34} rounded="full" />
                    </span>
                    <span className="orbit-footer-office-body">
                      <span className="orbit-footer-office-country">{office.country}</span>
                      <span className="orbit-footer-office-line">{office.phone}</span>
                      <span className="orbit-footer-office-line is-muted">{office.email}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FooterConnectBar />
      </div>

      <div className="orbit-footer-bottom">
        <div className="orbit-footer-bottom-inner">
          <p className="orbit-footer-copy">
            © {year} {companyName}. All rights reserved.
          </p>

          <nav className="orbit-footer-legal" aria-label="Legal">
            {ORBIT_FOOTER_LEGAL.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="orbit-footer-bottom-actions">
            <div className="orbit-footer-bottom-links">
              <a href={`mailto:${ORBIT_BRAND.email}`} className="orbit-footer-chip orbit-footer-chip-premium">
                <FooterMailIcon />
                <span className="orbit-footer-chip-label">{ORBIT_BRAND.email}</span>
              </a>
              <a
                href={ORBIT_BRAND.webmail}
                target="_blank"
                rel="noreferrer"
                className="orbit-footer-chip orbit-footer-chip-premium"
              >
                <FooterWebmailIcon />
                <span className="orbit-footer-chip-label">Webmail</span>
              </a>
              <a
                href={ORBIT_BRAND.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="orbit-footer-chip orbit-footer-chip-premium is-whatsapp"
              >
                <FooterWhatsAppIcon />
                <span className="orbit-footer-chip-label">WhatsApp</span>
              </a>
              <PwaInstall className="orbit-footer-chip orbit-footer-chip-premium" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
