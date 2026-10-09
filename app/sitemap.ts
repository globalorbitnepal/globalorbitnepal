import type { MetadataRoute } from "next";
import { getPageSeoList } from "@/lib/page-seo-store";

const SITE = "https://arnav.theglobalorbit.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = await getPageSeoList();
  return pages
    .filter((page) => page.robotsIndex !== false && !page.path.startsWith("/admin"))
    .map((page) => ({
      url: `${SITE}${page.path === "/" ? "" : page.path}`,
      lastModified: now,
      changeFrequency: page.path === "/" ? "weekly" : "monthly",
      priority: page.path === "/" ? 1 : 0.7,
    }));
}
