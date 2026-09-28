import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getHeroConfig, heroUploadDir, saveHeroConfig } from "@/lib/hero-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const kind = String(form.get("kind") || "");
  const file = form.get("file");
  if (!(file instanceof File) || file.size < 1) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > 80 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (80MB max)" }, { status: 400 });
  }

  const isVideo = kind === "video";
  const ext = isVideo ? "mp4" : "jpg";
  const name = isVideo ? `hero-video.${ext}` : `hero-image.${ext}`;
  if (isVideo && !file.type.startsWith("video/")) {
    return NextResponse.json({ error: "Upload an MP4 video" }, { status: 400 });
  }
  if (!isVideo && !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Upload an image" }, { status: 400 });
  }

  const dir = heroUploadDir();
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buffer);

  const config = await getHeroConfig();
  const stamp = Date.now();
  if (isVideo) {
    config.videoSrc = `/api/media/hero/${name}?v=${stamp}`;
    config.useVideo = true;
  } else {
    config.imageSrc = `/api/media/hero/${name}?v=${stamp}`;
  }
  await saveHeroConfig(config);
  return NextResponse.json({ ok: true, config });
}
