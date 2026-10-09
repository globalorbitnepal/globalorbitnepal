import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/orbit/blog-article";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog-store";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPostBySlug(slug);
  if (!item || !item.isPublished) return { title: "Article", robots: { index: false, follow: false } };
  return buildPageMetadata({
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    path: `/blog/${item.slug}`,
    keywords: item.keywords.split(",").map((value) => value.trim()).filter(Boolean),
    canonical: item.canonical || `/blog/${item.slug}`,
    robotsIndex: item.robotsIndex,
    ogTitle: item.ogTitle || item.seoTitle || item.title,
    ogDescription: item.ogDescription || item.seoDescription || item.excerpt,
    ogImage: item.ogImage || item.featuredImage,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPostBySlug(slug);
  if (!item || !item.isPublished) notFound();
  const related = (await getPublishedPosts())
    .filter((post) => post.slug !== item.slug && (post.category === item.category || !item.category))
    .slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: item.title,
    description: item.seoDescription || item.excerpt,
    image: item.featuredImage || undefined,
    author: { "@type": "Organization", name: item.author || "Global Orbit" },
    datePublished: item.publishedAt,
    dateModified: item.updatedAt || item.publishedAt,
    mainEntityOfPage: `https://arnav.theglobalorbit.com/blog/${item.slug}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogArticle post={item} related={related} />
    </>
  );
}
