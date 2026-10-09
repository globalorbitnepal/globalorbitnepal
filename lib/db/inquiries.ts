import type { Inquiry, InquiryStatus, Prisma } from "@prisma/client";
import { isDatabaseUnavailable } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function createInquiry(
  data: Pick<Prisma.InquiryCreateInput, "name" | "email" | "message"> &
    Partial<Pick<Prisma.InquiryCreateInput, "phone" | "subject">>,
): Promise<Inquiry | null> {
  try {
    return await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        phone: data.phone,
        subject: data.subject,
      },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return null;
    }
    throw error;
  }
}

export async function countInquiries(status?: InquiryStatus) {
  try {
    return await prisma.inquiry.count({
      where: status ? { status } : undefined,
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) return 0;
    throw error;
  }
}

export async function listInquiries(options: {
  status?: InquiryStatus;
  query?: string;
  skip?: number;
  take?: number;
}) {
  const take = Math.min(Math.max(options.take ?? 20, 1), 50);
  const skip = Math.max(options.skip ?? 0, 0);
  const query = options.query?.trim();
  const where: Prisma.InquiryWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
            { subject: { contains: query, mode: "insensitive" } },
            { message: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  try {
    const [items, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.inquiry.count({ where }),
    ]);
    return { items, total, skip, take };
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return { items: [] as Inquiry[], total: 0, skip, take };
    }
    throw error;
  }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  try {
    return await prisma.inquiry.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) return null;
    throw error;
  }
}
