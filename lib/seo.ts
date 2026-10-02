import type { Metadata } from "next";
import { FALLBACK_SITE } from "@/lib/site";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arnav.theglobalorbit.com";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetaInput): Metadata {
  const url = path.startsWith("http") ? path : `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
  const trimmedDescription = description.trim().slice(0, 160);

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title,
    description: trimmedDescription,
    keywords,
    alternates: {
      canonical: path.startsWith("/") ? path : `/${path}`,
    },
    openGraph: {
      title,
      description: trimmedDescription,
      locale: "en_NP",
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: trimmedDescription,
    },
    robots: {
      index: true,
      follow: true,
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
