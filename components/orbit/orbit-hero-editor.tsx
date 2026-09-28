"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { HeroConfig } from "@/lib/hero-config";
import type { HeroStudioLocation } from "@/lib/hero-studios";
import type { HeroTrustLogo } from "@/lib/hero-trust-logos";

type Props = {
  initial: HeroConfig;
  needsSetup: boolean;
  authed: boolean;
};

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

export function OrbitHeroEditor({ initial, needsSetup, authed }: Props) {
  const [config, setConfig] = useState(initial);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (key: keyof HeroConfig) => (value: string | boolean) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/orbit/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json()) as { error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Login failed");
      return;
    }
    window.location.reload();
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/orbit/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setBusy(false);
    setStatus(response.ok ? "Saved. Review the homepage." : "Save failed");
  }

  async function upload(kind: "image" | "video", file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setStatus(`Uploading ${kind}…`);
    const form = new FormData();
    form.set("kind", kind);
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = (await response.json()) as { config?: HeroConfig; error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }
    if (data.config) setConfig(data.config);
    setStatus(`${kind === "video" ? "Video" : "Poster image"} updated`);
  }

  async function uploadTrustLogo(logoId: string, file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setStatus("Uploading marquee logo…");
    const form = new FormData();
    form.set("kind", "trustLogo");
    form.set("logoId", logoId);
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = (await response.json()) as { config?: HeroConfig; error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }
    if (data.config) setConfig(data.config);
    setStatus("Marquee logo image updated");
  }

  function updateTrustLogo(index: number, patch: Partial<HeroTrustLogo>) {
    setConfig((current) => ({
      ...current,
      trustLogos: current.trustLogos.map((logo, i) => (i === index ? { ...logo, ...patch } : logo)),
    }));
  }

  function removeTrustLogo(index: number) {
    setConfig((current) => ({
      ...current,
      trustLogos: current.trustLogos.filter((_, i) => i !== index),
    }));
  }

  function addTrustLogo() {
    const id = `client-${Date.now()}`;
    setConfig((current) => ({
      ...current,
      trustLogos: [...current.trustLogos, { id, label: "New client" }],
    }));
  }

  function clearTrustLogoImage(index: number) {
    setConfig((current) => ({
      ...current,
      trustLogos: current.trustLogos.map((logo, i) =>
        i === index ? { id: logo.id, label: logo.label } : logo,
      ),
    }));
  }

  function updateStudio(index: number, patch: Partial<HeroStudioLocation>) {
    setConfig((current) => ({
      ...current,
      studios: current.studios.map((studio, i) => (i === index ? { ...studio, ...patch } : studio)),
    }));
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-white">
        <h1 className="text-3xl font-semibold">Orbit editor</h1>
        <form onSubmit={login} className="orbit-studio-glass mt-8 space-y-4 rounded-3xl p-6">
          <p className="text-sm text-white/70">
            {needsSetup ? "Create a password to edit the homepage hero." : "Sign in to edit the live homepage hero."}
          </p>
          <input
            type="password"
            required
            minLength={needsSetup ? 8 : 1}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3"
            placeholder={needsSetup ? "New password (8+ characters)" : "Password"}
          />
          <button disabled={busy} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b0b10]">
            {needsSetup ? "Create access" : "Enter"}
          </button>
          {status ? <p className="text-sm text-[#f0c43a]">{status}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-white">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-jakarta)] text-3xl font-semibold">Homepage hero</h1>
          <p className="mt-2 max-w-xl text-sm text-white/60">
            Matches the live studio hero: copy, Nepal · India · USA row, product video, and sliding client logos.
          </p>
        </div>
        <Link href="/" className="text-sm font-medium text-[#f0c43a] hover:underline">
          Open homepage →
        </Link>
      </div>

      <form onSubmit={save} className="mt-8 space-y-6">
        <Panel title="Headline & copy" description="Left column text on the homepage.">
          <Field label="Eyebrow badge" value={config.eyebrow} onChange={set("eyebrow")} />
          <Field label="Headline line 1" value={config.headline} onChange={set("headline")} />
          <Field label="Headline line 2" value={config.headlineSecond} onChange={set("headlineSecond")} />
          <Field label="Supporting paragraph" value={config.lede} onChange={set("lede")} multiline />
        </Panel>

        <Panel title="Primary button">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Button label" value={config.primaryLabel} onChange={set("primaryLabel")} />
            <Field label="Button link" value={config.primaryHref} onChange={set("primaryHref")} />
          </div>
        </Panel>

        <Panel
          title="Global studios row"
          description="White flags with country and city — shown under the tagline on the hero."
        >
          <Field label="Tagline above flags" value={config.globalTagline} onChange={set("globalTagline")} multiline />
          {config.studios.map((studio, index) => (
            <div key={`studio-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Location {index + 1}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field
                  label="Flag code"
                  value={studio.code}
                  onChange={(value) => updateStudio(index, { code: value.toLowerCase().replace(/[^a-z]/g, "").slice(0, 2) })}
                  hint="np, in, us"
                />
                <Field label="Country label" value={studio.label} onChange={(value) => updateStudio(index, { label: value })} />
                <Field label="City / region" value={studio.city} onChange={(value) => updateStudio(index, { city: value })} />
              </div>
            </div>
          ))}
        </Panel>

        <Panel title="Client logo marquee" description="Slow slide on the bottom-left of the hero.">
          <Field label="Marquee heading" value={config.trustMarqueeLabel} onChange={set("trustMarqueeLabel")} />
          <div className="flex justify-end">
            <button
              type="button"
              disabled={busy}
              onClick={addTrustLogo}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              Add logo name
            </button>
          </div>
          <ul className="space-y-4">
            {config.trustLogos.map((logo, index) => (
              <li key={`${logo.id}-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Display name (white text)"
                    value={logo.label}
                    onChange={(value) => updateTrustLogo(index, { label: value })}
                  />
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-white/60">Upload white logo PNG (optional)</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="w-full text-xs text-white/65"
                      onChange={(event) => uploadTrustLogo(logo.id, event.target.files?.[0])}
                    />
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {logo.imageSrc ? (
                    <img src={logo.imageSrc} alt="" className="h-6 w-auto max-w-[8rem] brightness-0 invert" />
                  ) : (
                    <span className="text-sm font-semibold text-white/80">{logo.label}</span>
                  )}
                  <button type="button" className="text-xs text-white/50 hover:text-white" onClick={() => clearTrustLogoImage(index)}>
                    Text only
                  </button>
                  <button type="button" className="text-xs text-red-300/80 hover:text-red-200" onClick={() => removeTrustLogo(index)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <button disabled={busy} className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-[#0b0b10] sm:w-auto sm:px-10">
          Save homepage hero
        </button>
      </form>

      <div className="mt-8 space-y-6">
        <Panel title="Hero video & poster" description="Video plays on the right; poster used while loading.">
          <label className="flex items-center gap-3 text-sm text-white/80">
            <input
              type="checkbox"
              checked={config.useVideo}
              onChange={(event) => set("useVideo")(event.target.checked)}
            />
            Play product video in hero
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
              <span className="font-semibold">Replace video (MP4)</span>
              <input
                type="file"
                accept="video/mp4,video/*"
                className="mt-3 block w-full text-white/70"
                onChange={(event) => upload("video", event.target.files?.[0])}
              />
              <p className="mt-2 break-all text-xs text-white/45">{config.videoSrc}</p>
            </label>
            <label className="block rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
              <span className="font-semibold">Replace poster image</span>
              <input
                type="file"
                accept="image/*"
                className="mt-3 block w-full text-white/70"
                onChange={(event) => upload("image", event.target.files?.[0])}
              />
              <p className="mt-2 break-all text-xs text-white/45">{config.imageSrc}</p>
            </label>
          </div>
        </Panel>
      </div>

      {status ? <p className="mt-6 text-sm text-[#f0c43a]">{status}</p> : null}
    </div>
  );
}
