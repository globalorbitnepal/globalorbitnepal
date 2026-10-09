import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/orbit/blog-article";
import { isPublicPost } from "@/lib/blog-status";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const preview = (await searchParams).preview === "1";
  const item = await getPostBySlug(slug);
  const authed = preview ? await isOrbitAuthed() : false;
  if (!item || (!isPublicPost(item) && !authed)) return { title: "Article", robots: { index: false, follow: false } };
  return buildPageMetadata({
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    path: `/blog/${item.slug}`,
    keywords: item.keywords.split(",").map((value) => value.trim()).filter(Boolean),
    canonical: item.canonical || `/blog/${item.slug}`,
    robotsIndex: isPublicPost(item) ? item.robotsIndex : false,
    ogTitle: item.ogTitle || item.seoTitle || item.title,
    ogDescription: item.ogDescription || item.seoDescription || item.excerpt,
    ogImage: item.ogImage || item.featuredImage,
  });
}

export default async function BlogDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const preview = (await searchParams).preview === "1";
  const item = await getPostBySlug(slug);
  const authed = preview ? await isOrbitAuthed() : false;
  if (!item || (!isPublicPost(item) && !authed)) notFound();
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
      {isPublicPost(item) ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : (
        <p className="go-article-meta" style={{ maxWidth: "44rem", margin: "5rem auto 0", padding: "0 1rem" }}>
          Private preview — not in the sitemap.
        </p>
      )}
      <BlogArticle post={item} related={related} />
    </>
  );
}
