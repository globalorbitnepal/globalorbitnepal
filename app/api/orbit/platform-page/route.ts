import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parsePlatformPageConfig } from "@/lib/custom-apps-config";
import { getPlatformPageConfig, savePlatformPageConfig } from "@/lib/platform-page-store";
import { isPlatformPageSlug, platformPagePath } from "@/lib/platform-page-slugs";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const slug = new URL(request.url).searchParams.get("slug") ?? "web-apps";
  if (!isPlatformPageSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  return NextResponse.json(await getPlatformPageConfig(slug));
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const slug = typeof body.slug === "string" ? body.slug : "";
  if (!isPlatformPageSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  const config = parsePlatformPageConfig(slug, body);
  await savePlatformPageConfig(slug, config);
  revalidatePath(platformPagePath(slug));
  revalidatePath("/orbit-software/custom-apps");
  return NextResponse.json({ ok: true, config });
}
