"use client";

import Link from "next/link";
import type { AdminPage, SectionId } from "@/lib/admin-nav";
import type { SectionPreview } from "@/lib/admin-section-previews";
import { AdminSectionThumb } from "@/components/admin/admin-section-thumb";

type Props = {
  page: AdminPage;
  previewFor: (sectionId: SectionId) => SectionPreview;
  onOpen: (section: SectionId) => void;
};

export function AdminPageHub({ page, previewFor, onOpen }: Props) {
  const editable = page.sections.filter((item) => item.id !== "hub");

  return (
    <section className="go-cms-hub">
      <header className="go-cms-hub-head">
        <div>
          <p className="go-cms-crumb">Website · {page.path}</p>
          <h2>{page.label}</h2>
          <p className="go-cms-lede">
            Live preview on each card. Open a section to edit every headline, paragraph, image, and video used on the public site.
          </p>
        </div>
        <Link href={page.path} target="_blank" rel="noreferrer" className="go-cms-hub-preview">
          View live page
        </Link>
      </header>
      <div className="go-cms-metric-grid">
        {editable.map((item) => {
          const preview = previewFor(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className="go-cms-metric-card is-rich"
              onClick={() => onOpen(item.id)}
            >
              <AdminSectionThumb preview={preview} />
              <p className="go-cms-metric-label">{item.label}</p>
              <strong className="go-cms-metric-title">{item.label}</strong>
              <small>{preview.excerpt || item.hint}</small>
              {preview.mediaCount ? <span className="go-cms-metric-badge">{preview.mediaCount} assets</span> : null}
              <em>Edit all fields →</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function AdminSitePagesGrid({
  pages,
  previewForPage,
  onOpen,
}: {
  pages: AdminPage[];
  previewForPage?: (page: AdminPage) => SectionPreview;
  onOpen: (page: AdminPage) => void;
}) {
  return (
    <div className="go-cms-site-grid">
      {pages.map((item) => {
        const preview = previewForPage?.(item);
        return (
          <button key={item.id} type="button" className="go-cms-metric-card is-page is-rich" onClick={() => onOpen(item)}>
            {preview ? (
              <AdminSectionThumb preview={preview} />
            ) : (
              <div className="go-cms-metric-visual is-empty">
                <span className="go-cms-metric-thumb is-text">{item.label.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
            <p className="go-cms-metric-label">Page</p>
            <strong className="go-cms-metric-title">{item.label}</strong>
            <small>{preview?.excerpt || item.path}</small>
            <em>{item.seoOnly ? "SEO" : `${item.sections.length} sections`}</em>
          </button>
        );
      })}
    </div>
  );
}
