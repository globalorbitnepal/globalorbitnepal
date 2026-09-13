import type { Metadata } from "next";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Inside Orbit",
    description: "How Global Orbit works as a studio.",
    path: "/inside-orbit",
  });
}

export default function InsideOrbitPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="Inside Orbit"
        title="How the studio actually runs"
        lede="Discussion, planning, design, development, SEO, then launch support — in that order."
        headingId="inside-hero"
      />
      <OrbitCtaBand />
    </>
  );
}
