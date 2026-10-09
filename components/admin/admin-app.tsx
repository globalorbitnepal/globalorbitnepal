"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminInquiriesPanel } from "@/components/admin/admin-inquiries-panel";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { OrbitAppointmentsPanel } from "@/components/orbit/orbit-appointments-panel";
import { PwaInstall } from "@/components/admin/pwa-install";
import {
  ADMIN_PAGES,
  adminPageById,
  type AdminPage,
  type AdminPageId,
  type AdminView,
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
import type { BlogPost } from "@/lib/blog-store";
import type { PageSeo } from "@/lib/page-seo-store";
import type { SiteChrome } from "@/lib/site-chrome-store";

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
  pages: PageSeo[];
  chrome: SiteChrome;
  inquiryNew: number;
  inquiryTotal: number;
};

function emptyPost(): BlogPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    tags: "",
    focusKeyword: "",
    isPublished: true,
    publishedAt: new Date().toISOString(),
  };
}

function readHash(): { view: AdminView; pageId: AdminPageId; section: EditorSection | "seo" } {
  if (typeof window === "undefined") {
    return { view: "overview", pageId: "home", section: "hero" };
  }
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const view = (hash.get("view") || "overview") as AdminView;
  const pageId = (hash.get("page") || "home") as AdminPageId;
  const section = (hash.get("section") || "hero") as EditorSection | "seo";
  return { view, pageId, section };
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
  const initialHash = readHash();
  const [navOpen, setNavOpen] = useState(false);
  const [view, setView] = useState<AdminView>(initialHash.view);
  const [pageId, setPageId] = useState<AdminPageId>(initialHash.pageId);
  const [section, setSection] = useState<EditorSection | "seo">(initialHash.section);
  const [expanded, setExpanded] = useState<AdminPageId | null>(initialHash.pageId);
  const [posts, setPosts] = useState(props.posts);
  const [draft, setDraft] = useState<BlogPost>(emptyPost());
  const [pages, setPages] = useState(props.pages);
  const [chrome, setChrome] = useState(props.chrome);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [dirty, setDirty] = useState(false);

  const page = adminPageById(pageId) ?? ADMIN_PAGES[0];
  const filteredPages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ADMIN_PAGES;
    return ADMIN_PAGES.filter(
      (item) => item.label.toLowerCase().includes(q) || item.path.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    document.body.classList.add("go-dash-open");
    document.body.classList.remove("admin-locked");
    return () => document.body.classList.remove("go-dash-open");
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
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function go(nextView: AdminView, nextPage?: AdminPage, nextSection?: EditorSection | "seo") {
    setView(nextView);
    setNavOpen(false);
    if (nextPage) {
      setPageId(nextPage.id);
      setExpanded(nextPage.id);
      const sectionId = nextSection || nextPage.sections[0]?.id || "seo";
      setSection(sectionId);
      writeHash(nextView, nextPage.id, sectionId);
      return;
    }
    writeHash(nextView);
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
      body: JSON.stringify({ posts }),
    });
    setBusy(false);
    setDirty(false);
    setStatus(response.ok ? "Blog posts published." : "Could not save posts.");
  }

  async function saveSeo() {
    setBusy(true);
    const response = await fetch("/api/orbit/page-seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages }),
    });
    setBusy(false);
    setDirty(false);
    setStatus(response.ok ? "SEO published. Public metadata and sitemap will refresh." : "Could not save SEO.");
  }

  async function saveChrome() {
    setBusy(true);
    const response = await fetch("/api/orbit/chrome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chrome),
    });
    setBusy(false);
    setDirty(false);
    setStatus(response.ok ? "Header, footer and identity published." : "Could not save chrome.");
  }

  function addPost() {
    if (!draft.title.trim() || !draft.slug.trim()) {
      setStatus("Title and slug are required.");
      return;
    }
    setPosts((current) => {
      const next = current.filter((item) => item.slug !== draft.slug);
      return [{ ...draft, publishedAt: draft.publishedAt || new Date().toISOString() }, ...next];
    });
    setDraft(emptyPost());
    setDirty(true);
    setStatus("Post added to the list. Click Save posts to publish.");
  }

  function updatePageSeo(path: string, patch: Partial<PageSeo>) {
    setDirty(true);
    setPages((current) => current.map((item) => (item.path === path ? { ...item, ...patch } : item)));
  }

  const title =
    view === "overview"
      ? "Dashboard"
      : view === "inquiries"
        ? "Inquiries"
        : view === "chrome"
          ? "Header & footer"
          : view === "blogs"
            ? "Blog"
            : view === "seo"
              ? `SEO · ${page.label}`
              : page.label;

  const crumb =
    view === "page" || view === "seo"
      ? `Website · ${page.label}${section === "seo" ? " · SEO" : ""}`
      : view === "chrome"
        ? "Global sections"
        : view === "inquiries"
          ? "Inquiries"
          : view === "blogs"
            ? "Content"
            : "Overview";

  const seoPage = pages.find((item) => item.path === page.path);
  const editorSection: EditorSection = section === "seo" ? (page.editor ?? "hero") : section;
  const showEditor = view === "page" && section !== "seo" && Boolean(page.editor);
  const showSeo = (view === "page" && section === "seo") || view === "seo" || (view === "page" && page.seoOnly);

  const missingSeo = pages.filter((item) => !item.seoTitle.trim() || !item.seoDescription.trim());

  return (
    <div className="go-dash">
      <button type="button" className="go-dash-menu" aria-expanded={navOpen} onClick={() => setNavOpen((v) => !v)}>
        {navOpen ? "Close menu" : "Menu"}
      </button>
      <aside className={`go-dash-side ${navOpen ? "is-open" : ""}`}>
        <div className="go-dash-brand">
          <span className="go-dash-mark" aria-hidden="true" />
          <strong>GLOBAL ORBIT</strong>
        </div>
        <nav aria-label="Administration">
          <p className="go-dash-group">Overview</p>
          <button type="button" className={view === "overview" ? "is-active" : ""} onClick={() => go("overview")}>
            Dashboard
          </button>

          <p className="go-dash-group">Website</p>
          {filteredPages.map((item) => (
            <div key={item.id} className="go-dash-page">
              <button
                type="button"
                className={view === "page" && pageId === item.id ? "is-active" : ""}
                onClick={() => {
                  setExpanded((current) => (current === item.id ? null : item.id));
                  go("page", item, item.sections[0]?.id);
                }}
              >
                {item.label}
              </button>
              {expanded === item.id ? (
                <div className="go-dash-subs">
                  {item.sections.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      className={view === "page" && pageId === item.id && section === sub.id ? "is-active" : ""}
                      onClick={() => go("page", item, sub.id)}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          <p className="go-dash-group">Global</p>
          <button type="button" className={view === "chrome" ? "is-active" : ""} onClick={() => go("chrome")}>
            Header & footer
          </button>
          <button type="button" className={view === "blogs" ? "is-active" : ""} onClick={() => go("blogs")}>
            Blog
          </button>
          <button type="button" className={view === "inquiries" ? "is-active" : ""} onClick={() => go("inquiries")}>
            Inquiries
            {props.inquiryNew ? <em>{props.inquiryNew}</em> : null}
          </button>
        </nav>
      </aside>

      <div className="go-dash-main">
        <header className="go-dash-top">
          <div>
            <p className="go-dash-crumb">{crumb}</p>
            <h1>{title}</h1>
          </div>
          <div className="go-dash-tools">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter pages…"
              aria-label="Filter pages"
            />
            <Link href={page.path} target="_blank" rel="noreferrer">
              Preview
            </Link>
            <PwaInstall className="go-dash-install" />
            <button type="button" onClick={() => void logout()}>
              Log out
            </button>
          </div>
        </header>

        {status ? (
          <p className="go-dash-toast" role="status">
            {status}
          </p>
        ) : null}

        {view === "overview" ? (
          <div className="go-dash-home">
            <div className="go-dash-kpis">
              <article>
                <p>SEO pages</p>
                <strong>{pages.length}</strong>
                <span>Indexed in the CMS store</span>
              </article>
              <article>
                <p>Blog posts</p>
                <strong>{posts.length}</strong>
                <span>{posts.filter((item) => item.isPublished).length} published</span>
              </article>
              <article>
                <p>New inquiries</p>
                <strong>{props.inquiryNew}</strong>
                <span>Awaiting follow-up</span>
              </article>
              <article>
                <p>All inquiries</p>
                <strong>{props.inquiryTotal}</strong>
                <span>Stored in PostgreSQL</span>
              </article>
            </div>
            <div className="go-dash-split">
              <section className="go-dash-panel">
                <h2>Recently updated posts</h2>
                {posts.length ? (
                  <ul>
                    {posts.slice(0, 6).map((post) => (
                      <li key={post.slug}>
                        <span>{post.title}</span>
                        <em>{post.isPublished ? "Published" : "Draft"}</em>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="go-dash-empty">No blog posts yet.</p>
                )}
              </section>
              <section className="go-dash-panel">
                <h2>SEO checklist</h2>
                {missingSeo.length ? (
                  <ul>
                    {missingSeo.slice(0, 8).map((item) => (
                      <li key={item.path}>
                        <button
                          type="button"
                          onClick={() => {
                            const target = ADMIN_PAGES.find((pageItem) => pageItem.path === item.path);
                            if (target) go("page", target, "seo");
                          }}
                        >
                          {item.label}
                        </button>
                        <em>Missing title or description</em>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="go-dash-empty">Every tracked page has a title and description.</p>
                )}
                <p className="go-dash-note">This is a content checklist, not a Google ranking score.</p>
              </section>
            </div>
            <section className="go-dash-panel">
              <h2>Open a page</h2>
              <div className="go-dash-pagegrid">
                {ADMIN_PAGES.map((item) => (
                  <button key={item.id} type="button" onClick={() => go("page", item, item.sections[0]?.id)}>
                    <strong>{item.label}</strong>
                    <span>{item.path}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {view === "inquiries" ? (
          <div className="go-dash-panel go-dash-leads">
            <AdminInquiriesPanel />
            <OrbitAppointmentsPanel />
          </div>
        ) : null}

        {showEditor ? (
          <div className="go-dash-editor">
            <p className="go-dash-context">
              Editing {page.label} · {page.sections.find((item) => item.id === section)?.label || "Section"} · {page.path}
            </p>
            <OrbitHeroEditor
              hideShell
              activeSection={editorSection}
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
          <SeoEditor
            page={page}
            seo={seoPage}
            busy={busy}
            onChange={(patch) => updatePageSeo(seoPage.path, patch)}
            onSave={() => void saveSeo()}
          />
        ) : null}

        {view === "blogs" ? (
          <div className="go-dash-panel">
            <h2>Blog posts</h2>
            <p>Published posts appear on /blogs. Drafts stay off the public index until saved as published.</p>
            <div className="go-dash-form">
              <input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              <input
                placeholder="slug-for-url"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
              />
              <textarea placeholder="Excerpt" value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
              <textarea
                className="go-dash-body"
                placeholder="Full article body"
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              />
              <input placeholder="SEO title" value={draft.seoTitle} onChange={(e) => setDraft({ ...draft, seoTitle: e.target.value })} />
              <textarea
                placeholder="Meta description"
                value={draft.seoDescription}
                onChange={(e) => setDraft({ ...draft, seoDescription: e.target.value })}
              />
              <label className="go-dash-check">
                <input
                  type="checkbox"
                  checked={draft.isPublished}
                  onChange={(e) => setDraft({ ...draft, isPublished: e.target.checked })}
                />
                Publish immediately
              </label>
              <div className="go-dash-row">
                <button type="button" onClick={addPost}>
                  Add article
                </button>
                <button type="button" disabled={busy} onClick={() => void savePosts()}>
                  Save posts
                </button>
              </div>
            </div>
            <ul className="go-dash-list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <button type="button" onClick={() => setDraft(post)}>
                    {post.title}
                  </button>
                  <em>{post.isPublished ? "Live" : "Draft"}</em>
                  <button type="button" onClick={() => setPosts((current) => current.filter((item) => item.slug !== post.slug))}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {view === "chrome" ? (
          <div className="go-dash-panel">
            <h2>Header, footer & identity</h2>
            <p>
              Company name, contact details, default SEO, and footer tagline publish to every public page. Main navigation
              remains the studio header (Home, About, Services, Portfolio, Careers, Contact) so the live IA stays intact.
            </p>
            <div className="go-dash-form">
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
              ).map(([key, label]) =>
                key === "defaultSeoDescription" || key.endsWith("tagline") || key === "footerTagline" || key === "address" ? (
                  <label key={key}>
                    {label}
                    <textarea
                      value={chrome[key]}
                      onChange={(e) => {
                        setDirty(true);
                        setChrome({ ...chrome, [key]: e.target.value });
                      }}
                    />
                  </label>
                ) : (
                  <label key={key}>
                    {label}
                    <input
                      value={chrome[key]}
                      onChange={(e) => {
                        setDirty(true);
                        setChrome({ ...chrome, [key]: e.target.value });
                      }}
                    />
                  </label>
                ),
              )}
              <button type="button" disabled={busy} onClick={() => void saveChrome()}>
                Publish chrome
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SeoEditor({
  page,
  seo,
  busy,
  onChange,
  onSave,
}: {
  page: AdminPage;
  seo: PageSeo;
  busy: boolean;
  onChange: (patch: Partial<PageSeo>) => void;
  onSave: () => void;
}) {
  const titleLen = seo.seoTitle.length;
  const descLen = seo.seoDescription.length;
  return (
    <div className="go-dash-panel">
      <h2>SEO · {page.label}</h2>
      <p>
        These fields render in the public HTML for <code>{page.path}</code> after publish. They do not change another page.
      </p>
      <div className="go-dash-form">
        <label>
          Meta title
          <input value={seo.seoTitle} onChange={(e) => onChange({ seoTitle: e.target.value })} />
          <small className={titleLen > 60 ? "is-warn" : ""}>{titleLen}/60 recommended</small>
        </label>
        <label>
          Meta description
          <textarea value={seo.seoDescription} onChange={(e) => onChange({ seoDescription: e.target.value })} />
          <small className={descLen > 160 ? "is-warn" : ""}>{descLen}/160 recommended</small>
        </label>
        <label>
          Canonical URL
          <input value={seo.canonical} onChange={(e) => onChange({ canonical: e.target.value })} placeholder={page.path} />
        </label>
        <label className="go-dash-check">
          <input type="checkbox" checked={seo.robotsIndex} onChange={(e) => onChange({ robotsIndex: e.target.checked })} />
          Allow search indexing (uncheck for noindex)
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
          Open Graph image URL
          <input value={seo.ogImage} onChange={(e) => onChange({ ogImage: e.target.value })} />
        </label>
        <label>
          Focus keyword
          <input value={seo.focusKeyword} onChange={(e) => onChange({ focusKeyword: e.target.value })} />
        </label>
        <div className="go-dash-serp">
          <p>Search preview</p>
          <strong>{seo.seoTitle || page.label}</strong>
          <em>https://arnav.theglobalorbit.com{page.path}</em>
          <span>{seo.seoDescription || "Add a meta description to control this snippet."}</span>
        </div>
        <button type="button" disabled={busy} onClick={onSave}>
          Publish SEO
        </button>
      </div>
    </div>
  );
}
