import type { Metadata } from "next";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About Us",
    description:
      "Global Orbit is a Nepal-based website and software development company in Kathmandu.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="About Us"
        title="Built in Nepal. Accountable anywhere."
        lede="Global Orbit Pvt Ltd is an independent technology firm in Kathmandu. We build websites, custom software, ERP systems, and SEO programmes for hotels, trek operators, restaurants, and growing brands."
        headingId="about-hero"
      />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-[15px] leading-8 text-white/75">
        <p>
          The name is literal: a local centre of gravity, and a working radius that is global. Engineering,
          conversation, and aftercare sit in the same company. We do not outsource the thinking.
        </p>
        <p>
          Typical work includes business websites, hotel and trekking sites, ecommerce, billing and POS,
          warehouse and manufacturing ERP, and search programmes aimed at Google Page 1 in Nepal.
        </p>
      </section>
      <OrbitCtaBand />
    </>
  );
}
