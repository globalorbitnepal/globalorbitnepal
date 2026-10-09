"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminBlogStudio } from "@/components/admin/admin-blog-studio";
import { AdminInquiriesPanel } from "@/components/admin/admin-inquiries-panel";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { OrbitAppointmentsPanel } from "@/components/orbit/orbit-appointments-panel";
import {
  ADMIN_PAGES,
  adminPageById,
  type AdminPage,
  type AdminPageId,
  type EditorSection,
} from "@/lib/admin-nav";
import type { AboutConfig } from "@/lib/about-config";
import type { CareersConfig } from "@/lib/careers-config";
import type { CustomAppsConfig } from "@/lib/custom-apps-config";
import type { ProjectsConfig } from "@/lib/projects-config";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig } from "@/lib/need-config";
import type { WorkConfig } from "@/lib/work-config";
import type { SoftwareConfig } from "@/lib/software-config";
import type { BlogCategory, BlogPost, BlogTag } from "@/lib/blog-types";
import type { PageSeo } from "@/lib/page-seo-store";
import type { SiteChrome } from "@/lib/site-chrome-store";
import { scoreSeo } from "@/lib/seo-score";

type AdminView =
  | "overview"
  | "page"
  | "blogs"
  | "compose"
  | "categories"
  | "tags"
  | "media"
  | "seo"
  | "chrome"
  | "inquiries";

type InquiryPreview = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  createdAt: string;
  status: string;
};

type MediaItem = { name: string; url: string; size: number; kind: string; updatedAt: string };

type Props = {
  initial: HeroConfig;
  initialNeed: NeedConfig;
  initialWork: WorkConfig;
  initialSoftware: SoftwareConfig;
  initialAbout: AboutConfig;
  initialCareers: CareersConfig;
  initialProjects: ProjectsConfig;
  initialWebApps: CustomAppsConfig;
  initialAndroidApps: CustomAppsConfig;
  initialIosApps: CustomAppsConfig;
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  pages: PageSeo[];
  chrome: SiteChrome;
  inquiryNew: number;
  inquiryTotal: number;
  recentInquiries: InquiryPreview[];
};

function readHash() {
  if (typeof window === "undefined") {
    return { view: "overview" as AdminView, pageId: "home" as AdminPageId, section: "hero" as EditorSection | "seo" };
  }
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return {
    view: (hash.get("view") || "overview") as AdminView,
    pageId: (hash.get("page") || "home") as AdminPageId,
    section: (hash.get("section") || "hero") as EditorSection | "seo",
  };
}

function writeHash(view: AdminView, pageId?: string, section?: string) {
  const params = new URLSearchParams();
  params.set("view", view);
  if (pageId) params.set("page", pageId);
  if (section) params.set("section", section);
  window.location.hash = params.toString();
}

export function AdminApp(props: Props) {
  const router = useRouter();
  const start = readHash();
  const [collapsed, setCollapsed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [view, setView] = useState<AdminView>(start.view);
  const [pageId, setPageId] = useState<AdminPageId>(start.pageId);
  const [section, setSection] = useState<EditorSection | "seo">(start.section);
  const [expanded, setExpanded] = useState<AdminPageId | null>(start.pageId);
  const [posts, setPosts] = useState(props.posts);
  const [categories, setCategories] = useState(props.categories);
  const [tags, setTags] = useState(props.tags);
  const [pages, setPages] = useState(props.pages);
  const [chrome, setChrome] = useState(props.chrome);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [accountOpen, setAccountOpen] = useState(false);

  const page = adminPageById(pageId) ?? ADMIN_PAGES[0];
  const publishedPosts = posts.filter((item) => item.isPublished);
  const draftPosts = posts.filter((item) => !item.isPublished);
  const missingSeo = pages.filter((item) => !item.seoTitle.trim() || !item.seoDescription.trim());

  const filteredPages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ADMIN_PAGES;
    return ADMIN_PAGES.filter((item) => `${item.label} ${item.path}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    document.body.classList.add("go-cms-open");
    document.body.classList.remove("admin-locked", "go-dash-open");
    return () => document.body.classList.remove("go-cms-open");
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = readHash();
      setView(next.view);
      if (adminPageById(next.pageId)) {
        setPageId(next.pageId);
        setExpanded(next.pageId);
      }
      setSection(next.section);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (view !== "media") return;
    void fetch("/api/orbit/media")
      .then((response) => response.json())
      .then((data: { items?: MediaItem[] }) => setMedia(data.items || []));
  }, [view]);

  function go(next: AdminView, nextPage?: AdminPage, nextSection?: EditorSection | "seo") {
    setView(next);
    setNavOpen(false);
    if (nextPage) {
      setPageId(nextPage.id);
      setExpanded(nextPage.id);
      const sectionId = nextSection || nextPage.sections[0]?.id || "seo";
      setSection(sectionId);
      writeHash(next, nextPage.id, sectionId);
      return;
    }
    writeHash(next);
  }

  async function logout() {
    await fetch("/api/orbit/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  async function savePosts() {
    setBusy(true);
    const response = await fetch("/api/orbit/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts, categories, tags }),
    });
    setBusy(false);
    setStatus(response.ok ? "Blog saved and public pages revalidated." : "Could not save blog.");
  }

  async function saveSeo() {
    setBusy(true);
    const response = await fetch("/api/orbit/page-seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages }),
    });
    setBusy(false);
    setStatus(response.ok ? "Page SEO published." : "Could not save SEO.");
  }

  async function saveChrome() {
    setBusy(true);
    const response = await fetch("/api/orbit/chrome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chrome),
    });
    setBusy(false);
    setStatus(response.ok ? "Header and footer identity published." : "Could not save settings.");
  }

  const title =
    view === "overview"
      ? "Dashboard"
      : view === "inquiries"
        ? "Inquiries"
        : view === "chrome"
          ? "Header & footer"
          : view === "blogs" || view === "compose"
            ? "Blog"
            : view === "categories"
              ? "Categories"
              : view === "tags"
                ? "Tags"
                : view === "media"
                  ? "Media library"
                  : view === "seo"
                    ? `SEO · ${page.label}`
                    : page.label;

  const showEditor = view === "page" && section !== "seo" && Boolean(page.editor);
  const showSeo = (view === "page" && (section === "seo" || page.seoOnly)) || view === "seo";
  const seoPage = pages.find((item) => item.path === page.path);

  return (
    <div className={`go-cms ${collapsed ? "is-collapsed" : ""}`}>
      <button type="button" className="go-cms-burger" onClick={() => setNavOpen((v) => !v)}>
        {navOpen ? "Close" : "Menu"}
      </button>
      <aside className={`go-cms-side ${navOpen ? "is-open" : ""}`}>
        <div className="go-cms-brand">
          <span className="go-cms-mark" />
          {collapsed ? null : <strong>GLOBAL ORBIT</strong>}
          <button type="button" className="go-cms-collapse" onClick={() => setCollapsed((v) => !v)} aria-label="Collapse sidebar">
            ‹
          </button>
        </div>
        <nav>
          <p>Overview</p>
          <button type="button" className={view === "overview" ? "is-active" : ""} onClick={() => go("overview")}>
            <i /> Dashboard
          </button>
          <p>Website</p>
          {filteredPages.map((item) => (
            <div key={item.id}>
              <button
                type="button"
                className={view === "page" && pageId === item.id ? "is-active" : ""}
                onClick={() => {
                  setExpanded((current) => (current === item.id ? null : item.id));
                  go("page", item, item.sections[0]?.id);
                }}
              >
                <i /> {item.label}
              </button>
              {expanded === item.id && !collapsed
                ? item.sections.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      className={`is-sub ${view === "page" && pageId === item.id && section === sub.id ? "is-active" : ""}`}
                      onClick={() => go("page", item, sub.id)}
                    >
                      {sub.label}
                    </button>
                  ))
                : null}
            </div>
          ))}
          <p>Blog & content</p>
          <button type="button" className={view === "blogs" ? "is-active" : ""} onClick={() => go("blogs")}>
            <i /> All posts
          </button>
          <button type="button" className={view === "compose" ? "is-active" : ""} onClick={() => go("compose")}>
            <i /> Add new post
          </button>
          <button type="button" className={view === "categories" ? "is-active" : ""} onClick={() => go("categories")}>
            <i /> Categories
          </button>
          <button type="button" className={view === "tags" ? "is-active" : ""} onClick={() => go("tags")}>
            <i /> Tags
          </button>
          <button type="button" className={view === "media" ? "is-active" : ""} onClick={() => go("media")}>
            <i /> Media library
          </button>
          <p>SEO</p>
          <button type="button" className={view === "seo" ? "is-active" : ""} onClick={() => go("seo")}>
            <i /> Page metadata
          </button>
          <p>Global</p>
          <button type="button" className={view === "chrome" ? "is-active" : ""} onClick={() => go("chrome")}>
            <i /> Header & footer
          </button>
          <p>Business</p>
          <button type="button" className={view === "inquiries" ? "is-active" : ""} onClick={() => go("inquiries")}>
            <i /> All inquiries {props.inquiryNew ? <em>{props.inquiryNew}</em> : null}
          </button>
        </nav>
      </aside>

      <div className="go-cms-main">
        <header className="go-cms-top">
          <div>
            <p className="go-cms-crumb">{view === "overview" ? "Overview" : title}</p>
            <h1>{title}</h1>
            {view === "overview" ? <p className="go-cms-lede">Manage your website, content and business from one place.</p> : null}
          </div>
          <div className="go-cms-tools">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages, posts, media, inquiries…" />
            <Link href={page.path} target="_blank" rel="noreferrer">
              Preview
            </Link>
            <div className="go-cms-account">
              <button type="button" onClick={() => setAccountOpen((v) => !v)}>
                Admin
              </button>
              {accountOpen ? (
                <div className="go-cms-menu">
                  <button type="button" onClick={() => void logout()}>
                    Log out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        {status ? <p className="go-cms-toast">{status}</p> : null}

        {view === "overview" ? (
          <div className="go-cms-home">
            <div className="go-cms-kpis">
              <button type="button" onClick={() => go("page", ADMIN_PAGES[0], "hero")}>
                <span className="is-blue" />
                <p>Total pages</p>
                <strong>{pages.length}</strong>
                <small>{pages.filter((item) => item.robotsIndex !== false).length} indexed</small>
              </button>
              <button type="button" onClick={() => go("blogs")}>
                <span className="is-green" />
                <p>Blog posts</p>
                <strong>{posts.length}</strong>
                <small>
                  Published {publishedPosts.length} · Draft {draftPosts.length}
                </small>
              </button>
              <button type="button" onClick={() => go("inquiries")}>
                <span className="is-orange" />
                <p>New inquiries</p>
                <strong>{props.inquiryNew}</strong>
                <small>Awaiting follow-up</small>
              </button>
              <button type="button" onClick={() => go("inquiries")}>
                <span className="is-purple" />
                <p>All inquiries</p>
                <strong>{props.inquiryTotal}</strong>
                <small>Total inquiries stored</small>
              </button>
            </div>
            <div className="go-cms-split">
              <section className="go-cms-card">
                <header>
                  <h2>Recent website pages</h2>
                  <button type="button" onClick={() => go("page", ADMIN_PAGES[0])}>
                    View all
                  </button>
                </header>
                <ul className="go-cms-rows">
                  {ADMIN_PAGES.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={() => go("page", item)}>
                        <strong>{item.label}</strong>
                        <span>{item.path}</span>
                      </button>
                      <em>Published</em>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="go-cms-card">
                <header>
                  <h2>Recent blog posts</h2>
                  <button type="button" onClick={() => go("blogs")}>
                    View all
                  </button>
                </header>
                {publishedPosts.length ? (
                  <ul className="go-cms-rows">
                    {publishedPosts.slice(0, 4).map((post) => (
                      <li key={post.slug}>
                        <button type="button" onClick={() => go("compose")}>
                          <strong>{post.title}</strong>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </button>
                        <em>{post.isPublished ? "Published" : "Draft"}</em>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="go-cms-empty">No published posts yet.</p>
                )}
              </section>
              <section className="go-cms-card">
                <header>
                  <h2>Latest inquiries</h2>
                  <button type="button" onClick={() => go("inquiries")}>
                    View all
                  </button>
                </header>
                {props.recentInquiries.length ? (
                  <ul className="go-cms-rows">
                    {props.recentInquiries.map((item) => (
                      <li key={item.id}>
                        <strong>{item.name}</strong>
                        <span>{item.subject || item.email}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="go-cms-empty">No new inquiries yet. When customers submit inquiries, they will appear here.</p>
                )}
              </section>
              <section className="go-cms-card">
                <h2>Quick actions</h2>
                <div className="go-cms-quick">
                  <button type="button" onClick={() => go("page", ADMIN_PAGES[0], "hero")}>
                    Edit homepage
                  </button>
                  <button type="button" onClick={() => go("compose")}>
                    Add new blog post
                  </button>
                  <button type="button" onClick={() => go("media")}>
                    Manage media
                  </button>
                  <button type="button" onClick={() => go("inquiries")}>
                    View inquiries
                  </button>
                  <button type="button" onClick={() => go("chrome")}>
                    Edit header
                  </button>
                  <button type="button" onClick={() => go("chrome")}>
                    Edit footer
                  </button>
                </div>
                {missingSeo.length ? (
                  <p className="go-cms-help">{missingSeo.length} pages still need a title or description.</p>
                ) : (
                  <p className="go-cms-help">Page metadata checklist is complete. This is not a ranking score.</p>
                )}
              </section>
            </div>
          </div>
        ) : null}

        {showEditor ? (
          <div className="go-cms-editor">
            <p className="go-cms-help">
              Editing {page.label} · {page.sections.find((item) => item.id === section)?.label} · {page.path}
            </p>
            <OrbitHeroEditor
              hideShell
              activeSection={section as EditorSection}
              onActiveSection={(next) => {
                if (next === "overview") {
                  go("overview");
                  return;
                }
                go("page", page, next);
              }}
              platformSlug={page.platformSlug}
              initial={props.initial}
              initialNeed={props.initialNeed}
              initialWork={props.initialWork}
              initialSoftware={props.initialSoftware}
              initialAbout={props.initialAbout}
              initialCareers={props.initialCareers}
              initialProjects={props.initialProjects}
              initialWebApps={props.initialWebApps}
              initialAndroidApps={props.initialAndroidApps}
              initialIosApps={props.initialIosApps}
              authed
              needsSetup={false}
            />
          </div>
        ) : null}

        {showSeo && seoPage ? (
          <SeoPanel
            label={page.label}
            path={page.path}
            seo={seoPage}
            busy={busy}
            onChange={(patch) => setPages((current) => current.map((item) => (item.path === seoPage.path ? { ...item, ...patch } : item)))}
            onSave={() => void saveSeo()}
          />
        ) : null}

        {view === "blogs" || view === "compose" || view === "categories" || view === "tags" ? (
          <AdminBlogStudio
            posts={posts}
            categories={categories}
            tags={tags}
            mode={view === "compose" ? "compose" : view === "categories" ? "categories" : view === "tags" ? "tags" : "list"}
            busy={busy}
            onPosts={setPosts}
            onCategories={setCategories}
            onTags={setTags}
            onSave={() => void savePosts()}
            onMode={(mode) => go(mode === "list" ? "blogs" : mode)}
          />
        ) : null}

        {view === "media" ? (
          <section className="go-cms-card">
            <h2>Media library</h2>
            <p className="go-cms-help">Files stored in production upload storage and served from /api/media/hero.</p>
            <label className="go-cms-upload">
              Upload image
              <input
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const form = new FormData();
                  form.set("kind", "blogImage");
                  form.set("file", file);
                  const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
                  if (response.ok) {
                    const data = (await fetch("/api/orbit/media").then((item) => item.json())) as { items?: MediaItem[] };
                    setMedia(data.items || []);
                    setStatus("Image uploaded.");
                  }
                }}
              />
            </label>
            <div className="go-cms-media">
              {media.map((item) => (
                <figure key={item.name}>
                  {item.kind === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.name} />
                  ) : (
                    <span>Video</span>
                  )}
                  <figcaption>
                    {item.name}
                    <small>{Math.round(item.size / 1024)} KB</small>
                  </figcaption>
                </figure>
              ))}
            </div>
            {!media.length ? <p className="go-cms-empty">No uploaded assets yet.</p> : null}
          </section>
        ) : null}

        {view === "chrome" ? (
          <section className="go-cms-card">
            <h2>Header, footer & identity</h2>
            <div className="go-cms-form">
              {(
                [
                  ["companyName", "Company name"],
                  ["tagline", "Header support line"],
                  ["footerTagline", "Footer tagline"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["address", "Address"],
                  ["defaultSeoTitle", "Default SEO title"],
                  ["defaultSeoDescription", "Default SEO description"],
                ] as const
              ).map(([key, label]) => (
                <label key={key}>
                  {label}
                  {key.includes("tagline") || key === "address" || key === "defaultSeoDescription" ? (
                    <textarea value={chrome[key]} onChange={(e) => setChrome({ ...chrome, [key]: e.target.value })} />
                  ) : (
                    <input value={chrome[key]} onChange={(e) => setChrome({ ...chrome, [key]: e.target.value })} />
                  )}
                </label>
              ))}
              <button type="button" disabled={busy} onClick={() => void saveChrome()}>
                Publish
              </button>
            </div>
          </section>
        ) : null}

        {view === "inquiries" ? (
          <section className="go-cms-card go-cms-leads">
            <AdminInquiriesPanel />
            <OrbitAppointmentsPanel />
          </section>
        ) : null}
      </div>
    </div>
  );
}

function SeoPanel({
  label,
  path,
  seo,
  busy,
  onChange,
  onSave,
}: {
  label: string;
  path: string;
  seo: PageSeo;
  busy: boolean;
  onChange: (patch: Partial<PageSeo>) => void;
  onSave: () => void;
}) {
  const score = scoreSeo({
    title: label,
    seoTitle: seo.seoTitle,
    seoDescription: seo.seoDescription,
    focusKeyword: seo.focusKeyword,
    body: seo.seoDescription,
    slug: path.replace(/^\//, "") || "home",
    canonical: seo.canonical,
    featuredImage: seo.ogImage,
    featuredImageAlt: seo.ogTitle,
    excerpt: seo.seoDescription,
  });
  return (
    <section className="go-cms-card">
      <h2>
        SEO · {label} <small>{path}</small>
      </h2>
      <p className="go-cms-help">Checklist {score.score}/100 from these fields. Not a Google ranking.</p>
      <div className="go-cms-form">
        <label>
          Meta title
          <input value={seo.seoTitle} onChange={(e) => onChange({ seoTitle: e.target.value })} />
        </label>
        <label>
          Meta description
          <textarea value={seo.seoDescription} onChange={(e) => onChange({ seoDescription: e.target.value })} />
        </label>
        <label>
          Canonical
          <input value={seo.canonical} onChange={(e) => onChange({ canonical: e.target.value })} />
        </label>
        <label className="go-cms-check">
          <input type="checkbox" checked={seo.robotsIndex} onChange={(e) => onChange({ robotsIndex: e.target.checked })} />
          Allow indexing
        </label>
        <label>
          Keywords
          <input value={seo.keywords} onChange={(e) => onChange({ keywords: e.target.value })} />
        </label>
        <label>
          Open Graph title
          <input value={seo.ogTitle} onChange={(e) => onChange({ ogTitle: e.target.value })} />
        </label>
        <label>
          Open Graph description
          <textarea value={seo.ogDescription} onChange={(e) => onChange({ ogDescription: e.target.value })} />
        </label>
        <label>
          Open Graph image
          <input value={seo.ogImage} onChange={(e) => onChange({ ogImage: e.target.value })} />
        </label>
        <button type="button" disabled={busy} onClick={onSave}>
          Publish SEO
        </button>
      </div>
    </section>
  );
}
