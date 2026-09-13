import type { Metadata } from "next";
import { OrbitCatalogPage } from "@/components/orbit/catalog-page";
import { ORBIT_SOFTWARE } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "ERP Software",
    description: "Ready-to-deploy software products from Global Orbit Nepal.",
    path: "/orbit-software",
  });
}

export default function OrbitSoftwarePage() {
  return (
    <OrbitCatalogPage
      eyebrow="ERP Software"
      title="Enterprise software products"
      lede="Powerful, ready-to-deploy software solutions built for every industry."
      items={ORBIT_SOFTWARE}
    />
  );
}
