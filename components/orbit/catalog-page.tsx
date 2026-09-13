import Link from "next/link";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
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
    <>
      <OrbitPageHero eyebrow={eyebrow} title={title} lede={lede} headingId={`${eyebrow}-hero`} />
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.slug} href={item.href} className="orbit-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">{item.summary}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#f0c43a]">Learn more</span>
            </Link>
          ))}
        </div>
      </section>
      <OrbitCtaBand />
    </>
  );
}

export function OrbitArticlePage({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string;
  title: string;
  summary: string;
}) {
  return (
    <>
      <OrbitPageHero eyebrow={eyebrow} title={title} lede={summary} headingId="article-hero" />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-[15px] leading-8 text-white/75">
        <p>
          Global Orbit Pvt Ltd delivers this work from offices in Nepal, India, and the United States for
          operators in 25 countries. Public websites, custom apps, ERP, web-based billing, SaaS products,
          and SEO sit in one company so the marketing site and the back office do not drift apart.
        </p>
        <p>{summary}</p>
        <h2 className="pt-4 text-2xl font-semibold text-white">What we actually ship</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Business, hotel, trek, restaurant, and ecommerce websites with SEO-first structure</li>
          <li>Custom web and mobile-ready apps for bookings, staff, and customer portals</li>
          <li>ERP, POS, warehouse, and billing systems that match how the floor already works</li>
          <li>SaaS products and SaaS management backends: tenants, roles, meters, invoices</li>
          <li>Technical SEO, local SEO, and reporting you can read without a pitch deck</li>
        </ul>
        <h2 className="pt-4 text-2xl font-semibold text-white">How an engagement runs</h2>
        <p>
          Discussion, written scope, design, build, SEO pass, then launch support. You get a named person,
          a timeline finance can hold, and aftercare — not a silent handoff to an unnamed bench.
        </p>
        <p>
          Start with a free consultation. Bring what you run, who the customer is, and when you need to be live.
        </p>
        <Link href="/contact" className="orbit-btn-gold mt-4 inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
          Get Free Consultation
        </Link>
      </section>
      <OrbitCtaBand />
    </>
  );
}
