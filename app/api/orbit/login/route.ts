import { NextResponse } from "next/server";
import { writeAdminAudit } from "@/lib/admin-audit";
import {
  hasOrbitPassword,
  isOrbitAuthed,
  setOrbitPassword,
  setOrbitSession,
  verifyOrbitLogin,
} from "@/lib/orbit-auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(clientKey(request, "login"), 8, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  let body: { password?: string; username?: string; remember?: boolean } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const password = String(body.password || "");
  const username = String(body.username || "");
  const remember = body.remember !== false;
  const exists = await hasOrbitPassword();

  try {
    if (!exists && !process.env.ORBIT_EDITOR_PASSWORD?.trim()) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
      }
      await setOrbitPassword(password);
      await setOrbitSession({ remember });
      await writeAdminAudit("auth.setup");
      return NextResponse.json({ ok: true });
    }
    if (process.env.ORBIT_EDITOR_USERNAME?.trim() && !username.trim()) {
      return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
    }
    const valid = await verifyOrbitLogin(username, password);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
    }
    await setOrbitSession({ remember });
    await writeAdminAudit("auth.login");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid username or password" }, { status: 401 });
  }
}

export async function GET() {
  return NextResponse.json({
    authed: await isOrbitAuthed(),
    needsSetup: !(await hasOrbitPassword()),
  });
}
