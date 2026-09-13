import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { findBySlug, ORBIT_CAREERS } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ORBIT_CAREERS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(ORBIT_CAREERS, slug);
  if (!item) return { title: "Role" };
  return buildPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/careers/${item.slug}`,
  });
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findBySlug(ORBIT_CAREERS, slug);
  if (!item) notFound();
  return <OrbitArticlePage eyebrow="Careers" title={item.title} summary={item.summary} />;
}
