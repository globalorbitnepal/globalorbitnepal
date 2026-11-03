import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { ORBIT_PACKAGES } from "@/lib/orbit/catalog";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/packages", {
    title: "Website & SEO Packages Nepal · Transparent Pricing",
    description:
      "Starter to enterprise website packages and SEO retainers in NPR — clear scope, mobile-first builds, and search foundations.",
  });
}

const INCLUDED = [
  "Mobile-first design at real breakpoints",
  "Technical SEO: metadata, sitemap, schema, robots",
  "Contact form, WhatsApp, and call-to-action wiring",
  "Google Analytics and Search Console setup",
  "Speed and Core Web Vitals pass before launch",
  "Training call so you can edit content yourself",
];

const FAQ = [
  {
    q: "What do the prices actually include?",
    a: "Each package covers design, build, technical SEO, and launch. Content writing, photography, paid ads, and ongoing SEO retainers are quoted separately so you only pay for what you need.",
  },
  {
    q: "Can I start small and upgrade later?",
    a: "Yes. Starter sites are built on the same stack as enterprise builds, so pages, features, and integrations can be added without a rebuild.",
  },
  {
    q: "How long until the site is live?",
    a: "Starter and professional sites typically go live in 2–4 weeks from approved content. Enterprise and custom builds run longer with a written timeline.",
  },
  {
    q: "Is SEO included or separate?",
    a: "Technical SEO ships with every build. Ongoing SEO — content, local listings, link building, and Google Ads — is an optional monthly retainer.",
  },
];

export default function PackagesPage() {
  return (
    <div className="orbit-premium-page min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <OrbitPageHero
        eyebrow="Packages"
        title="Clear starting prices"
        lede="Landing pages from NPR 15,000. Business sites NPR 25,000–80,000. Custom ecommerce and ERP from NPR 1,00,000+."
        headingId="packages-hero"
      />
      <section className="mx-auto grid max-w-[1280px] gap-5 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {ORBIT_PACKAGES.map((item) => (
          <Link key={item.slug} href={item.href} className="orbit-card rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm font-semibold text-[#f0c43a]">{item.price}</p>
            <p className="mt-2 text-sm text-white/65">{item.summary}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-[min(1120px,94vw)] px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Included in every package</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-7 text-white/70">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[min(1120px,94vw)] px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Packages FAQ</h2>
        <div className="mt-6 space-y-5">
          {FAQ.map((item) => (
            <article key={item.q} className="orbit-card rounded-2xl p-5">
              <h3 className="text-base font-semibold text-white">{item.q}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.a}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[15px] leading-7 text-white/65">
          Not sure which fits?{" "}
          <Link href="/contact" className="text-[#f0c43a] underline-offset-4 hover:underline">
            Book a free consultation
          </Link>{" "}
          and we will recommend the smallest package that does the job.
        </p>
      </section>

      <OrbitCtaBand />
    </div>
  );
}
