import type { Metadata } from "next";
import { OrbitCatalogPage } from "@/components/orbit/catalog-page";
import { ORBIT_SOLUTIONS } from "@/lib/orbit/catalog";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/services", {
    title: "Solutions",
    description: "Web development, ecommerce, SEO, ads, and automation from Global Orbit Nepal.",
  });
}

export default function ServicesPage() {
  return (
    <OrbitCatalogPage
      eyebrow="Solutions"
      title="Complete digital solutions for your business"
      lede="From websites to Google rankings — one studio across Nepal, India, and the USA."
      items={ORBIT_SOLUTIONS}
    />
  );
}
