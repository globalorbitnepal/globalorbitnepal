import { BLOG_SEEDS } from "@/lib/blog-seeds";
import { DEFAULT_CAREERS } from "@/lib/careers-config";
import { ORBIT_BLOGS } from "@/lib/orbit/catalog";
import { listInventoryPathStrings } from "@/lib/route-inventory";

const EXTRA = [
  "/demo",
  "/admin",
  "/orbit",
  "/news",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/sw.js",
  "/favicon.ico",
  "/globalorbitindex2026.txt",
];

function withBlogAndCareers(paths: Set<string>) {
  for (const post of ORBIT_BLOGS) paths.add(`/blog/${post.slug}`);
  for (const post of BLOG_SEEDS) paths.add(`/blog/${post.slug}`);
  for (const role of DEFAULT_CAREERS.roles) paths.add(`/careers/${role.slug}`);
  for (const path of EXTRA) paths.add(path);
  return paths;
}

const KNOWN = withBlogAndCareers(new Set(listInventoryPathStrings()));

/** True when the pathname is a real public route. Unknown URLs must 404, not render as HTTP 200. */
export function isKnownPublicPath(pathname: string): boolean {
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/orbit/")) return true;
  if (pathname.startsWith("/news/") || pathname === "/news") return true;
  if (pathname.startsWith("/brand/") || pathname.startsWith("/icons/") || pathname.startsWith("/uploads/")) return true;
  if (pathname.startsWith("/stream/")) return true;
  const clean = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (KNOWN.has(clean) || KNOWN.has(pathname)) return true;
  const last = clean.split("/").pop() || "";
  if (last.includes(".")) return true;
  return false;
}
