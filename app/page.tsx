import { OrbitHomeView } from "@/components/orbit/home-view";
import { getSiteSettings } from "@/lib/db/site-settings";
import { getHeroConfig } from "@/lib/hero-store";
import { getNeedConfig } from "@/lib/need-store";
import { getWorkConfig } from "@/lib/work-store";
import { getSoftwareConfig } from "@/lib/software-store";
import { applyPageSeo } from "@/lib/apply-page-seo";
import { organizationJsonLd } from "@/lib/seo";
import { getSiteChrome } from "@/lib/site-chrome-store";
import { FALLBACK_SITE } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const chrome = await getSiteChrome();
  const title = chrome?.defaultSeoTitle || settings?.defaultSeoTitle || FALLBACK_SITE.defaultSeoTitle;
  const description =
    chrome?.defaultSeoDescription || settings?.defaultSeoDescription || FALLBACK_SITE.defaultSeoDescription;
  const meta = await applyPageSeo("/", { title, description });
  return { ...meta, title: { absolute: String(meta.title || title) } };
}

export default async function HomePage() {
  const [settings, hero, need, work, software] = await Promise.all([
    getSiteSettings(),
    getHeroConfig(),
    getNeedConfig(),
    getWorkConfig(),
    getSoftwareConfig(),
  ]);
  const videoSrc = hero.videoSrc || "/brand/hero-product.mp4";
  const companyName = settings?.companyName || FALLBACK_SITE.companyName;
  const jsonLd = organizationJsonLd({
    name: companyName,
    description: settings?.defaultSeoDescription || FALLBACK_SITE.defaultSeoDescription,
    email: settings?.email || undefined,
    phone: settings?.phone || undefined,
    address: settings?.address || FALLBACK_SITE.address,
  });

  return (
    <>
      <link rel="preload" href={videoSrc} as="video" type="video/mp4" fetchPriority="high" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OrbitHomeView hero={hero} need={need} work={work} software={software} />
    </>
  );
}
