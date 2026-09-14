import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ORBIT_SOLUTIONS } from "@/lib/orbit/catalog";

type Accent = { color: string; glow: string; soft: string };

const ACCENTS: Accent[] = [
  { color: "#3b82f6", glow: "rgba(59,130,246,0.48)", soft: "rgba(59,130,246,0.2)" },
  { color: "#22c55e", glow: "rgba(34,197,94,0.48)", soft: "rgba(34,197,94,0.2)" },
  { color: "#a855f7", glow: "rgba(168,85,247,0.48)", soft: "rgba(168,85,247,0.2)" },
  { color: "#f0c43a", glow: "rgba(240,196,58,0.48)", soft: "rgba(240,196,58,0.2)" },
  { color: "#14b8a6", glow: "rgba(20,184,166,0.48)", soft: "rgba(20,184,166,0.2)" },
  { color: "#ec4899", glow: "rgba(236,72,153,0.48)", soft: "rgba(236,72,153,0.2)" },
  { color: "#2dd4bf", glow: "rgba(45,212,191,0.48)", soft: "rgba(45,212,191,0.2)" },
  { color: "#e879f9", glow: "rgba(232,121,249,0.48)", soft: "rgba(232,121,249,0.2)" },
  { color: "#22d3ee", glow: "rgba(34,211,238,0.48)", soft: "rgba(34,211,238,0.2)" },
  { color: "#8b5cf6", glow: "rgba(139,92,246,0.48)", soft: "rgba(139,92,246,0.2)" },
  { color: "#fb923c", glow: "rgba(251,146,60,0.48)", soft: "rgba(251,146,60,0.2)" },
  { color: "#6366f1", glow: "rgba(99,102,241,0.48)", soft: "rgba(99,102,241,0.2)" },
];

function Icon({ index, color }: { index: number; color: string }) {
  const p = {
    className: "h-[18px] w-[18px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const icons: ReactNode[] = [
    <svg key="0" {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.2 5l-2.4 14" /></svg>,
    <svg key="1" {...p}><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3.5 4h2l2.2 11.2h9.8l2-7.2H7.2" /></svg>,
    <svg key="2" {...p}><circle cx="12" cy="12" r="8.5" /><path d="M8.2 8.8c1.2-1.8 2.4-2.8 3.8-2.8 2.6 0 4 3.6 4 7s-1.4 7-4 7c-1.4 0-2.6-1-3.8-2.8" /><path d="M4.5 10.5h15M4.5 13.5h15" /></svg>,
    <svg key="3" {...p}><path d="M4 19V10M9 19V6M14 19v-5M19 19V8" /></svg>,
    <svg key="4" {...p}><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.4M12 18.1v2.4M3.5 12h2.4M18.1 12h2.4M6.2 6.2l1.7 1.7M16.1 16.1l1.7 1.7M17.8 6.2l-1.7 1.7M7.9 16.1l-1.7 1.7" /></svg>,
    <svg key="5" {...p}><path d="M12 20.5s6.5-4.6 6.5-9.4A6.5 6.5 0 0 0 12 4.6a6.5 6.5 0 0 0-6.5 6.5c0 4.8 6.5 9.4 6.5 9.4z" /><circle cx="12" cy="11" r="2.2" /></svg>,
    <svg key="6" {...p}><path d="M5 19.5 12 4.5l7 15H5z" /><path d="M9.2 14.5h5.6" /></svg>,
    <svg key="7" {...p}><circle cx="7.5" cy="8" r="2.2" /><circle cx="16.5" cy="8" r="2.2" /><circle cx="12" cy="16.5" r="2.2" /><path d="M9.4 9.2 10.8 14.2M14.6 9.2 13.2 14.2M9.5 8h5" /></svg>,
    <svg key="8" {...p}><rect x="4" y="5" width="16" height="14" rx="3" /><circle cx="9" cy="11" r="1.4" /><circle cx="15" cy="11" r="1.4" /><path d="M9.5 14.5c1.2 1 3.8 1 5 0" /></svg>,
    <svg key="9" {...p}><path d="M4.5 18.5 12 4.5l2.8 5.6L19.5 18.5" /><path d="M8.5 18.5h9" /></svg>,
    <svg key="10" {...p}><path d="M4.5 16.5a7.5 7.5 0 0 1 15 0" /><path d="M12 9v4.5l2.5 1.5" /><circle cx="12" cy="16.5" r="1.2" /></svg>,
    <svg key="11" {...p}><path d="M4.5 5.5h15l-3.2 5.5H7.7L4.5 5.5zM7.7 11v7.5h8.6V11" /></svg>,
  ];
  return icons[index] ?? icons[0];
}

function Preview({ index, accent }: { index: number; accent: Accent }) {
  const glass =
    "rounded-[12px] border border-white/15 bg-[#0a1428]/88 p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-md";

  switch (index) {
    case 0:
      return (
        <div className={`${glass} w-[132px] space-y-1.5`}>
          <div className="flex gap-1">
            {["N", "R", "L", "W"].map((t, i) => (
              <span
                key={t}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-[8px] font-bold text-white"
                style={{ background: i % 2 ? accent.soft : "rgba(255,255,255,0.08)", color: accent.color }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="space-y-1 rounded-md bg-black/25 p-1.5 font-mono text-[7px] leading-3 text-sky-300/90">
            <div>{"const app = await"}</div>
            <div className="text-white/55">{"  next.build()"}</div>
            <div style={{ color: accent.color }}>{"// ship ready"}</div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className={`${glass} w-[132px]`}>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald-400/40 to-emerald-700/40" />
            <div>
              <p className="text-[8px] font-semibold text-white">Sneaker X</p>
              <p className="text-[7px] text-white/50">$129</p>
            </div>
          </div>
          <div className="rounded-md px-2 py-1.5" style={{ background: accent.soft }}>
            <p className="text-[7px] text-white/60">Total Sales</p>
            <p className="text-[12px] font-bold text-white">
              $24,780 <span className="text-[9px]" style={{ color: accent.color }}>+12%</span>
            </p>
          </div>
        </div>
      );
    case 2:
      return (
        <div className={`${glass} flex w-[132px] gap-2`}>
          <div className="w-10 space-y-1 rounded-md bg-black/30 p-1">
            {["Dash", "Posts", "Media", "Theme"].map((l) => (
              <div key={l} className="truncate text-[6px] text-white/55">
                {l}
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-md p-1.5" style={{ background: accent.soft }}>
            <p className="text-[8px] font-semibold leading-tight text-white">Build Without Limits</p>
            <p className="mt-1 text-[6px] text-white/55">WP · Themes · Plugins</p>
          </div>
        </div>
      );
    case 3:
      return (
        <div className={`${glass} w-[136px]`}>
          <div className="mb-1.5 flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[7px] text-white/60">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            yourbrand.com
          </div>
          <svg viewBox="0 0 100 36" className="h-8 w-full" aria-hidden="true">
            <path d="M2 30 C18 28 22 18 34 16 S52 22 62 10 S82 6 98 4" fill="none" stroke={accent.color} strokeWidth="2.2" />
            <path d="M2 30 C18 28 22 18 34 16 S52 22 62 10 S82 6 98 4 V36 H2 Z" fill={accent.soft} />
          </svg>
          <p className="mt-1 text-[8px] font-bold" style={{ color: accent.color }}>
            +320% Organic Traffic
          </p>
        </div>
      );
    case 4:
      return (
        <div className={`${glass} w-[120px] text-center`}>
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-[3px] text-[16px] font-extrabold text-white"
            style={{ borderColor: accent.color, boxShadow: `0 0 18px ${accent.glow}` }}
          >
            98
          </div>
          <p className="mt-1 text-[8px] font-semibold text-white/80">Core Web Vitals</p>
          <div className="mt-1.5 flex justify-between text-[6px] text-white/50">
            <span>LCP</span>
            <span>INP</span>
            <span>CLS</span>
          </div>
        </div>
      );
    case 5:
      return (
        <div className={`${glass} w-[132px]`}>
          <div className="relative mb-1.5 h-10 overflow-hidden rounded-md bg-[#102038]">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #334155 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: accent.color, boxShadow: `0 0 12px ${accent.glow}` }} />
          </div>
          <div className="rounded-md bg-white/5 px-2 py-1.5">
            <p className="text-[8px] font-semibold text-white">Your Business</p>
            <p className="text-[7px]" style={{ color: accent.color }}>
              ★★★★★ 4.9
            </p>
          </div>
        </div>
      );
    case 6:
      return (
        <div className={`${glass} w-[136px]`}>
          <p className="mb-1.5 text-[8px] font-semibold text-white/70">Campaign Performance</p>
          <div className="mb-1.5 flex h-10 items-end gap-1">
            {[40, 65, 48, 80, 58, 92].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? accent.color : accent.soft }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 text-center text-[6px] text-white/55">
            <div>
              <p className="font-bold text-white">12.4K</p>Clicks
            </div>
            <div>
              <p className="font-bold text-white">1.2K</p>Conv.
            </div>
            <div>
              <p className="font-bold" style={{ color: accent.color }}>
                4.8x
              </p>
              ROAS
            </div>
          </div>
        </div>
      );
    case 7:
      return (
        <div className={`${glass} grid w-[120px] grid-cols-2 gap-1.5`}>
          {["IG", "Fb", "in", "Tk"].map((label, i) => (
            <span
              key={label}
              className="inline-flex h-9 items-center justify-center rounded-xl text-[10px] font-bold text-white"
              style={{
                background: `linear-gradient(145deg, ${accent.soft}, rgba(255,255,255,0.06))`,
                boxShadow: i === 0 ? `0 0 14px ${accent.glow}` : undefined,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      );
    case 8:
      return (
        <div className={`${glass} w-[136px]`}>
          <p className="mb-1.5 text-[8px] text-white/70">How can I help your business today?</p>
          <div className="space-y-1">
            {["Automate Workflows", "Generate Content", "Answer Customers"].map((label) => (
              <div key={label} className="rounded-md px-2 py-1 text-[7px] font-semibold text-white" style={{ background: accent.soft }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      );
    case 9:
      return (
        <div className={`${glass} w-[132px]`}>
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-white text-[8px] font-black text-[#a259ff]">F</span>
            <span className="text-[8px] font-semibold text-white">Figma File</span>
          </div>
          <div className="relative h-12">
            <div className="absolute inset-x-2 top-0 h-10 rounded-md border border-white/15 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/10" />
            <div className="absolute inset-x-0 top-2 h-10 rounded-md border border-white/20 bg-[#12203a]/95 p-1.5">
              <div className="h-2 w-10 rounded bg-white/20" />
              <div className="mt-1 h-4 rounded" style={{ background: accent.soft }} />
            </div>
          </div>
        </div>
      );
    case 10:
      return (
        <div className={`${glass} w-[124px] text-center`}>
          <div className="relative mx-auto h-12 w-20 overflow-hidden">
            <div
              className="absolute inset-x-0 bottom-0 h-10 rounded-t-full border-[3px] border-b-0"
              style={{ borderColor: accent.color, boxShadow: `0 0 16px ${accent.glow}` }}
            />
            <p className="absolute inset-x-0 bottom-0 text-[18px] font-extrabold text-white">100</p>
          </div>
          <p className="mt-1 text-[8px] font-semibold text-white/75">Performance</p>
          <div className="mt-1 space-y-0.5 text-left text-[6px] text-white/55">
            <p>✓ SEO</p>
            <p>✓ Best Practices</p>
          </div>
        </div>
      );
    default:
      return (
        <div className={`${glass} w-[132px]`}>
          <div className="mb-1.5 flex gap-1.5">
            <div className="flex-1 rounded-md bg-white/5 p-1.5 text-center">
              <p className="text-[9px] font-bold text-white/70">A</p>
              <p className="text-[11px] font-extrabold text-white">2.1%</p>
            </div>
            <div className="flex-1 rounded-md p-1.5 text-center" style={{ background: accent.soft }}>
              <p className="text-[9px] font-bold" style={{ color: accent.color }}>
                B
              </p>
              <p className="text-[11px] font-extrabold text-white">4.8%</p>
            </div>
          </div>
          <p className="text-center text-[8px] font-bold text-emerald-400">+129% lift</p>
        </div>
      );
  }
}

export function OrbitSolutionsSection() {
  return (
    <section
      className="orbit-solutions-section relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="solutions-heading"
    >
      <div className="orbit-solutions-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#040a16] via-[#07122a]/90 to-[#040a16]" />

      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f0c43a]">Global Orbit</p>
          <h2
            id="solutions-heading"
            className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(1.7rem,4vw,3rem)] font-extrabold tracking-tight text-white"
          >
            Web development, done as a <span className="text-[#f0c43a]">product</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-white/65 sm:text-[15px] sm:leading-8">
            Not a brochure mill. Architecture, speed, SEO, and the software behind the site — one engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {ORBIT_SOLUTIONS.map((item, index) => {
            const accent = ACCENTS[index] ?? ACCENTS[0];
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="orbit-soft-card group relative flex min-h-[180px] flex-col overflow-hidden rounded-[22px] p-4 sm:min-h-[190px] sm:p-5"
                style={
                  {
                    "--soft-accent": accent.color,
                    "--soft-glow": accent.glow,
                    "--soft-soft": accent.soft,
                  } as CSSProperties
                }
              >
                <div className="flex items-start gap-3 pr-[118px] sm:pr-[128px]">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white"
                    style={{
                      background: `linear-gradient(145deg, ${accent.soft}, rgba(255,255,255,0.08))`,
                      boxShadow: `0 0 0 1px ${accent.color}66, 0 8px 18px ${accent.glow}`,
                    }}
                  >
                    <Icon index={index} color={accent.color} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug text-white sm:text-[16px]">{item.title}</h3>
                    <p className="mt-1.5 line-clamp-3 text-[12px] leading-5 text-white/62 sm:text-[13px]">{item.summary}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                  <span className="relative z-[1] text-[12px] font-semibold text-[#f0c43a] transition-transform group-hover:translate-x-0.5">
                    Learn more →
                  </span>
                </div>

                <div className="pointer-events-none absolute bottom-3 right-3 top-3 flex w-[124px] items-center justify-end sm:w-[136px]">
                  <div className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.02]">
                    <Preview index={index} accent={accent} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
