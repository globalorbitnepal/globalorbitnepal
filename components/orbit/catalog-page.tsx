import type { CSSProperties } from "react";
import Link from "next/link";
import { OrbitPremiumReveal } from "@/components/orbit/orbit-premium-reveal";
import {
  OrbitCtaBand,
  OrbitPageHero,
  OrbitPremiumPillars,
  OrbitPremiumTrustStrip,
} from "@/components/orbit/page-hero";
import type { OrbitCard } from "@/lib/orbit/catalog";

export function OrbitCatalogPage({
  eyebrow,
  title,
  lede,
  items,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  items: OrbitCard[];
}) {
  return (
    <div className="orbit-premium-page min-h-screen">
      <OrbitPageHero eyebrow={eyebrow} title={title} lede={lede} headingId={`${eyebrow}-hero`} />
      <OrbitPremiumTrustStrip />
      <section className="orbit-premium-catalog px-4 py-[clamp(2.5rem,7vh,4.5rem)] sm:px-6">
        <div className="mx-auto max-w-[min(1280px,96vw)]">
          <div className="orbit-premium-catalog-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <OrbitPremiumReveal key={`${item.slug}-${item.href}`} delayMs={(index % 6) * 55}>
                <Link
                  href={item.href}
                  className="orbit-premium-catalog-card orbit-card group flex h-full flex-col rounded-2xl p-6"
                  style={{ "--card-i": index } as CSSProperties}
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt=""
                      className="mb-4 h-36 w-full max-w-full rounded-xl object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-white/65">{item.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#f0c43a] transition group-hover:translate-x-0.5">
                    Learn more →
                  </span>
                </Link>
              </OrbitPremiumReveal>
            ))}
          </div>
        </div>
      </section>
      <OrbitPremiumPillars />
      <OrbitCtaBand />
    </div>
  );
}

export function OrbitArticlePage({
  eyebrow,
  title,
  summary,
  body,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  body?: string;
}) {
  const paragraphs = (body?.trim() || summary).split(/\n{2,}/).filter(Boolean);
  return (
    <div className="orbit-premium-page min-h-screen">
      <OrbitPageHero eyebrow={eyebrow} title={title} lede={summary} headingId="article-hero" />
      <OrbitPremiumTrustStrip />
      <section className="orbit-premium-article mx-auto max-w-3xl space-y-6 px-4 py-[clamp(2.5rem,7vh,4rem)] text-[15px] leading-8 text-white/75 sm:px-6">
        {paragraphs.map((paragraph) => (
          <OrbitPremiumReveal key={paragraph.slice(0, 24)}>
            <p>{paragraph}</p>
          </OrbitPremiumReveal>
        ))}
        <OrbitPremiumReveal>
          <h2 className="pt-4 text-2xl font-semibold text-white">What we actually ship</h2>
        </OrbitPremiumReveal>
        <ul className="list-disc space-y-2 pl-5">
          <li>Business, hotel, trek, restaurant, and ecommerce websites with SEO-first structure</li>
          <li>Custom web and mobile-ready apps for bookings, staff, and customer portals</li>
          <li>ERP, POS, warehouse, and billing systems that match how the floor already works</li>
          <li>SaaS products and SaaS management backends: tenants, roles, meters, invoices</li>
          <li>Technical SEO, local SEO, Google Ads, and social media marketing with clear reporting</li>
        </ul>
        <OrbitPremiumReveal>
          <h2 className="pt-4 text-2xl font-semibold text-white">How an engagement runs</h2>
          <p>
            Discussion, written scope, design, build, SEO pass, then launch support. You get a named person, a timeline finance
            can hold, and aftercare — not a silent handoff to an unnamed bench.
          </p>
          <p>
            Start with a free consultation. Bring what you run, who the customer is, and when you need to be live.
          </p>
          <Link
            href="/contact"
            className="orbit-btn-gold mt-4 inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold"
          >
            Get Free Consultation
          </Link>
        </OrbitPremiumReveal>
      </section>
      <OrbitPremiumPillars />
      <OrbitCtaBand />
    </div>
  );
}
