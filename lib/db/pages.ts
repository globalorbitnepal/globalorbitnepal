import type { Page } from "@prisma/client";
import { isDatabaseUnavailable } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function listPublishedPages(): Promise<Page[]> {
  try {
    return await prisma.page.findMany({
      where: { isPublished: true },
      orderBy: { title: "asc" },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return [];
    }
    throw error;
  }
}

export async function getPublishedPageBySlug(slug: string): Promise<Page | null> {
  try {
    return await prisma.page.findFirst({
      where: { slug, isPublished: true },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return null;
    }
    throw error;
  }
}
