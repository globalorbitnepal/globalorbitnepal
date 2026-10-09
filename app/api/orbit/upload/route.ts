import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getHeroConfig, heroUploadDir, saveHeroConfig } from "@/lib/hero-store";
import { getNeedConfig, saveNeedConfig } from "@/lib/need-store";
import { getWorkConfig, saveWorkConfig } from "@/lib/work-store";
import { getSoftwareConfig, saveSoftwareConfig } from "@/lib/software-store";
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
  const isNeedVideo = kind === "needVideo";
  const isTrustLogo = kind === "trustLogo";
  const isWorkImage = kind === "workImage";
  const isSoftwareVideo = kind === "softwareVideo";
  const isSoftwarePreview = kind === "softwarePreview";
  const isBlogImage = kind === "blogImage";
  const logoId = String(form.get("logoId") || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "");
  const tileSlot = String(form.get("tileSlot") || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "");

  const productSlug = String(form.get("productSlug") || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "");

  if (isTrustLogo && !logoId) {
    return NextResponse.json({ error: "Missing logo id" }, { status: 400 });
  }
  if (isWorkImage && !tileSlot) {
    return NextResponse.json({ error: "Missing tile slot" }, { status: 400 });
  }
  if (isSoftwarePreview && !productSlug) {
    return NextResponse.json({ error: "Missing product slug" }, { status: 400 });
  }

  let ext = "jpg";
  let name: string;
  if (isVideo) {
    ext = "mp4";
    name = `hero-video.${ext}`;
  } else if (isNeedVideo) {
    ext = "mp4";
    name = `need-video.${ext}`;
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
  } else if (isWorkImage) {
    const rawExt =
      file.type === "image/svg+xml"
        ? "svg"
        : file.type === "image/png"
          ? "png"
          : file.type === "image/webp"
            ? "webp"
            : "jpg";
    ext = rawExt;
    name = `work-${tileSlot}.${ext}`;
  } else if (isSoftwareVideo) {
    ext = "mp4";
    name = `software-video.${ext}`;
  } else if (isSoftwarePreview) {
    const rawExt = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    ext = rawExt;
    name = `software-${productSlug}.${ext}`;
  } else if (isBlogImage) {
    ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    name = `blog-${Date.now()}.${ext}`;
  } else {
    name = `hero-image.${ext}`;
  }

  if ((isVideo || isNeedVideo || isSoftwareVideo) && !file.type.startsWith("video/")) {
    return NextResponse.json({ error: "Upload an MP4 video" }, { status: 400 });
  }
  if (!isVideo && !isNeedVideo && !isSoftwareVideo && !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Upload an image" }, { status: 400 });
  }

  const dir = heroUploadDir();
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buffer);

  const config = await getHeroConfig();
  const stamp = Date.now();
  if (isBlogImage) {
    return NextResponse.json({ ok: true, url: `/api/media/hero/${name}?v=${stamp}` });
  }
  if (isVideo) {
    config.videoSrc = `/api/media/hero/${name}?v=${stamp}`;
    config.useVideo = true;
    await saveHeroConfig(config);
    return NextResponse.json({ ok: true, config });
  }
  if (isNeedVideo) {
    const need = await getNeedConfig();
    need.videoSrc = `/api/media/hero/${name}?v=${stamp}`;
    await saveNeedConfig(need);
    revalidatePath("/");
    return NextResponse.json({ ok: true, needConfig: need });
  }
  if (isWorkImage) {
    const work = await getWorkConfig();
    const src = `/api/media/hero/${name}?v=${stamp}`;
    work.tiles = work.tiles.map((tile) =>
      tile.slot === tileSlot ? { ...tile, imageSrc: src } : tile,
    );
    await saveWorkConfig(work);
    revalidatePath("/");
    return NextResponse.json({ ok: true, workConfig: work });
  }
  if (isSoftwareVideo) {
    const software = await getSoftwareConfig();
    software.videoSrc = `/api/media/hero/${name}?v=${stamp}`;
    await saveSoftwareConfig(software);
    revalidatePath("/");
    return NextResponse.json({ ok: true, softwareConfig: software });
  }
  if (isSoftwarePreview) {
    const software = await getSoftwareConfig();
    const src = `/api/media/hero/${name}?v=${stamp}`;
    software.products = software.products.map((product) =>
      product.slug === productSlug ? { ...product, previewSrc: src } : product,
    );
    await saveSoftwareConfig(software);
    revalidatePath("/");
    return NextResponse.json({ ok: true, softwareConfig: software });
  }
  if (isTrustLogo) {
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
  revalidatePath("/");
  return NextResponse.json({ ok: true, config });
}
