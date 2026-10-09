import type { Metadata } from "next";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/demo", {
    title: "Demo",
    description: "Request a live demo of Global Orbit software products.",
  });
}

export default function DemoPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="Demo"
        title="See the software in motion"
        lede="Book a walkthrough of billing, hotel, POS, CRM, or the SaaS suite."
        headingId="demo-hero"
      />
      <OrbitCtaBand />
    </>
  );
}
