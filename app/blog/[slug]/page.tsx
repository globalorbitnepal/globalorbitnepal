import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { findBySlug, ORBIT_BLOGS } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ORBIT_BLOGS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(ORBIT_BLOGS, slug);
  if (!item) return { title: "Article" };
  return buildPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/blog/${item.slug}`,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findBySlug(ORBIT_BLOGS, slug);
  if (!item) notFound();
  return <OrbitArticlePage eyebrow="Blog" title={item.title} summary={item.summary} />;
}
