import type { Inquiry, Prisma } from "@prisma/client";
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
