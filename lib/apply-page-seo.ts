import type { Metadata } from "next";
import { getPageSeo } from "@/lib/page-seo-store";
import { buildPageMetadata } from "@/lib/seo";

export async function applyPageSeo(
  pathname: string,
  fallback: { title: string; description: string; keywords?: string[] },
): Promise<Metadata> {
  const seo = await getPageSeo(pathname);
  const title = seo?.seoTitle?.trim() || fallback.title;
  const description = seo?.seoDescription?.trim() || fallback.description;
  const keywords = seo?.keywords
    ? seo.keywords.split(",").map((item) => item.trim()).filter(Boolean)
    : fallback.keywords;
  const meta = buildPageMetadata({
    title,
    description,
    path: pathname,
    keywords,
    canonical: seo?.canonical,
    robotsIndex: seo?.robotsIndex,
    ogTitle: seo?.ogTitle,
    ogDescription: seo?.ogDescription,
    ogImage: seo?.ogImage,
  });
  if (seo?.focusKeyword?.trim() || seo?.tags?.trim()) {
    return {
      ...meta,
      other: {
        ...(seo.focusKeyword ? { "focus-keyword": seo.focusKeyword } : {}),
        ...(seo.tags ? { tags: seo.tags } : {}),
      },
    };
  }
  return meta;
}
