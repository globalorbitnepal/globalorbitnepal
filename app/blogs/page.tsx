import type { Metadata } from "next";
import { OrbitCatalogPage } from "@/components/orbit/catalog-page";
import { applyPageSeo } from "@/lib/apply-page-seo";
import { getPublishedPosts } from "@/lib/blog-store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/blogs", {
    title: "Blog · SEO, Web Development & Digital Marketing Nepal",
    description:
      "Guides on websites, SEO, ads, and software from Global Orbit — practical notes for Nepali businesses growing online.",
  });
}

export default async function BlogsPage() {
  const posts = await getPublishedPosts();
  return (
    <OrbitCatalogPage
      eyebrow="Blog"
      title="Notes from the studio"
      lede="Practical writing on ranking, performance, and stacks for Nepali businesses."
      items={posts.map((item) => ({
        slug: item.slug,
        title: item.title,
        summary: item.excerpt || item.seoDescription,
        href: `/blog/${item.slug}`,
        image: item.featuredImage,
      }))}
    />
  );
}
