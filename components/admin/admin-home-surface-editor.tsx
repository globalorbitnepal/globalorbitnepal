"use client";

import type { HomeSurfaceConfig } from "@/lib/home-surface-config";

const FIELDS: { key: keyof HomeSurfaceConfig; label: string; multiline?: boolean }[] = [
  { key: "processBadgeNum", label: "Process badge number" },
  { key: "processBadgeLabel", label: "Process badge label" },
  { key: "processTitleLine1", label: "Process title line 1" },
  { key: "processTitleLine2", label: "Process title line 2" },
  { key: "processLede", label: "Process description", multiline: true },
  { key: "madeBadgeNum", label: "Portfolio badge number" },
  { key: "madeBadgeLabel", label: "Portfolio badge label" },
  { key: "madeTitle", label: "Portfolio scroll title" },
  { key: "madeCtaLabel", label: "Portfolio CTA button" },
  { key: "whyTitle", label: "Why us heading", multiline: true },
  { key: "reviewsTitle", label: "Reviews heading" },
  { key: "faqTitle", label: "FAQ heading" },
  { key: "faqLede", label: "FAQ intro", multiline: true },
  { key: "ctaTitle", label: "Bottom CTA title", multiline: true },
  { key: "ctaLede", label: "Bottom CTA text", multiline: true },
  { key: "ctaButtonLabel", label: "Bottom CTA button" },
];

export function AdminHomeSurfaceEditor({
  surface,
  busy,
  onChange,
  onSave,
}: {
  surface: HomeSurfaceConfig;
  busy: boolean;
  onChange: (next: HomeSurfaceConfig) => void;
  onSave: () => void;
}) {
  return (
    <section className="go-cms-card">
      <h2>Homepage · lower sections</h2>
      <p className="go-cms-help">
        Process, portfolio scroll, why us, reviews, FAQ, and closing CTA. Offices & newsletter: Header & footer.
      </p>
      <div className="go-cms-form">
        {FIELDS.map(({ key, label, multiline }) => (
          <label key={key}>
            {label}
            {multiline ? (
              <textarea
                value={surface[key]}
                onChange={(e) => onChange({ ...surface, [key]: e.target.value })}
              />
            ) : (
              <input
                value={surface[key]}
                onChange={(e) => onChange({ ...surface, [key]: e.target.value })}
              />
            )}
          </label>
        ))}
        <button type="button" disabled={busy} onClick={onSave}>
          Publish homepage copy
        </button>
      </div>
    </section>
  );
}
