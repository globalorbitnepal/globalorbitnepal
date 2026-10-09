import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getBlogStore, saveBlogStore } from "@/lib/blog-store";
import { normalizePost, type BlogCategory, type BlogTag } from "@/lib/blog-types";
import { isOrbitAuthed } from "@/lib/orbit-auth";

function parseCategory(raw: unknown): BlogCategory | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const slug = String(item.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
  const name = String(item.name || "").trim();
  if (!slug || !name) return null;
  return { slug, name, description: String(item.description || "").trim() };
}

function parseTag(raw: unknown): BlogTag | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const slug = String(item.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
  const name = String(item.name || "").trim();
  if (!slug || !name) return null;
  return { slug, name };
}

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getBlogStore());
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const current = await getBlogStore();
  const posts = Array.isArray(body.posts) ? body.posts.map((item: unknown) => normalizePost(item as never)) : current.posts;
  const categories = Array.isArray(body.categories)
    ? body.categories.map(parseCategory).filter(Boolean)
    : current.categories;
  const tags = Array.isArray(body.tags) ? body.tags.map(parseTag).filter(Boolean) : current.tags;
  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      return NextResponse.json({ error: `Duplicate slug: ${post.slug}` }, { status: 400 });
    }
    slugs.add(post.slug);
  }
  await saveBlogStore({
    posts,
    categories: categories as BlogCategory[],
    tags: tags as BlogTag[],
  });
  revalidatePath("/blogs");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true });
}
