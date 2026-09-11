import type { Metadata } from "next";
import { FALLBACK_SITE } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      locale: "en_NP",
      type: "website",
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
