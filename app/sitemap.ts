import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog-store";
import { getPageSeoList } from "@/lib/page-seo-store";

const SITE = "https://arnav.theglobalorbit.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [pages, posts] = await Promise.all([getPageSeoList(), getPublishedPosts()]);
  const pageEntries = pages
    .filter((page) => page.robotsIndex !== false && !page.path.startsWith("/admin"))
    .map((page) => ({
      url: `${SITE}${page.path === "/" ? "" : page.path}`,
      lastModified: now,
      changeFrequency: (page.path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: page.path === "/" ? 1 : 0.7,
    }));
  const postEntries = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || now),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pageEntries, ...postEntries];
}
