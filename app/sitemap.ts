import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog-store";
import { collectSitemapPaths } from "@/lib/public-sitemap-urls";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arnav.theglobalorbit.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [paths, posts] = await Promise.all([collectSitemapPaths(), getPublishedPosts()]);
  const pageEntries = paths.map((entry) => ({
    url: `${SITE}${entry.path === "/" ? "" : entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
  const postEntries = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || now),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));
  const seen = new Set(pageEntries.map((e) => e.url));
  const merged = [...pageEntries];
  for (const post of postEntries) {
    if (!seen.has(post.url)) merged.push(post);
  }
  return merged;
}
