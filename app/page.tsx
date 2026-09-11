import { HomeAbout } from "@/components/home/home-about";
import { HomeHero } from "@/components/home/home-hero";
import { HomeServices } from "@/components/home/home-services";
import { HomeSolutions } from "@/components/home/home-solutions";
import { HomeWhy } from "@/components/home/home-why";
import { PageCta } from "@/components/site/page-cta";
import { getSiteSettings } from "@/lib/db/site-settings";
import { organizationJsonLd } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.defaultSeoTitle || FALLBACK_SITE.defaultSeoTitle;
  const description =
    settings?.defaultSeoDescription || FALLBACK_SITE.defaultSeoDescription;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      locale: "en_NP",
      type: "website",
    },
  };
}

export default async function HomePage() {
  const settings = await getSiteSettings();
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero />
      <HomeServices />
      <HomeAbout />
      <HomeWhy />
      <HomeSolutions />
      <PageCta companyName={companyName} email={settings?.email || undefined} />
    </>
  );
}
