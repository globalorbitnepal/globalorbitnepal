import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { WebsiteDevelopmentPageView } from "@/components/services/website-development-page-view";
import { findBySlug, ORBIT_SERVICE_PAGES } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";
import { WEBSITE_DEV_FAQ, WEBSITE_DEV_HERO } from "@/lib/website-development-config";

type Props = { params: Promise<{ slug: string }> };

const WEBSITE_DEV_SLUG = "website-development-nepal";

const WEBSITE_DEV_KEYWORDS = [
  "website development nepal",
  "web design kathmandu",
  "custom website nepal",
  "professional website development",
  "Next.js website nepal",
  "SEO friendly website nepal",
  "business website kathmandu",
  "Global Orbit web development",
];

export function generateStaticParams() {
  return ORBIT_SERVICE_PAGES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SERVICE_PAGES, slug);
  if (!item) return { title: "Service" };

  if (slug === WEBSITE_DEV_SLUG) {
    return buildPageMetadata({
      title: "Website Development Nepal · Custom Web Design",
      description:
        "Professional website development in Nepal — original designs, Next.js builds, scroll-polished demos, and SEO-ready launches from Global Orbit Kathmandu.",
      path: item.href,
      keywords: WEBSITE_DEV_KEYWORDS,
    });
  }

  return buildPageMetadata({ title: item.title, description: item.summary, path: item.href });
}

function websiteDevJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Website Development Nepal",
        description: WEBSITE_DEV_HERO.lede,
        provider: {
          "@type": "Organization",
          name: "Global Orbit",
          areaServed: { "@type": "Country", name: "Nepal" },
        },
        areaServed: "Nepal",
        serviceType: "Website design and development",
      },
      {
        "@type": "FAQPage",
        mainEntity: WEBSITE_DEV_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SERVICE_PAGES, slug);
  if (!item) notFound();

  if (slug === WEBSITE_DEV_SLUG) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteDevJsonLd()) }}
        />
        <WebsiteDevelopmentPageView />
      </>
    );
  }

  return <OrbitArticlePage eyebrow="Service" title={item.title} summary={item.summary} />;
}
