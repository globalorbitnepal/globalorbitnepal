import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma is already on Next.js' default server-external list.
  serverExternalPackages: ["@prisma/client"],
  images: {
    qualities: [75, 96, 100],
  },
  async redirects() {
    return [
      { source: "/news", destination: "/blogs", permanent: true },
      { source: "/news/:slug", destination: "/blogs", permanent: true },
    ];
  },
};

export default nextConfig;
