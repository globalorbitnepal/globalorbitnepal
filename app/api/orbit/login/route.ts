import { NextResponse } from "next/server";
import {
  hasOrbitPassword,
  isOrbitAuthed,
  setOrbitPassword,
  setOrbitSession,
  verifyOrbitLogin,
} from "@/lib/orbit-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string; username?: string; mode?: string };
  const password = String(body.password || "");
  const username = String(body.username || "");
  const exists = await hasOrbitPassword();

  try {
    if (!exists && !process.env.ORBIT_EDITOR_PASSWORD?.trim()) {
      await setOrbitPassword(password);
      await setOrbitSession();
      return NextResponse.json({ ok: true });
    }
    if (process.env.ORBIT_EDITOR_USERNAME?.trim() && !username.trim()) {
      return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
    }
    const valid = await verifyOrbitLogin(username, password);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
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
