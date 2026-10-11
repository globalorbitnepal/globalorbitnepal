import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { AiAutomationPageView } from "@/components/services/ai-automation-page-view";
import { WebsiteDevelopmentPageView } from "@/components/services/website-development-page-view";
import { AI_FAQ, AI_HERO, AI_KEYWORDS } from "@/lib/ai-automation-page";
import { findBySlug, ORBIT_SERVICE_PAGES } from "@/lib/orbit/catalog";
import { applyPageSeo } from "@/lib/apply-page-seo";
import { WD_FAQ_EXTENDED, WD_HERO } from "@/lib/website-development-content";
import { SITE_ORIGIN } from "@/lib/site-origin";

type Props = { params: Promise<{ slug: string }> };

const WEBSITE_DEV_SLUG = "website-development-nepal";
const AI_AUTOMATION_SLUG = "ai-automation";

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
    return applyPageSeo(item.href, {
      title: "Website Development Nepal | Custom Business Websites | Global Orbit",
      description:
        "Website development in Nepal — custom business sites, e-commerce, hotel and travel websites, responsive design, and SEO-ready builds by Global Orbit Kathmandu.",
      keywords: WEBSITE_DEV_KEYWORDS,
    });
  }

  if (slug === AI_AUTOMATION_SLUG) {
    return applyPageSeo(item.href, {
      title: "AI Automation Nepal · Workflows, WhatsApp, Invoice Capture",
      description: AI_HERO.lede,
      keywords: AI_KEYWORDS,
    });
  }

  return applyPageSeo(item.href, { title: item.title, description: item.summary });
}

function aiAutomationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "AI Automation Nepal",
        description: AI_HERO.lede,
        provider: {
          "@type": "Organization",
          name: "Global Orbit",
          areaServed: { "@type": "Country", name: "Nepal" },
        },
        areaServed: "Nepal",
        serviceType: "AI workflow automation",
      },
      {
        "@type": "FAQPage",
        mainEntity: AI_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

function websiteDevJsonLd() {
  const pageUrl = `${SITE_ORIGIN}/service/website-development-nepal`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_ORIGIN}/services` },
          { "@type": "ListItem", position: 3, name: "Website Development Nepal", item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        name: "Website Development Nepal | Global Orbit",
        description: WD_HERO.lede,
        url: pageUrl,
      },
      {
        "@type": "Service",
        name: "Website Development Nepal",
        description: WD_HERO.lede,
        provider: {
          "@type": "Organization",
          name: "Global Orbit",
          areaServed: { "@type": "Country", name: "Nepal" },
        },
        areaServed: "Nepal",
        serviceType: "Website design and development",
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        mainEntity: WD_FAQ_EXTENDED.map((item) => ({
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

  if (slug === AI_AUTOMATION_SLUG) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiAutomationJsonLd()) }}
        />
        <AiAutomationPageView />
      </>
    );
  }

  return <OrbitArticlePage eyebrow="Service" title={item.title} summary={item.summary} />;
}
