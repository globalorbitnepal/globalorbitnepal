import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog-store";
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
    const posts = await getBlogPosts();
    const items = await Promise.all(
      names.map(async (name) => {
        const info = await stat(path.join(dir, name));
        const url = `/api/media/hero/${name}`;
        const usedBy = posts
          .filter((post) => post.featuredImage.includes(name) || post.body.includes(name) || post.ogImage.includes(name))
          .map((post) => post.title);
        return {
          name,
          url,
          size: info.size,
          updatedAt: info.mtime.toISOString(),
          kind: name.endsWith(".mp4") ? "video" : "image",
          usedBy,
        };
      }),
    );
    items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
