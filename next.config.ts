import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { protocol: "https", hostname: "media.base44.com" },
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
