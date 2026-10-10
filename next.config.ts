import type { NextConfig } from "next";

const distDir = process.env.NEXT_DIST_DIR?.trim() || ".next";

const nextConfig: NextConfig = {
  distDir,
  experimental: {
    useTypeScriptCli: false,
    webpackBuildWorker: false,
  },
  // Prisma is already on Next.js' default server-external list.
  serverExternalPackages: ["@prisma/client"],
  images: {
    qualities: [75, 96, 100],
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
  async redirects() {
    return [
      { source: "/news", destination: "/blogs", permanent: true },
      { source: "/news/:slug", destination: "/blogs", permanent: true },
      { source: "/portfolio", destination: "/projects", permanent: true },
      { source: "/request-a-quote", destination: "/contact", permanent: true },
      { source: "/services/website-development-nepal", destination: "/service/website-development-nepal", permanent: true },
      { source: "/services/website-design-nepal", destination: "/studio", permanent: true },
      { source: "/services/software-development-nepal", destination: "/custom-software-development-nepal", permanent: true },
      { source: "/services/web-application-development", destination: "/web-development-nepal", permanent: true },
      { source: "/services/mobile-app-development", destination: "/orbit-software/web-apps", permanent: true },
      { source: "/services/ecommerce-website-development", destination: "/service/ecommerce-development-nepal", permanent: true },
      { source: "/services/trekking-travel-website-development", destination: "/trekking-website-development-nepal", permanent: true },
      { source: "/services/hotel-website-development", destination: "/hotel-website-development-nepal", permanent: true },
      { source: "/services/booking-system-development", destination: "/booking-website-development-nepal", permanent: true },
      { source: "/services/seo-services-nepal", destination: "/service/seo-optimization-nepal", permanent: true },
      { source: "/services/digital-marketing-nepal", destination: "/service/digital-marketing-nepal", permanent: true },
      { source: "/services/google-ads-management", destination: "/service/digital-marketing-nepal", permanent: true },
      { source: "/services/social-media-marketing", destination: "/service/digital-marketing-nepal", permanent: true },
      { source: "/services/website-maintenance", destination: "/services/hosting", permanent: true },
    ];
  },
};

export default nextConfig;
