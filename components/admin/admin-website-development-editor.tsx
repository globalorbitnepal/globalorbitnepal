"use client";

import type { FormEvent } from "react";
import { AdminMediaField } from "@/components/admin/admin-media-field";
import type { WebsiteDevelopmentPageConfig } from "@/lib/website-development-page-config";

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
      <span className="mb-1.5 block font-medium text-[#1a1a22]">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[#1a1a22]"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[#1a1a22]"
        />
      )}
      {hint ? <span className="mt-1 block text-xs text-black/45">{hint}</span> : null}
    </label>
  );
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="go-cms-card">
      <h3 className="text-lg font-semibold text-[#1a1a22]">{title}</h3>
      {description ? <p className="go-cms-help mt-1">{description}</p> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

async function uploadWebsiteDevImage(assetKey: string, file: File) {
  const form = new FormData();
  form.set("kind", "websiteDevImage");
  form.set("assetKey", assetKey);
  form.set("file", file);
  const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}

type Props = {
  config: WebsiteDevelopmentPageConfig;
  busy: boolean;
  status: string;
  onChange: (next: WebsiteDevelopmentPageConfig) => void;
  onSubmit: (event: FormEvent) => void;
};

export function AdminWebsiteDevelopmentEditor({ config, busy, status, onChange, onSubmit }: Props) {
  const set = (patch: Partial<WebsiteDevelopmentPageConfig>) => onChange({ ...config, ...patch });

  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-16">
      <Panel title="Hero" description="Headline, CTAs, and browser showcase images">
        <Field label="Eyebrow" value={config.hero.eyebrow} onChange={(v) => set({ hero: { ...config.hero, eyebrow: v } })} />
        <Field label="H1" value={config.hero.h1} onChange={(v) => set({ hero: { ...config.hero, h1: v } })} multiline />
        <Field label="Intro" value={config.hero.lede} onChange={(v) => set({ hero: { ...config.hero, lede: v } })} multiline />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary CTA" value={config.hero.primaryCta} onChange={(v) => set({ hero: { ...config.hero, primaryCta: v } })} />
          <Field label="Secondary CTA" value={config.hero.secondaryCta} onChange={(v) => set({ hero: { ...config.hero, secondaryCta: v } })} />
        </div>
        <Field label="Secondary CTA link" value={config.hero.secondaryHref} onChange={(v) => set({ hero: { ...config.hero, secondaryHref: v } })} />
        <AdminMediaField
          label="Hero main browser image"
          description="Central lodge / hospitality preview in the hero composition"
          src={config.heroComposition.mainImage}
          kind="image"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onPick={async (file) => {
            const url = await uploadWebsiteDevImage("hero-main", file);
            set({ heroComposition: { ...config.heroComposition, mainImage: url } });
          }}
        />
        <Field
          label="Main browser URL bar"
          value={config.heroComposition.mainBrowserUrl}
          onChange={(v) => set({ heroComposition: { ...config.heroComposition, mainBrowserUrl: v } })}
        />
        <Field
          label="Hero caption"
          value={config.heroComposition.caption}
          onChange={(v) => set({ heroComposition: { ...config.heroComposition, caption: v } })}
        />
        {config.heroComposition.satellites.map((sat, index) => (
          <div key={index} className="rounded-xl border border-black/10 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-black/50">Satellite preview {index + 1}</p>
            <AdminMediaField
              label="Image"
              src={sat.src}
              kind="image"
              accept="image/jpeg,image/png,image/webp"
              disabled={busy}
              onPick={async (file) => {
                const url = await uploadWebsiteDevImage(`hero-sat-${index}`, file);
                const satellites = config.heroComposition.satellites.map((s, i) =>
                  i === index ? { ...s, src: url } : s,
                );
                set({ heroComposition: { ...config.heroComposition, satellites } });
              }}
            />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field
                label="URL bar"
                value={sat.url}
                onChange={(v) => {
                  const satellites = config.heroComposition.satellites.map((s, i) => (i === index ? { ...s, url: v } : s));
                  set({ heroComposition: { ...config.heroComposition, satellites } });
                }}
              />
              <Field
                label="Alt text"
                value={sat.alt}
                onChange={(v) => {
                  const satellites = config.heroComposition.satellites.map((s, i) => (i === index ? { ...s, alt: v } : s));
                  set({ heroComposition: { ...config.heroComposition, satellites } });
                }}
              />
            </div>
          </div>
        ))}
      </Panel>

      <Panel title="Trust chips" description="Capability labels under the hero (not statistics)">
        {config.trust.map((item, index) => (
          <Field
            key={index}
            label={`Chip ${index + 1}`}
            value={item.label}
            onChange={(v) => {
              const trust = config.trust.map((t, i) => (i === index ? { label: v } : t));
              set({ trust });
            }}
          />
        ))}
      </Panel>

      <Panel title="Introduction">
        <Field label="Section title" value={config.intro.title} onChange={(v) => set({ intro: { ...config.intro, title: v } })} />
        {config.intro.paragraphs.map((p, index) => (
          <Field
            key={index}
            label={`Paragraph ${index + 1}`}
            value={p}
            multiline
            onChange={(v) => {
              const paragraphs = config.intro.paragraphs.map((para, i) => (i === index ? v : para));
              set({ intro: { ...config.intro, paragraphs } });
            }}
          />
        ))}
      </Panel>

      <Panel title="Services grid" description="Twelve service cards">
        {config.services.map((service, index) => (
          <div key={index} className="rounded-xl border border-black/10 p-4 space-y-3">
            <p className="text-xs font-bold text-black/45">Service {index + 1}</p>
            <Field
              label="Title"
              value={service.title}
              onChange={(v) => {
                const services = config.services.map((s, i) => (i === index ? { ...s, title: v } : s));
                set({ services });
              }}
            />
            <Field
              label="Description"
              value={service.body}
              multiline
              onChange={(v) => {
                const services = config.services.map((s, i) => (i === index ? { ...s, body: v } : s));
                set({ services });
              }}
            />
            <Field
              label="Link (optional)"
              value={service.href}
              onChange={(v) => {
                const services = config.services.map((s, i) => (i === index ? { ...s, href: v } : s));
                set({ services });
              }}
            />
          </div>
        ))}
      </Panel>

      <Panel title="Industry panels" description="Six showcases with replaceable images">
        {config.industries.map((panel, index) => (
          <div key={panel.id} className="rounded-xl border border-black/10 p-4 space-y-3">
            <p className="text-xs font-bold text-black/45">{panel.title}</p>
            <AdminMediaField
              label="Panel image"
              src={panel.image}
              kind="image"
              accept="image/jpeg,image/png,image/webp"
              disabled={busy}
              onPick={async (file) => {
                const url = await uploadWebsiteDevImage(`industry-${panel.id}`, file);
                const industries = config.industries.map((p, i) => (i === index ? { ...p, image: url } : p));
                set({ industries });
              }}
            />
            <Field
              label="Image alt"
              value={panel.imageAlt}
              onChange={(v) => {
                const industries = config.industries.map((p, i) => (i === index ? { ...p, imageAlt: v } : p));
                set({ industries });
              }}
            />
            <Field
              label="Title"
              value={panel.title}
              onChange={(v) => {
                const industries = config.industries.map((p, i) => (i === index ? { ...p, title: v } : p));
                set({ industries });
              }}
            />
            <Field
              label="Body"
              value={panel.body}
              multiline
              onChange={(v) => {
                const industries = config.industries.map((p, i) => (i === index ? { ...p, body: v } : p));
                set({ industries });
              }}
            />
            {panel.points.map((point, pi) => (
              <Field
                key={pi}
                label={`Bullet ${pi + 1}`}
                value={point}
                onChange={(v) => {
                  const points = panel.points.map((pt, i) => (i === pi ? v : pt));
                  const industries = config.industries.map((p, i) => (i === index ? { ...p, points } : p));
                  set({ industries });
                }}
              />
            ))}
          </div>
        ))}
      </Panel>

      <Panel title="Demo showcase" description="Six fictional coded demos — upload a screenshot to replace the live demo UI">
        <Field label="Section eyebrow" value={config.demoHeader.eyebrow} onChange={(v) => set({ demoHeader: { ...config.demoHeader, eyebrow: v } })} />
        <Field label="Title" value={config.demoHeader.title} onChange={(v) => set({ demoHeader: { ...config.demoHeader, title: v } })} />
        <Field label="Title accent" value={config.demoHeader.titleAccent} onChange={(v) => set({ demoHeader: { ...config.demoHeader, titleAccent: v } })} />
        <Field label="Lede" value={config.demoHeader.lede} onChange={(v) => set({ demoHeader: { ...config.demoHeader, lede: v } })} multiline />
        {config.demos.map((demo, index) => (
          <div key={demo.id} className="rounded-xl border border-black/10 p-4 space-y-3">
            <p className="font-semibold text-[#1a1a22]">{demo.brand}</p>
            <AdminMediaField
              label="Static preview image (optional)"
              description="When set, replaces the interactive coded demo in the browser frame"
              src={demo.previewImageSrc}
              kind="image"
              accept="image/jpeg,image/png,image/webp"
              disabled={busy}
              onPick={async (file) => {
                const url = await uploadWebsiteDevImage(`demo-${demo.id}`, file);
                const demos = config.demos.map((d, i) => (i === index ? { ...d, previewImageSrc: url } : d));
                set({ demos });
              }}
            />
            <Field
              label="Browser URL"
              value={demo.demoUrl}
              onChange={(v) => {
                const demos = config.demos.map((d, i) => (i === index ? { ...d, demoUrl: v } : d));
                set({ demos });
              }}
            />
            <Field label="Tagline" value={demo.tagline} onChange={(v) => {
              const demos = config.demos.map((d, i) => (i === index ? { ...d, tagline: v } : d));
              set({ demos });
            }} />
            <Field label="Fiction label" value={demo.fictionalLabel} onChange={(v) => {
              const demos = config.demos.map((d, i) => (i === index ? { ...d, fictionalLabel: v } : d));
              set({ demos });
            }} multiline />
            <Field label="Story" value={demo.story} onChange={(v) => {
              const demos = config.demos.map((d, i) => (i === index ? { ...d, story: v } : d));
              set({ demos });
            }} multiline />
            <Field label="Audience" value={demo.audience} onChange={(v) => {
              const demos = config.demos.map((d, i) => (i === index ? { ...d, audience: v } : d));
              set({ demos });
            }} />
            <Field label="Design direction" value={demo.designDirection} onChange={(v) => {
              const demos = config.demos.map((d, i) => (i === index ? { ...d, designDirection: v } : d));
              set({ demos });
            }} />
            <Field label="Conversion action" value={demo.conversionAction} onChange={(v) => {
              const demos = config.demos.map((d, i) => (i === index ? { ...d, conversionAction: v } : d));
              set({ demos });
            }} />
            <Field label="UX note" value={demo.uxNote} onChange={(v) => {
              const demos = config.demos.map((d, i) => (i === index ? { ...d, uxNote: v } : d));
              set({ demos });
            }} multiline />
          </div>
        ))}
      </Panel>

      <Panel title="Process, SEO, pricing, FAQ, closing CTA">
        {config.processSteps.map((step, index) => (
          <div key={index} className="space-y-2 border-b border-black/5 pb-4">
            <Field label={`Step ${index + 1} title`} value={step.title} onChange={(v) => {
              const processSteps = config.processSteps.map((s, i) => (i === index ? { ...s, title: v } : s));
              set({ processSteps });
            }} />
            <Field label="Body" value={step.body} multiline onChange={(v) => {
              const processSteps = config.processSteps.map((s, i) => (i === index ? { ...s, body: v } : s));
              set({ processSteps });
            }} />
            <Field label="Deliverable" value={step.deliverable} onChange={(v) => {
              const processSteps = config.processSteps.map((s, i) => (i === index ? { ...s, deliverable: v } : s));
              set({ processSteps });
            }} />
          </div>
        ))}
        <Field label="SEO section title" value={config.seo.title} onChange={(v) => set({ seo: { ...config.seo, title: v } })} />
        {config.seo.paragraphs.map((p, i) => (
          <Field key={i} label={`SEO paragraph ${i + 1}`} value={p} multiline onChange={(v) => {
            const paragraphs = config.seo.paragraphs.map((para, j) => (j === i ? v : para));
            set({ seo: { ...config.seo, paragraphs } });
          }} />
        ))}
        <Field label="Pricing title" value={config.pricing.title} onChange={(v) => set({ pricing: { ...config.pricing, title: v } })} />
        <Field label="Pricing intro" value={config.pricing.intro} multiline onChange={(v) => set({ pricing: { ...config.pricing, intro: v } })} />
        <Field label="Final CTA title" value={config.finalCta.title} multiline onChange={(v) => set({ finalCta: { ...config.finalCta, title: v } })} />
        <Field label="Final CTA lede" value={config.finalCta.lede} multiline onChange={(v) => set({ finalCta: { ...config.finalCta, lede: v } })} />
      </Panel>

      <Panel title="FAQ" description="Accordion questions — one block per item">
        {config.faq.map((item, index) => (
          <div key={index} className="space-y-2 border-b border-black/5 pb-4">
            <Field label={`Q${index + 1}`} value={item.q} onChange={(v) => {
              const faq = config.faq.map((f, i) => (i === index ? { ...f, q: v } : f));
              set({ faq });
            }} />
            <Field label="Answer" value={item.a} multiline onChange={(v) => {
              const faq = config.faq.map((f, i) => (i === index ? { ...f, a: v } : f));
              set({ faq });
            }} />
          </div>
        ))}
      </Panel>

      {status ? <p className="go-cms-status">{status}</p> : null}
      <button type="submit" className="go-cms-primary" disabled={busy}>
        {busy ? "Publishing…" : "Publish website development page"}
      </button>
    </form>
  );
}
