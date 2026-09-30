"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { OrbitAppointmentsPanel } from "@/components/orbit/orbit-appointments-panel";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig, NeedSlide, NeedStat } from "@/lib/need-config";
import type { WorkConfig, WorkTile } from "@/lib/work-config";
import { WORK_TILE_LABELS, WORK_TILE_SLOTS } from "@/lib/work-config";
import type { SoftwareConfig, SoftwareProduct } from "@/lib/software-config";
import type { HeroStudioLocation } from "@/lib/hero-studios";
import type { HeroTrustLogo } from "@/lib/hero-trust-logos";
import { DEFAULT_HERO_TRUST_LOGOS } from "@/lib/hero-trust-logos";

type Props = {
  initial: HeroConfig;
  initialNeed: NeedConfig;
  initialWork: WorkConfig;
  initialSoftware: SoftwareConfig;
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

export function OrbitHeroEditor({
  initial,
  initialNeed,
  initialWork,
  initialSoftware,
  needsSetup,
  authed,
}: Props) {
  const [config, setConfig] = useState(initial);
  const [needConfig, setNeedConfig] = useState(initialNeed);
  const [workConfig, setWorkConfig] = useState(initialWork);
  const [softwareConfig, setSoftwareConfig] = useState(initialSoftware);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [section, setSection] = useState<"hero" | "need" | "work" | "software" | "appointments">("hero");

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

  async function saveSoftware(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/orbit/software", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(softwareConfig),
    });
    setBusy(false);
    setStatus(response.ok ? "Saved. Review the Enterprise software section on the homepage." : "Save failed");
  }

  function updateSoftwareProduct(slug: string, patch: Partial<SoftwareProduct>) {
    setSoftwareConfig((current) => ({
      ...current,
      products: current.products.map((product) => (product.slug === slug ? { ...product, ...patch } : product)),
    }));
  }

  async function uploadSoftwareVideo(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setStatus("Uploading software section video…");
    const form = new FormData();
    form.set("kind", "softwareVideo");
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = (await response.json()) as { softwareConfig?: SoftwareConfig; error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }
    if (data.softwareConfig?.videoSrc) {
      setSoftwareConfig((current) => ({ ...current, videoSrc: data.softwareConfig!.videoSrc }));
    }
    setStatus("Software section video updated.");
  }

  async function uploadSoftwarePreview(slug: string, file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setStatus("Uploading product preview…");
    const form = new FormData();
    form.set("kind", "softwarePreview");
    form.set("productSlug", slug);
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    const data = (await response.json()) as { softwareConfig?: SoftwareConfig; error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }
    const uploaded = data.softwareConfig?.products.find((p) => p.slug === slug);
    if (uploaded?.previewSrc) {
      updateSoftwareProduct(slug, { previewSrc: uploaded.previewSrc });
    }
    setStatus("Product preview updated.");
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
      <div className="orbit-login-stage">
        <video autoPlay muted loop playsInline>
          <source src="/brand/hero-product.mp4" type="video/mp4" />
        </video>
        <div className="orbit-login-veil" />
        <div className="orbit-login-grid">
          <div className="orbit-login-copy">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#818cf8]">Orbit · Node.js control plane</p>
            <h1 className="mt-4 text-white">
              Backend for the live Global Orbit site.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-white/58">
              Edit hero, Why you need us, What we do, enterprise software, and appointments from one premium Node.js dashboard.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/55">
              <li className="flex gap-3"><span className="text-[#818cf8]">01</span> Homepage copy, video, and marquee</li>
              <li className="flex gap-3"><span className="text-[#818cf8]">02</span> Real website mosaic screenshots</li>
              <li className="flex gap-3"><span className="text-[#818cf8]">03</span> Production software catalogue</li>
            </ul>
          </div>
          <div className="orbit-login-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">Secure access</p>
            <h2 className="mt-2 font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">Unlock dashboard</h2>
            <form onSubmit={login} className="mt-7 space-y-4">
              <label className="block text-sm">
                <span className="mb-2 block text-white/65">Passkey</span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  minLength={needsSetup ? 8 : 1}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-white outline-none ring-[#818cf8]/30 focus:border-[#818cf8]/50 focus:ring-2"
                  placeholder={needsSetup ? "Create passkey (8+ characters)" : "Enter passkey"}
                />
              </label>
              <button
                disabled={busy}
                className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-[#0b0b10]"
              >
                {busy ? "Checking…" : needsSetup ? "Create access" : "Enter Orbit"}
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
      </div>
    );
  }

  const navItems: { id: "hero" | "need" | "work" | "software" | "appointments"; label: string; hint: string }[] = [
    { id: "hero", label: "Homepage hero", hint: "Headline, video, flags, marquee" },
    { id: "need", label: "Why you need us", hint: "Stats, slides, zoom video" },
    { id: "work", label: "What we do", hint: "3D scroll project showcase" },
    { id: "software", label: "Enterprise software", hint: "Video backdrop, products, previews" },
    { id: "appointments", label: "Appointments", hint: "Book Appointment inbox" },
  ];

  return (
    <div className="orbit-dash-shell flex-col lg:flex-row">
      <aside className="lg:w-[19.5rem] lg:shrink-0">
        <div className="orbit-studio-glass sticky top-6 rounded-[28px] p-4 lg:top-8">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#818cf8]/80">Orbit · Node.js</p>
          <p className="mt-1 px-2 font-[family-name:var(--font-jakarta)] text-lg font-semibold text-white">Control plane</p>
          <p className="mt-1 px-2 text-xs leading-5 text-white/40">Premium backend for homepage sections.</p>
          <nav className="mt-4 space-y-2" aria-label="Dashboard sections">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`orbit-dash-nav-card ${section === item.id ? "is-active" : ""}`}
              >
                <span className="orbit-dash-nav-num">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[14px] font-semibold text-white">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-white/45">{item.hint}</span>
                </span>
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
        ) : section === "software" ? (
          <>
            <div className="mb-6 hidden lg:block">
              <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">Enterprise software</h1>
              <p className="mt-1 text-sm text-white/55">
                Video backdrop, kicker, headline, and every product card — matching the What we do premium look.
              </p>
            </div>
            <form onSubmit={saveSoftware} className="space-y-6">
              <Panel title="Section copy">
                <Field label="Kicker" value={softwareConfig.kicker} onChange={(value) => setSoftwareConfig((c) => ({ ...c, kicker: value }))} />
                <Field label="Headline" value={softwareConfig.headline} onChange={(value) => setSoftwareConfig((c) => ({ ...c, headline: value }))} multiline />
                <Field label="Headline accent" value={softwareConfig.headlineAccent} onChange={(value) => setSoftwareConfig((c) => ({ ...c, headlineAccent: value }))} />
                <Field label="Supporting paragraph" value={softwareConfig.lede} onChange={(value) => setSoftwareConfig((c) => ({ ...c, lede: value }))} multiline />
                <Field label="Footer kicker" value={softwareConfig.footerKicker} onChange={(value) => setSoftwareConfig((c) => ({ ...c, footerKicker: value }))} />
                <Field label="Footer title" value={softwareConfig.footerTitle} onChange={(value) => setSoftwareConfig((c) => ({ ...c, footerTitle: value }))} />
              </Panel>
              <Panel title="Background video" description="Cinematic loop behind the product grid.">
                <label className="block rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
                  <span className="font-semibold">Replace video (MP4)</span>
                  <input
                    type="file"
                    accept="video/mp4,video/*"
                    className="mt-3 block w-full text-white/70"
                    onChange={(event) => uploadSoftwareVideo(event.target.files?.[0])}
                  />
                  <p className="mt-2 break-all text-xs text-white/45">{softwareConfig.videoSrc}</p>
                </label>
              </Panel>
              {softwareConfig.products.map((product, index) => (
                <Panel key={product.slug} title={`${String(index + 1).padStart(2, "0")} · ${product.title}`}>
                  <Field label="Title" value={product.title} onChange={(value) => updateSoftwareProduct(product.slug, { title: value })} />
                  <Field label="Summary" value={product.summary} onChange={(value) => updateSoftwareProduct(product.slug, { summary: value })} multiline />
                  <Field label="Link" value={product.href} onChange={(value) => updateSoftwareProduct(product.slug, { href: value })} />
                  <label className="block rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
                    <span className="font-semibold">Replace preview image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-3 block w-full text-white/70"
                      onChange={(event) => uploadSoftwarePreview(product.slug, event.target.files?.[0])}
                    />
                    <p className="mt-2 break-all text-xs text-white/45">{product.previewSrc}</p>
                  </label>
                  {product.previewSrc ? (
                    <img src={product.previewSrc} alt="" className="max-h-24 w-auto object-contain" />
                  ) : null}
                </Panel>
              ))}
              <button disabled={busy} className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-[#0b0b10] sm:w-auto sm:px-10">
                Save Enterprise software
              </button>
            </form>
            {status ? <p className="mt-6 text-sm text-[#818cf8]">{status}</p> : null}
          </>
        ) : section === "work" ? (
          <>
            <div className="mb-6 hidden lg:block">
              <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-semibold text-white">What we do</h1>
              <p className="mt-1 text-sm text-white/55">
                Premium 3D scroll showcase — one project at a time zooms in full screen, then zooms out as the next
                appears. Replace images, frame type, and copy for each slide below.
              </p>
            </div>

            <form onSubmit={saveWork} className="space-y-6">
              <Panel title="Section header" description="Badge and headline shown above the scroll showcase.">
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
              </Panel>

              {WORK_TILE_SLOTS.map((slot, slideIndex) => {
                const tile = workConfig.tiles.find((t) => t.slot === slot)!;
                const initialTile = initialWork.tiles.find((t) => t.slot === slot);
                const label = WORK_TILE_LABELS[slot];

                return (
                  <Panel
                    key={slot}
                    title={`Slide ${slideIndex + 1} · ${label}`}
                    description="Choose mobile or desktop frame, upload a screenshot, and edit captions."
                  >
                    <label className="block text-sm">
                      <span className="font-semibold text-white/85">Frame style</span>
                      <select
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-white"
                        value={tile.type === "phone-screen" || tile.type === "phone-app" ? "phone" : "desktop"}
                        onChange={(event) =>
                          updateWorkTile(slot, {
                            type: event.target.value === "phone" ? "phone-screen" : "browser-screen",
                          })
                        }
                      >
                        <option value="desktop">Desktop browser (wide)</option>
                        <option value="phone">Mobile app (phone)</option>
                      </select>
                    </label>
                    <Field
                      label="Browser bar / site title"
                      value={tile.chromeTitle || tile.title || ""}
                      onChange={(value) => updateWorkTile(slot, { chromeTitle: value, title: value })}
                    />
                    <Field
                      label="Phone status time (mobile frame only)"
                      value={tile.phoneTime || ""}
                      onChange={(value) => updateWorkTile(slot, { phoneTime: value })}
                    />
                    <label className="block rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
                      <span className="font-semibold">Replace project screenshot (JPG, PNG, WebP)</span>
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
                          Reset to default screenshot
                        </button>
                      ) : null}
                    </label>
                    {tile.imageSrc ? (
                      <img src={tile.imageSrc} alt="" className="mt-2 max-h-40 w-auto rounded-lg border border-white/10 object-cover object-top" />
                    ) : null}
                    <Field label="Caption title" value={tile.title || ""} onChange={(value) => updateWorkTile(slot, { title: value })} />
                    <Field
                      label="Caption subtitle"
                      value={tile.subtitle || ""}
                      onChange={(value) => updateWorkTile(slot, { subtitle: value })}
                    />
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
