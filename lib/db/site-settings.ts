import type { SiteSettings } from "@prisma/client";
import { isDatabaseUnavailable } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await prisma.siteSettings.findUnique({
      where: { singletonKey: "default" },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return null;
    }
    throw error;
  }
}
