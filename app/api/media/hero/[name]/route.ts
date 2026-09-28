import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { heroUploadDir } from "@/lib/hero-store";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  const safe = name.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!/^hero-(video|image)\.[a-z0-9]+$/i.test(safe)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const file = path.join(heroUploadDir(), safe);
  try {
    const info = await stat(file);
    const data = await readFile(file);
    const type = safe.endsWith(".mp4")
      ? "video/mp4"
      : safe.endsWith(".png")
        ? "image/png"
        : safe.endsWith(".webp")
          ? "image/webp"
          : "image/jpeg";
    return new NextResponse(data, {
      headers: {
        "Content-Type": type,
        "Content-Length": String(info.size),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
