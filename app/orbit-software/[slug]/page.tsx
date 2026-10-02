import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomAppsPageView } from "@/components/orbit-software/custom-apps-page-view";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { findBySlug, ORBIT_SOFTWARE } from "@/lib/orbit/catalog";
import { getCustomAppsConfig } from "@/lib/custom-apps-store";
import { getSiteSettings } from "@/lib/db/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ORBIT_SOFTWARE.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SOFTWARE, slug);
  if (!item) return { title: "Software" };
  if (slug === "custom-apps") {
    const config = await getCustomAppsConfig();
    const seoDescription =
      `${config.heroTitleBefore} ${config.heroTitleAccent}. ${config.heroLede}`.trim().slice(0, 160);
    return buildPageMetadata({
      title: "Custom Web & Mobile Apps · Next.js & Node.js",
      description: seoDescription,
      path: item.href,
      keywords: [
        "custom web app development Nepal",
        "mobile app development Kathmandu",
        "Next.js development",
        "Node.js software",
        "booking portal",
        "admin dashboard",
        "Global Orbit",
      ],
    });
  }
  return buildPageMetadata({ title: item.title, description: item.summary, path: item.href });
}

export default async function SoftwareDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SOFTWARE, slug);
  if (!item) notFound();

  if (slug === "custom-apps") {
    const [config, settings] = await Promise.all([getCustomAppsConfig(), getSiteSettings()]);
    const companyName = settings?.companyName || FALLBACK_SITE.companyName;
    const serviceName = `${config.heroTitleBefore} ${config.heroTitleAccent}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Web & Mobile Apps",
      description: config.heroLede,
      provider: {
        "@type": "Organization",
        name: companyName,
        url: "https://arnav.theglobalorbit.com",
      },
      serviceType: serviceName,
      areaServed: ["NP", "IN", "US"],
      url: "https://arnav.theglobalorbit.com/orbit-software/custom-apps",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: "https://arnav.theglobalorbit.com/contact",
      },
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://arnav.theglobalorbit.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "ERP Software",
          item: "https://arnav.theglobalorbit.com/orbit-software",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Custom Web & Mobile Apps",
          item: "https://arnav.theglobalorbit.com/orbit-software/custom-apps",
        },
      ],
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <link rel="preload" href={config.heroVideoSrc} as="video" fetchPriority="high" />
        <CustomAppsPageView config={config} />
      </>
    );
  }

  return <OrbitArticlePage eyebrow="ERP Software" title={item.title} summary={item.summary} />;
}
