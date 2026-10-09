import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "orbit_editor";

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function equalHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sessionLooksSigned(token: string) {
  const [value, mac] = token.split(".");
  if (!value || !mac || !value.startsWith("ok:")) return false;
  const secret = process.env.ORBIT_EDITOR_KEY || "globalorbitnepal-orbit-editor";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return equalHex(toHex(signature), mac);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/api/orbit")) return NextResponse.next();
  if (pathname === "/api/orbit/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  if (!token || !(await sessionLooksSigned(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/orbit/:path*"],
};
