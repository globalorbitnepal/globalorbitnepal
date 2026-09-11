"use server";

import { createInquiry } from "@/lib/db/inquiries";

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitInquiry(
  _previous: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const honeypot = read(formData, "company_website");
  if (honeypot) {
    return {
      status: "success",
      message: "Thank you. We have received your message.",
      errors: {},
    };
  }

  const name = read(formData, "name");
  const email = read(formData, "email");
  const phone = read(formData, "phone");
  const subject = read(formData, "subject");
  const message = read(formData, "message");

  const errors: InquiryFormState["errors"] = {};
  if (name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 20) {
    errors.message = "Please add a short brief (at least 20 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
    };
  }

  const saved = await createInquiry({
    name,
    email,
    message,
    phone: phone || undefined,
    subject: subject || undefined,
  });

  if (!saved) {
    return {
      status: "error",
      message: "The message could not be stored just now. Please try again later.",
      errors: {},
    };
  }

  return {
    status: "success",
    message: "Thank you. Your enquiry has been recorded. We will reply when we can.",
    errors: {},
  };
}
