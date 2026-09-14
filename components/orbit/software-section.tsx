import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ORBIT_SOFTWARE } from "@/lib/orbit/catalog";

type Accent = {
  color: string;
  glow: string;
  soft: string;
};

const ACCENTS: Accent[] = [
  { color: "#3b82f6", glow: "rgba(59,130,246,0.45)", soft: "rgba(59,130,246,0.18)" },
  { color: "#a855f7", glow: "rgba(168,85,247,0.45)", soft: "rgba(168,85,247,0.18)" },
  { color: "#f0c43a", glow: "rgba(240,196,58,0.45)", soft: "rgba(240,196,58,0.18)" },
  { color: "#22c55e", glow: "rgba(34,197,94,0.45)", soft: "rgba(34,197,94,0.18)" },
  { color: "#ef4444", glow: "rgba(239,68,68,0.45)", soft: "rgba(239,68,68,0.18)" },
  { color: "#f97316", glow: "rgba(249,115,22,0.45)", soft: "rgba(249,115,22,0.18)" },
  { color: "#14b8a6", glow: "rgba(20,184,166,0.45)", soft: "rgba(20,184,166,0.18)" },
  { color: "#6366f1", glow: "rgba(99,102,241,0.45)", soft: "rgba(99,102,241,0.18)" },
  { color: "#38bdf8", glow: "rgba(56,189,248,0.45)", soft: "rgba(56,189,248,0.18)" },
  { color: "#10b981", glow: "rgba(16,185,129,0.45)", soft: "rgba(16,185,129,0.18)" },
];

function Preview({ index, accent }: { index: number; accent: Accent }) {
  const panel =
    "rounded-[10px] border border-white/15 bg-[#0b1528]/92 p-2 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md";

  switch (index) {
    case 0:
      return (
        <div className={`${panel} w-[88px]`}>
          <div className="mb-1.5 flex items-center justify-between text-[7px] text-white/55">
            <span>Invoice</span>
            <span style={{ color: accent.color }}>Paid</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-white/10" />
            <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
            <div className="mt-2 h-6 rounded-md" style={{ background: accent.soft }} />
          </div>
        </div>
      );
    case 1:
      return (
        <div className={`${panel} w-[92px]`}>
          <div className="mb-1.5 h-8 rounded-md bg-gradient-to-br from-[#312e81] to-[#1e1b4b]" />
          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-white/15" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
            <div className="mt-1.5 flex gap-1">
              <span className="h-4 flex-1 rounded" style={{ background: accent.soft }} />
              <span className="h-4 flex-1 rounded bg-white/10" />
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className={`${panel} w-[96px] space-y-1.5`}>
          {["Booking.com", "Agoda", "Expedia"].map((name) => (
            <div key={name} className="flex items-center justify-between gap-2 text-[7px]">
              <span className="truncate text-white/70">{name}</span>
              <span className="rounded-full px-1.5 py-0.5 text-[6px] font-semibold text-[#052e16]" style={{ background: accent.color }}>
                Live
              </span>
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className={`${panel} flex w-[92px] items-end gap-1.5`}>
          <div className="grid flex-1 grid-cols-3 gap-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="aspect-square rounded-[2px] bg-white/12" />
            ))}
          </div>
          <div className="h-10 w-5 rounded-[4px] border border-white/20" style={{ background: accent.soft }} />
        </div>
      );
    case 4:
      return (
        <div className={`${panel} w-[92px]`}>
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full" style={{ background: accent.soft }} />
            <span className="text-[7px] text-white/65">Line A</span>
          </div>
          <div className="space-y-1">
            {["BOM ready", "QC pass", "Ship"].map((row) => (
              <div key={row} className="flex items-center gap-1 text-[6px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.color }} />
                {row}
              </div>
            ))}
          </div>
        </div>
      );
    case 5:
      return (
        <div className={`${panel} w-[88px]`}>
          <div className="mb-1.5 grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="aspect-square rounded-md bg-white/10" style={i === 1 ? { background: accent.soft } : undefined} />
            ))}
          </div>
          <div className="h-5 rounded-md text-center text-[7px] font-semibold leading-5 text-[#1a1408]" style={{ background: accent.color }}>
            Order
          </div>
        </div>
      );
    case 6:
      return (
        <div className={`${panel} flex w-[100px] gap-1`}>
          {["New", "Warm", "Won"].map((col, i) => (
            <div key={col} className="flex-1 space-y-1">
              <div className="text-[6px] text-white/50">{col}</div>
              <div className="h-6 rounded" style={{ background: i === 2 ? accent.soft : "rgba(255,255,255,0.08)" }} />
              <div className="h-4 rounded bg-white/10" />
            </div>
          ))}
        </div>
      );
    case 7:
      return (
        <div className={`${panel} w-[96px]`}>
          <div className="mb-1 flex justify-between text-[6px] text-white/50">
            <span>MRR</span>
            <span style={{ color: accent.color }}>+18%</span>
          </div>
          <svg viewBox="0 0 80 36" className="h-9 w-full" aria-hidden="true">
            <path
              d="M2 28 C14 26, 18 18, 28 16 S44 22, 52 12 S68 8, 78 6"
              fill="none"
              stroke={accent.color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M2 28 C14 26, 18 18, 28 16 S44 22, 52 12 S68 8, 78 6 V36 H2 Z" fill={accent.soft} opacity="0.7" />
          </svg>
        </div>
      );
    case 8:
      return (
        <div className="relative h-[78px] w-[42px] rounded-[12px] border border-white/25 bg-[#07111f] p-1 shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
          <div className="h-full rounded-[9px] bg-gradient-to-b from-[#12203a] to-[#0a1424] p-1.5">
            <div className="mb-1 h-1 w-8 rounded-full bg-white/20" />
            <div className="space-y-1">
              <div className="h-4 rounded" style={{ background: accent.soft }} />
              <div className="h-1.5 rounded-full bg-white/12" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
              <div className="mt-2 h-3 rounded bg-white/10" />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className={`${panel} w-[100px] space-y-1`}>
          {["Acme Co", "Northwind", "Orbit SaaS"].map((tenant, i) => (
            <div key={tenant} className="flex items-center justify-between text-[6px]">
              <span className="truncate text-white/70">{tenant}</span>
              <span
                className="rounded-full px-1.5 py-0.5 font-semibold"
                style={{
                  color: i === 2 ? "#052e16" : accent.color,
                  background: i === 2 ? accent.color : accent.soft,
                }}
              >
                Active
              </span>
            </div>
          ))}
        </div>
      );
  }
}

export function OrbitSoftwareSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:py-24" aria-labelledby="software-heading">
      <div className="absolute inset-0">
        <Image
          src="/brand/software-section-bg.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#040a16]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040a16]/70 via-[#040a16]/35 to-[#040a16]/85" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-[#f0c43a]/55 bg-[#f0c43a]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f0c43a]">
            Global Orbit
          </p>
          <h2
            id="software-heading"
            className="mt-5 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Enterprise software, already in{" "}
            <span className="text-[#f0c43a]">production</span>
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-white/70 sm:text-[16px]">
            Billing, hotel ops, OTA, warehouse, manufacturing ERP, POS, CRM, custom apps, and the SaaS layer that runs
            them.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {ORBIT_SOFTWARE.map((item, index) => {
            const accent = ACCENTS[index] ?? ACCENTS[0];
            const num = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="orbit-soft-card group relative flex min-h-[220px] flex-col overflow-hidden rounded-[22px] p-5"
                style={
                  {
                    "--soft-accent": accent.color,
                    "--soft-glow": accent.glow,
                    "--soft-soft": accent.soft,
                  } as CSSProperties
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-[12px] font-bold text-white"
                      style={{
                        background: `linear-gradient(145deg, ${accent.soft}, rgba(255,255,255,0.06))`,
                        boxShadow: `0 0 0 1px ${accent.color}55, 0 8px 20px ${accent.glow}`,
                        color: accent.color,
                      }}
                    >
                      {num}
                    </span>
                    <h3 className="text-[15px] font-semibold leading-snug text-white">{item.title}</h3>
                  </div>
                </div>

                <p className="mt-3 text-[12px] leading-5 text-white/65">{item.summary}</p>

                <div className="mt-auto flex items-end justify-between gap-2 pt-5">
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/90">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f0c43a] text-[11px] text-[#1a1408] transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                    Learn more
                  </span>
                  <div className="pointer-events-none shrink-0 opacity-95 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Preview index={index} accent={accent} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/65">
            Building a smarter tomorrow
          </p>
          <p className="text-right font-[family-name:var(--font-script)] text-[26px] leading-[1.15] text-white sm:text-[32px]">
            Technology for a
            <span className="relative ml-2 inline-block">
              Brighter World
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#f0c43a]" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
