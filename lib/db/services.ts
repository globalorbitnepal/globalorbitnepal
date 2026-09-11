import type { Service } from "@prisma/client";
import { isDatabaseUnavailable } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function listPublishedServices(): Promise<Service[]> {
  try {
    return await prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return [];
    }
    throw error;
  }
}

export async function getPublishedServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await prisma.service.findFirst({
      where: { slug, isPublished: true },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return null;
    }
    throw error;
  }
}
