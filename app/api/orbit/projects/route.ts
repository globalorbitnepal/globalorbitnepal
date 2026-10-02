import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseProjectsConfig } from "@/lib/projects-config";
import { getProjectsConfig, saveProjectsConfig } from "@/lib/projects-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getProjectsConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseProjectsConfig(body);
  await saveProjectsConfig(config);
  revalidatePath("/projects");
  return NextResponse.json({ ok: true, config });
}
