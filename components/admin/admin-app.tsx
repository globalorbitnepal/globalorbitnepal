"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AdminInquiriesPanel } from "@/components/admin/admin-inquiries-panel";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { OrbitAppointmentsPanel } from "@/components/orbit/orbit-appointments-panel";
import { PwaInstall } from "@/components/admin/pwa-install";
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

type EditorSection =
  | "overview"
  | "hero"
  | "need"
  | "work"
  | "software"
  | "about"
  | "careers"
  | "projects"
  | "customApps"
  | "appointments";

type View =
  | "home"
  | "editor"
  | "blogs"
  | "seo"
  | "chrome"
  | "pages"
  | "leads";

type NavKey =
  | "dashboard"
  | "content"
  | "pages"
  | "services"
  | "portfolio"
  | "blog"
  | "media"
  | "testimonials"
  | "team"
  | "enquiries"
  | "messages"
  | "seo"
  | "forms"
  | "appearance"
  | "menus"
  | "users"
  | "settings";

const NAV: { id: NavKey; label: string; view?: View; section?: EditorSection }[] = [
  { id: "dashboard", label: "Dashboard", view: "home" },
  { id: "content", label: "Website Content", view: "editor", section: "hero" },
  { id: "pages", label: "Pages & Sections", view: "pages" },
  { id: "services", label: "Services", view: "editor", section: "software" },
  { id: "portfolio", label: "Portfolio / Projects", view: "editor", section: "projects" },
  { id: "blog", label: "Blog & News", view: "blogs" },
  { id: "media", label: "Media Library", view: "editor", section: "work" },
  { id: "testimonials", label: "Testimonials", view: "editor", section: "about" },
  { id: "team", label: "Team Management", view: "editor", section: "about" },
  { id: "enquiries", label: "Enquiries / Leads", view: "leads" },
  { id: "messages", label: "Contact Messages", view: "leads" },
  { id: "seo", label: "SEO & Analytics", view: "seo" },
  { id: "forms", label: "Forms & Integrations", view: "leads" },
  { id: "appearance", label: "Appearance", view: "chrome" },
  { id: "menus", label: "Menus & Navigation", view: "chrome" },
  { id: "users", label: "Users & Roles", view: "chrome" },
  { id: "settings", label: "Settings", view: "chrome" },
];

const HOME_SECTIONS: { title: string; hint: string; section: EditorSection; color: string }[] = [
  { title: "Hero Section", hint: "Main banner, title, buttons, background", section: "hero", color: "#3b82f6" },
  { title: "About Section", hint: "Company information, highlights", section: "about", color: "#8b5cf6" },
  { title: "Services Section", hint: "All services, features, icons", section: "software", color: "#22c55e" },
  { title: "Portfolio Section", hint: "Projects, case studies, gallery", section: "projects", color: "#f97316" },
  { title: "Clients Section", hint: "Client logos, testimonials", section: "about", color: "#ec4899" },
  { title: "Blog Section", hint: "Latest news and articles", section: "overview", color: "#2563eb" },
  { title: "Team Section", hint: "Team members, profiles", section: "about", color: "#14b8a6" },
  { title: "Contact Section", hint: "Address, map, contact form", section: "appointments", color: "#eab308" },
  { title: "Footer Section", hint: "Links, social media, copyright", section: "overview", color: "#a855f7" },
];

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

export function AdminApp(props: Props) {
  const [nav, setNav] = useState<NavKey>("dashboard");
  const [view, setView] = useState<View>("home");
  const [section, setSection] = useState<EditorSection>("hero");
  const [posts, setPosts] = useState(props.posts);
  const [draft, setDraft] = useState<BlogPost>(emptyPost());
  const [pages, setPages] = useState(props.pages);
  const [chrome, setChrome] = useState(props.chrome);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");

  const filteredNav = useMemo(
    () => NAV.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  function open(next: NavKey, nextView?: View, nextSection?: EditorSection) {
    setNav(next);
    if (nextView) setView(nextView);
    if (nextSection) setSection(nextSection);
    if (next === "blog") setView("blogs");
  }

  async function logout() {
    await fetch("/api/orbit/logout", { method: "POST" });
    window.location.assign("/admin");
  }

  async function savePosts() {
    setBusy(true);
    const response = await fetch("/api/orbit/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts }),
    });
    setBusy(false);
    setStatus(response.ok ? "Blog posts saved." : "Could not save posts.");
  }

  async function saveSeo() {
    setBusy(true);
    const response = await fetch("/api/orbit/page-seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages }),
    });
    setBusy(false);
    setStatus(response.ok ? "SEO saved for all pages." : "Could not save SEO.");
  }

  async function saveChrome() {
    setBusy(true);
    const response = await fetch("/api/orbit/chrome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chrome),
    });
    setBusy(false);
    setStatus(response.ok ? "Header, footer and site identity saved." : "Could not save appearance.");
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
    setStatus("Post added to the list. Click Save posts to publish.");
  }

  useEffect(() => {
    document.body.classList.add("admin-locked");
    return () => document.body.classList.remove("admin-locked");
  }, []);

  return (
    <div className="cms-app">
      <aside className="cms-side">
        <div className="cms-brand">
          <img src="/brand/logo-official-gold.png" alt="Global Orbit" />
          <div>
            <strong>GLOBAL ORBIT</strong>
            <span>PVT LTD</span>
          </div>
        </div>
        <nav>
          {filteredNav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={nav === item.id ? "is-active" : ""}
              onClick={() => open(item.id, item.view, item.section)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="cms-main">
        <header className="cms-top">
          <label className="cms-search">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pages, content, services, portfolios, enquiries…"
            />
            <kbd>Ctrl + K</kbd>
          </label>
          <div className="cms-top-actions">
            <a href="/" target="_blank" rel="noreferrer">
              Visit Website
            </a>
            <PwaInstall className="cms-install" />
            <button type="button" onClick={() => void logout()}>
              Log out
            </button>
          </div>
        </header>

        {view === "home" ? (
          <div className="cms-home">
            <div className="cms-kpis">
              {[
                ["SEO pages", String(pages.length), "From page SEO store", "#3b82f6"],
                ["Blog posts", String(posts.length), "Saved articles", "#8b5cf6"],
                ["New enquiries", String(props.inquiryNew), "Awaiting follow-up", "#22c55e"],
                ["All enquiries", String(props.inquiryTotal), "Stored in the database", "#f97316"],
              ].map(([label, value, hint, color]) => (
                <article key={label} className="cms-kpi">
                  <span className="cms-kpi-icon" style={{ background: color }}>
                    ▢
                  </span>
                  <div>
                    <p>{label}</p>
                    <strong>{value}</strong>
                    <small>{hint}</small>
                  </div>
                </article>
              ))}
            </div>
            <div className="cms-grid">
              <section className="cms-card">
                <h2>Quick Actions</h2>
                <div className="cms-quick">
                  <button type="button" onClick={() => open("content", "editor", "hero")}>
                    Edit Homepage
                  </button>
                  <button type="button" onClick={() => open("services", "editor", "software")}>
                    Manage Services
                  </button>
                  <button type="button" onClick={() => open("blog", "blogs")}>
                    Add Blog Post
                  </button>
                  <button type="button" onClick={() => open("portfolio", "editor", "projects")}>
                    Manage Portfolio
                  </button>
                  <button type="button" onClick={() => open("enquiries", "leads")}>
                    View Enquiries
                  </button>
                </div>
              </section>
              <section className="cms-card cms-status">
                <h2>
                  Website Status <span>Live</span>
                </h2>
                <ul>
                  <li>
                    Domain <a href="https://arnav.theglobalorbit.com">arnav.theglobalorbit.com</a>
                  </li>
                  <li>Hosted via GitHub Actions deploy</li>
                  <li>Node / Next.js 16</li>
                  <li>
                    Database <b>Connected</b>
                  </li>
                  <li>
                    SSL Certificate <b>Active</b>
                  </li>
                </ul>
              </section>
            </div>
            <section className="cms-card">
              <h2>Website Sections</h2>
              <p>Edit all sections of your website easily</p>
              <div className="cms-sections">
                {HOME_SECTIONS.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      if (item.title === "Blog Section") {
                        open("blog", "blogs");
                        return;
                      }
                      if (item.title === "Footer Section") {
                        open("appearance", "chrome");
                        return;
                      }
                      open("pages", "editor", item.section);
                    }}
                  >
                    <span style={{ background: item.color }} />
                    <strong>{item.title}</strong>
                    <small>{item.hint}</small>
                  </button>
                ))}
              </div>
            </section>
            <div className="cms-grid">
              <section className="cms-card">
                <h2>Recent Updates</h2>
                <ul className="cms-updates">
                  {posts.slice(0, 4).map((post) => (
                    <li key={post.slug}>
                      <strong>{post.title}</strong>
                      <span>{post.isPublished ? "Published" : "Draft"}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="cms-card">
                <h2>Useful Tools</h2>
                <div className="cms-tools">
                  <button type="button" onClick={() => window.location.reload()}>
                    Clear Cache
                  </button>
                  <PwaInstall className="cms-tool" />
                  <Link href="/orbit" className="cms-tool">
                    Classic editor
                  </Link>
                  <button type="button" onClick={() => open("settings", "chrome")}>
                    Manage Users
                  </button>
                </div>
              </section>
            </div>
          </div>
        ) : null}

        {view === "leads" ? (
          <div className="cms-card cms-pad cms-leads-wrap">
            <AdminInquiriesPanel />
            <OrbitAppointmentsPanel />
          </div>
        ) : null}

        {view === "pages" ? (
          <div className="cms-card cms-pad">
            <h2>Pages & Sections</h2>
            <p>Open any page to edit the full layout, copy, media and SEO.</p>
            <div className="cms-sections">
              {HOME_SECTIONS.map((item) => (
                <button key={item.title} type="button" onClick={() => open("pages", "editor", item.section)}>
                  <span style={{ background: item.color }} />
                  <strong>{item.title}</strong>
                  <small>{item.hint}</small>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {view === "editor" ? (
          <div className="cms-editor-wrap">
            <OrbitHeroEditor
              hideShell
              activeSection={section}
              onActiveSection={setSection}
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

        {view === "blogs" ? (
          <div className="cms-card cms-pad">
            <h2>Professional blog posts</h2>
            <p>Write full articles with SEO title, description, keywords, tags and focus keyword.</p>
            <div className="cms-form">
              <input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              <input
                placeholder="slug-for-url"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
              />
              <textarea placeholder="Excerpt" value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
              <textarea
                className="cms-body"
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
              <input placeholder="Keywords" value={draft.keywords} onChange={(e) => setDraft({ ...draft, keywords: e.target.value })} />
              <input placeholder="Tags" value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
              <input
                placeholder="Focus keyword"
                value={draft.focusKeyword}
                onChange={(e) => setDraft({ ...draft, focusKeyword: e.target.value })}
              />
              <label className="cms-check">
                <input
                  type="checkbox"
                  checked={draft.isPublished}
                  onChange={(e) => setDraft({ ...draft, isPublished: e.target.checked })}
                />
                Publish immediately
              </label>
              <div className="cms-row">
                <button type="button" onClick={addPost}>
                  Add article
                </button>
                <button type="button" disabled={busy} onClick={() => void savePosts()}>
                  Save posts
                </button>
              </div>
            </div>
            <ul className="cms-updates">
              {posts.map((post) => (
                <li key={post.slug}>
                  <button type="button" onClick={() => setDraft(post)}>
                    {post.title}
                  </button>
                  <span>{post.isPublished ? "Live" : "Draft"}</span>
                  <button
                    type="button"
                    onClick={() => setPosts((current) => current.filter((item) => item.slug !== post.slug))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {view === "seo" ? (
          <div className="cms-card cms-pad">
            <h2>Page SEO</h2>
            <p>Meta title, description, keywords, tags and focus keyword for every key page.</p>
            <div className="cms-seo-list">
              {pages.map((page, index) => (
                <article key={page.path}>
                  <h3>
                    {page.label} <small>{page.path}</small>
                  </h3>
                  <input
                    placeholder="Meta title"
                    value={page.seoTitle}
                    onChange={(e) =>
                      setPages((current) => current.map((item, i) => (i === index ? { ...item, seoTitle: e.target.value } : item)))
                    }
                  />
                  <textarea
                    placeholder="Meta description"
                    value={page.seoDescription}
                    onChange={(e) =>
                      setPages((current) =>
                        current.map((item, i) => (i === index ? { ...item, seoDescription: e.target.value } : item)),
                      )
                    }
                  />
                  <input
                    placeholder="Keywords"
                    value={page.keywords}
                    onChange={(e) =>
                      setPages((current) => current.map((item, i) => (i === index ? { ...item, keywords: e.target.value } : item)))
                    }
                  />
                  <input
                    placeholder="Tags"
                    value={page.tags}
                    onChange={(e) =>
                      setPages((current) => current.map((item, i) => (i === index ? { ...item, tags: e.target.value } : item)))
                    }
                  />
                  <input
                    placeholder="Focus keyword"
                    value={page.focusKeyword}
                    onChange={(e) =>
                      setPages((current) =>
                        current.map((item, i) => (i === index ? { ...item, focusKeyword: e.target.value } : item)),
                      )
                    }
                  />
                </article>
              ))}
            </div>
            <button type="button" disabled={busy} onClick={() => void saveSeo()}>
              Save SEO
            </button>
          </div>
        ) : null}

        {view === "chrome" ? (
          <div className="cms-card cms-pad">
            <h2>Header, footer & identity</h2>
            <div className="cms-form">
              {(
                [
                  ["companyName", "Company name"],
                  ["tagline", "Tagline / header support line"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["address", "Address / footer location"],
                  ["defaultSeoTitle", "Default SEO title"],
                  ["defaultSeoDescription", "Default SEO description"],
                ] as const
              ).map(([key, label]) =>
                key === "defaultSeoDescription" || key === "tagline" || key === "address" ? (
                  <label key={key}>
                    {label}
                    <textarea value={chrome[key]} onChange={(e) => setChrome({ ...chrome, [key]: e.target.value })} />
                  </label>
                ) : (
                  <label key={key}>
                    {label}
                    <input value={chrome[key]} onChange={(e) => setChrome({ ...chrome, [key]: e.target.value })} />
                  </label>
                ),
              )}
              <button type="button" disabled={busy} onClick={() => void saveChrome()}>
                Save appearance
              </button>
            </div>
          </div>
        ) : null}

        {status ? <p className="cms-toast">{status}</p> : null}
      </div>
    </div>
  );
}
