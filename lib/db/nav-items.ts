import { NavLocation, type NavItem } from "@prisma/client";
import { isDatabaseUnavailable } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function listVisibleNavItems(location: NavLocation): Promise<NavItem[]> {
  try {
    return await prisma.navItem.findMany({
      where: { location, isVisible: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return [];
    }
    throw error;
  }
}
