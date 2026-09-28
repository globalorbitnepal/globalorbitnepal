import { NextResponse } from "next/server";
import { parseHeroConfig } from "@/lib/hero-config";
import { getHeroConfig, saveHeroConfig } from "@/lib/hero-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getHeroConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseHeroConfig(body);
  await saveHeroConfig(config);
  return NextResponse.json({ ok: true, config });
}
