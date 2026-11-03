import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/studio", {
    title: "Design Studio Nepal · Premium Websites & Brand UI",
    description:
      "Ultra HD website design, motion, and brand systems from Kathmandu — built for conversion and search visibility.",
  });
}

const SERVICES = [
  {
    title: "Brand identity",
    body: "Logo systems, typography, colour, and usage rules documented so every future asset stays on brand. Delivered as a Figma library plus export-ready files.",
  },
  {
    title: "Website UI design",
    body: "Desktop and mobile screens for every template in your site — home, service pages, blog, contact, and form states. Designed at real breakpoints, not one canvas.",
  },
  {
    title: "Motion & interaction",
    body: "Scroll reveals, hover states, and micro-interactions specified with timing values so engineers build exactly what was designed.",
  },
  {
    title: "Design systems",
    body: "Component libraries with tokens for spacing, colour, and type. New pages ship faster and stay visually consistent as the site grows.",
  },
];

const PROCESS = [
  { step: "01", name: "Discovery", body: "We audit your current site, competitors, and the search terms your customers actually use in Nepal." },
  { step: "02", name: "Wireframe", body: "Structure and hierarchy first — where each section goes and what it must accomplish before any visual polish." },
  { step: "03", name: "Visual design", body: "Premium UI at desktop and mobile breakpoints, reviewed in Figma with your team before build." },
  { step: "04", name: "Handoff", body: "Specs, assets, and tokens go to the same engineers who ship the site — no separate agency in between." },
];

export default function StudioPage() {
  return (
    <div className="orbit-premium-page min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Studio", path: "/studio" },
        ]}
      />
      <OrbitPageHero
        eyebrow="Studio"
        title="Premium Figma, then production"
        lede="Brand identities and interfaces that convert — handed to the same engineers who ship."
        headingId="studio-hero"
      />

      <section className="mx-auto max-w-[min(1120px,94vw)] px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">What the studio delivers</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/65">
          Design work in Kathmandu for businesses across Nepal, India, and the United States. Every engagement ends with
          production-ready files, not just a mock-up.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((item) => (
            <article key={item.title} className="orbit-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[min(1120px,94vw)] px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">How a design project runs</h2>
        <ol className="mt-8 space-y-4">
          {PROCESS.map((item) => (
            <li key={item.step} className="orbit-card flex gap-5 rounded-2xl p-5">
              <span className="text-sm font-semibold text-[#f0c43a]">{item.step}</span>
              <div>
                <h3 className="text-base font-semibold text-white">{item.name}</h3>
                <p className="mt-1 text-sm leading-6 text-white/65">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[15px] leading-7 text-white/65">
          Need the build as well? Design flows straight into{" "}
          <Link href="/service/website-development-nepal" className="text-[#f0c43a] underline-offset-4 hover:underline">
            website development
          </Link>{" "}
          or{" "}
          <Link href="/orbit-software/web-apps" className="text-[#f0c43a] underline-offset-4 hover:underline">
            web app development
          </Link>
          . Pricing and timelines are on the{" "}
          <Link href="/packages" className="text-[#f0c43a] underline-offset-4 hover:underline">
            packages page
          </Link>
          .
        </p>
      </section>

      <OrbitCtaBand />
    </div>
  );
}
