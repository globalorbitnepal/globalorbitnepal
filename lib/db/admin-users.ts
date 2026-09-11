import { isDatabaseUnavailable } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

const adminPublicSelect = {
  id: true,
  name: true,
  email: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function findActiveAdminByEmail(email: string) {
  try {
    return await prisma.adminUser.findFirst({
      where: { email, isActive: true },
      select: adminPublicSelect,
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return null;
    }
    throw error;
  }
}
