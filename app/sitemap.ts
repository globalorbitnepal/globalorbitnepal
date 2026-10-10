import type { MetadataRoute } from "next";
import { collectSitemapPaths } from "@/lib/public-sitemap-urls";
import { absoluteUrl } from "@/lib/site-origin";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = await collectSitemapPaths();
  const seen = new Set<string>();

  const entries: MetadataRoute.Sitemap = [];
  for (const entry of paths) {
    const url = absoluteUrl(entry.path);
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
    });
  }

  return entries;
}
