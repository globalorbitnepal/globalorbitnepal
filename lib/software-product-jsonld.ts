import type { SoftwareProductContent } from "@/lib/software-product-types";
import { softwareProductPath } from "@/lib/software-product-slugs";
import { SITE_ORIGIN } from "@/lib/site-origin";

export function softwareProductJsonLd(content: SoftwareProductContent, productName: string) {
  const pageUrl = `${SITE_ORIGIN}${softwareProductPath(content.slug)}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "ERP Software", item: `${SITE_ORIGIN}/orbit-software` },
      { "@type": "ListItem", position: 3, name: productName, item: pageUrl },
    ],
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.seo.title,
    description: content.seo.description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: "Global Orbit", url: SITE_ORIGIN },
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productName,
    applicationCategory: content.applicationCategory,
    operatingSystem: "Web browser",
    description: content.intro,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "Global Orbit",
      url: SITE_ORIGIN,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      description: "Contact Global Orbit for licensing and implementation scope.",
    },
  };

  return { breadcrumbLd, webPageLd, softwareLd };
}
