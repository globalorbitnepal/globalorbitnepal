"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { OrbitAppointmentsPanel } from "@/components/orbit/orbit-appointments-panel";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig, NeedSlide, NeedStat } from "@/lib/need-config";
import type { WorkConfig, WorkTile } from "@/lib/work-config";
import { WORK_TILE_LABELS, WORK_TILE_SLOTS } from "@/lib/work-config";
import type { HeroStudioLocation } from "@/lib/hero-studios";
import type { HeroTrustLogo } from "@/lib/hero-trust-logos";
import { DEFAULT_HERO_TRUST_LOGOS } from "@/lib/hero-trust-logos";

type Props = {
  initial: HeroConfig;
  initialNeed: NeedConfig;
  initialWork: WorkConfig;
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

export function OrbitHeroEditor({ initial, initialNeed, initialWork, needsSetup, authed }: Props) {
  const [config, setConfig] = useState(initial);
  const [needConfig, setNeedConfig] = useState(initialNeed);
  const [workConfig, setWorkConfig] = useState(initialWork);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [section, setSection] = useState<"hero" | "need" | "work" | "appointments">("hero");

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

  async function saveNeed(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/orbit/need", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(needConfig),
    });
    setBusy(false);
    setStatus(response.ok ? "Saved. Review the Why section on the homepage." : "Save failed");
  }

  async function uploadNeedVideo(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setStatus("Uploading section video…");
    const form = new FormData();
    form.set("kind", "needVideo");
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = (await response.json()) as { needConfig?: NeedConfig; error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }
    if (data.needConfig) setNeedConfig(data.needConfig);
    setStatus("Why section video updated");
  }

  function updateNeedStat(index: number, patch: Partial<NeedStat>) {
    setNeedConfig((current) => ({
      ...current,
      stats: current.stats.map((stat, i) => (i === index ? { ...stat, ...patch } : stat)),
    }));
  }

  function updateNeedSlide(index: number, patch: Partial<NeedSlide>) {
    setNeedConfig((current) => ({
      ...current,
      slides: current.slides.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)),
    }));
  }

  async function saveWork(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/orbit/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workConfig),
    });
    setBusy(false);
    setStatus(response.ok ? "Saved. Review the What we do section on the homepage." : "Save failed");
  }

  function updateWorkTile(slot: string, patch: Partial<WorkTile>) {
    setWorkConfig((current) => ({
      ...current,
      tiles: current.tiles.map((tile) => (tile.slot === slot ? { ...tile, ...patch } : tile)),
    }));
  }

  function updateWorkAppLine(slot: string, lineIndex: number, patch: Partial<{ left: string; right: string }>) {
    setWorkConfig((current) => ({
      ...current,
      tiles: current.tiles.map((tile) => {
        if (tile.slot !== slot || !tile.appLines) return tile;
        return {
          ...tile,
          appLines: tile.appLines.map((line, i) => (i === lineIndex ? { ...line, ...patch } : line)),
        };
      }),
    }));
  }

  function updateWorkDashStat(slot: string, statIndex: number, patch: Partial<{ label: string; value: string }>) {
    setWorkConfig((current) => ({
      ...current,
      tiles: current.tiles.map((tile) => {
        if (tile.slot !== slot || !tile.dashStats) return tile;
        return {
          ...tile,
          dashStats: tile.dashStats.map((stat, i) => (i === statIndex ? { ...stat, ...patch } : stat)),
        };
      }),
    }));
  }

  async function uploadWorkImage(slot: string, file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setStatus("Uploading mosaic image…");
    const form = new FormData();
    form.set("kind", "workImage");
    form.set("tileSlot", slot);
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = (await response.json()) as { workConfig?: WorkConfig; error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }
    const uploaded = data.workConfig?.tiles.find((t) => t.slot === slot);
    if (uploaded?.imageSrc) {
      setWorkConfig((current) => ({
        ...current,
        tiles: current.tiles.map((tile) =>
          tile.slot === slot ? { ...tile, imageSrc: uploaded.imageSrc } : tile,
        ),
      }));
    }
    setStatus("Image uploaded and saved. Save the section if you changed any text too.");
  }

  function resetWorkImage(slot: string, fallbackSrc: string) {
    updateWorkTile(slot, { imageSrc: fallbackSrc });
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
      trustLogos: current.trustLogos.map((logo, i) => {
        if (i !== index) return logo;
        const fallback = DEFAULT_HERO_TRUST_LOGOS.find((item) => item.id === logo.id);
        return { id: logo.id, label: logo.label, imageSrc: fallback?.imageSrc };
      }),
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
      <div className="flex min-h-[100dvh] items-center justify-center px-4 py-16">
        <div className="orbit-orbit-login w-full max-w-[420px] rounded-[32px] border border-white/12 bg-[#0a0a12]/80 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f0c43a]/90">Global Orbit</p>
          <h1 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-semibold tracking-tight text-white">
            Orbit dashboard
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Premium control for your live homepage hero, client marquee, and appointment requests.
          </p>
          <form onSubmit={login} className="mt-8 space-y-4">
            <label className="block text-sm">
              <span className="mb-2 block text-white/65">Passkey</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                minLength={needsSetup ? 8 : 1}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-white outline-none ring-[#f0c43a]/30 focus:border-[#f0c43a]/50 focus:ring-2"
                placeholder={needsSetup ? "Create passkey (8+ characters)" : "Enter passkey"}
              />
            </label>
            <button
              disabled={busy}
              className="w-full rounded-full bg-gradient-to-r from-[#f0c43a] to-[#e8b820] py-3.5 text-sm font-semibold text-[#14120a] shadow-[0_12px_32px_rgba(240,196,58,0.25)]"
            >
              {busy ? "Checking…" : needsSetup ? "Create access" : "Unlock dashboard"}
            </button>
            {status ? <p className="text-sm text-red-300">{status}</p> : null}
          </form>
          <p className="mt-6 text-center text-xs text-white/35">
            <Link href="/" className="text-white/50 hover:text-white">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const navItems: { id: "hero" | "need" | "work" | "appointments"; label: string; hint: string }[] = [
    { id: "hero", label: "Homepage hero", hint: "Headline, video, flags, marquee" },
    { id: "need", label: "Why you need us", hint: "Stats, slides, zoom video, Know More links" },
    { id: "work", label: "What we do", hint: "Headline, zoom mosaic, all tile copy & images" },
    { id: "appointments", label: "Appointments", hint: "Book Appointment form inbox" },
  ];

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-8 lg:px-8 lg:py-10">
      <aside className="lg:w-72 lg:shrink-0">
        <div className="orbit-orbit-sidebar orbit-studio-glass sticky top-6 rounded-[28px] p-4 lg:top-8">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Orbit</p>
          <p className="mt-1 px-2 font-[family-name:var(--font-jakarta)] text-lg font-semibold text-white">Control panel</p>
          <nav className="mt-4 space-y-2" aria-label="Dashboard sections">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`orbit-orbit-sidebar-card block w-full rounded-2xl border px-4 py-3.5 text-left transition ${
                  section === item.id
                    ? "border-[#f0c43a]/45 bg-[#f0c43a]/10"
                    : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className="block text-[15px] font-semibold text-white">{item.label}</span>
                <span className="mt-0.5 block text-xs text-white/45">{item.hint}</span>
              </button>
            ))}
          </nav>
          <Link
            href="/"
            className="mt-4 block rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-white/70 hover:bg-white/5"
          >
            View live site →
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1 pb-12">
        <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                section === item.id ? "bg-[#f0c43a] text-[#14120a]" : "bg-white/10 text-white/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {section === "appointments" ? (
          <OrbitAppointmentsPanel />
        ) : section === "work" ? (
          <>
            <div className="mb-6 hidden lg:block">
              <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">What we do</h1>
              <p className="mt-1 text-sm text-white/55">
                Scroll-zoom mosaic below services — edit headline, footer line, and every tile. Upload replaces the photo on phone and website tiles.
              </p>
            </div>

            <form onSubmit={saveWork} className="space-y-6">
              <Panel title="Section header" description="Badge and main headline above the mosaic.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Badge number"
                    value={workConfig.badgeNum}
                    onChange={(value) => setWorkConfig((c) => ({ ...c, badgeNum: value }))}
                  />
                  <Field
                    label="Badge label"
                    value={workConfig.badgeLabel}
                    onChange={(value) => setWorkConfig((c) => ({ ...c, badgeLabel: value }))}
                  />
                </div>
                <Field
                  label="Headline"
                  value={workConfig.headline}
                  onChange={(value) => setWorkConfig((c) => ({ ...c, headline: value }))}
                  multiline
                />
                <Field
                  label="Zoom end line"
                  value={workConfig.madeLabel}
                  onChange={(value) => setWorkConfig((c) => ({ ...c, madeLabel: value }))}
                  hint="Large text that fades in when the mosaic finishes zooming"
                />
              </Panel>

              {WORK_TILE_SLOTS.map((slot) => {
                const tile = workConfig.tiles.find((t) => t.slot === slot)!;
                const initialTile = initialWork.tiles.find((t) => t.slot === slot);
                const label = WORK_TILE_LABELS[slot];
                const hasImage =
                  tile.type === "phone-screen" || tile.type === "browser-screen";

                return (
                  <Panel key={slot} title={label} description={`Type: ${tile.type}`}>
                    {tile.type === "phone-screen" || tile.type === "browser-screen" ? (
                      <>
                        {tile.type === "browser-screen" ? (
                          <>
                            <Field
                              label="Browser tab title"
                              value={tile.chromeTitle || ""}
                              onChange={(value) => updateWorkTile(slot, { chromeTitle: value })}
                            />
                            {tile.type === "browser-screen" ? (
                              <Field
                                label="Nav line (optional)"
                                value={tile.nav || ""}
                                onChange={(value) => updateWorkTile(slot, { nav: value })}
                              />
                            ) : null}
                          </>
                        ) : null}
                        {tile.type === "phone-screen" ? (
                          <Field
                            label="Phone time"
                            value={tile.phoneTime || ""}
                            onChange={(value) => updateWorkTile(slot, { phoneTime: value })}
                          />
                        ) : null}
                        <label className="block rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
                          <span className="font-semibold">Replace screenshot (JPG, PNG, WebP)</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/*"
                            className="mt-3 block w-full text-white/70"
                            onChange={(event) => uploadWorkImage(slot, event.target.files?.[0])}
                          />
                          <p className="mt-2 break-all text-xs text-white/45">{tile.imageSrc}</p>
                          {tile.imageSrc && initialTile?.imageSrc && tile.imageSrc !== initialTile.imageSrc ? (
                            <button
                              type="button"
                              className="mt-2 text-xs text-white/50 hover:text-white"
                              onClick={() => resetWorkImage(slot, initialTile.imageSrc || "")}
                            >
                              Reset to bundled default path
                            </button>
                          ) : null}
                        </label>
                        {tile.imageSrc ? (
                          <img src={tile.imageSrc} alt="" className="mt-2 max-h-32 w-auto rounded-lg border border-white/10 object-cover" />
                        ) : null}
                        <Field label="Caption title" value={tile.title || ""} onChange={(value) => updateWorkTile(slot, { title: value })} />
                        <Field
                          label="Caption subtitle"
                          value={tile.subtitle || ""}
                          onChange={(value) => updateWorkTile(slot, { subtitle: value })}
                        />
                      </>
                    ) : null}

                    {tile.type === "phone-app" ? (
                      <>
                        <Field
                          label="Phone time"
                          value={tile.phoneTime || ""}
                          onChange={(value) => updateWorkTile(slot, { phoneTime: value })}
                        />
                        <Field
                          label="App name / kicker"
                          value={tile.appKicker || ""}
                          onChange={(value) => updateWorkTile(slot, { appKicker: value })}
                        />
                        <Field
                          label="Main value"
                          value={tile.appTotal || ""}
                          onChange={(value) => updateWorkTile(slot, { appTotal: value })}
                        />
                        {(tile.appLines || []).map((line, lineIndex) => (
                          <div key={`${slot}-line-${lineIndex}`} className="grid gap-3 sm:grid-cols-2">
                            <Field
                              label={`Row ${lineIndex + 1} left`}
                              value={line.left}
                              onChange={(value) => updateWorkAppLine(slot, lineIndex, { left: value })}
                            />
                            <Field
                              label={`Row ${lineIndex + 1} right`}
                              value={line.right}
                              onChange={(value) => updateWorkAppLine(slot, lineIndex, { right: value })}
                            />
                          </div>
                        ))}
                        <Field label="Button label" value={tile.appCta || ""} onChange={(value) => updateWorkTile(slot, { appCta: value })} />
                        <label className="flex items-center gap-3 text-sm text-white/80">
                          <input
                            type="checkbox"
                            checked={tile.appVariant === "violet"}
                            onChange={(event) =>
                              updateWorkTile(slot, { appVariant: event.target.checked ? "violet" : "default" })
                            }
                          />
                          Violet app theme
                        </label>
                      </>
                    ) : null}

                    {tile.type === "dashboard" ? (
                      <>
                        <Field
                          label="Browser tab title"
                          value={tile.chromeTitle || ""}
                          onChange={(value) => updateWorkTile(slot, { chromeTitle: value })}
                        />
                        {(tile.dashStats || []).map((stat, statIndex) => (
                          <div key={`${slot}-stat-${statIndex}`} className="grid gap-3 sm:grid-cols-2">
                            <Field
                              label={`Stat ${statIndex + 1} label`}
                              value={stat.label}
                              onChange={(value) => updateWorkDashStat(slot, statIndex, { label: value })}
                            />
                            <Field
                              label={`Stat ${statIndex + 1} value`}
                              value={stat.value}
                              onChange={(value) => updateWorkDashStat(slot, statIndex, { value: value })}
                            />
                          </div>
                        ))}
                      </>
                    ) : null}

                    {tile.type === "seo" ? (
                      <>
                        <Field
                          label="Browser tab title"
                          value={tile.chromeTitle || ""}
                          onChange={(value) => updateWorkTile(slot, { chromeTitle: value })}
                        />
                        <Field
                          label="Section label"
                          value={tile.seoLabel || ""}
                          onChange={(value) => updateWorkTile(slot, { seoLabel: value })}
                        />
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Field
                            label="Rank"
                            value={tile.seoRank || ""}
                            onChange={(value) => updateWorkTile(slot, { seoRank: value })}
                          />
                          <Field
                            label="Keyword phrase"
                            value={tile.seoKeyword || ""}
                            onChange={(value) => updateWorkTile(slot, { seoKeyword: value })}
                          />
                        </div>
                      </>
                    ) : null}
                  </Panel>
                );
              })}

              <button disabled={busy} className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-[#0b0b10] sm:w-auto sm:px-10">
                Save What we do section
              </button>
            </form>
            {status ? <p className="mt-6 text-sm text-[#f0c43a]">{status}</p> : null}
          </>
        ) : section === "need" ? (
          <>
            <div className="mb-6 hidden lg:block">
              <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">
                Why you need us
              </h1>
              <p className="mt-1 text-sm text-white/55">
                Section below the hero — stats carousel, headline slides, zoom reel, and Know More destinations.
              </p>
            </div>

            <form onSubmit={saveNeed} className="space-y-6">
              <Panel title="Section labels" description="Left column title and button text.">
                <Field label="Left kicker" value={needConfig.kicker} onChange={(value) => setNeedConfig((c) => ({ ...c, kicker: value }))} />
                <Field
                  label="Know More button label"
                  value={needConfig.knowMoreLabel}
                  onChange={(value) => setNeedConfig((c) => ({ ...c, knowMoreLabel: value }))}
                />
              </Panel>

              <Panel title="Zoom reel video" description="Plays in the pill, then zooms full width on scroll.">
                <label className="block rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
                  <span className="font-semibold">Replace video (MP4)</span>
                  <input
                    type="file"
                    accept="video/mp4,video/*"
                    className="mt-3 block w-full text-white/70"
                    onChange={(event) => uploadNeedVideo(event.target.files?.[0])}
                  />
                  <p className="mt-2 break-all text-xs text-white/45">{needConfig.videoSrc}</p>
                </label>
              </Panel>

              <Panel title="Statistics (left carousel)" description="Four stats — arrows on the site cycle these with the right slides.">
                {needConfig.stats.map((stat, index) => (
                  <div key={`stat-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Stat {index + 1}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Big number" value={stat.value} onChange={(value) => updateNeedStat(index, { value })} />
                      <Field label="Caption" value={stat.caption} onChange={(value) => updateNeedStat(index, { caption: value })} multiline />
                    </div>
                  </div>
                ))}
              </Panel>

              <Panel title="Right slides" description="Badge, headline, accent word, and where Know More goes for each slide.">
                {needConfig.slides.map((slide, index) => (
                  <div key={`slide-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Slide {index + 1}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Badge number" value={slide.index} onChange={(value) => updateNeedSlide(index, { index: value })} />
                      <Field label="Badge label" value={slide.tag} onChange={(value) => updateNeedSlide(index, { tag: value })} />
                    </div>
                    <div className="mt-3 space-y-3">
                      <Field label="Headline (before accent)" value={slide.title} onChange={(value) => updateNeedSlide(index, { title: value })} multiline />
                      <Field label="Accent (e.g. HOOKED!)" value={slide.accent} onChange={(value) => updateNeedSlide(index, { accent: value })} />
                      <Field
                        label="Know More link"
                        value={slide.href}
                        onChange={(value) => updateNeedSlide(index, { href: value })}
                        hint="e.g. /about, /services, /contact"
                      />
                    </div>
                  </div>
                ))}
              </Panel>

              <button disabled={busy} className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-[#0b0b10] sm:w-auto sm:px-10">
                Save Why section
              </button>
            </form>
            {status ? <p className="mt-6 text-sm text-[#f0c43a]">{status}</p> : null}
          </>
        ) : (
          <>
      <div className="mb-6 hidden lg:block">
        <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">Homepage hero</h1>
        <p className="mt-1 text-sm text-white/55">Edit the live studio hero — copy, video, flags, and trust marquee.</p>
      </div>

      <form onSubmit={save} className="space-y-6">
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
          description="WORKING ACROSS label, flags, country and city under the Start a project button."
        >
          <Field label="Studios kicker" value={config.studiosKicker} onChange={set("studiosKicker")} hint="Shown above flags, e.g. Working across" />
          <Field label="Optional long tagline (not shown on live hero)" value={config.globalTagline} onChange={set("globalTagline")} multiline />
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

        <Panel
          title="Client logo marquee"
          description="White logos, no background, same height, scrolling left. Replace any mark with a transparent PNG or SVG."
        >
          <Field label="Marquee heading" value={config.trustMarqueeLabel} onChange={set("trustMarqueeLabel")} />
          <div className="flex justify-end">
            <button
              type="button"
              disabled={busy}
              onClick={addTrustLogo}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              Add logo
            </button>
          </div>
          <ul className="space-y-4">
            {config.trustLogos.map((logo, index) => (
              <li key={`${logo.id}-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Logo name"
                    value={logo.label}
                    onChange={(value) => updateTrustLogo(index, { label: value })}
                  />
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-white/60">Replace logo (white PNG / SVG, transparent)</span>
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
                    <img src={logo.imageSrc} alt="" className="h-8 w-auto max-w-[10rem] object-contain" />
                  ) : (
                    <span className="text-sm font-semibold text-white/80">{logo.label}</span>
                  )}
                  <button type="button" className="text-xs text-white/50 hover:text-white" onClick={() => clearTrustLogoImage(index)}>
                    Reset default
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
          </>
        )}
      </div>
    </div>
  );
}
