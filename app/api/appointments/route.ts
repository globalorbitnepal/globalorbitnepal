import { NextResponse } from "next/server";
import { addAppointment, parseAppointmentInput } from "@/lib/appointments/store";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
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
  return NextResponse.json({ ok: true, id: record.id });
}
