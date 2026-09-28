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
    ];
  },
};

export default nextConfig;
