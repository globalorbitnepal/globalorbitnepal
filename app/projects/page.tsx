import type { Metadata } from "next";
import { OrbitFlag } from "@/components/orbit/flags";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { ORBIT_PROJECTS } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Our Work",
    description: "25 websites, apps, ERP and SaaS deliveries from Global Orbit Nepal.",
    path: "/projects",
  });
}

export default function ProjectsPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="Our Work"
        title="25 live sites. One studio."
        lede="Hotels, treks, restaurants, ecommerce, hospitals, factories, billing SaaS, and partner portals — with the country flag for each market."
        headingId="projects-hero"
      />
      <section className="mx-auto max-w-[1280px] px-4 py-10 text-center text-sm text-white/65">
        {ORBIT_PROJECTS.length} published deliveries · websites, apps, ERP, billing, and SaaS backends
      </section>
      <section className="mx-auto grid max-w-[1280px] gap-5 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {ORBIT_PROJECTS.map((item, index) => (
          <article key={item.title} className="orbit-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/40">{String(index + 1).padStart(2, "0")}</span>
              <OrbitFlag code={item.country} name={item.country} size={28} />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#f0c43a]">{item.sector}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">{item.result}</p>
            <p className="mt-4 text-sm leading-6 text-white/55">
              Built with SEO-first templates, analytics, and a handover your team can run. Aftercare sits in
              the same Kathmandu company that designed and shipped it.
            </p>
          </article>
        ))}
      </section>
      <OrbitCtaBand />
    </>
  );
}
