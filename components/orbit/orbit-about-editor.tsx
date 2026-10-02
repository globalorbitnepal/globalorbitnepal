"use client";

import type { FormEvent, ReactNode } from "react";
import type { AboutConfig } from "@/lib/about-config";

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
  config: AboutConfig;
  setConfig: React.Dispatch<React.SetStateAction<AboutConfig>>;
  busy: boolean;
  status: string;
  onSubmit: (event: FormEvent) => void;
};

export function OrbitAboutEditorForm({ config, setConfig, busy, status, onSubmit }: Props) {
  const set = <K extends keyof AboutConfig>(key: K) => (value: AboutConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const updateParagraph = (index: number, value: string) => {
    setConfig((current) => {
      const next = [...current.storyParagraphs];
      next[index] = value;
      return { ...current, storyParagraphs: next };
    });
  };

  const updateBullet = (index: number, value: string) => {
    setConfig((current) => {
      const next = [...current.whyBullets];
      next[index] = value;
      return { ...current, whyBullets: next };
    });
  };

  return (
    <>
      <div className="mb-6 hidden lg:block">
        <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">About page</h1>
        <p className="mt-1 text-sm text-white/55">
          Full text control for /about — hero, story, timeline, team, regions, and CTA. No image uploads here.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Panel title="Hero" description="Top of the About page.">
          <Field label="Eyebrow" value={config.heroEyebrow} onChange={(v) => set("heroEyebrow")(v)} />
          <Field label="Title (before accent)" value={config.heroTitleBefore} onChange={(v) => set("heroTitleBefore")(v)} />
          <Field label="Title accent (gold gradient)" value={config.heroTitleAccent} onChange={(v) => set("heroTitleAccent")(v)} />
          <Field label="Title (after accent / line 2)" value={config.heroTitleAfter} onChange={(v) => set("heroTitleAfter")(v)} />
          <Field label="Intro paragraph" value={config.heroLede} onChange={(v) => set("heroLede")(v)} multiline />
        </Panel>

        <Panel title="Story block">
          <Field label="Eyebrow" value={config.storyEyebrow} onChange={(v) => set("storyEyebrow")(v)} />
          <Field label="Heading" value={config.storyTitle} onChange={(v) => set("storyTitle")(v)} />
          {config.storyParagraphs.map((paragraph, index) => (
            <Field
              key={`story-p-${index}`}
              label={`Paragraph ${index + 1}`}
              value={paragraph}
              onChange={(value) => updateParagraph(index, value)}
              multiline
            />
          ))}
        </Panel>

        <Panel title="Mission & vision">
          <Field label="Mission title" value={config.missionTitle} onChange={(v) => set("missionTitle")(v)} />
          <Field label="Mission body" value={config.missionBody} onChange={(v) => set("missionBody")(v)} multiline />
          <Field label="Vision title" value={config.visionTitle} onChange={(v) => set("visionTitle")(v)} />
          <Field label="Vision body" value={config.visionBody} onChange={(v) => set("visionBody")(v)} multiline />
        </Panel>

        <Panel title="Values (4 cards)">
          <Field label="Eyebrow" value={config.valuesEyebrow} onChange={(v) => set("valuesEyebrow")(v)} />
          <Field label="Title" value={config.valuesTitle} onChange={(v) => set("valuesTitle")(v)} />
          <Field label="Title accent" value={config.valuesTitleAccent} onChange={(v) => set("valuesTitleAccent")(v)} />
          {config.values.map((value, index) => (
            <div key={`value-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Value {index + 1}</p>
              <Field label="Title" value={value.title} onChange={(v) => setConfig((c) => ({ ...c, values: c.values.map((item, i) => (i === index ? { ...item, title: v } : item)) }))} />
              <Field label="Body" value={value.body} onChange={(v) => setConfig((c) => ({ ...c, values: c.values.map((item, i) => (i === index ? { ...item, body: v } : item)) }))} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Journey timeline">
          <Field label="Eyebrow" value={config.journeyEyebrow} onChange={(v) => set("journeyEyebrow")(v)} />
          <Field label="Title" value={config.journeyTitle} onChange={(v) => set("journeyTitle")(v)} />
          <Field label="Title accent" value={config.journeyTitleAccent} onChange={(v) => set("journeyTitleAccent")(v)} />
          <Field label="Supporting line" value={config.journeyLede} onChange={(v) => set("journeyLede")(v)} multiline />
          {config.journey.map((item, index) => (
            <div key={`journey-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Milestone {index + 1}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Year" value={item.year} onChange={(v) => setConfig((c) => ({ ...c, journey: c.journey.map((j, i) => (i === index ? { ...j, year: v } : j)) }))} />
                <Field label="Title" value={item.title} onChange={(v) => setConfig((c) => ({ ...c, journey: c.journey.map((j, i) => (i === index ? { ...j, title: v } : j)) }))} />
              </div>
              <Field label="Description" value={item.body} onChange={(v) => setConfig((c) => ({ ...c, journey: c.journey.map((j, i) => (i === index ? { ...j, body: v } : j)) }))} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Statistics band">
          {config.stats.map((stat, index) => (
            <div key={`stat-${index}`} className="grid gap-3 sm:grid-cols-2 rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label={`Stat ${index + 1} value`} value={stat.value} onChange={(v) => setConfig((c) => ({ ...c, stats: c.stats.map((s, i) => (i === index ? { ...s, value: v } : s)) }))} />
              <Field label="Label" value={stat.label} onChange={(v) => setConfig((c) => ({ ...c, stats: c.stats.map((s, i) => (i === index ? { ...s, label: v } : s)) }))} />
            </div>
          ))}
        </Panel>

        <Panel title="How we work (3 steps)">
          <Field label="Eyebrow" value={config.approachEyebrow} onChange={(v) => set("approachEyebrow")(v)} />
          <Field label="Title" value={config.approachTitle} onChange={(v) => set("approachTitle")(v)} />
          <Field label="Supporting line" value={config.approachLede} onChange={(v) => set("approachLede")(v)} multiline />
          {config.approachSteps.map((step, index) => (
            <div key={`step-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label={`Step ${index + 1} title`} value={step.title} onChange={(v) => setConfig((c) => ({ ...c, approachSteps: c.approachSteps.map((s, i) => (i === index ? { ...s, title: v } : s)) }))} />
              <Field label="Body" value={step.body} onChange={(v) => setConfig((c) => ({ ...c, approachSteps: c.approachSteps.map((s, i) => (i === index ? { ...s, body: v } : s)) }))} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Team (text only)">
          <Field label="Eyebrow" value={config.teamEyebrow} onChange={(v) => set("teamEyebrow")(v)} />
          <Field label="Title" value={config.teamTitle} onChange={(v) => set("teamTitle")(v)} />
          <Field label="Supporting line" value={config.teamLede} onChange={(v) => set("teamLede")(v)} multiline />
          {config.team.map((member, index) => (
            <div key={`team-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Role" value={member.role} onChange={(v) => setConfig((c) => ({ ...c, team: c.team.map((m, i) => (i === index ? { ...m, role: v } : m)) }))} />
                <Field label="Specialty" value={member.specialty} onChange={(v) => setConfig((c) => ({ ...c, team: c.team.map((m, i) => (i === index ? { ...m, specialty: v } : m)) }))} />
                <Field label="Icon (emoji/symbol)" value={member.icon} onChange={(v) => setConfig((c) => ({ ...c, team: c.team.map((m, i) => (i === index ? { ...m, icon: v } : m)) }))} hint="Single character or short symbol" />
              </div>
            </div>
          ))}
        </Panel>

        <Panel title="Global presence">
          <Field label="Eyebrow" value={config.presenceEyebrow} onChange={(v) => set("presenceEyebrow")(v)} />
          <Field label="Title" value={config.presenceTitle} onChange={(v) => set("presenceTitle")(v)} />
          <Field label="Supporting line" value={config.presenceLede} onChange={(v) => set("presenceLede")(v)} multiline />
          {config.regions.map((region, index) => (
            <div key={`region-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label="Region title" value={region.title} onChange={(v) => setConfig((c) => ({ ...c, regions: c.regions.map((r, i) => (i === index ? { ...r, title: v } : r)) }))} />
              <Field label="Body" value={region.body} onChange={(v) => setConfig((c) => ({ ...c, regions: c.regions.map((r, i) => (i === index ? { ...r, body: v } : r)) }))} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Why choose us">
          <Field label="Eyebrow" value={config.whyEyebrow} onChange={(v) => set("whyEyebrow")(v)} />
          <Field label="Title" value={config.whyTitle} onChange={(v) => set("whyTitle")(v)} />
          {config.whyBullets.map((bullet, index) => (
            <Field key={`why-${index}`} label={`Bullet ${index + 1}`} value={bullet} onChange={(value) => updateBullet(index, value)} multiline />
          ))}
        </Panel>

        <Panel title="Bottom CTA">
          <Field label="Headline" value={config.ctaTitle} onChange={(v) => set("ctaTitle")(v)} multiline />
          <Field label="Supporting line" value={config.ctaLede} onChange={(v) => set("ctaLede")(v)} multiline />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Primary button label" value={config.ctaPrimaryLabel} onChange={(v) => set("ctaPrimaryLabel")(v)} />
            <Field label="Primary link" value={config.ctaPrimaryHref} onChange={(v) => set("ctaPrimaryHref")(v)} />
            <Field label="Secondary button label" value={config.ctaSecondaryLabel} onChange={(v) => set("ctaSecondaryLabel")(v)} />
            <Field label="Secondary link" value={config.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref")(v)} />
          </div>
        </Panel>

        <button disabled={busy} className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-[#0b0b10] sm:w-auto sm:px-10">
          Save About page
        </button>
      </form>
      {status ? <p className="mt-6 text-sm text-[#818cf8]">{status}</p> : null}
    </>
  );
}
