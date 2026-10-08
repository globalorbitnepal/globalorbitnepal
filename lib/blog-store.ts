import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getAppEnv } from "@/lib/env";
import { ORBIT_BLOGS } from "@/lib/orbit/catalog";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  tags: string;
  focusKeyword: string;
  isPublished: boolean;
  publishedAt: string;
};

function blogPath() {
  return path.join(path.dirname(getAppEnv().uploadDir), "blogs.json");
}

function seedPosts(): BlogPost[] {
  return ORBIT_BLOGS.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.summary,
    body: item.summary,
    seoTitle: item.title,
    seoDescription: item.summary,
    keywords: "",
    tags: "",
    focusKeyword: "",
    isPublished: true,
    publishedAt: new Date().toISOString(),
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const raw = await readFile(blogPath(), "utf8");
    const data = JSON.parse(raw) as { posts?: BlogPost[] };
    if (Array.isArray(data.posts) && data.posts.length) return data.posts;
  } catch {
    /* seed */
  }
  return seedPosts();
}

export async function saveBlogPosts(posts: BlogPost[]) {
  const file = blogPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify({ posts }, null, 2)}\n`, "utf8");
}

export async function getPublishedPosts() {
  return (await getBlogPosts()).filter((post) => post.isPublished);
}

export async function getPostBySlug(slug: string) {
  return (await getBlogPosts()).find((post) => post.slug === slug) ?? null;
}
