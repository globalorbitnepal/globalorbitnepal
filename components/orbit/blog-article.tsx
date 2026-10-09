import Link from "next/link";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import type { BlogPost } from "@/lib/blog-types";
import { looksLikeHtml } from "@/lib/sanitize-html";

function serverSanitize(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

export function BlogArticle({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const html = looksLikeHtml(post.body)
    ? serverSanitize(post.body)
    : `<p>${post.body
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((paragraph) => paragraph.replace(/</g, "&lt;"))
        .join("</p><p>")}</p>`;
  const published = post.publishedAt ? new Date(post.publishedAt) : null;

  return (
    <>
      <OrbitPageHero eyebrow={post.category || "Blog"} title={post.title} lede={post.excerpt} headingId="article-hero" />
      <article className="go-article">
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="go-article-heroimg" src={post.featuredImage} alt={post.featuredImageAlt || post.title} />
        ) : null}
        <p className="go-article-meta">
          {post.author}
          {published && !Number.isNaN(published.getTime())
            ? ` · ${published.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
            : null}
          {post.tags ? ` · ${post.tags}` : null}
        </p>
        <div className="go-article-body" dangerouslySetInnerHTML={{ __html: html }} />
        <Link href="/contact" className="orbit-btn-gold mt-8 inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
          Get Free Consultation
        </Link>
      </article>
      {related.length ? (
        <section className="go-article-related">
          <h2>Related notes</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <OrbitCtaBand />
    </>
  );
}
