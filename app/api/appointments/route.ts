import { NextResponse } from "next/server";
import { addAppointment, parseAppointmentInput } from "@/lib/appointments/store";
import { createInquiry } from "@/lib/db/inquiries";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!rateLimit(clientKey(request, "appointment"), 6, 10 * 60 * 1000).ok) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes." }, { status: 429 });
  }

  const raw = body as Record<string, unknown>;
  if (typeof raw.company_website === "string" && raw.company_website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseAppointmentInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const record = await addAppointment(parsed.data);
  await createInquiry({
    name: parsed.data.fullName,
    email: parsed.data.officeEmail,
    phone: parsed.data.whatsapp || parsed.data.mobile,
    subject: `appointment · / · ${parsed.data.studio}`,
    message: [
      `Studio: ${parsed.data.studio}`,
      `Services: ${parsed.data.services.join(", ")}`,
      `Country: ${parsed.data.country}`,
      `City: ${parsed.data.city}`,
      `Mobile: ${parsed.data.mobile}`,
      `WhatsApp: ${parsed.data.whatsapp}`,
      parsed.data.specialRequest ? `Request: ${parsed.data.specialRequest}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });
  return NextResponse.json({ ok: true, id: record.id });
}
