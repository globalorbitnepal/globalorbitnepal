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
      <section className="mx-auto max-w-3xl px-4 py-16 text-[15px] leading-8 text-white/75">
        <p>
          Global Orbit Pvt Ltd delivers this work from Kathmandu for operators in Nepal and 15+ countries.
          We combine website development, custom software, ERP, and SEO so the public site and the back
          office stay in one accountable team.
        </p>
        <p className="mt-6">
          {summary} Typical engagements start with a free consultation, a written scope, and a timeline
          you can share with finance. After launch we stay for maintenance, ranking work, and product
          iteration.
        </p>
        <p className="mt-6">
          Talk to us with a short brief: what you run, who the customer is, and when you need to be live.
        </p>
        <Link href="/contact" className="orbit-btn-gold mt-8 inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
          Get Free Consultation
        </Link>
      </section>
      <OrbitCtaBand />
    </>
  );
}
