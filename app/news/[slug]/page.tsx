import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/lib/db/posts";
import { getSiteSettings } from "@/lib/db/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";
import { PageCta } from "@/components/site/page-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

type NewsArticleProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Article" };
  }
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt || post.title,
    path: `/news/${post.slug}`,
  });
}

export default async function NewsArticlePage({ params }: NewsArticleProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPublishedPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  const companyName = settings?.companyName || FALLBACK_SITE.companyName;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt?.toISOString(),
    articleBody: post.body,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="bg-[var(--color-hero)] py-16 text-[var(--color-hero-ink)] sm:py-24">
          <Container>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-copper-light)]">
              News
            </p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-5 max-w-2xl text-white/70">{post.excerpt}</p>
            ) : null}
          </Container>
        </header>
        <Container className="py-16">
          <div className="max-w-2xl whitespace-pre-wrap text-base leading-8 text-[var(--color-muted)]">
            {post.body || "This article has no body yet."}
          </div>
          <p className="mt-12">
            <ButtonLink href="/news" variant="ghost">
              Back to news
            </ButtonLink>
          </p>
        </Container>
      </article>
      <PageCta companyName={companyName} email={settings?.email || undefined} />
    </>
  );
}
