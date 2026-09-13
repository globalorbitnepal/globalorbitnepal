import type { Metadata } from "next";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Demo",
    description: "Request a live demo of Global Orbit software products.",
    path: "/demo",
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
