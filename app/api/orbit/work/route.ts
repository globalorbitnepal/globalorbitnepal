import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseWorkConfig } from "@/lib/work-config";
import { getWorkConfig, saveWorkConfig } from "@/lib/work-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getWorkConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseWorkConfig(body);
  await saveWorkConfig(config);
  revalidatePath("/");
  return NextResponse.json({ ok: true, config });
}
