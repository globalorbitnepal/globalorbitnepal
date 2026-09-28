import { NextResponse } from "next/server";
import {
  hasOrbitPassword,
  isOrbitAuthed,
  setOrbitPassword,
  setOrbitSession,
  verifyOrbitPassword,
} from "@/lib/orbit-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string; mode?: string };
  const password = String(body.password || "");
  const exists = await hasOrbitPassword();

  try {
    if (!exists && !process.env.ORBIT_EDITOR_PASSWORD?.trim()) {
      await setOrbitPassword(password);
      await setOrbitSession();
      return NextResponse.json({ ok: true });
    }
    const valid = await verifyOrbitPassword(password);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }
    await setOrbitSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Auth failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    authed: await isOrbitAuthed(),
    needsSetup: !(await hasOrbitPassword()),
  });
}
