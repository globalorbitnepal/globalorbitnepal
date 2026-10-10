import { SERVICE_CATALOG } from "@/lib/content/services";
import {
  ORBIT_LANDINGS,
  ORBIT_PACKAGES,
  ORBIT_SERVICE_PAGES,
  ORBIT_SOFTWARE,
} from "@/lib/orbit/catalog";
import { getCareersConfig } from "@/lib/careers-store";
import { getPageSeoList } from "@/lib/page-seo-store";
import { listSeoDefaultPaths } from "@/lib/seo-page-defaults";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

function priorityFor(path: string): number {
  if (path === "/") return 1;
  if (path.startsWith("/service/") || ORBIT_LANDINGS.some((l) => l.href === path)) return 0.92;
  if (path === "/contact" || path === "/services" || path === "/orbit-software") return 0.88;
  if (path.startsWith("/packages/") || path.startsWith("/orbit-software/")) return 0.85;
  if (path.startsWith("/services/")) return 0.82;
  if (path === "/privacy-policy" || path === "/terms-and-conditions") return 0.35;
  if (path === "/demo") return 0.4;
  return 0.75;
}

export async function collectSitemapPaths(): Promise<SitemapEntry[]> {
  const [seoPages, careers] = await Promise.all([getPageSeoList(), getCareersConfig()]);
  const paths = new Set<string>();

  for (const p of listSeoDefaultPaths()) paths.add(p);
  for (const p of seoPages.map((item) => item.path)) paths.add(p);
  for (const item of ORBIT_SERVICE_PAGES) paths.add(item.href);
  for (const item of ORBIT_LANDINGS) paths.add(item.href);
  for (const item of ORBIT_PACKAGES) paths.add(item.href);
  for (const item of ORBIT_SOFTWARE) paths.add(item.href);
  for (const svc of SERVICE_CATALOG) paths.add(`/services/${svc.slug}`);
  for (const role of careers.roles) paths.add(`/careers/${role.slug}`);

  paths.delete("/admin");
  paths.delete("/orbit");

  const indexed = new Map(seoPages.map((p) => [p.path, p.robotsIndex !== false]));

  return [...paths]
    .filter((path) => {
      if (path.startsWith("/admin") || path.startsWith("/orbit") || path.startsWith("/api")) return false;
      const robots = indexed.get(path);
      if (robots === false) return false;
      if (path === "/demo") return false;
      return true;
    })
    .map((path) => {
      const changeFrequency: SitemapEntry["changeFrequency"] =
        path === "/" ? "weekly" : path.includes("privacy") || path.includes("terms") ? "yearly" : "monthly";
      return { path, priority: priorityFor(path), changeFrequency };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}
