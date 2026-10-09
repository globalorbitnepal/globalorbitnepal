import type { Metadata } from "next";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/studio", {
    title: "Studio",
    description: "UI/UX and brand design from Global Orbit.",
  });
}

export default function StudioPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="Studio"
        title="Premium Figma, then production"
        lede="Brand identities and interfaces that convert — handed to the same engineers who ship."
        headingId="studio-hero"
      />
      <OrbitCtaBand />
    </>
  );
}
