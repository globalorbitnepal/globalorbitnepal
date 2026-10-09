import type { Metadata } from "next";
import { FALLBACK_SITE } from "@/lib/site";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arnav.theglobalorbit.com";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  canonical?: string;
  robotsIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  canonical,
  robotsIndex = true,
  ogTitle,
  ogDescription,
  ogImage,
}: PageMetaInput): Metadata {
  const url = path.startsWith("http") ? path : `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
  const trimmedDescription = description.trim().slice(0, 160);
  const ogDesc = (ogDescription || trimmedDescription).slice(0, 200);
  const canonicalPath = canonical?.trim() || (path.startsWith("/") ? path : `/${path}`);

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title,
    description: trimmedDescription,
    keywords,
    alternates: {
      canonical: canonicalPath.startsWith("http") ? canonicalPath : canonicalPath,
    },
    openGraph: {
      title: ogTitle?.trim() || title,
      description: ogDesc,
      locale: "en_NP",
      type: "website",
      url,
      ...(ogImage?.trim() ? { images: [{ url: ogImage.trim() }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle?.trim() || title,
      description: ogDesc,
      ...(ogImage?.trim() ? { images: [ogImage.trim()] } : {}),
    },
    robots: {
      index: robotsIndex,
      follow: robotsIndex,
    },
  };
}

export function organizationJsonLd(input: {
  name: string;
  description: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    description: input.description || FALLBACK_SITE.defaultSeoDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
      streetAddress: input.address || undefined,
    },
    email: input.email || undefined,
    telephone: input.phone || undefined,
    areaServed: ["NP"],
  };
}
