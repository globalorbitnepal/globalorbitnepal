import type { Metadata } from "next";
import { mergeSeoFallback } from "@/lib/seo-page-defaults";
import { getPageSeo } from "@/lib/page-seo-store";
import { DEFAULT_OG_IMAGE_PATH } from "@/lib/site-origin";
import { buildPageMetadata } from "@/lib/seo";

export async function applyPageSeo(
  pathname: string,
  fallback: { title: string; description: string; keywords?: string[] },
): Promise<Metadata> {
  const seo = await getPageSeo(pathname);
  const base = mergeSeoFallback(pathname, fallback);
  const title = seo?.seoTitle?.trim() || base.title;
  const description = seo?.seoDescription?.trim() || base.description;
  const keywords = seo?.keywords
    ? seo.keywords.split(",").map((item) => item.trim()).filter(Boolean)
    : base.keywords;
  const focusKeyword = seo?.focusKeyword?.trim() || base.focusKeyword;
  const robotsIndex =
    seo?.robotsIndex !== undefined && seo?.robotsIndex !== null
      ? seo.robotsIndex
      : pathname === "/demo"
        ? false
        : true;
  const meta = buildPageMetadata({
    title,
    description,
    path: pathname,
    keywords,
    canonical: seo?.canonical,
    robotsIndex,
    ogTitle: seo?.ogTitle,
    ogDescription: seo?.ogDescription,
    ogImage: seo?.ogImage?.trim() || DEFAULT_OG_IMAGE_PATH,
  });
  if (focusKeyword || seo?.tags?.trim()) {
    return {
      ...meta,
      other: {
        ...(focusKeyword ? { "focus-keyword": focusKeyword } : {}),
        ...(seo?.tags ? { tags: seo.tags } : {}),
      },
    };
  }
  return meta;
}
