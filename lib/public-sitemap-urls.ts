import { getPublishedPosts } from "@/lib/blog-store";
import { getCareersConfig } from "@/lib/careers-store";
import { getPageSeoList } from "@/lib/page-seo-store";
import { listInventoryPathStrings } from "@/lib/route-inventory";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified?: Date;
};

function priorityFor(path: string): number {
  if (path === "/") return 1;
  if (path.startsWith("/service/") || path.includes("website-development") || path.includes("seo-")) return 0.92;
  if (path === "/contact" || path === "/services" || path === "/orbit-software" || path === "/projects") return 0.88;
  if (path.startsWith("/packages/") || path.startsWith("/orbit-software/")) return 0.85;
  if (path.startsWith("/services/")) return 0.82;
  if (path.startsWith("/blog/")) return 0.65;
  if (path.startsWith("/careers/")) return 0.55;
  if (path === "/privacy-policy" || path === "/terms-and-conditions") return 0.35;
  return 0.75;
}

function changeFrequencyFor(path: string): SitemapEntry["changeFrequency"] {
  if (path === "/") return "weekly";
  if (path.includes("privacy") || path.includes("terms")) return "yearly";
  if (path.startsWith("/blog/")) return "monthly";
  return "monthly";
}

export async function collectSitemapPaths(): Promise<SitemapEntry[]> {
  const [seoPages, careers, posts] = await Promise.all([
    getPageSeoList(),
    getCareersConfig(),
    getPublishedPosts(),
  ]);
  const paths = new Set<string>();

  for (const p of listInventoryPathStrings()) paths.add(p);
  for (const p of seoPages.map((item) => item.path)) paths.add(p);
  for (const role of careers.roles) paths.add(`/careers/${role.slug}`);
  for (const post of posts) paths.add(`/blog/${post.slug}`);

  paths.delete("/admin");
  paths.delete("/orbit");
  paths.delete("/demo");
  paths.delete("/news");

  const indexed = new Map(seoPages.map((p) => [p.path, p.robotsIndex !== false]));
  const postDates = new Map(
    posts.map((post) => [`/blog/${post.slug}`, new Date(post.updatedAt || post.publishedAt || Date.now())]),
  );

  const entries: SitemapEntry[] = [];

  for (const path of paths) {
    if (path.startsWith("/admin") || path.startsWith("/orbit") || path.startsWith("/api")) continue;
    const robots = indexed.get(path);
    if (robots === false) continue;

    entries.push({
      path,
      priority: priorityFor(path),
      changeFrequency: changeFrequencyFor(path),
      ...(postDates.has(path) ? { lastModified: postDates.get(path) } : {}),
    });
  }

  return entries.sort((a, b) => a.path.localeCompare(b.path));
}
