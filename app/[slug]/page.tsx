import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { NepalKeywordPageView } from "@/components/seo/nepal-keyword-page";
import { findNepalKeywordPage, NEPAL_KEYWORD_PAGES } from "@/lib/nepal-keyword-pages";
import { findBySlug, ORBIT_LANDINGS } from "@/lib/orbit/catalog";
import { applyPageSeo } from "@/lib/apply-page-seo";

/** Thinner landings that repeat a full service page. Canonical points at the page we want indexed. */
const CANONICAL_ALIAS: Record<string, string> = {
  "/website-development-nepal": "/service/website-development-nepal",
  "/web-development-nepal": "/service/website-development-nepal",
  "/seo-services-nepal": "/service/seo-optimization-nepal",
  "/ecommerce-website-development-nepal": "/service/ecommerce-development-nepal",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...ORBIT_LANDINGS.map((item) => ({ slug: item.slug })),
    ...NEPAL_KEYWORD_PAGES.map((item) => ({ slug: item.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const keyword = findNepalKeywordPage(slug);
  if (keyword) {
    return applyPageSeo(keyword.href, {
      title: keyword.title,
      description: keyword.description,
      keywords: [keyword.focus, "Global Orbit Nepal"],
    });
  }
  const item = findBySlug(ORBIT_LANDINGS, slug);
  if (!item) return { title: "Global Orbit", robots: { index: false, follow: false } };
  const alias = CANONICAL_ALIAS[item.href];
  return applyPageSeo(item.href, { title: item.title, description: item.summary, canonical: alias });
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const keyword = findNepalKeywordPage(slug);
  if (keyword) return <NepalKeywordPageView page={keyword} />;
  const item = findBySlug(ORBIT_LANDINGS, slug);
  if (!item) notFound();
  return (
    <OrbitArticlePage
      eyebrow="Nepal"
      title={item.title}
      summary={item.summary}
      path={item.href}
      breadcrumbParent={{ name: "Solutions", path: "/services" }}
    />
  );
}
