import type { Metadata } from "next";
import Link from "next/link";
import { OrbitCatalogPage } from "@/components/orbit/catalog-page";
import { NEPAL_KEYWORD_PAGES } from "@/lib/nepal-keyword-pages";
import { ORBIT_SOLUTIONS } from "@/lib/orbit/catalog";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/services", {
    title: "Digital Solutions Nepal · Web, SEO, Ads & Automation",
    description:
      "Website development, ecommerce, SEO, Google ranking, digital marketing, social ads, and AI automation — one Nepal studio.",
  });
}

export default function ServicesPage() {
  return (
    <>
      <OrbitCatalogPage
        eyebrow="Solutions"
        title="Complete digital solutions for your business"
        lede="From websites to Google rankings — one studio across Nepal, India, and the USA."
        items={ORBIT_SOLUTIONS}
      />
      <section className="mx-auto max-w-[min(1280px,96vw)] px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Hire Global Orbit in Nepal</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
          Dedicated pages for the searches Nepali businesses actually type — developer, designer, WordPress, React, ecommerce, SEO, and apps.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NEPAL_KEYWORD_PAGES.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="orbit-card block rounded-2xl p-4 text-sm font-semibold text-white">
                {page.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
