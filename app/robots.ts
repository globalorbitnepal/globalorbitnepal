import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-origin";

/**
 * robots.txt for production.
 *
 * Two rules that are easy to get wrong and cost real indexing:
 *
 * 1. robots.txt matching is prefix-based. `Disallow: /orbit` also blocks
 *    `/orbit-software` plus all 13 public product pages under it (ERP, hotel PMS,
 *    POS, CRM...). Only `/orbit/` (trailing slash, the CMS) is disallowed here;
 *    the bare `/orbit` page protects itself with `noindex, nofollow` metadata.
 * 2. `/_next/` is intentionally crawlable. Blocking it stops Googlebot from
 *    fetching CSS/JS, which breaks rendering and Core Web Vitals evaluation.
 *
 * `/demo` (noindex) and `/news` (301 → /blogs) stay crawlable on purpose so
 * Google can actually read the noindex tag and follow the redirect.
 */
export default function robots(): MetadataRoute.Robots {
  const host = SITE_ORIGIN.replace(/^https?:\/\//, "");
  const disallow = ["/admin", "/admin/", "/orbit/", "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Googlebot-Image", allow: "/", disallow: ["/admin", "/admin/", "/orbit/", "/api/"] },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin", "/admin/", "/orbit/", "/api/"] },
    ],
    host,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
