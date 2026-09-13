import type { Metadata } from "next";
import { OrbitCatalogPage } from "@/components/orbit/catalog-page";
import { ORBIT_BLOGS } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Blog",
    description: "SEO, Core Web Vitals, and tech-stack notes from Global Orbit.",
    path: "/blogs",
  });
}

export default function BlogsPage() {
  return (
    <OrbitCatalogPage
      eyebrow="Blog"
      title="Notes from the studio"
      lede="Practical writing on ranking, performance, and stacks for Nepali businesses."
      items={ORBIT_BLOGS.map((item) => ({
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        href: `/blog/${item.slug}`,
      }))}
    />
  );
}
