import { HomeHero } from "@/components/home/home-hero";
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
      <div className="bg-[#f6f1e8]">
        <HomeHero />
      </div>
    </>
  );
}
