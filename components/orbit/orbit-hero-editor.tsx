"use client";

import { useState } from "react";
import type { HeroConfig } from "@/lib/hero-config";
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-white/70">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white"
        />
      )}
    </label>
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
    setStatus(response.ok ? "Saved. Open the homepage to review." : "Save failed");
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
    setStatus(`${kind} replaced`);
  }

  async function uploadTrustLogo(logoId: string, file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setStatus("Uploading logo…");
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
    setStatus("Logo image replaced");
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

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-white">
        <h1 className="text-3xl font-semibold">Orbit editor</h1>
        <form onSubmit={login} className="orbit-studio-glass mt-8 space-y-4 rounded-3xl p-6">
          <p className="text-sm text-white/70">
            {needsSetup ? "Create a password to edit the homepage hero." : "Sign in to edit the hero."}
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
      <h1 className="font-[family-name:var(--font-jakarta)] text-3xl font-semibold">Hero section</h1>
      <p className="mt-2 text-sm text-white/60">
        Edit copy, replace the product image, or replace the hero video. Media is stored on this VPS.
      </p>

      <form onSubmit={save} className="mt-8 space-y-4">
        <Field label="Eyebrow" value={config.eyebrow} onChange={set("eyebrow")} />
        <Field label="Headline line 1" value={config.headline} onChange={set("headline")} />
        <Field label="Headline line 2" value={config.headlineSecond} onChange={set("headlineSecond")} />
        <Field label="Paragraph" value={config.lede} onChange={set("lede")} multiline />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary button" value={config.primaryLabel} onChange={set("primaryLabel")} />
          <Field label="Primary link" value={config.primaryHref} onChange={set("primaryHref")} />
          <Field label="Secondary button" value={config.secondaryLabel} onChange={set("secondaryLabel")} />
          <Field label="Secondary link" value={config.secondaryHref} onChange={set("secondaryHref")} />
        </div>
        <Field label="Ship on" value={config.shipsOn} onChange={set("shipsOn")} />
        <Field label="Marquee label" value={config.trustMarqueeLabel} onChange={set("trustMarqueeLabel")} />
        <label className="flex items-center gap-3 text-sm text-white/80">
          <input
            type="checkbox"
            checked={config.useVideo}
            onChange={(event) => set("useVideo")(event.target.checked)}
          />
          Play video in the hero (right panel only — not behind the text)
        </label>
        <button disabled={busy} className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0b0b10]">
          Save copy
        </button>
      </form>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <label className="orbit-studio-glass block rounded-3xl p-5 text-sm">
          <span className="font-semibold">Replace hero image</span>
          <input
            type="file"
            accept="image/*"
            className="mt-3 block w-full text-white/70"
            onChange={(event) => upload("image", event.target.files?.[0])}
          />
          <p className="mt-2 break-all text-xs text-white/45">{config.imageSrc}</p>
        </label>
        <label className="orbit-studio-glass block rounded-3xl p-5 text-sm">
          <span className="font-semibold">Replace hero video (MP4)</span>
          <input
            type="file"
            accept="video/mp4,video/*"
            className="mt-3 block w-full text-white/70"
            onChange={(event) => upload("video", event.target.files?.[0])}
          />
          <p className="mt-2 break-all text-xs text-white/45">{config.videoSrc || "No custom video yet"}</p>
        </label>
      </div>

      <div className="mt-10 orbit-studio-glass rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Hero logo marquee</h2>
            <p className="mt-1 text-sm text-white/55">
              White text or uploaded PNG marks. Edit names here, then click Save copy.
            </p>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={addTrustLogo}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Add logo
          </button>
        </div>
        <ul className="mt-6 space-y-4">
          {config.trustLogos.map((logo, index) => (
            <li key={`${logo.id}-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-white/60">Display name</span>
                  <input
                    value={logo.label}
                    onChange={(event) => updateTrustLogo(index, { label: event.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-white"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-white/60">Replace image (optional)</span>
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
                <button
                  type="button"
                  className="text-xs text-white/50 hover:text-white"
                  onClick={() => clearTrustLogoImage(index)}
                >
                  Use text only
                </button>
                <button
                  type="button"
                  className="text-xs text-red-300/80 hover:text-red-200"
                  onClick={() => removeTrustLogo(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {status ? <p className="mt-6 text-sm text-[#f0c43a]">{status}</p> : null}
    </div>
  );
}
