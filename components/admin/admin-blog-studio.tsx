"use client";

import { useMemo, useState } from "react";
import { AdminMediaLibrary } from "@/components/admin/admin-media-library";
import { AdminRichText } from "@/components/admin/admin-rich-text";
import { POST_STATUS_LABEL, postStatus, type PostStatus } from "@/lib/blog-status";
import { emptyPost, type BlogCategory, type BlogPost, type BlogTag } from "@/lib/blog-types";
import { scoreSeo } from "@/lib/seo-score";

export type BlogMode = "list" | "compose" | "categories" | "tags" | "drafts" | "seo-overview";

type Props = {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  mode: BlogMode;
  composeSlug?: string;
  onPosts: (posts: BlogPost[]) => void;
  onCategories: (categories: BlogCategory[]) => void;
  onTags: (tags: BlogTag[]) => void;
  onMode: (mode: BlogMode, slug?: string) => void;
};

const PAGE_SIZE = 8;

function toDatetimeLocal(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function AdminBlogStudio({
  posts,
  categories,
  tags,
  mode,
  composeSlug,
  onPosts,
  onCategories,
  onTags,
  onMode,
}: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | PostStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState<"date" | "title">("date");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [draft, setDraft] = useState<BlogPost>(() =>
    composeSlug ? posts.find((item) => item.slug === composeSlug) || emptyPost() : emptyPost(),
  );
  const [tab, setTab] = useState<"post" | "image" | "seo">("post");
  const [picker, setPicker] = useState<"featured" | "body" | null>(null);
  const [savedAt, setSavedAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [catDraft, setCatDraft] = useState({ slug: "", name: "", description: "" });
  const [tagDraft, setTagDraft] = useState({ slug: "", name: "" });

  const activeStatus: "all" | PostStatus = mode === "drafts" ? "draft" : status;

  const filtered = useMemo(() => {
    const rows = posts.filter((post) => {
      if (activeStatus !== "all" && postStatus(post) !== activeStatus) return false;
      if (categoryFilter && post.category !== categoryFilter) return false;
      if (query.trim() && !post.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      if (month && !post.publishedAt.startsWith(month)) return false;
      return true;
    });
    rows.sort((a, b) =>
      sort === "title"
        ? a.title.localeCompare(b.title)
        : Date.parse(b.updatedAt || b.publishedAt) - Date.parse(a.updatedAt || a.publishedAt),
    );
    return rows;
  }, [posts, query, activeStatus, categoryFilter, sort, month]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const seo = useMemo(() => scoreSeo(draft), [draft]);

  async function persist(nextPosts: BlogPost[], nextCats = categories, nextTags = tags) {
    setBusy(true);
    setError("");
    onPosts(nextPosts);
    onCategories(nextCats);
    onTags(nextTags);
    const response = await fetch("/api/orbit/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts: nextPosts, categories: nextCats, tags: nextTags }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Could not save.");
      return false;
    }
    setSavedAt(new Date().toLocaleTimeString());
    setMessage("Saved. Public pages were revalidated.");
    return true;
  }

  function upsert(next: BlogPost, publish?: boolean) {
    if (!next.title.trim() || !next.slug.trim()) {
      setError("Title and slug are required.");
      return posts;
    }
    const saved = {
      ...next,
      updatedAt: new Date().toISOString(),
      isPublished: publish === undefined ? next.isPublished : publish,
    };
    return [saved, ...posts.filter((item) => item.slug !== saved.slug)];
  }

  async function saveDraft() {
    const next = upsert({ ...draft, isPublished: false }, false);
    setDraft(next[0]);
    await persist(next);
  }

  async function publish() {
    const publishedAt = Date.parse(draft.publishedAt) > Date.now() ? draft.publishedAt : new Date().toISOString();
    const next = upsert({ ...draft, isPublished: true, publishedAt }, true);
    setDraft(next[0]);
    await persist(next);
  }

  function duplicate(post: BlogPost) {
    const copy = {
      ...post,
      slug: `${post.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${post.title} (copy)`,
      isPublished: false,
      updatedAt: new Date().toISOString(),
    };
    onPosts([copy, ...posts]);
    onMode("compose", copy.slug);
  }

  async function remove(slugs: string[]) {
    if (!slugs.length) return;
    if (!window.confirm(`Delete ${slugs.length} post(s)? This cannot be undone.`)) return;
    setSelected([]);
    await persist(posts.filter((item) => !slugs.includes(item.slug)));
  }

  if (mode === "categories") {
    return (
      <section className="go-cms-card">
        <h2>Categories</h2>
        {error ? <p className="go-cms-error">{error}</p> : null}
        <div className="go-cms-form">
          <input placeholder="Name" value={catDraft.name} onChange={(e) => setCatDraft({ ...catDraft, name: e.target.value, slug: catDraft.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} />
          <input placeholder="slug" value={catDraft.slug} onChange={(e) => setCatDraft({ ...catDraft, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} />
          <textarea placeholder="Description" value={catDraft.description} onChange={(e) => setCatDraft({ ...catDraft, description: e.target.value })} />
          <button
            type="button"
            className="is-primary"
            onClick={() => {
              if (!catDraft.name.trim() || !catDraft.slug.trim()) return;
              if (categories.some((item) => item.slug === catDraft.slug && item.slug !== catDraft.slug)) return;
              const rest = categories.filter((item) => item.slug !== catDraft.slug);
              const next = [...rest, { ...catDraft }];
              void persist(posts, next, tags);
              setCatDraft({ slug: "", name: "", description: "" });
            }}
          >
            Save category
          </button>
        </div>
        <ul className="go-cms-table">
          {categories.map((item) => (
            <li key={item.slug}>
              <button type="button" onClick={() => setCatDraft(item)}>
                <strong>{item.name}</strong>
                <span>/{item.slug}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!window.confirm("Delete this category? Posts keep their current category slug until edited.")) return;
                  void persist(posts, categories.filter((cat) => cat.slug !== item.slug), tags);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (mode === "tags") {
    return (
      <section className="go-cms-card">
        <h2>Tags</h2>
        {error ? <p className="go-cms-error">{error}</p> : null}
        <div className="go-cms-inline">
          <input placeholder="Tag name" value={tagDraft.name} onChange={(e) => setTagDraft({ name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} />
          <input placeholder="slug" value={tagDraft.slug} onChange={(e) => setTagDraft({ ...tagDraft, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} />
          <button
            type="button"
            className="is-primary"
            onClick={() => {
              if (!tagDraft.name.trim() || !tagDraft.slug.trim()) return;
              if (tags.some((item) => item.slug === tagDraft.slug)) {
                setError("That tag slug already exists.");
                return;
              }
              void persist(posts, categories, [...tags, tagDraft]);
              setTagDraft({ slug: "", name: "" });
            }}
          >
            Add tag
          </button>
        </div>
        <ul className="go-cms-table">
          {tags.map((item) => (
            <li key={item.slug}>
              <strong>{item.name}</strong>
              <span>/{item.slug}</span>
              <button type="button" onClick={() => void persist(posts, categories, tags.filter((tag) => tag.slug !== item.slug))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (mode === "seo-overview") {
    return (
      <section className="go-cms-card">
        <h2>SEO overview</h2>
        <p className="go-cms-help">Checklist scores from saved content. This is not a Google ranking.</p>
        <div className="go-cms-tablewrap">
          <table className="go-cms-grid">
            <thead>
              <tr>
                <th>Post</th>
                <th>Score</th>
                <th>Missing</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const result = scoreSeo(post);
                const missing = result.checks.filter((item) => !item.passed).slice(0, 3);
                return (
                  <tr key={post.slug}>
                    <td>{post.title}</td>
                    <td>{result.score}</td>
                    <td>{missing.map((item) => item.label).join("; ") || "All checks passed"}</td>
                    <td>
                      <button type="button" onClick={() => onMode("compose", post.slug)}>
                        Edit SEO
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (mode === "compose") {
    return (
      <div className="go-cms-compose">
        {picker ? (
          <div className="go-cms-picker">
            <button type="button" onClick={() => setPicker(null)}>
              Close library
            </button>
            <AdminMediaLibrary
              picker
              onSelect={(item) => {
                if (picker === "featured") {
                  setDraft((current) => ({
                    ...current,
                    featuredImage: item.url,
                    ogImage: current.ogImage || item.url,
                  }));
                } else {
                  setDraft((current) => ({
                    ...current,
                    body: `${current.body}<p><img src="${item.url}" alt="" /></p>`,
                  }));
                }
                setPicker(null);
              }}
            />
          </div>
        ) : null}
        <div className="go-cms-compose-main">
          <div className="go-cms-composer-top">
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
            <p className="go-cms-help">
              {POST_STATUS_LABEL[postStatus(draft)]} · {seo.wordCount} words · {seo.charCount} characters
              {savedAt ? ` · Last saved ${savedAt}` : " · Not saved yet"}
            </p>
            <div className="go-cms-row">
              <button type="button" disabled={busy} onClick={() => void saveDraft()}>
                Save draft
              </button>
              <a href={draft.slug ? `/blog/${draft.slug}?preview=1` : "#"} target="_blank" rel="noreferrer">
                Preview
              </a>
              <button type="button" className="is-primary" disabled={busy} onClick={() => void publish()}>
                {draft.isPublished && postStatus(draft) !== "scheduled" ? "Update" : "Publish"}
              </button>
            </div>
            {error ? <p className="go-cms-error">{error}</p> : null}
            {message ? <p className="go-cms-toast">{message}</p> : null}
          </div>
          <AdminRichText value={draft.body} onChange={(body) => setDraft({ ...draft, body })} onRequestImage={() => setPicker("body")} />
          <label>
            Excerpt
            <textarea value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
          </label>
        </div>
        <aside className="go-cms-compose-side">
          <div className="go-cms-tabs">
            <button type="button" className={tab === "post" ? "is-active" : ""} onClick={() => setTab("post")}>
              Post
            </button>
            <button type="button" className={tab === "image" ? "is-active" : ""} onClick={() => setTab("image")}>
              Featured image
            </button>
            <button type="button" className={tab === "seo" ? "is-active" : ""} onClick={() => setTab("seo")}>
              SEO {seo.score}
            </button>
          </div>
          {tab === "post" ? (
            <section>
              <label>
                Status
                <select
                  value={postStatus(draft)}
                  onChange={(e) => {
                    const value = e.target.value as PostStatus;
                    if (value === "draft") setDraft({ ...draft, isPublished: false });
                    if (value === "published") setDraft({ ...draft, isPublished: true, publishedAt: new Date().toISOString() });
                    if (value === "scheduled") setDraft({ ...draft, isPublished: true });
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </label>
              <label>
                Publication date
                <input
                  type="datetime-local"
                  value={toDatetimeLocal(draft.publishedAt)}
                  onChange={(e) => setDraft({ ...draft, publishedAt: new Date(e.target.value).toISOString() })}
                />
              </label>
              <label>
                Author
                <input value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
              </label>
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
            </section>
          ) : null}
          {tab === "image" ? (
            <section>
              {draft.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={draft.featuredImage} alt={draft.featuredImageAlt || draft.title} />
              ) : (
                <p className="go-cms-empty">No featured image.</p>
              )}
              <button type="button" onClick={() => setPicker("featured")}>
                Choose from library
              </button>
              <label>
                Upload
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const form = new FormData();
                    form.set("kind", "blogImage");
                    form.set("file", file);
                    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
                    const data = (await response.json()) as { url?: string };
                    if (data.url) setDraft((current) => ({ ...current, featuredImage: data.url || "", ogImage: current.ogImage || data.url || "" }));
                  }}
                />
              </label>
              <button type="button" onClick={() => setDraft({ ...draft, featuredImage: "", featuredImageAlt: "" })}>
                Remove image
              </button>
              <label>
                Alt text
                <input value={draft.featuredImageAlt} onChange={(e) => setDraft({ ...draft, featuredImageAlt: e.target.value })} />
              </label>
            </section>
          ) : null}
          {tab === "seo" ? (
            <section>
              <p className="go-cms-score">{seo.score}/100 checklist</p>
              <p className="go-cms-help">Not a Google ranking. Fix the missing checks below.</p>
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
                Keywords
                <input value={draft.keywords} onChange={(e) => setDraft({ ...draft, keywords: e.target.value })} />
              </label>
              <label>
                Canonical URL
                <input value={draft.canonical} onChange={(e) => setDraft({ ...draft, canonical: e.target.value })} />
              </label>
              <label className="go-cms-check">
                <input type="checkbox" checked={draft.robotsIndex} onChange={(e) => setDraft({ ...draft, robotsIndex: e.target.checked })} />
                Allow indexing
              </label>
              <label>
                Open Graph title
                <input value={draft.ogTitle} onChange={(e) => setDraft({ ...draft, ogTitle: e.target.value })} />
              </label>
              <label>
                Open Graph description
                <textarea value={draft.ogDescription} onChange={(e) => setDraft({ ...draft, ogDescription: e.target.value })} />
              </label>
              <label>
                Open Graph image
                <input value={draft.ogImage} onChange={(e) => setDraft({ ...draft, ogImage: e.target.value })} />
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
                <p>Search preview</p>
                <strong>{draft.seoTitle || draft.title || "Untitled"}</strong>
                <em>https://arnav.theglobalorbit.com/blog/{draft.slug || "slug"}</em>
                <span>{draft.seoDescription || "Add a meta description."}</span>
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    );
  }

  return (
    <section className="go-cms-card">
      <div className="go-cms-headrow">
        <h2>{mode === "drafts" ? "Drafts" : "Blog Posts"}</h2>
        <button type="button" className="is-primary" onClick={() => onMode("compose")}>
          Add New Post
        </button>
      </div>
      {error ? <p className="go-cms-error">{error}</p> : null}
      {message ? <p className="go-cms-toast">{message}</p> : null}
      <div className="go-cms-toolbar">
        <input
          value={query}
          onChange={(e) => {
            setPage(1);
            setQuery(e.target.value);
          }}
          placeholder="Search by title"
        />
        <select
          value={activeStatus}
          disabled={mode === "drafts"}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as "all" | PostStatus);
          }}
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => {
            setPage(1);
            setCategoryFilter(e.target.value);
          }}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <input type="month" value={month} onChange={(e) => { setPage(1); setMonth(e.target.value); }} aria-label="Filter by month" />
        <select value={sort} onChange={(e) => setSort(e.target.value as "date" | "title")}>
          <option value="date">Sort by date</option>
          <option value="title">Sort by title</option>
        </select>
        {selected.length ? (
          <button type="button" onClick={() => void remove(selected)}>
            Delete selected ({selected.length})
          </button>
        ) : null}
      </div>
      {!filtered.length ? <p className="go-cms-empty">No posts match this filter.</p> : null}
      <div className="go-cms-tablewrap">
        <table className="go-cms-grid">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={Boolean(rows.length) && rows.every((item) => selected.includes(item.slug))}
                  onChange={(e) => setSelected(e.target.checked ? rows.map((item) => item.slug) : [])}
                  aria-label="Select page"
                />
              </th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>SEO</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((post) => (
              <tr key={post.slug}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(post.slug)}
                    onChange={(e) =>
                      setSelected((current) => (e.target.checked ? [...current, post.slug] : current.filter((slug) => slug !== post.slug)))
                    }
                    aria-label={`Select ${post.title}`}
                  />
                </td>
                <td>
                  {post.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="go-cms-thumb" src={post.featuredImage} alt="" />
                  ) : (
                    <span className="go-cms-thumb is-empty" />
                  )}
                </td>
                <td>
                  <button type="button" onClick={() => onMode("compose", post.slug)}>
                    {post.title}
                  </button>
                </td>
                <td>{categories.find((item) => item.slug === post.category)?.name || post.category || "—"}</td>
                <td>{post.author}</td>
                <td>{new Date(post.publishedAt).toLocaleDateString()}</td>
                <td>{scoreSeo(post).score}</td>
                <td>{POST_STATUS_LABEL[postStatus(post)]}</td>
                <td className="go-cms-actions">
                  <button type="button" onClick={() => onMode("compose", post.slug)}>
                    Edit
                  </button>
                  <a href={`/blog/${post.slug}${postStatus(post) === "published" ? "" : "?preview=1"}`} target="_blank" rel="noreferrer">
                    Preview
                  </a>
                  <button type="button" onClick={() => duplicate(post)}>
                    Duplicate
                  </button>
                  <button type="button" onClick={() => void remove([post.slug])}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="go-cms-pager">
        <button type="button" disabled={page <= 1} onClick={() => setPage((n) => n - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {pageCount}
        </span>
        <button type="button" disabled={page >= pageCount} onClick={() => setPage((n) => n + 1)}>
          Next
        </button>
      </div>
    </section>
  );
}
