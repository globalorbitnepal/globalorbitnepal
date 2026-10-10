"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminBlogStudio, type BlogMode } from "@/components/admin/admin-blog-studio";
import { AdminMediaLibrary } from "@/components/admin/admin-media-library";
import { AdminInquiriesPanel } from "@/components/admin/admin-inquiries-panel";
import { AdminFooterEditor } from "@/components/admin/admin-footer-editor";
import { AdminMediaField } from "@/components/admin/admin-media-field";
import { AdminPageHub, AdminSitePagesGrid } from "@/components/admin/admin-page-hub";
import { AdminSectionThumb } from "@/components/admin/admin-section-thumb";
import { sectionPreviewForPage } from "@/lib/admin-section-previews";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { OrbitAppointmentsPanel } from "@/components/orbit/orbit-appointments-panel";
import {
  ADMIN_NAV_GROUPS,
  ADMIN_PAGES,
  adminPageById,
  type AdminPage,
  type AdminPageId,
  type EditorSection,
  type SectionId,
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
import type { FooterConfig } from "@/lib/footer-config";
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
  | "drafts"
  | "blog-seo"
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
  initialFooter: FooterConfig;
  inquiryNew: number;
  inquiryTotal: number;
  recentInquiries: InquiryPreview[];
};

function readHash() {
  if (typeof window === "undefined") {
    return { view: "overview" as AdminView, pageId: "home" as AdminPageId, section: "hub" as SectionId, slug: "" };
  }
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const view = (hash.get("view") || "overview") as AdminView;
  const pageId = (hash.get("page") || "home") as AdminPageId;
  const sectionRaw = hash.get("section");
  const section = (sectionRaw || (view === "page" ? "hub" : "hero")) as SectionId;
  return {
    view,
    pageId,
    section,
    slug: hash.get("slug") || "",
  };
}

function writeHash(view: AdminView, pageId?: string, section?: string, slug?: string) {
  const params = new URLSearchParams();
  params.set("view", view);
  if (pageId) params.set("page", pageId);
  if (section) params.set("section", section);
  if (slug) params.set("slug", slug);
  window.location.hash = params.toString();
}

export function AdminApp(props: Props) {
  const router = useRouter();
  const start = readHash();
  const [navOpen, setNavOpen] = useState(false);
  const [view, setView] = useState<AdminView>(start.view);
  const [pageId, setPageId] = useState<AdminPageId>(start.pageId);
  const [section, setSection] = useState<SectionId>(start.section);
  const [composeSlug, setComposeSlug] = useState(start.slug);
  const [expanded, setExpanded] = useState<AdminPageId | null>(start.pageId);
  const [posts, setPosts] = useState(props.posts);
  const [categories, setCategories] = useState(props.categories);
  const [tags, setTags] = useState(props.tags);
  const [pages, setPages] = useState(props.pages);
  const [chrome, setChrome] = useState(props.chrome);
  const [footer, setFooter] = useState(props.initialFooter);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
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

  const contentBundle = useMemo(
    () => ({
      hero: props.initial,
      need: props.initialNeed,
      work: props.initialWork,
      software: props.initialSoftware,
      about: props.initialAbout,
      careers: props.initialCareers,
      projects: props.initialProjects,
      webApps: props.initialWebApps,
      androidApps: props.initialAndroidApps,
      iosApps: props.initialIosApps,
    }),
    [
      props.initial,
      props.initialNeed,
      props.initialWork,
      props.initialSoftware,
      props.initialAbout,
      props.initialCareers,
      props.initialProjects,
      props.initialWebApps,
      props.initialAndroidApps,
      props.initialIosApps,
    ],
  );

  function previewFor(pageItem: AdminPage, sectionId: SectionId) {
    return sectionPreviewForPage(pageItem, sectionId, contentBundle);
  }

  async function uploadHeaderLogo(file: File) {
    setBusy(true);
    const form = new FormData();
    form.set("kind", "chromeLogo");
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = await response.json();
    setBusy(false);
    if (data.chrome) {
      setChrome(data.chrome);
      setStatus("Header logo updated on the live site.");
    } else {
      setStatus("Could not upload logo.");
    }
  }

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
      setComposeSlug(next.slug);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function go(next: AdminView, nextPage?: AdminPage, nextSection?: SectionId, slug?: string) {
    setView(next);
    setNavOpen(false);
    setComposeSlug(slug || "");
    if (nextPage) {
      setPageId(nextPage.id);
      setExpanded(nextPage.id);
      const sectionId =
        nextSection ?? (nextPage.seoOnly ? "seo" : nextPage.editor ? "hub" : nextPage.sections[0]?.id ?? "seo");
      setSection(sectionId);
      writeHash(next, nextPage.id, sectionId, slug);
      return;
    }
    writeHash(next, undefined, undefined, slug);
  }

  async function logout() {
    await fetch("/api/orbit/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
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

  async function saveFooter() {
    setBusy(true);
    const response = await fetch("/api/orbit/footer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(footer),
    });
    setBusy(false);
    setStatus(response.ok ? "Footer content published." : "Could not save footer.");
  }

  const title =
    view === "overview"
      ? "Dashboard"
      : view === "inquiries"
        ? "Inquiries"
        : view === "chrome"
          ? "Header & footer"
          : view === "blogs"
            ? "Blog Posts"
            : view === "compose"
              ? "Add New Post"
              : view === "drafts"
                ? "Drafts"
                : view === "blog-seo"
                  ? "SEO Overview"
            : view === "categories"
              ? "Categories"
              : view === "tags"
                ? "Tags"
                : view === "media"
                  ? "Media library"
                  : view === "seo"
                    ? `SEO · ${page.label}`
                    : view === "page" && section === "hub"
                      ? `${page.label} · Sections`
                      : page.label;

  const showPageHub = view === "page" && section === "hub" && !page.seoOnly;
  const showEditor = view === "page" && section !== "seo" && section !== "hub" && Boolean(page.editor);
  const showSeo = (view === "page" && (section === "seo" || (page.seoOnly && section !== "hub"))) || view === "seo";
  const seoPage = pages.find((item) => item.path === page.path);

  return (
    <div className="go-cms">
      {navOpen ? (
        <button type="button" className="go-cms-backdrop" aria-label="Close menu" onClick={() => setNavOpen(false)} />
      ) : null}
      <div className="go-cms-mobile-bar">
        <button type="button" className="go-cms-burger" onClick={() => setNavOpen((v) => !v)}>
          {navOpen ? "Close" : "Menu"}
        </button>
        <span className="go-cms-mobile-title">Global Orbit Admin</span>
        <button type="button" className="go-cms-logout is-mobile" onClick={() => void logout()}>
          Log out
        </button>
      </div>
      <aside className={`go-cms-side ${navOpen ? "is-open" : ""}`}>
        <div className="go-cms-side-inner">
        <div className="go-cms-brand">
          <span className="go-cms-mark" aria-hidden="true" />
          <div className="go-cms-brand-text">
            <strong>GLOBAL ORBIT</strong>
            <span>Management console</span>
          </div>
        </div>
        <nav>
          <p>Overview</p>
          <button type="button" className={view === "overview" ? "is-active" : ""} onClick={() => go("overview")}>
            <span className="go-cms-nav-icon" aria-hidden="true">◆</span>
            <span className="go-cms-nav-label">Dashboard</span>
          </button>
          {ADMIN_NAV_GROUPS.map((group) => {
            const groupPages = group.pageIds
              .map((id) => ADMIN_PAGES.find((p) => p.id === id))
              .filter((item): item is AdminPage => Boolean(item))
              .filter((item) => filteredPages.some((fp) => fp.id === item.id));
            if (!groupPages.length) return null;
            return (
              <div key={group.id}>
                <p>{group.label}</p>
                {groupPages.map((item) => (
                  <div key={item.id}>
                    <button
                      type="button"
                      className={view === "page" && pageId === item.id ? "is-active" : ""}
                      onClick={() => {
                        setExpanded((current) => (current === item.id ? null : item.id));
                        go("page", item);
                      }}
                    >
                      <span className="go-cms-nav-icon" aria-hidden="true">{item.label.slice(0, 1)}</span>
                      <span className="go-cms-nav-label">{item.label}</span>
                    </button>
                    {expanded === item.id
                      ? (
                          <>
                            {!item.seoOnly ? (
                              <button
                                type="button"
                                className={`is-sub ${view === "page" && pageId === item.id && section === "hub" ? "is-active" : ""}`}
                                onClick={() => go("page", item, "hub")}
                              >
                                All sections
                              </button>
                            ) : null}
                            {item.sections.map((sub) => (
                              <button
                                key={sub.id}
                                type="button"
                                className={`is-sub ${view === "page" && pageId === item.id && section === sub.id ? "is-active" : ""}`}
                                onClick={() => go("page", item, sub.id)}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </>
                        )
                      : null}
                  </div>
                ))}
              </div>
            );
          })}
          <p>Blog & content</p>
          <button type="button" className={view === "blogs" ? "is-active" : ""} onClick={() => go("blogs")}>
            <span className="go-cms-nav-icon" aria-hidden="true">B</span>
            <span className="go-cms-nav-label">All Posts</span>
          </button>
          <button type="button" className={view === "compose" && !composeSlug ? "is-active" : ""} onClick={() => go("compose")}>
            <span className="go-cms-nav-icon" aria-hidden="true">+</span>
            <span className="go-cms-nav-label">Add New Post</span>
          </button>
          <button type="button" className={view === "categories" ? "is-active" : ""} onClick={() => go("categories")}>
            <span className="go-cms-nav-icon" aria-hidden="true">C</span>
            <span className="go-cms-nav-label">Categories</span>
          </button>
          <button type="button" className={view === "tags" ? "is-active" : ""} onClick={() => go("tags")}>
            <span className="go-cms-nav-icon" aria-hidden="true">T</span>
            <span className="go-cms-nav-label">Tags</span>
          </button>
          <button type="button" className={view === "media" ? "is-active" : ""} onClick={() => go("media")}>
            <span className="go-cms-nav-icon" aria-hidden="true">M</span>
            <span className="go-cms-nav-label">Media Library</span>
          </button>
          <button type="button" className={view === "drafts" ? "is-active" : ""} onClick={() => go("drafts")}>
            <span className="go-cms-nav-icon" aria-hidden="true">D</span>
            <span className="go-cms-nav-label">Drafts</span>
          </button>
          <button type="button" className={view === "blog-seo" ? "is-active" : ""} onClick={() => go("blog-seo")}>
            <span className="go-cms-nav-icon" aria-hidden="true">S</span>
            <span className="go-cms-nav-label">SEO Overview</span>
          </button>
          <p>SEO</p>
          <button type="button" className={view === "seo" ? "is-active" : ""} onClick={() => go("seo")}>
            <span className="go-cms-nav-icon" aria-hidden="true">P</span>
            <span className="go-cms-nav-label">Page metadata</span>
          </button>
          <p>Global</p>
          <button type="button" className={view === "chrome" ? "is-active" : ""} onClick={() => go("chrome")}>
            <span className="go-cms-nav-icon" aria-hidden="true">H</span>
            <span className="go-cms-nav-label">Header & footer</span>
          </button>
          <p>Business</p>
          <button type="button" className={view === "inquiries" ? "is-active" : ""} onClick={() => go("inquiries")}>
            <span className="go-cms-nav-icon" aria-hidden="true">!</span>
            <span className="go-cms-nav-label">
              All inquiries {props.inquiryNew ? <em>{props.inquiryNew}</em> : null}
            </span>
          </button>
        </nav>
        <footer className="go-cms-side-foot">
          <button type="button" className="go-cms-logout" onClick={() => void logout()}>
            Log out
          </button>
        </footer>
        </div>
      </aside>

      <div className="go-cms-main">
        <div className="go-cms-main-strip">
          <Link href="/" target="_blank" rel="noreferrer" className="go-cms-strip-link">
            View public site
          </Link>
          <button type="button" className="go-cms-logout is-strip" onClick={() => void logout()}>
            Log out
          </button>
        </div>
        <header className="go-cms-top">
          <div>
            <p className="go-cms-crumb">{view === "overview" ? "Overview" : title}</p>
            <h1>{title}</h1>
            {view === "overview" ? (
              <p className="go-cms-lede">
                Edit every live page and homepage section from one console. All changes use the same production content stores.
              </p>
            ) : null}
          </div>
          <div className="go-cms-tools">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages, posts, media, inquiries…" />
            <Link href={page.path} target="_blank" rel="noreferrer">
              Preview live
            </Link>
            <button type="button" className="go-cms-logout is-top" onClick={() => void logout()}>
              Log out
            </button>
            <div className="go-cms-account">
              <button type="button" onClick={() => setAccountOpen((v) => !v)} aria-expanded={accountOpen}>
                Account
              </button>
              {accountOpen ? (
                <div className="go-cms-menu">
                  <button type="button" onClick={() => go("chrome")}>
                    Site identity
                  </button>
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
              <button type="button" onClick={() => go("page", ADMIN_PAGES[0], "hub")}>
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
              <button type="button" onClick={() => go("page", ADMIN_PAGES[0], "hub")}>
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
            <section className="go-cms-card go-cms-dashboard-sections">
              <header>
                <h2>Homepage sections</h2>
                <button type="button" onClick={() => go("page", ADMIN_PAGES[0], "hub")}>
                  Open homepage hub
                </button>
              </header>
              <div className="go-cms-metric-grid is-compact">
                {ADMIN_PAGES[0].sections
                  .filter((item) => item.id !== "seo")
                  .map((item) => {
                    const preview = previewFor(ADMIN_PAGES[0], item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="go-cms-metric-card is-rich"
                        onClick={() => go("page", ADMIN_PAGES[0], item.id)}
                      >
                        <AdminSectionThumb preview={preview} />
                        <p className="go-cms-metric-label">Homepage</p>
                        <strong className="go-cms-metric-title">{item.label}</strong>
                        <small>{preview.excerpt || item.hint}</small>
                        <em>Edit →</em>
                      </button>
                    );
                  })}
              </div>
            </section>
            {ADMIN_NAV_GROUPS.map((group) => {
              const groupPages = group.pageIds
                .map((id) => ADMIN_PAGES.find((p) => p.id === id))
                .filter((item): item is AdminPage => Boolean(item));
              return (
                <section key={group.id} className="go-cms-card go-cms-dashboard-sections">
                  <header>
                    <h2>{group.label}</h2>
                  </header>
                  <AdminSitePagesGrid
                    pages={groupPages}
                    previewForPage={(item) =>
                      previewFor(
                        item,
                        item.seoOnly ? "seo" : (item.sections.find((s) => s.id !== "seo")?.id ?? "hub"),
                      )
                    }
                    onOpen={(item) => go("page", item, item.seoOnly ? "seo" : "hub")}
                  />
                </section>
              );
            })}
          </div>
        ) : null}

        {showPageHub ? (
          <AdminPageHub
            page={page}
            previewFor={(sectionId) => previewFor(page, sectionId)}
            onOpen={(next) => {
              if (next === "seo") {
                go("page", page, "seo");
                return;
              }
              go("page", page, next);
            }}
          />
        ) : null}

        {showEditor ? (
          <div className="go-cms-editor go-cms-editor--light">
            <div className="go-cms-editor-bar">
              <button type="button" className="go-cms-back" onClick={() => go("page", page, "hub")}>
                ← All sections
              </button>
              <p className="go-cms-help">
                {page.label} · {page.sections.find((item) => item.id === section)?.label} · {page.path}
              </p>
            </div>
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

        {view === "blogs" || view === "compose" || view === "categories" || view === "tags" || view === "drafts" || view === "blog-seo" ? (
          <AdminBlogStudio
            key={`${view}-${composeSlug}`}
            posts={posts}
            categories={categories}
            tags={tags}
            mode={(view === "blog-seo" ? "seo-overview" : view === "blogs" ? "list" : view) as BlogMode}
            composeSlug={composeSlug}
            onPosts={setPosts}
            onCategories={setCategories}
            onTags={setTags}
            onMode={(mode, slug) => go(mode === "list" ? "blogs" : mode === "seo-overview" ? "blog-seo" : mode, undefined, undefined, slug)}
          />
        ) : null}

        {view === "media" ? <AdminMediaLibrary /> : null}

        {view === "chrome" ? (
          <>
          <section className="go-cms-card">
            <h2>Header, footer & identity</h2>
            <AdminMediaField
              label="Header & footer logo"
              description="Transparent PNG recommended. Replaces the gold Global Orbit mark in the site header and footer."
              src={chrome.headerLogoSrc || "/brand/logo-official-gold.png"}
              kind="image"
              accept="image/png,image/webp,image/jpeg,image/svg+xml"
              disabled={busy}
              onPick={(file) => uploadHeaderLogo(file)}
            />
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
          <AdminFooterEditor footer={footer} busy={busy} onChange={setFooter} onSave={() => void saveFooter()} />
          </>
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
