import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseCustomAppsConfig } from "@/lib/custom-apps-config";
import { getCustomAppsConfig, saveCustomAppsConfig } from "@/lib/custom-apps-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getCustomAppsConfig());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const config = parseCustomAppsConfig(body);
  await saveCustomAppsConfig(config);
  revalidatePath("/orbit-software/custom-apps");
  return NextResponse.json({ ok: true, config });
}
