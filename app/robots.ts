import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-origin";

export default function robots(): MetadataRoute.Robots {
  const host = SITE_ORIGIN.replace(/^https?:\/\//, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sitemap.xml"],
        disallow: ["/admin", "/admin/", "/orbit", "/orbit/", "/api/", "/demo", "/news", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin", "/orbit", "/api/"],
      },
    ],
    host,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
