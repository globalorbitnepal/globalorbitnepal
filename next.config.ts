import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma is already on Next.js' default server-external list.
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
