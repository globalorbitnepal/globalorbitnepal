import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isOrbitAuthed } from "@/lib/orbit-auth";
import { DEFAULT_PAGE_SEO, getPageSeoList, savePageSeoList, type PageSeo } from "@/lib/page-seo-store";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ pages: await getPageSeoList() });
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const incoming = Array.isArray(body.pages) ? (body.pages as PageSeo[]) : [];
  const pages = DEFAULT_PAGE_SEO.map((page) => {
    const next = incoming.find((item) => item.path === page.path);
    return {
      ...page,
      seoTitle: String(next?.seoTitle || "").trim(),
      seoDescription: String(next?.seoDescription || "").trim(),
      keywords: String(next?.keywords || "").trim(),
      tags: String(next?.tags || "").trim(),
      focusKeyword: String(next?.focusKeyword || "").trim(),
    };
  });
  await savePageSeoList(pages);
  for (const page of pages) revalidatePath(page.path);
  return NextResponse.json({ ok: true });
}
