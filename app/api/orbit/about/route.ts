import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseAboutConfig } from "@/lib/about-config";
import { getAboutConfig, saveAboutConfig } from "@/lib/about-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getAboutConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseAboutConfig(body);
  await saveAboutConfig(config);
  revalidatePath("/about");
  return NextResponse.json({ ok: true, config });
}
