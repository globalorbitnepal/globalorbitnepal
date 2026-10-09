import type { MetadataRoute } from "next";
import { DEFAULT_PAGE_SEO } from "@/lib/page-seo-store";

const SITE = "https://arnav.theglobalorbit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return DEFAULT_PAGE_SEO.filter((page) => !page.path.startsWith("/admin")).map((page) => ({
    url: `${SITE}${page.path === "/" ? "" : page.path}`,
    lastModified: now,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
