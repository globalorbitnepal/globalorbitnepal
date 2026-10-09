import { NextResponse } from "next/server";
import { writeAdminAudit } from "@/lib/admin-audit";
import { clearOrbitSession, isOrbitAuthed } from "@/lib/orbit-auth";

export async function POST() {
  if (await isOrbitAuthed()) {
    await clearOrbitSession();
    await writeAdminAudit("auth.logout");
  }
  return NextResponse.json({ ok: true });
}
