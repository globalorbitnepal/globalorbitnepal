import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-origin";

export default function robots(): MetadataRoute.Robots {
  const host = SITE_ORIGIN.replace(/^https?:\/\//, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/orbit", "/orbit/", "/api/", "/demo", "/news"],
      },
    ],
    host,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
