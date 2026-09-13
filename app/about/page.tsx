import type { Metadata } from "next";
import { OrbitCountryFlags } from "@/components/orbit/flags";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About Us",
    description:
      "Global Orbit is a Nepal-based website, app, ERP, SaaS and SEO company in Kathmandu.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="About Us"
        title="Built in Nepal. Accountable in 25 countries."
        lede="Global Orbit Pvt Ltd is an independent technology firm in Kathmandu. We build websites, custom apps, ERP, web-based billing, SaaS products, SaaS management backends, and SEO programmes."
        headingId="about-hero"
      />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-[15px] leading-8 text-white/75">
        <p>
          The name is literal: a local centre of gravity, and a working radius that is global. Engineering,
          conversation, and aftercare sit in the same company. We do not outsource the thinking.
        </p>
        <h2 className="text-2xl font-semibold text-white">What the studio sells</h2>
        <p>
          Business and hospitality websites. Custom apps for staff and customers. ERP for manufacturing and
          warehouses. Billing and POS. Multi-tenant SaaS and the admin layer that runs it. Search work that
          starts with Core Web Vitals and honest titles — not rented rankings.
        </p>
        <h2 className="text-2xl font-semibold text-white">How we behave</h2>
        <p>
          Written scopes. Named owners. Production that a new staff member can understand in one sitting.
          If we are the wrong firm for a brief, we say so in the first conversation.
        </p>
      </section>
      <OrbitCountryFlags />
      <OrbitCtaBand />
    </>
  );
}
