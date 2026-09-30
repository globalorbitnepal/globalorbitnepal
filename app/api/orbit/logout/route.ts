import { NextResponse } from "next/server";
import { clearOrbitSession, isOrbitAuthed } from "@/lib/orbit-auth";

export async function POST() {
  if (await isOrbitAuthed()) await clearOrbitSession();
  return NextResponse.json({ ok: true });
}
