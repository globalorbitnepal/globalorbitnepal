import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getBlogPosts, saveBlogPosts, type BlogPost } from "@/lib/blog-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

function parsePost(raw: unknown): BlogPost | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const slug = String(item.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
  if (!slug) return null;
  return {
    slug,
    title: String(item.title || "").trim() || "Untitled",
    excerpt: String(item.excerpt || "").trim(),
    body: String(item.body || "").trim(),
    seoTitle: String(item.seoTitle || "").trim(),
    seoDescription: String(item.seoDescription || "").trim(),
    keywords: String(item.keywords || "").trim(),
    tags: String(item.tags || "").trim(),
    focusKeyword: String(item.focusKeyword || "").trim(),
    isPublished: Boolean(item.isPublished),
    publishedAt: String(item.publishedAt || new Date().toISOString()),
  };
}

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ posts: await getBlogPosts() });
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const posts = Array.isArray(body.posts) ? body.posts.map(parsePost).filter(Boolean) : [];
  await saveBlogPosts(posts as BlogPost[]);
  revalidatePath("/blogs");
  revalidatePath("/blog/[slug]", "page");
  return NextResponse.json({ ok: true });
}
