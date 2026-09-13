import type { Metadata } from "next";
import { OrbitCatalogPage } from "@/components/orbit/catalog-page";
import { ORBIT_CAREERS } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Careers",
    description: "Join Global Orbit — studios in Nepal, India, and the United States.",
    path: "/careers",
  });
}

export default function CareersPage() {
  return (
    <OrbitCatalogPage
      eyebrow="Careers"
      title="Three offices. One engineering bar."
      lede="Engineering, design, and SEO roles across Nepal, India, and the United States."
      items={ORBIT_CAREERS.map((item) => ({
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        href: `/careers/${item.slug}`,
      }))}
    />
  );
}
