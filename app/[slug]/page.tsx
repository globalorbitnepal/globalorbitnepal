import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { NepalKeywordPageView } from "@/components/seo/nepal-keyword-page";
import { findNepalKeywordPage, NEPAL_KEYWORD_PAGES } from "@/lib/nepal-keyword-pages";
import { findBySlug, ORBIT_LANDINGS } from "@/lib/orbit/catalog";
import { applyPageSeo } from "@/lib/apply-page-seo";

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
  if (!item) return { title: "Global Orbit" };
  return applyPageSeo(item.href, { title: item.title, description: item.summary });
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
