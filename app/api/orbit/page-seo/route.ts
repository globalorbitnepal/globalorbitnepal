import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isOrbitAuthed } from "@/lib/orbit-auth";
import { DEFAULT_PAGE_SEO, getPageSeoList, normalizePageSeo, savePageSeoList, type PageSeo } from "@/lib/page-seo-store";

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
    return normalizePageSeo(page, next);
  });
  await savePageSeoList(pages);
  for (const page of pages) revalidatePath(page.path);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true });
}
