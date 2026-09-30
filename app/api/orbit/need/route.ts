import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseNeedConfig } from "@/lib/need-config";
import { getNeedConfig, saveNeedConfig } from "@/lib/need-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getNeedConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseNeedConfig(body);
  await saveNeedConfig(config);
  revalidatePath("/");
  return NextResponse.json({ ok: true, config });
}
