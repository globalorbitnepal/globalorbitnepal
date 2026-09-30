import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "orbit_editor";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/api/orbit")) return NextResponse.next();
  if (pathname === "/api/orbit/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  if (!token || !token.includes(".")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/orbit/:path*"],
};
