import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isOrbitAuthed } from "@/lib/orbit-auth";
import { DEFAULT_SITE_CHROME, getSiteChrome, saveSiteChrome } from "@/lib/site-chrome-store";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ chrome: (await getSiteChrome()) ?? DEFAULT_SITE_CHROME });
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Record<string, unknown>;
  const chrome = {
    companyName: String(body.companyName || DEFAULT_SITE_CHROME.companyName).trim(),
    tagline: String(body.tagline || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    address: String(body.address || "").trim(),
    defaultSeoTitle: String(body.defaultSeoTitle || "").trim(),
    defaultSeoDescription: String(body.defaultSeoDescription || "").trim(),
  };
  await saveSiteChrome(chrome);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
