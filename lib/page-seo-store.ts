import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getAppEnv } from "@/lib/env";

export type PageSeo = {
  path: string;
  label: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  tags: string;
  focusKeyword: string;
  canonical: string;
  robotsIndex: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

const SEO_BLANK = {
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  tags: "",
  focusKeyword: "",
  canonical: "",
  robotsIndex: true,
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
} as const;

export const DEFAULT_PAGE_SEO: PageSeo[] = [
  { path: "/", label: "Home", ...SEO_BLANK },
  { path: "/about", label: "About", ...SEO_BLANK },
  { path: "/contact", label: "Contact", ...SEO_BLANK },
  { path: "/projects", label: "Portfolio", ...SEO_BLANK },
  { path: "/careers", label: "Careers", ...SEO_BLANK },
  { path: "/orbit-software", label: "Orbit Software", ...SEO_BLANK },
  { path: "/privacy-policy", label: "Privacy Policy", ...SEO_BLANK },
  { path: "/terms-and-conditions", label: "Terms & Conditions", ...SEO_BLANK },
  { path: "/service/website-development-nepal", label: "Website Development", ...SEO_BLANK },
  { path: "/service/ai-automation", label: "AI Automation", ...SEO_BLANK },
  { path: "/blogs", label: "Blog index", ...SEO_BLANK },
  { path: "/orbit-software/web-apps", label: "Web Apps", ...SEO_BLANK },
  { path: "/orbit-software/android-apps", label: "Android Apps", ...SEO_BLANK },
  { path: "/orbit-software/ios-apps", label: "iOS Apps", ...SEO_BLANK },
  { path: "/packages", label: "Packages", ...SEO_BLANK },
  { path: "/services", label: "Solutions", ...SEO_BLANK },
  { path: "/demo", label: "Demo", ...SEO_BLANK },
  { path: "/inside-orbit", label: "Inside Orbit", ...SEO_BLANK },
  { path: "/studio", label: "Studio", ...SEO_BLANK },
];

export function normalizePageSeo(page: PageSeo, incoming?: Partial<PageSeo>): PageSeo {
  return {
    ...page,
    seoTitle: String(incoming?.seoTitle ?? page.seoTitle ?? "").trim(),
    seoDescription: String(incoming?.seoDescription ?? page.seoDescription ?? "").trim(),
    keywords: String(incoming?.keywords ?? page.keywords ?? "").trim(),
    tags: String(incoming?.tags ?? page.tags ?? "").trim(),
    focusKeyword: String(incoming?.focusKeyword ?? page.focusKeyword ?? "").trim(),
    canonical: String(incoming?.canonical ?? page.canonical ?? "").trim(),
    robotsIndex: incoming?.robotsIndex ?? page.robotsIndex ?? true,
    ogTitle: String(incoming?.ogTitle ?? page.ogTitle ?? "").trim(),
    ogDescription: String(incoming?.ogDescription ?? page.ogDescription ?? "").trim(),
    ogImage: String(incoming?.ogImage ?? page.ogImage ?? "").trim(),
  };
}

function seoPath() {
  return path.join(path.dirname(getAppEnv().uploadDir), "page-seo.json");
}

export async function getPageSeoList(): Promise<PageSeo[]> {
  try {
    const raw = await readFile(seoPath(), "utf8");
    const data = JSON.parse(raw) as { pages?: PageSeo[] };
    if (Array.isArray(data.pages) && data.pages.length) {
      const map = new Map(data.pages.map((page) => [page.path, page]));
      return DEFAULT_PAGE_SEO.map((page) => normalizePageSeo(page, map.get(page.path)));
    }
  } catch {
    /* defaults */
  }
  return DEFAULT_PAGE_SEO;
}

export async function getPageSeo(pathname: string): Promise<PageSeo | null> {
  const list = await getPageSeoList();
  return list.find((page) => page.path === pathname) ?? null;
}

export async function savePageSeoList(pages: PageSeo[]) {
  const file = seoPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify({ pages }, null, 2)}\n`, "utf8");
}
