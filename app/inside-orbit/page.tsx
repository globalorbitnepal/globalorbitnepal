import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/inside-orbit", {
    title: "Inside Orbit · How We Ship Websites & Software",
    description:
      "Process, tools, and standards behind Global Orbit deliveries — from discovery to SEO launch and aftercare.",
  });
}

const STAGES = [
  {
    name: "1 · Discovery",
    body: "We start with what you already run: current site, enquiry flow, staff who answer the phone, and the search terms customers use. Output is a written scope with pages, features, and a timeline.",
  },
  {
    name: "2 · Structure",
    body: "Site architecture and SEO keyword mapping come before design. URLs, headings, internal links, and metadata are planned so the site can rank instead of needing a rebuild later.",
  },
  {
    name: "3 · Design",
    body: "Premium UI at desktop and mobile breakpoints in Figma. You review every template before a line of production code is written.",
  },
  {
    name: "4 · Build",
    body: "Next.js, TypeScript, and PostgreSQL for custom work; WordPress or Laravel where it fits better. Staging URL from day one so you can watch progress.",
  },
  {
    name: "5 · SEO pass",
    body: "Schema markup, sitemap, robots, Core Web Vitals, image compression, redirects, and Search Console verification — shipped with the build, not sold separately.",
  },
  {
    name: "6 · Launch & aftercare",
    body: "DNS cutover, SSL, monitoring, and a named contact for fixes. We stay available after go-live instead of handing off to an unnamed bench.",
  },
];

const STANDARDS = [
  "Mobile-first layouts tested on real mid-range Android devices common in Nepal",
  "Lighthouse and Core Web Vitals checks before every launch",
  "Structured data (Organization, Service, Breadcrumb, FAQ) on every public page",
  "Written scope and timeline finance can hold",
  "Staging environment you can review at any time",
  "Source code and assets handed over — no lock-in",
];

export default function InsideOrbitPage() {
  return (
    <div className="orbit-premium-page min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Inside Orbit", path: "/inside-orbit" },
        ]}
      />
      <OrbitPageHero
        eyebrow="Inside Orbit"
        title="How the studio actually runs"
        lede="Discussion, planning, design, development, SEO, then launch support — in that order."
        headingId="inside-hero"
      />

      <section className="mx-auto max-w-[min(1120px,94vw)] px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Six stages, no silent handoffs</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((item) => (
            <article key={item.name} className="orbit-card rounded-2xl p-6">
              <h3 className="text-base font-semibold text-[#f0c43a]">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[min(1120px,94vw)] px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">What every delivery includes</h2>
        <ul className="mt-6 space-y-3">
          {STANDARDS.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-7 text-white/70">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[15px] leading-7 text-white/65">
          See the work on{" "}
          <Link href="/projects" className="text-[#f0c43a] underline-offset-4 hover:underline">
            our projects page
          </Link>
          , compare{" "}
          <Link href="/packages" className="text-[#f0c43a] underline-offset-4 hover:underline">
            packages and pricing
          </Link>
          , or read about{" "}
          <Link href="/about" className="text-[#f0c43a] underline-offset-4 hover:underline">
            the team
          </Link>
          .
        </p>
      </section>

      <OrbitCtaBand />
    </div>
  );
}
