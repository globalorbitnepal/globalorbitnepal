"use client";

import Link from "next/link";
import type { AdminPage, EditorSection, SectionId } from "@/lib/admin-nav";

type Props = {
  page: AdminPage;
  onOpen: (section: SectionId) => void;
};

const SECTION_ICONS: Partial<Record<SectionId, string>> = {
  hero: "01",
  need: "02",
  work: "03",
  software: "04",
  about: "AB",
  careers: "CR",
  projects: "PF",
  customApps: "AP",
  appointments: "IN",
  seo: "SEO",
  hub: "—",
};

export function AdminPageHub({ page, onOpen }: Props) {
  const editable = page.sections.filter((item) => item.id !== "hub");

  return (
    <section className="go-cms-hub">
      <header className="go-cms-hub-head">
        <div>
          <p className="go-cms-crumb">Website · {page.path}</p>
          <h2>{page.label}</h2>
          <p className="go-cms-lede">
            Choose a section to edit. Changes save to the same JSON stores the live site already uses — URLs and content stay aligned with production.
          </p>
        </div>
        <Link href={page.path} target="_blank" rel="noreferrer" className="go-cms-hub-preview">
          View live page
        </Link>
      </header>
      <div className="go-cms-metric-grid">
        {editable.map((item) => (
          <button
            key={item.id}
            type="button"
            className="go-cms-metric-card"
            onClick={() => onOpen(item.id)}
          >
            <span className="go-cms-metric-num" aria-hidden="true">
              {SECTION_ICONS[item.id] || "•"}
            </span>
            <p className="go-cms-metric-label">{item.label}</p>
            <strong className="go-cms-metric-title">{item.label}</strong>
            <small>{item.hint}</small>
            <em>Open editor →</em>
          </button>
        ))}
      </div>
      {page.id === "home" ? (
        <p className="go-cms-help">
          Homepage order on the public site: Hero → Why you need us → Enterprise software → Websites we ship (globe). Edit each card above in that sequence.
        </p>
      ) : null}
    </section>
  );
}

export function AdminSitePagesGrid({
  pages,
  onOpen,
}: {
  pages: AdminPage[];
  onOpen: (page: AdminPage, section?: EditorSection | "seo") => void;
}) {
  return (
    <div className="go-cms-site-grid">
      {pages.map((item) => (
        <button key={item.id} type="button" className="go-cms-metric-card is-page" onClick={() => onOpen(item)}>
          <span className="go-cms-metric-num">{item.path === "/" ? "HOME" : item.label.slice(0, 2).toUpperCase()}</span>
          <p className="go-cms-metric-label">Page</p>
          <strong className="go-cms-metric-title">{item.label}</strong>
          <small>{item.path}</small>
          <em>{item.sections.length} section{item.sections.length === 1 ? "" : "s"}</em>
        </button>
      ))}
    </div>
  );
}
