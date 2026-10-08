import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { getPostBySlug } from "@/lib/blog-store";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPostBySlug(slug);
  if (!item || !item.isPublished) return { title: "Article" };
  return buildPageMetadata({
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    path: `/blog/${item.slug}`,
    keywords: item.keywords.split(",").map((value) => value.trim()).filter(Boolean),
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPostBySlug(slug);
  if (!item || !item.isPublished) notFound();
  return (
    <OrbitArticlePage
      eyebrow="Blog"
      title={item.title}
      summary={item.excerpt || item.seoDescription}
      body={item.body}
    />
  );
}
