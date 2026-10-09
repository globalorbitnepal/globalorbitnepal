import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/orbit", "/api/"],
      },
    ],
    sitemap: "https://arnav.theglobalorbit.com/sitemap.xml",
  };
}
