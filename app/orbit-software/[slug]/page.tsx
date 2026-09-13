import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { findBySlug, ORBIT_SOFTWARE } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ORBIT_SOFTWARE.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SOFTWARE, slug);
  if (!item) return { title: "Software" };
  return buildPageMetadata({ title: item.title, description: item.summary, path: item.href });
}

export default async function SoftwareDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SOFTWARE, slug);
  if (!item) notFound();
  return <OrbitArticlePage eyebrow="ERP Software" title={item.title} summary={item.summary} />;
}
