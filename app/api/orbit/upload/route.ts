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
  const isTrustLogo = kind === "trustLogo";
  const logoId = String(form.get("logoId") || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "");

  if (isTrustLogo && !logoId) {
    return NextResponse.json({ error: "Missing logo id" }, { status: 400 });
  }

  let ext = "jpg";
  let name: string;
  if (isVideo) {
    ext = "mp4";
    name = `hero-video.${ext}`;
  } else if (isTrustLogo) {
    const rawExt =
      file.type === "image/svg+xml"
        ? "svg"
        : file.type === "image/png"
          ? "png"
          : file.type === "image/webp"
            ? "webp"
            : "jpg";
    ext = rawExt;
    name = `trust-${logoId}.${ext}`;
  } else {
    name = `hero-image.${ext}`;
  }

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
  } else if (isTrustLogo) {
    const src = `/api/media/hero/${name}?v=${stamp}`;
    const index = config.trustLogos.findIndex((logo) => logo.id === logoId);
    if (index === -1) {
      config.trustLogos.push({ id: logoId, label: logoId, imageSrc: src });
    } else {
      config.trustLogos[index] = { ...config.trustLogos[index], imageSrc: src };
    }
  } else {
    config.imageSrc = `/api/media/hero/${name}?v=${stamp}`;
  }
  await saveHeroConfig(config);
  return NextResponse.json({ ok: true, config });
}
