"use client";

import type { FormEvent, ReactNode } from "react";
import type { CareersConfig } from "@/lib/careers-config";

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
  config: CareersConfig;
  setConfig: React.Dispatch<React.SetStateAction<CareersConfig>>;
  busy: boolean;
  status: string;
  onSubmit: (event: FormEvent) => void;
};

export function OrbitCareersEditorForm({ config, setConfig, busy, status, onSubmit }: Props) {
  const set = <K extends keyof CareersConfig>(key: K) => (value: CareersConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  return (
    <>
      <div className="mb-6 hidden lg:block">
        <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">Careers page</h1>
        <p className="mt-1 text-sm text-white/55">Full text for /careers — roles, culture, hiring process. No image uploads.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Panel title="Hero">
          <Field label="Eyebrow" value={config.heroEyebrow} onChange={(v) => set("heroEyebrow")(v)} />
          <Field label="Title (before accent)" value={config.heroTitleBefore} onChange={(v) => set("heroTitleBefore")(v)} />
          <Field label="Title accent" value={config.heroTitleAccent} onChange={(v) => set("heroTitleAccent")(v)} />
          <Field label="Title (line 2)" value={config.heroTitleAfter} onChange={(v) => set("heroTitleAfter")(v)} />
          <Field label="Intro" value={config.heroLede} onChange={(v) => set("heroLede")(v)} multiline />
        </Panel>

        <Panel title="Culture">
          <Field label="Eyebrow" value={config.cultureEyebrow} onChange={(v) => set("cultureEyebrow")(v)} />
          <Field label="Heading" value={config.cultureTitle} onChange={(v) => set("cultureTitle")(v)} />
          {config.cultureParagraphs.map((p, index) => (
            <Field
              key={`culture-${index}`}
              label={`Paragraph ${index + 1}`}
              value={p}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  cultureParagraphs: c.cultureParagraphs.map((item, i) => (i === index ? v : item)),
                }))
              }
              multiline
            />
          ))}
        </Panel>

        <Panel title="Benefits (4 cards)">
          <Field label="Eyebrow" value={config.perksEyebrow} onChange={(v) => set("perksEyebrow")(v)} />
          <Field label="Title" value={config.perksTitle} onChange={(v) => set("perksTitle")(v)} />
          <Field label="Title accent" value={config.perksTitleAccent} onChange={(v) => set("perksTitleAccent")(v)} />
          <Field label="Supporting line" value={config.perksLede} onChange={(v) => set("perksLede")(v)} multiline />
          {config.perks.map((perk, index) => (
            <div key={`perk-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field
                label={`Card ${index + 1} title`}
                value={perk.title}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    perks: c.perks.map((item, i) => (i === index ? { ...item, title: v } : item)),
                  }))
                }
              />
              <Field
                label="Body"
                value={perk.body}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    perks: c.perks.map((item, i) => (i === index ? { ...item, body: v } : item)),
                  }))
                }
                multiline
              />
            </div>
          ))}
        </Panel>

        <Panel title="Open roles (3)" description="Slug stays fixed for URLs; edit titles and copy.">
          <Field label="Section eyebrow" value={config.rolesEyebrow} onChange={(v) => set("rolesEyebrow")(v)} />
          <Field label="Title" value={config.rolesTitle} onChange={(v) => set("rolesTitle")(v)} />
          <Field label="Title accent" value={config.rolesTitleAccent} onChange={(v) => set("rolesTitleAccent")(v)} />
          <Field label="Supporting line" value={config.rolesLede} onChange={(v) => set("rolesLede")(v)} multiline />
          {config.roles.map((role, index) => (
            <div key={role.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Role {index + 1} · /careers/{role.slug}
              </p>
              <Field label="Title" value={role.title} onChange={(v) => setConfig((c) => ({ ...c, roles: c.roles.map((r, i) => (i === index ? { ...r, title: v } : r)) }))} />
              <Field label="Summary" value={role.summary} onChange={(v) => setConfig((c) => ({ ...c, roles: c.roles.map((r, i) => (i === index ? { ...r, summary: v } : r)) }))} multiline />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Location" value={role.location} onChange={(v) => setConfig((c) => ({ ...c, roles: c.roles.map((r, i) => (i === index ? { ...r, location: v } : r)) }))} />
                <Field label="Employment type" value={role.employmentType} onChange={(v) => setConfig((c) => ({ ...c, roles: c.roles.map((r, i) => (i === index ? { ...r, employmentType: v } : r)) }))} />
                <Field label="Department" value={role.department} onChange={(v) => setConfig((c) => ({ ...c, roles: c.roles.map((r, i) => (i === index ? { ...r, department: v } : r)) }))} />
              </div>
            </div>
          ))}
          <Field label="Apply note (footer under roles)" value={config.applyNote} onChange={(v) => set("applyNote")(v)} multiline />
        </Panel>

        <Panel title="Hiring process">
          <Field label="Eyebrow" value={config.processEyebrow} onChange={(v) => set("processEyebrow")(v)} />
          <Field label="Title" value={config.processTitle} onChange={(v) => set("processTitle")(v)} />
          <Field label="Supporting line" value={config.processLede} onChange={(v) => set("processLede")(v)} multiline />
          {config.processSteps.map((step, index) => (
            <div key={`step-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label={`Step ${index + 1} title`} value={step.title} onChange={(v) => setConfig((c) => ({ ...c, processSteps: c.processSteps.map((s, i) => (i === index ? { ...s, title: v } : s)) }))} />
              <Field label="Body" value={step.body} onChange={(v) => setConfig((c) => ({ ...c, processSteps: c.processSteps.map((s, i) => (i === index ? { ...s, body: v } : s)) }))} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Where we hire">
          <Field label="Eyebrow" value={config.officesEyebrow} onChange={(v) => set("officesEyebrow")(v)} />
          <Field label="Title" value={config.officesTitle} onChange={(v) => set("officesTitle")(v)} />
          <Field label="Supporting line" value={config.officesLede} onChange={(v) => set("officesLede")(v)} multiline />
          {config.offices.map((office, index) => (
            <div key={`office-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label="Title" value={office.title} onChange={(v) => setConfig((c) => ({ ...c, offices: c.offices.map((o, i) => (i === index ? { ...o, title: v } : o)) }))} />
              <Field label="Body" value={office.body} onChange={(v) => setConfig((c) => ({ ...c, offices: c.offices.map((o, i) => (i === index ? { ...o, body: v } : o)) }))} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Quote">
          <Field label="Quote text" value={config.quoteText} onChange={(v) => set("quoteText")(v)} multiline />
          <Field label="Author" value={config.quoteAuthor} onChange={(v) => set("quoteAuthor")(v)} />
          <Field label="Author line" value={config.quoteRole} onChange={(v) => set("quoteRole")(v)} />
        </Panel>

        <Panel title="Bottom CTA">
          <Field label="Headline" value={config.ctaTitle} onChange={(v) => set("ctaTitle")(v)} multiline />
          <Field label="Supporting line" value={config.ctaLede} onChange={(v) => set("ctaLede")(v)} multiline />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Primary label" value={config.ctaPrimaryLabel} onChange={(v) => set("ctaPrimaryLabel")(v)} />
            <Field label="Primary link" value={config.ctaPrimaryHref} onChange={(v) => set("ctaPrimaryHref")(v)} />
            <Field label="Secondary label" value={config.ctaSecondaryLabel} onChange={(v) => set("ctaSecondaryLabel")(v)} />
            <Field label="Secondary link" value={config.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref")(v)} hint="Use #open-roles to scroll to jobs" />
          </div>
        </Panel>

        <button disabled={busy} className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-[#0b0b10] sm:w-auto sm:px-10">
          Save Careers page
        </button>
      </form>
      {status ? <p className="mt-6 text-sm text-[#818cf8]">{status}</p> : null}
    </>
  );
}
