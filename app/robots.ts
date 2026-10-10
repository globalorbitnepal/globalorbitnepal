import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arnav.theglobalorbit.com";

export default function robots(): MetadataRoute.Robots {
  const host = SITE.replace(/^https?:\/\//, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/orbit", "/orbit/", "/api/", "/demo"],
      },
    ],
    host,
    sitemap: `${SITE}/sitemap.xml`,
  };
}
