import type { Metadata } from "next";
import { OrbitCatalogPage } from "@/components/orbit/catalog-page";
import { ORBIT_CAREERS } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Careers",
    description: "Join Global Orbit in Kathmandu.",
    path: "/careers",
  });
}

export default function CareersPage() {
  return (
    <OrbitCatalogPage
      eyebrow="Careers"
      title="Work from Kathmandu, ship globally"
      lede="Engineering, design, and SEO roles in one studio."
      items={ORBIT_CAREERS.map((item) => ({
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        href: `/careers/${item.slug}`,
      }))}
    />
  );
}
