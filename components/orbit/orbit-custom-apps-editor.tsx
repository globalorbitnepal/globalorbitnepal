"use client";

import type { FormEvent, ReactNode } from "react";
import { AdminMediaField } from "@/components/admin/admin-media-field";
import type { CustomAppsConfig } from "@/lib/custom-apps-config";
import type { PlatformPageSlug } from "@/lib/platform-page-slugs";

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
  config: CustomAppsConfig;
  setConfig: React.Dispatch<React.SetStateAction<CustomAppsConfig>>;
  pageTitle: string;
  livePath: string;
  busy: boolean;
  status: string;
  onSubmit: (event: FormEvent) => void;
  adminEmbed?: boolean;
  platformSlug?: PlatformPageSlug;
};

export function OrbitCustomAppsEditorForm({
  config,
  setConfig,
  pageTitle,
  livePath,
  busy,
  status,
  onSubmit,
  adminEmbed,
  platformSlug = "web-apps",
}: Props) {
  const set = <K extends keyof CustomAppsConfig>(key: K) => (value: CustomAppsConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  async function uploadPlatformVideo(kind: "platformHeroVideo" | "platformClipVideo", file: File, clipIndex?: number) {
    const form = new FormData();
    form.set("kind", kind);
    form.set("platformSlug", platformSlug);
    form.set("file", file);
    if (clipIndex !== undefined) form.set("clipIndex", String(clipIndex));
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = await response.json();
    if (data.platformConfig) setConfig(data.platformConfig);
  }

  const mapCards = (
    key: "capabilities" | "platforms" | "useCases" | "stackItems",
    index: number,
    patch: Partial<{ title: string; body: string }>,
  ) => {
    setConfig((c) => ({
      ...c,
      [key]: c[key].map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));
  };

  return (
    <>
      <div className="mb-6 hidden lg:block">
        <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">{pageTitle}</h1>
        <p className="mt-1 text-sm text-white/55">
          Full text and video assets for {livePath} — hero reel plus four product clips.
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

        <Panel title="Hero video" description="MP4 played in the page hero.">
          {adminEmbed ? (
            <AdminMediaField
              label="Hero video"
              src={config.heroVideoSrc}
              kind="video"
              accept="video/mp4,video/*"
              disabled={busy}
              onPick={(file) => uploadPlatformVideo("platformHeroVideo", file)}
            />
          ) : null}
          <Field
            label="Hero video URL"
            value={config.heroVideoSrc}
            onChange={(v) => set("heroVideoSrc")(v)}
            hint="e.g. /brand/custom-apps/01-customer-portal.mp4 or uploaded /api/media/hero/…"
          />
        </Panel>

        <Panel title="Four app videos">
          <Field label="Section eyebrow" value={config.appVideosEyebrow} onChange={(v) => set("appVideosEyebrow")(v)} />
          <Field label="Title" value={config.appVideosTitle} onChange={(v) => set("appVideosTitle")(v)} />
          <Field label="Title accent" value={config.appVideosTitleAccent} onChange={(v) => set("appVideosTitleAccent")(v)} />
          <Field label="Supporting line" value={config.appVideosLede} onChange={(v) => set("appVideosLede")(v)} multiline />
          {config.appVideos.map((clip, index) => (
            <div key={`vid-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field
                label={`Video ${index + 1} title`}
                value={clip.title}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    appVideos: c.appVideos.map((item, i) => (i === index ? { ...item, title: v } : item)),
                  }))
                }
              />
              <Field
                label="Caption"
                value={clip.body}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    appVideos: c.appVideos.map((item, i) => (i === index ? { ...item, body: v } : item)),
                  }))
                }
                multiline
              />
              {adminEmbed ? (
                <AdminMediaField
                  label={`Video file · clip ${index + 1}`}
                  src={clip.videoSrc}
                  kind="video"
                  accept="video/mp4,video/*"
                  disabled={busy}
                  onPick={(file) => uploadPlatformVideo("platformClipVideo", file, index)}
                />
              ) : null}
              <Field
                label="Video path"
                value={clip.videoSrc}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    appVideos: c.appVideos.map((item, i) => (i === index ? { ...item, videoSrc: v } : item)),
                  }))
                }
              />
            </div>
          ))}
        </Panel>

        <Panel title="Stats (4)">
          {config.stats.map((stat, index) => (
            <div key={`stat-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field
                label={`Value ${index + 1}`}
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

        <Panel title="Overview">
          <Field label="Eyebrow" value={config.overviewEyebrow} onChange={(v) => set("overviewEyebrow")(v)} />
          <Field label="Heading" value={config.overviewTitle} onChange={(v) => set("overviewTitle")(v)} />
          {config.overviewParagraphs.map((p, index) => (
            <Field
              key={`ov-${index}`}
              label={`Paragraph ${index + 1}`}
              value={p}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  overviewParagraphs: c.overviewParagraphs.map((item, i) => (i === index ? v : item)),
                }))
              }
              multiline
            />
          ))}
        </Panel>

        <Panel title="Capabilities (6 cards)">
          <Field label="Eyebrow" value={config.capabilitiesEyebrow} onChange={(v) => set("capabilitiesEyebrow")(v)} />
          <Field label="Title" value={config.capabilitiesTitle} onChange={(v) => set("capabilitiesTitle")(v)} />
          <Field label="Title accent" value={config.capabilitiesTitleAccent} onChange={(v) => set("capabilitiesTitleAccent")(v)} />
          <Field label="Supporting line" value={config.capabilitiesLede} onChange={(v) => set("capabilitiesLede")(v)} multiline />
          {config.capabilities.map((card, index) => (
            <div key={`cap-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label={`Card ${index + 1} title`} value={card.title} onChange={(v) => mapCards("capabilities", index, { title: v })} />
              <Field label="Body" value={card.body} onChange={(v) => mapCards("capabilities", index, { body: v })} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Platforms (3)">
          <Field label="Eyebrow" value={config.platformsEyebrow} onChange={(v) => set("platformsEyebrow")(v)} />
          <Field label="Heading" value={config.platformsTitle} onChange={(v) => set("platformsTitle")(v)} />
          {config.platforms.map((card, index) => (
            <div key={`plat-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label={`Item ${index + 1} title`} value={card.title} onChange={(v) => mapCards("platforms", index, { title: v })} />
              <Field label="Body" value={card.body} onChange={(v) => mapCards("platforms", index, { body: v })} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Use cases (4)">
          <Field label="Eyebrow" value={config.useCasesEyebrow} onChange={(v) => set("useCasesEyebrow")(v)} />
          <Field label="Heading" value={config.useCasesTitle} onChange={(v) => set("useCasesTitle")(v)} />
          {config.useCases.map((card, index) => (
            <div key={`uc-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label={`Case ${index + 1} title`} value={card.title} onChange={(v) => mapCards("useCases", index, { title: v })} />
              <Field label="Body" value={card.body} onChange={(v) => mapCards("useCases", index, { body: v })} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Process (4 steps)">
          <Field label="Eyebrow" value={config.processEyebrow} onChange={(v) => set("processEyebrow")(v)} />
          <Field label="Heading" value={config.processTitle} onChange={(v) => set("processTitle")(v)} />
          <Field label="Supporting line" value={config.processLede} onChange={(v) => set("processLede")(v)} multiline />
          {config.processSteps.map((step, index) => (
            <div key={`step-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field
                label={`Step ${index + 1} title`}
                value={step.title}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    processSteps: c.processSteps.map((item, i) => (i === index ? { ...item, title: v } : item)),
                  }))
                }
              />
              <Field
                label="Body"
                value={step.body}
                onChange={(v) =>
                  setConfig((c) => ({
                    ...c,
                    processSteps: c.processSteps.map((item, i) => (i === index ? { ...item, body: v } : item)),
                  }))
                }
                multiline
              />
            </div>
          ))}
        </Panel>

        <Panel title="Stack (4 items)">
          <Field label="Eyebrow" value={config.stackEyebrow} onChange={(v) => set("stackEyebrow")(v)} />
          <Field label="Heading" value={config.stackTitle} onChange={(v) => set("stackTitle")(v)} />
          {config.stackItems.map((card, index) => (
            <div key={`stack-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Field label={`Item ${index + 1} title`} value={card.title} onChange={(v) => mapCards("stackItems", index, { title: v })} />
              <Field label="Body" value={card.body} onChange={(v) => mapCards("stackItems", index, { body: v })} multiline />
            </div>
          ))}
        </Panel>

        <Panel title="Deliverables & assurance">
          <Field label="Deliverables eyebrow" value={config.deliverablesEyebrow} onChange={(v) => set("deliverablesEyebrow")(v)} />
          <Field label="Deliverables title" value={config.deliverablesTitle} onChange={(v) => set("deliverablesTitle")(v)} />
          {config.deliverablesBullets.map((bullet, index) => (
            <Field
              key={`del-${index}`}
              label={`Bullet ${index + 1}`}
              value={bullet}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  deliverablesBullets: c.deliverablesBullets.map((item, i) => (i === index ? v : item)),
                }))
              }
              multiline
            />
          ))}
          <Field label="Assurance heading" value={config.assuranceTitle} onChange={(v) => set("assuranceTitle")(v)} />
          {config.assuranceBullets.map((bullet, index) => (
            <Field
              key={`as-${index}`}
              label={`Assurance ${index + 1}`}
              value={bullet}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  assuranceBullets: c.assuranceBullets.map((item, i) => (i === index ? v : item)),
                }))
              }
              multiline
            />
          ))}
        </Panel>

        <Panel title="Bottom CTA">
          <Field label="Title" value={config.ctaTitle} onChange={(v) => set("ctaTitle")(v)} />
          <Field label="Lede" value={config.ctaLede} onChange={(v) => set("ctaLede")(v)} multiline />
          <Field label="Primary button" value={config.ctaPrimaryLabel} onChange={(v) => set("ctaPrimaryLabel")(v)} />
          <Field label="Primary link" value={config.ctaPrimaryHref} onChange={(v) => set("ctaPrimaryHref")(v)} hint="/contact" />
          <Field label="Secondary button" value={config.ctaSecondaryLabel} onChange={(v) => set("ctaSecondaryLabel")(v)} />
          <Field label="Secondary link" value={config.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref")(v)} />
        </Panel>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-[#f0c43a] px-8 py-3.5 text-sm font-semibold text-[#14120a] disabled:opacity-50"
          >
            {busy ? "Saving…" : `Save ${pageTitle.toLowerCase()}`}
          </button>
          {status ? <p className="text-sm text-white/60">{status}</p> : null}
        </div>
      </form>
    </>
  );
}
