import { NextResponse } from "next/server";
import { writeAdminAudit } from "@/lib/admin-audit";
import { countInquiries, listInquiries, updateInquiryStatus } from "@/lib/db/inquiries";
import { isInquiryStatus } from "@/lib/inquiry-status";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const statusRaw = url.searchParams.get("status") || "";
  const query = url.searchParams.get("q") || "";
  const page = Math.max(Number(url.searchParams.get("page") || "1"), 1);
  const take = 20;
  const skip = (page - 1) * take;
  const status = isInquiryStatus(statusRaw) ? statusRaw : undefined;

  const [{ items, total }, newCount, totalCount] = await Promise.all([
    listInquiries({ status, query, skip, take }),
    countInquiries("NEW"),
    countInquiries(),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    pageCount: Math.max(Math.ceil(total / take), 1),
    newCount,
    totalCount,
  });
}

export async function PATCH(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string; status?: string };
  const id = String(body.id || "");
  const status = String(body.status || "");
  if (!id || !isInquiryStatus(status)) {
    return NextResponse.json({ error: "Invalid status update." }, { status: 400 });
  }

  const saved = await updateInquiryStatus(id, status);
  if (!saved) {
    return NextResponse.json({ error: "Inquiry could not be updated." }, { status: 503 });
  }
  await writeAdminAudit("inquiry.status", `${id}:${status}`);
  return NextResponse.json({ ok: true, item: saved });
}
