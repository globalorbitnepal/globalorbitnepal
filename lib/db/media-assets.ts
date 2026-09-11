import type { MediaAsset } from "@prisma/client";
import { isDatabaseUnavailable } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function listMediaAssets(): Promise<MediaAsset[]> {
  try {
    return await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return [];
    }
    throw error;
  }
}
