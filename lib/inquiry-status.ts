import type { InquiryStatus } from "@prisma/client";

export const INQUIRY_STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  NEW: "New",
  READ: "In Progress",
  REPLIED: "Contacted",
  ARCHIVED: "Closed",
};

export function isInquiryStatus(value: string): value is InquiryStatus {
  return (INQUIRY_STATUSES as readonly string[]).includes(value);
}
