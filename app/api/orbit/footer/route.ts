import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isOrbitAuthed } from "@/lib/orbit-auth";
import {
  DEFAULT_FOOTER_CONFIG,
  getFooterConfig,
  mergeFooterConfig,
  saveFooterConfig,
  type FooterConfig,
} from "@/lib/footer-config-store";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ footer: await getFooterConfig() });
}

export async function POST(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Partial<FooterConfig>;
  const footer = mergeFooterConfig({
    ...DEFAULT_FOOTER_CONFIG,
    ...body,
    exploreHeading: String(body.exploreHeading ?? DEFAULT_FOOTER_CONFIG.exploreHeading).trim(),
    servicesHeading: String(body.servicesHeading ?? DEFAULT_FOOTER_CONFIG.servicesHeading).trim(),
    officesHeading: String(body.officesHeading ?? DEFAULT_FOOTER_CONFIG.officesHeading).trim(),
    connectTitle: String(body.connectTitle ?? DEFAULT_FOOTER_CONFIG.connectTitle).trim(),
    connectLede: String(body.connectLede ?? DEFAULT_FOOTER_CONFIG.connectLede).trim(),
    subscribePlaceholder: String(
      body.subscribePlaceholder ?? DEFAULT_FOOTER_CONFIG.subscribePlaceholder,
    ).trim(),
    subscribeButton: String(body.subscribeButton ?? DEFAULT_FOOTER_CONFIG.subscribeButton).trim(),
    stats: Array.isArray(body.stats) ? body.stats : DEFAULT_FOOTER_CONFIG.stats,
    explore: Array.isArray(body.explore) ? body.explore : DEFAULT_FOOTER_CONFIG.explore,
    services: Array.isArray(body.services) ? body.services : DEFAULT_FOOTER_CONFIG.services,
    offices: Array.isArray(body.offices) ? body.offices : DEFAULT_FOOTER_CONFIG.offices,
    social: Array.isArray(body.social) ? body.social : DEFAULT_FOOTER_CONFIG.social,
    legal: Array.isArray(body.legal) ? body.legal : DEFAULT_FOOTER_CONFIG.legal,
  });
  await saveFooterConfig(footer);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, footer });
}
