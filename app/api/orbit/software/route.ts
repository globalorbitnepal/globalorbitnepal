import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseSoftwareConfig } from "@/lib/software-config";
import { getSoftwareConfig, saveSoftwareConfig } from "@/lib/software-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getSoftwareConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseSoftwareConfig(body);
  await saveSoftwareConfig(config);
  revalidatePath("/");
  return NextResponse.json({ ok: true, config });
}
