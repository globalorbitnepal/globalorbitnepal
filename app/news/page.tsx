import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedPosts } from "@/lib/db/posts";
import { getSiteSettings } from "@/lib/db/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "News",
    description:
      "Notes and announcements from Global Orbit Nepal. This listing reads published Post records when they exist; it is empty until then.",
    path: "/news",
  });
}

function formatPostDate(value: Date | null) {
  if (!value) {
    return "Date to be confirmed";
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

export default async function NewsPage() {
  const [settings, posts] = await Promise.all([
    getSiteSettings(),
    listPublishedPosts(),
  ]);
  const companyName = settings?.companyName || FALLBACK_SITE.companyName;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${companyName} news`,
    description: "Published notes from Global Orbit Nepal.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="News"
        title="When there is something worth writing down."
        lede="This page lists published articles from the Global Orbit Nepal database. There are no placeholder stories here. If the list is empty, nothing has been published yet."
        headingId="news-hero-heading"
        primaryCta={{ href: "/contact", label: "Contact" }}
        secondaryCta={{ href: "/services", label: "Services" }}
      />
      <section className="py-16 sm:py-20" aria-labelledby="news-list-heading">
        <Container>
          <h2 id="news-list-heading" className="sr-only">
            Articles
          </h2>
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-[var(--color-paper)] px-6 py-16 text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
                No articles yet
              </p>
              <p className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-7 text-[var(--color-muted)]">
                Published <code className="text-[var(--color-ink)]">Post</code> rows
                with <code className="text-[var(--color-ink)]">isPublished</code> will
                appear here automatically. We will not invent news to fill the layout.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="ghost">
                  Ask to be notified
                </ButtonLink>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {posts.map((post) => (
                <li key={post.id} className="py-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {formatPostDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-tight">
                    <Link className="hover:text-[var(--color-brand)]" href={`/news/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-[var(--color-muted)]">
                      {post.excerpt}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
      <PageCta companyName={companyName} email={settings?.email || undefined} />
    </>
  );
}
