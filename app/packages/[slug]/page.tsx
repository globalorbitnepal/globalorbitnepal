import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { findBySlug, ORBIT_PACKAGES } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ORBIT_PACKAGES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(ORBIT_PACKAGES, slug);
  if (!item) return { title: "Package" };
  return buildPageMetadata({ title: item.title, description: item.summary, path: item.href });
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findBySlug(ORBIT_PACKAGES, slug);
  if (!item) notFound();
  return <OrbitArticlePage eyebrow="Package" title={`${item.title} — ${item.price}`} summary={item.summary} />;
}
