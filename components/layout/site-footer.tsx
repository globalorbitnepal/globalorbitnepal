import Link from "next/link";
import { NavLinks } from "@/components/layout/nav-links";
import { SERVICE_CATALOG } from "@/lib/content/services";
import { Container } from "@/components/ui/container";
import type { FallbackNavItem } from "@/lib/site";

type SiteFooterProps = {
  companyName: string;
  tagline: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
  address?: string;
};

export function SiteFooter({
  companyName,
  tagline,
  items,
  email,
  phone,
  address,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-line)] bg-[var(--color-hero)] text-[var(--color-hero-ink)]">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            {companyName}
          </p>
          {tagline ? (
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">{tagline}</p>
          ) : null}
          <p className="mt-6 text-sm text-white/45">{address || "Kathmandu, Nepal"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Explore</p>
          <nav aria-label="Footer">
            <NavLinks items={items} variant="footer" />
          </nav>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Services</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {SERVICE_CATALOG.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Contact</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            <li>
              <Link className="transition-colors hover:text-white" href="/contact">
                Contact form
              </Link>
            </li>
            {email ? (
              <li>
                <a className="transition-colors hover:text-white" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            ) : (
              <li>Email to be published</li>
            )}
            {phone ? <li>{phone}</li> : null}
            <li>Weekdays, Nepal Time</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {companyName}. All rights reserved.
          </p>
          <p>An independent technology company.</p>
        </Container>
      </div>
    </footer>
  );
}
