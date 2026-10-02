import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseCareersConfig } from "@/lib/careers-config";
import { getCareersConfig, saveCareersConfig } from "@/lib/careers-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getCareersConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseCareersConfig(body);
  await saveCareersConfig(config);
  revalidatePath("/careers");
  for (const role of config.roles) {
    revalidatePath(`/careers/${role.slug}`);
  }
  return NextResponse.json({ ok: true, config });
}
