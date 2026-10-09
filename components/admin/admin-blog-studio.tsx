"use client";

import { useMemo, useState } from "react";
import { AdminRichText } from "@/components/admin/admin-rich-text";
import { emptyPost, type BlogCategory, type BlogPost, type BlogTag } from "@/lib/blog-types";
import { htmlToPlainText } from "@/lib/sanitize-html";
import { scoreSeo } from "@/lib/seo-score";

type Mode = "list" | "compose" | "categories" | "tags";

type Props = {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  mode: Mode;
  busy: boolean;
  onPosts: (posts: BlogPost[]) => void;
  onCategories: (categories: BlogCategory[]) => void;
  onTags: (tags: BlogTag[]) => void;
  onSave: () => void;
  onMode: (mode: Mode) => void;
};

export function AdminBlogStudio({
  posts,
  categories,
  tags,
  mode,
  busy,
  onPosts,
  onCategories,
  onTags,
  onSave,
  onMode,
}: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [draft, setDraft] = useState<BlogPost>(emptyPost());
  const [catName, setCatName] = useState("");
  const [tagName, setTagName] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (status === "published" && !post.isPublished) return false;
      if (status === "draft" && post.isPublished) return false;
      if (categoryFilter && post.category !== categoryFilter) return false;
      if (query.trim() && !post.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [posts, query, status, categoryFilter]);

  const seo = useMemo(() => scoreSeo(draft), [draft]);

  function upsertPost(next: BlogPost, publish?: boolean) {
    if (!next.slug.trim() || !next.title.trim()) return;
    const saved = {
      ...next,
      updatedAt: new Date().toISOString(),
      isPublished: publish ?? next.isPublished,
      publishedAt: publish ? new Date().toISOString() : next.publishedAt,
    };
    const rest = posts.filter((item) => item.slug !== saved.slug);
    onPosts([saved, ...rest]);
    setDraft(saved);
  }

  async function uploadFeatured(file?: File) {
    if (!file) return;
    const form = new FormData();
    form.set("kind", "blogImage");
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = (await response.json()) as { url?: string; error?: string };
    if (data.url) setDraft((current) => ({ ...current, featuredImage: data.url || "", ogImage: current.ogImage || data.url || "" }));
  }

  if (mode === "categories") {
    return (
      <section className="go-cms-card">
        <h2>Categories</h2>
        <p className="go-cms-help">Used to group posts. Public listing can filter by category slug.</p>
        <div className="go-cms-inline">
          <input value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="Category name" />
          <button
            type="button"
            onClick={() => {
              const name = catName.trim();
              if (!name) return;
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              if (categories.some((item) => item.slug === slug)) return;
              onCategories([...categories, { slug, name, description: "" }]);
              setCatName("");
            }}
          >
            Add
          </button>
        </div>
        <ul className="go-cms-table">
          {categories.map((item) => (
            <li key={item.slug}>
              <strong>{item.name}</strong>
              <span>/{item.slug}</span>
              <button type="button" onClick={() => onCategories(categories.filter((cat) => cat.slug !== item.slug))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button type="button" disabled={busy} onClick={onSave}>
          Save taxonomy
        </button>
      </section>
    );
  }

  if (mode === "tags") {
    return (
      <section className="go-cms-card">
        <h2>Tags</h2>
        <div className="go-cms-inline">
          <input value={tagName} onChange={(e) => setTagName(e.target.value)} placeholder="Tag name" />
          <button
            type="button"
            onClick={() => {
              const name = tagName.trim();
              if (!name) return;
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              if (tags.some((item) => item.slug === slug)) return;
              onTags([...tags, { slug, name }]);
              setTagName("");
            }}
          >
            Add
          </button>
        </div>
        <ul className="go-cms-table">
          {tags.map((item) => (
            <li key={item.slug}>
              <strong>{item.name}</strong>
              <button type="button" onClick={() => onTags(tags.filter((tag) => tag.slug !== item.slug))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button type="button" disabled={busy} onClick={onSave}>
          Save taxonomy
        </button>
      </section>
    );
  }

  if (mode === "compose") {
    return (
      <div className="go-cms-compose">
        <div className="go-cms-compose-main">
          <input
            className="go-cms-title"
            value={draft.title}
            onChange={(e) => {
              const title = e.target.value;
              const slug =
                draft.slug ||
                title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");
              setDraft({ ...draft, title, slug });
            }}
            placeholder="Post title"
          />
          <label>
            URL slug
            <input
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
            />
          </label>
          <AdminRichText value={draft.body} onChange={(body) => setDraft({ ...draft, body })} />
          <p className="go-cms-help">
            {seo.wordCount} words · {seo.charCount} characters · {htmlToPlainText(draft.body).slice(0, 48)}
          </p>
        </div>
        <aside className="go-cms-compose-side">
          <section>
            <h3>Publish</h3>
            <label className="go-cms-check">
              <input
                type="checkbox"
                checked={draft.isPublished}
                onChange={(e) => setDraft({ ...draft, isPublished: e.target.checked })}
              />
              Published
            </label>
            <button type="button" onClick={() => upsertPost(draft, false)}>
              Save draft
            </button>
            <button type="button" className="is-primary" disabled={busy} onClick={() => { upsertPost(draft, true); onSave(); }}>
              Publish
            </button>
            <button type="button" onClick={() => onMode("list")}>
              Back to posts
            </button>
          </section>
          <section>
            <h3>Organization</h3>
            <label>
              Category
              <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                <option value="">None</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tags
              <input value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} placeholder="comma separated" />
            </label>
            <label>
              Excerpt
              <textarea value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
            </label>
            <label>
              Author
              <input value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
            </label>
          </section>
          <section>
            <h3>Featured image</h3>
            <input type="file" accept="image/*" onChange={(e) => void uploadFeatured(e.target.files?.[0])} />
            {draft.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={draft.featuredImage} alt={draft.featuredImageAlt} />
            ) : null}
            <label>
              Alt text
              <input value={draft.featuredImageAlt} onChange={(e) => setDraft({ ...draft, featuredImageAlt: e.target.value })} />
            </label>
          </section>
          <section>
            <h3>SEO · {seo.score}/100</h3>
            <p className="go-cms-help">Checklist score from saved fields — not a Google ranking.</p>
            <label>
              Meta title
              <input value={draft.seoTitle} onChange={(e) => setDraft({ ...draft, seoTitle: e.target.value })} />
              <small>{(draft.seoTitle || draft.title).length}/60</small>
            </label>
            <label>
              Meta description
              <textarea value={draft.seoDescription} onChange={(e) => setDraft({ ...draft, seoDescription: e.target.value })} />
              <small>{draft.seoDescription.length}/160</small>
            </label>
            <label>
              Focus keyword
              <input value={draft.focusKeyword} onChange={(e) => setDraft({ ...draft, focusKeyword: e.target.value })} />
            </label>
            <label>
              Canonical URL
              <input value={draft.canonical} onChange={(e) => setDraft({ ...draft, canonical: e.target.value })} />
            </label>
            <label className="go-cms-check">
              <input
                type="checkbox"
                checked={draft.robotsIndex}
                onChange={(e) => setDraft({ ...draft, robotsIndex: e.target.checked })}
              />
              Allow indexing
            </label>
            <ul className="go-cms-checks">
              {seo.checks.map((item) => (
                <li key={item.id} className={item.passed ? "is-ok" : "is-miss"}>
                  {item.passed ? "✓" : "–"} {item.label}
                  {item.passed ? null : <span>{item.hint}</span>}
                </li>
              ))}
            </ul>
            <div className="go-cms-serp">
              <strong>{draft.seoTitle || draft.title || "Untitled"}</strong>
              <em>https://arnav.theglobalorbit.com/blog/{draft.slug || "slug"}</em>
              <span>{draft.seoDescription || "Add a meta description."}</span>
            </div>
          </section>
        </aside>
      </div>
    );
  }

  return (
    <section className="go-cms-card">
      <div className="go-cms-toolbar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <button type="button" className="is-primary" onClick={() => { setDraft(emptyPost()); onMode("compose"); }}>
          Add new post
        </button>
      </div>
      <ul className="go-cms-posts">
        {filtered.map((post) => (
          <li key={post.slug}>
            <button
              type="button"
              onClick={() => {
                setDraft(post);
                onMode("compose");
              }}
            >
              <strong>{post.title}</strong>
              <span>
                {post.isPublished ? "Published" : "Draft"} · {post.category || "Uncategorized"} ·{" "}
                {new Date(post.updatedAt || post.publishedAt).toLocaleDateString()}
              </span>
            </button>
            <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
              Preview
            </a>
            <button type="button" onClick={() => onPosts(posts.filter((item) => item.slug !== post.slug))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {!filtered.length ? <p className="go-cms-help">No posts match this filter.</p> : null}
      <button type="button" disabled={busy} onClick={onSave}>
        Save posts
      </button>
    </section>
  );
}
