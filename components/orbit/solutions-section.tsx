import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ORBIT_SOLUTIONS } from "@/lib/orbit/catalog";

type Accent = { color: string; glow: string; soft: string; solid: string };

const ACCENTS: Accent[] = [
  { color: "#60a5fa", glow: "rgba(59,130,246,0.55)", soft: "rgba(59,130,246,0.22)", solid: "#2563eb" },
  { color: "#4ade80", glow: "rgba(34,197,94,0.55)", soft: "rgba(34,197,94,0.22)", solid: "#16a34a" },
  { color: "#c084fc", glow: "rgba(168,85,247,0.55)", soft: "rgba(168,85,247,0.22)", solid: "#7c3aed" },
  { color: "#f0c43a", glow: "rgba(240,196,58,0.55)", soft: "rgba(240,196,58,0.22)", solid: "#d4a017" },
  { color: "#2dd4bf", glow: "rgba(20,184,166,0.55)", soft: "rgba(20,184,166,0.22)", solid: "#0d9488" },
  { color: "#f472b6", glow: "rgba(236,72,153,0.55)", soft: "rgba(236,72,153,0.22)", solid: "#db2777" },
  { color: "#2dd4bf", glow: "rgba(45,212,191,0.55)", soft: "rgba(45,212,191,0.22)", solid: "#0f766e" },
  { color: "#e879f9", glow: "rgba(232,121,249,0.55)", soft: "rgba(232,121,249,0.22)", solid: "#c026d3" },
  { color: "#22d3ee", glow: "rgba(34,211,238,0.55)", soft: "rgba(34,211,238,0.22)", solid: "#0891b2" },
  { color: "#a78bfa", glow: "rgba(139,92,246,0.55)", soft: "rgba(139,92,246,0.22)", solid: "#7c3aed" },
  { color: "#fb923c", glow: "rgba(251,146,60,0.55)", soft: "rgba(251,146,60,0.22)", solid: "#ea580c" },
  { color: "#818cf8", glow: "rgba(99,102,241,0.55)", soft: "rgba(99,102,241,0.22)", solid: "#4f46e5" },
];

function WordPressLogo() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <path
        fill="#21759b"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 1.6c1.2 0 2.3.3 3.3.7l-5.4 15.7A8.4 8.4 0 0 1 12 3.6zm4.1 1.2A8.4 8.4 0 0 1 20.4 12c0 2.2-.9 4.3-2.3 5.8L12.7 5.2c1.1-.2 2.2-.2 3.4-.4zM6.4 5.9 11 18.6l-3.8-11.1c-.4-.9-.6-1.1-.8-1.6zm-.8 2.1 3.3 9.7A8.4 8.4 0 0 1 3.6 12c0-1.5.4-2.9 1-4.1z"
      />
    </svg>
  );
}

function Icon({ index }: { index: number }) {
  const p = {
    className: "h-[18px] w-[18px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (index === 2) return <WordPressLogo />;

  const icons: ReactNode[] = [
    <svg key="0" {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4" /></svg>,
    <svg key="1" {...p}><circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /><path d="M3.5 4h2l2.2 11h9.8l2-7H7.1" /></svg>,
    null,
    <svg key="3" {...p}><path d="M4 19V10M9 19V6M14 19v-5M19 19V8" /></svg>,
    <svg key="4" {...p}><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6" /></svg>,
    <svg key="5" {...p}><path d="M12 20.5s6.2-4.4 6.2-9A6.2 6.2 0 0 0 12 5.3a6.2 6.2 0 0 0-6.2 6.2c0 4.6 6.2 9 6.2 9z" /><circle cx="12" cy="11.4" r="2" /></svg>,
    <svg key="6" {...p}><path d="M5 19.5 12 4.5l7 15H5z" /><path d="M9.3 14.4h5.4" /></svg>,
    <svg key="7" {...p}><circle cx="7.5" cy="8" r="2" /><circle cx="16.5" cy="8" r="2" /><circle cx="12" cy="16.2" r="2" /><path d="M9.3 9.1 10.7 14M14.7 9.1 13.3 14" /></svg>,
    <svg key="8" {...p}><rect x="4.5" y="5.5" width="15" height="13" rx="3" /><circle cx="9.2" cy="11.2" r="1.2" /><circle cx="14.8" cy="11.2" r="1.2" /><path d="M9.8 14.4c1 0.8 3.4 0.8 4.4 0" /></svg>,
    <svg key="9" {...p}><path d="M4.5 18.5 12 4.8l2.6 5.3L19.5 18.5" /><path d="M8.6 18.5h8.8" /></svg>,
    <svg key="10" {...p}><path d="M4.5 16.5a7.5 7.5 0 0 1 15 0" /><path d="M12 9.2v4.2l2.3 1.4" /></svg>,
    <svg key="11" {...p}><path d="M4.5 5.5h15l-3 5.2H7.5L4.5 5.5zM7.5 10.7v7.8h9V10.7" /></svg>,
  ];

  return icons[index] ?? icons[0];
}

export function OrbitSolutionsSection() {
  return (
    <section
      className="orbit-solutions-section relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="solutions-heading"
    >
      <div className="orbit-solutions-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#040a16] via-[#07122a]/92 to-[#040a16]" />

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
            const num = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="orbit-soft-card group relative flex min-h-[200px] overflow-hidden rounded-[22px] p-4 sm:min-h-[210px] sm:p-5"
                style={
                  {
                    "--soft-accent": accent.color,
                    "--soft-glow": accent.glow,
                    "--soft-soft": accent.soft,
                  } as CSSProperties
                }
              >
                <div className="relative z-[1] flex w-[48%] min-w-0 flex-col sm:w-[46%]">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[12px]"
                    style={{
                      background: `linear-gradient(145deg, ${accent.solid}, ${accent.color})`,
                      boxShadow: `0 8px 20px ${accent.glow}`,
                    }}
                  >
                    <Icon index={index} />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold leading-snug text-white sm:text-[16px]">{item.title}</h3>
                  <p className="mt-2 line-clamp-4 text-[12px] leading-5 text-white/62 sm:text-[13px] sm:leading-[1.55]">
                    {item.summary}
                  </p>
                  <span className="mt-auto pt-4 text-[12px] font-semibold text-[#f0c43a] transition-transform group-hover:translate-x-0.5">
                    Learn more →
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-y-2 right-1 w-[54%] sm:right-2 sm:w-[56%]">
                  <Image
                    src={`/brand/sol-previews/${num}.png`}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width:640px) 55vw, 280px"
                    className="object-contain object-right-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
