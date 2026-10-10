import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isOrbitAuthed } from "@/lib/orbit-auth";
import {
  DEFAULT_HOME_SURFACE,
  getHomeSurfaceConfig,
  mergeHomeSurface,
  saveHomeSurfaceConfig,
  type HomeSurfaceConfig,
} from "@/lib/home-surface-store";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ surface: await getHomeSurfaceConfig() });
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Partial<HomeSurfaceConfig>;
  const surface = mergeHomeSurface({ ...DEFAULT_HOME_SURFACE, ...body });
  await saveHomeSurfaceConfig(surface);
  revalidatePath("/");
  return NextResponse.json({ ok: true, surface });
}
