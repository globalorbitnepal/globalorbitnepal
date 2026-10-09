import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { heroUploadDir } from "@/lib/hero-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const dir = heroUploadDir();
  try {
    const names = await readdir(dir);
    const items = await Promise.all(
      names.map(async (name) => {
        const info = await stat(path.join(dir, name));
        return {
          name,
          url: `/api/media/hero/${name}`,
          size: info.size,
          updatedAt: info.mtime.toISOString(),
          kind: name.endsWith(".mp4") ? "video" : "image",
        };
      }),
    );
    items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
