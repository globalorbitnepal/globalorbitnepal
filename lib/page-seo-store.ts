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
};

export const DEFAULT_PAGE_SEO: PageSeo[] = [
  { path: "/", label: "Home", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/about", label: "About", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/contact", label: "Contact", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/projects", label: "Portfolio", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/careers", label: "Careers", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/orbit-software", label: "Orbit Software", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/service/website-development-nepal", label: "Website Development", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/service/ai-automation", label: "AI Automation", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
  { path: "/blogs", label: "Blog index", seoTitle: "", seoDescription: "", keywords: "", tags: "", focusKeyword: "" },
];

function seoPath() {
  return path.join(path.dirname(getAppEnv().uploadDir), "page-seo.json");
}

export async function getPageSeoList(): Promise<PageSeo[]> {
  try {
    const raw = await readFile(seoPath(), "utf8");
    const data = JSON.parse(raw) as { pages?: PageSeo[] };
    if (Array.isArray(data.pages) && data.pages.length) {
      const map = new Map(data.pages.map((page) => [page.path, page]));
      return DEFAULT_PAGE_SEO.map((page) => map.get(page.path) ?? page);
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
