import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma is already on Next.js' default server-external list.
  serverExternalPackages: ["@prisma/client"],
  images: {
    qualities: [75, 96, 100],
  },
};

export default nextConfig;
