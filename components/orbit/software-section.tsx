import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ORBIT_SOFTWARE } from "@/lib/orbit/catalog";

type Accent = {
  color: string;
  glow: string;
  soft: string;
};

const ACCENTS: Accent[] = [
  { color: "#3b82f6", glow: "rgba(59,130,246,0.5)", soft: "rgba(59,130,246,0.2)" },
  { color: "#a855f7", glow: "rgba(168,85,247,0.5)", soft: "rgba(168,85,247,0.2)" },
  { color: "#f0c43a", glow: "rgba(240,196,58,0.5)", soft: "rgba(240,196,58,0.2)" },
  { color: "#22c55e", glow: "rgba(34,197,94,0.5)", soft: "rgba(34,197,94,0.2)" },
  { color: "#ef4444", glow: "rgba(239,68,68,0.5)", soft: "rgba(239,68,68,0.2)" },
  { color: "#f97316", glow: "rgba(249,115,22,0.5)", soft: "rgba(249,115,22,0.2)" },
  { color: "#14b8a6", glow: "rgba(20,184,166,0.5)", soft: "rgba(20,184,166,0.2)" },
  { color: "#6366f1", glow: "rgba(99,102,241,0.5)", soft: "rgba(99,102,241,0.2)" },
  { color: "#38bdf8", glow: "rgba(56,189,248,0.5)", soft: "rgba(56,189,248,0.2)" },
  { color: "#10b981", glow: "rgba(16,185,129,0.5)", soft: "rgba(16,185,129,0.2)" },
];

function SoftIcon({ index, color }: { index: number; color: string }) {
  const props = {
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
    <svg key="i0" {...props}>
      <path d="M7 3.5h7l3 3V20a1.5 1.5 0 0 1-1.5 1.5h-8.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z" />
      <path d="M14 3.5V7h3.5M8 12h8M8 15.5h6" />
    </svg>,
    <svg key="i1" {...props}>
      <path d="M3.5 18.5V10.5l8.5-4 8.5 4v8" />
      <path d="M7 18.5V12h10v6.5M3.5 18.5h17" />
    </svg>,
    <svg key="i2" {...props}>
      <path d="M3.5 16.5c4-1 7-5.5 8.5-10.5 1.5 5 4.5 9.5 8.5 10.5" />
      <path d="M12 6v12.5" />
    </svg>,
    <svg key="i3" {...props}>
      <path d="M4 19.5V8.5h5V19.5M9 19.5V5.5h5.5V19.5M14.5 19.5V10h5.5v9.5" />
    </svg>,
    <svg key="i4" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.5M12 18v2.5M3.5 12h2.5M18 12h2.5M6.2 6.2l1.8 1.8M16 16l1.8 1.8M17.8 6.2 16 8M8 16l-1.8 1.8" />
    </svg>,
    <svg key="i5" {...props}>
      <rect x="4" y="5" width="16" height="12" rx="1.5" />
      <path d="M8 20h8M12 17v3" />
    </svg>,
    <svg key="i6" {...props}>
      <circle cx="9" cy="8" r="2.5" />
      <circle cx="16" cy="9" r="2" />
      <path d="M3.8 18a5.2 5.2 0 0 1 10.4 0M14.2 15.8a4.2 4.2 0 0 1 6 2.2" />
    </svg>,
    <svg key="i7" {...props}>
      <path d="M4 19V11M9 19V6M14 19v-6M19 19V9" />
    </svg>,
    <svg key="i8" {...props}>
      <rect x="8" y="3.5" width="8" height="17" rx="2" />
      <path d="M11 18.5h2" />
    </svg>,
    <svg key="i9" {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8M8 12.5h5" />
    </svg>,
  ];

  return icons[index] ?? icons[0];
}

export function OrbitSoftwareSection() {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="software-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/software-section-bg.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-[#040a16]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040a16]/75 via-[#040a16]/28 to-[#040a16]/88" />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-[1360px]">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <p className="inline-flex rounded-full border border-[#f0c43a]/55 bg-[#f0c43a]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f0c43a]">
            Global Orbit
          </p>
          <h2
            id="software-heading"
            className="mt-5 font-[family-name:var(--font-jakarta)] text-[clamp(1.75rem,4.2vw,3.15rem)] font-extrabold tracking-tight text-white"
          >
            Enterprise software, already in{" "}
            <span className="text-[#f0c43a]">production</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-white/70 sm:text-[15px] sm:leading-8 lg:text-[16px]">
            Billing, hotel ops, OTA, warehouse, manufacturing ERP, POS, CRM, custom apps, and the SaaS layer that runs
            them.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-5">
          {ORBIT_SOFTWARE.map((item, index) => {
            const accent = ACCENTS[index] ?? ACCENTS[0];
            const num = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="orbit-soft-card group relative flex min-h-[250px] flex-col overflow-hidden rounded-[22px] p-4 sm:min-h-[270px] sm:p-5"
                style={
                  {
                    "--soft-accent": accent.color,
                    "--soft-glow": accent.glow,
                    "--soft-soft": accent.soft,
                  } as CSSProperties
                }
              >
                <div className="flex items-start gap-3">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                    style={{
                      background: `linear-gradient(145deg, ${accent.soft}, rgba(255,255,255,0.05))`,
                      boxShadow: `0 0 0 1px ${accent.color}66, 0 8px 18px ${accent.glow}`,
                    }}
                  >
                    <SoftIcon index={index} color={accent.color} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[11px] font-bold tracking-[0.14em]" style={{ color: accent.color }}>
                      {num}
                    </p>
                    <h3 className="mt-0.5 text-[14px] font-semibold leading-snug text-white sm:text-[15px]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 line-clamp-3 text-[12px] leading-5 text-white/65 sm:text-[13px] sm:leading-[1.55]">
                  {item.summary}
                </p>

                <div className="relative mt-auto flex min-h-[108px] items-end justify-between gap-2 pt-4">
                  <span className="relative z-[1] inline-flex items-center gap-2 text-[12px] font-semibold text-white/92">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f0c43a] text-[11px] text-[#1a1408] shadow-[0_8px_18px_rgba(240,196,58,0.35)] transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                    Learn more
                  </span>
                  <div className="pointer-events-none absolute -bottom-1 -right-2 h-[108px] w-[108px] sm:-right-1 sm:h-[116px] sm:w-[116px]">
                    <Image
                      src={`/brand/soft-previews/${num}.png`}
                      alt=""
                      fill
                      unoptimized
                      sizes="116px"
                      className="object-contain object-bottom mix-blend-lighten drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:mt-12 sm:flex-row sm:items-end">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/65">
            Building a smarter tomorrow
          </p>
          <p className="font-[family-name:var(--font-script)] text-[clamp(22px,4vw,34px)] leading-[1.15] text-white sm:text-right">
            Technology for a{" "}
            <span className="relative inline-block">
              Brighter World
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#f0c43a]" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
