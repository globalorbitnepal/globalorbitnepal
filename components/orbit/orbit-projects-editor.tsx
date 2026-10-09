"use client";

import type { FormEvent, ReactNode } from "react";
import { AdminMediaField } from "@/components/admin/admin-media-field";
import type { ProjectsConfig } from "@/lib/projects-config";

function Field({
  label,
  value,
  onChange,
  multiline,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-white/70">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white"
        />
      )}
      {hint ? <span className="mt-1 block text-xs text-white/40">{hint}</span> : null}
    </label>
  );
}

function Panel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="orbit-studio-glass rounded-3xl p-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {description ? <p className="mt-1 text-sm text-white/55">{description}</p> : null}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

type Props = {
  config: ProjectsConfig;
  setConfig: React.Dispatch<React.SetStateAction<ProjectsConfig>>;
  busy: boolean;
  status: string;
  onSubmit: (event: FormEvent) => void;
  adminEmbed?: boolean;
};

export function OrbitProjectsEditorForm({ config, setConfig, busy, status, onSubmit, adminEmbed }: Props) {
  const set = <K extends keyof ProjectsConfig>(key: K) => (value: ProjectsConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  async function uploadShowcaseImage(slug: string, file: File) {
    const form = new FormData();
    form.set("kind", "projectImage");
    form.set("projectSlug", slug);
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = await response.json();
    if (data.projectsConfig) setConfig(data.projectsConfig);
  }

  return (
    <>
      <div className="mb-6 hidden lg:block">
        <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">Projects page</h1>
        <p className="mt-1 text-sm text-white/55">
          Full text and scroll-zoom screenshots for /projects — replace every project image from the admin console.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Panel title="Hero">
          <Field label="Eyebrow" value={config.heroEyebrow} onChange={(v) => set("heroEyebrow")(v)} />
          <Field label="Title (before accent)" value={config.heroTitleBefore} onChange={(v) => set("heroTitleBefore")(v)} />
          <Field label="Title accent" value={config.heroTitleAccent} onChange={(v) => set("heroTitleAccent")(v)} />
          <Field label="Title (line 2)" value={config.heroTitleAfter} onChange={(v) => set("heroTitleAfter")(v)} />
          <Field label="Intro" value={config.heroLede} onChange={(v) => set("heroLede")(v)} multiline />
        </Panel>

        <Panel title="Zoom section header">
          <Field label="Eyebrow" value={config.zoomEyebrow} onChange={(v) => set("zoomEyebrow")(v)} />
          <Field label="Title" value={config.zoomTitle} onChange={(v) => set("zoomTitle")(v)} />
          <Field label="Title accent" value={config.zoomTitleAccent} onChange={(v) => set("zoomTitleAccent")(v)} />
          <Field label="Supporting line" value={config.zoomLede} onChange={(v) => set("zoomLede")(v)} multiline />
        </Panel>

        <Panel title="Stats row (4)" description="Numbers above the scroll gallery">
          {config.stats.map((stat, index) => (
            <div key={`stat-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field
                label={`Stat ${index + 1} value`}
                value={stat.value}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    stats: c.stats.map((item, i) => (i === index ? { ...item, value: v } : item)),
                  }))
                }
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    stats: c.stats.map((item, i) => (i === index ? { ...item, label: v } : item)),
                  }))
                }
              />
            </div>
          ))}
        </Panel>

        <Panel title="Nine featured launches" description="One box per scroll step — image, titles, and browser bar URL.">
          {config.showcases.map((showcase, index) => (
            <div key={showcase.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#818cf8]">
                {String(index + 1).padStart(2, "0")} · {showcase.slug}
              </p>
              <Field
                label="Project name"
                value={showcase.title}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    showcases: c.showcases.map((item, i) => (i === index ? { ...item, title: v } : item)),
                  }))
                }
              />
              <Field
                label="Category line"
                value={showcase.category}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    showcases: c.showcases.map((item, i) => (i === index ? { ...item, category: v } : item)),
                  }))
                }
              />
              <Field
                label="Subtitle"
                value={showcase.subtitle}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    showcases: c.showcases.map((item, i) => (i === index ? { ...item, subtitle: v } : item)),
                  }))
                }
                multiline
              />
              <Field
                label="Browser bar URL (display only)"
                value={showcase.chromeUrl}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    showcases: c.showcases.map((item, i) => (i === index ? { ...item, chromeUrl: v } : item)),
                  }))
                }
              />
              {adminEmbed ? (
                <AdminMediaField
                  label="Scroll-zoom screenshot"
                  description="Full-page capture used in the portfolio zoom sequence."
                  src={showcase.imageSrc}
                  kind="image"
                  accept="image/png,image/jpeg,image/webp,image/*"
                  disabled={busy}
                  onPick={(file) => uploadShowcaseImage(showcase.slug, file)}
                />
              ) : null}
            </div>
          ))}
        </Panel>

        <Panel title="Scope section">
          <Field label="Eyebrow" value={config.scopeEyebrow} onChange={(v) => set("scopeEyebrow")(v)} />
          <Field label="Heading" value={config.scopeTitle} onChange={(v) => set("scopeTitle")(v)} />
          {config.scopeParagraphs.map((p, index) => (
            <Field
              key={`scope-p-${index}`}
              label={`Paragraph ${index + 1}`}
              value={p}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  scopeParagraphs: c.scopeParagraphs.map((item, i) => (i === index ? v : item)),
                }))
              }
              multiline
            />
          ))}
          {config.scopeBullets.map((bullet, index) => (
            <Field
              key={`scope-b-${index}`}
              label={`Bullet ${index + 1}`}
              value={bullet}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  scopeBullets: c.scopeBullets.map((item, i) => (i === index ? v : item)),
                }))
              }
              multiline
            />
          ))}
        </Panel>

        <Panel title="Bottom CTA">
          <Field label="Title" value={config.ctaTitle} onChange={(v) => set("ctaTitle")(v)} />
          <Field label="Lede" value={config.ctaLede} onChange={(v) => set("ctaLede")(v)} multiline />
          <Field label="Primary button label" value={config.ctaPrimaryLabel} onChange={(v) => set("ctaPrimaryLabel")(v)} />
          <Field label="Primary link" value={config.ctaPrimaryHref} onChange={(v) => set("ctaPrimaryHref")(v)} hint="e.g. /contact" />
          <Field
            label="Secondary button label"
            value={config.ctaSecondaryLabel}
            onChange={(v) => set("ctaSecondaryLabel")(v)}
          />
          <Field label="Secondary link" value={config.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref")(v)} />
        </Panel>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-[#f0c43a] px-8 py-3.5 text-sm font-semibold text-[#14120a] disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save projects page"}
          </button>
          {status ? <p className="text-sm text-white/60">{status}</p> : null}
        </div>
      </form>
    </>
  );
}
