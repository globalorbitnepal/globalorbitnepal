import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { OrbitFlag } from "@/components/orbit/flags";

type OfficeCard = {
  code: string;
  country: string;
  city: string;
  image: string;
  body: string;
  href: string;
  metrics: { label: string; icon: "team" | "gear" | "support" | "code" | "delivery" | "growth" | "handshake" | "pie" | "globe" }[];
};

const OFFICES: OfficeCard[] = [
  {
    code: "np",
    country: "Nepal",
    city: "Kathmandu",
    image: "/brand/offices/nepal.jpg",
    body: "Our headquarters driving innovation and global delivery.",
    href: "/about",
    metrics: [
      { label: "Core Team", icon: "team" },
      { label: "R&D & Engineering", icon: "gear" },
      { label: "Global Support", icon: "support" },
    ],
  },
  {
    code: "in",
    country: "India",
    city: "Delhi (NCR)",
    image: "/brand/offices/india.jpg",
    body: "Our development hub powering scalable solutions.",
    href: "/about",
    metrics: [
      { label: "Development Team", icon: "code" },
      { label: "Product Delivery", icon: "delivery" },
      { label: "Growth & Strategy", icon: "growth" },
    ],
  },
  {
    code: "us",
    country: "USA",
    city: "United States",
    image: "/brand/offices/usa.jpg",
    body: "Our client office for strategic partnerships and global expansion.",
    href: "/about",
    metrics: [
      { label: "Client Relations", icon: "handshake" },
      { label: "Business Development", icon: "pie" },
      { label: "Market Expansion", icon: "globe" },
    ],
  },
];

function MetricIcon({ name }: { name: OfficeCard["metrics"][number]["icon"] }) {
  const props = {
    className: "mx-auto h-5 w-5 text-[#f0c43a]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const map: Record<OfficeCard["metrics"][number]["icon"], ReactNode> = {
    team: (
      <svg {...props}>
        <circle cx="9" cy="8" r="2.6" />
        <circle cx="16" cy="9" r="2.1" />
        <path d="M3.8 18.2a5.2 5.2 0 0 1 10.4 0M14.4 15.8a4.2 4.2 0 0 1 5.8 2.4" />
      </svg>
    ),
    gear: (
      <svg {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6" />
      </svg>
    ),
    support: (
      <svg {...props}>
        <path d="M5 12a7 7 0 0 1 14 0v4.5a2 2 0 0 1-2 2h-1.2" />
        <path d="M5 14.5V12M19 14.5V12" />
        <path d="M9.5 19.5h5" />
      </svg>
    ),
    code: (
      <svg {...props}>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
      </svg>
    ),
    delivery: (
      <svg {...props}>
        <circle cx="9" cy="8.2" r="2.4" />
        <circle cx="15.5" cy="8.8" r="2" />
        <path d="M4 18a5 5 0 0 1 10 0M14.2 15.6a4 4 0 0 1 5.8 2.4" />
        <path d="M17.2 11.2 19 13l2-2" />
      </svg>
    ),
    growth: (
      <svg {...props}>
        <path d="M4 19V10M9 19V6M14 19v-5M19 19V8" />
      </svg>
    ),
    handshake: (
      <svg {...props}>
        <path d="M8 13.5 10.5 11l2 2 2.5-2.5L17.5 13" />
        <path d="M4.5 12.5 8 9l2.2 2.2M19.5 12.5 16 9l-2 2" />
      </svg>
    ),
    pie: (
      <svg {...props}>
        <path d="M12 4.5v7.5l5.8 5.8A8 8 0 1 1 12 4.5z" />
        <path d="M14 4.9A8 8 0 0 1 19.1 14H14V4.9z" />
      </svg>
    ),
    globe: (
      <svg {...props}>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2.5 2.4 2.5 13.6 0 16M12 4c-2.5 2.4-2.5 13.6 0 16" />
      </svg>
    ),
  };

  return map[name];
}

function BuildingIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-[#f0c43a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-6h6v6M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01" />
    </svg>
  );
}

export function OrbitOfficesSection() {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="offices-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/offices/world-bg.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#040a16]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040a16]/85 via-[#040a16]/45 to-[#040a16]/92" />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-[1200px]">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="inline-flex flex-col items-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#f0c43a]">Global Orbit</p>
            <span className="mt-2 h-px w-14 bg-[#f0c43a]/80" aria-hidden="true" />
          </div>
          <h2
            id="offices-heading"
            className="mt-5 font-[family-name:var(--font-jakarta)] text-[clamp(1.85rem,4.2vw,3.15rem)] font-extrabold tracking-tight text-white"
          >
            Three offices. <span className="text-[#f0c43a]">One standard.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-white/70 sm:text-[15px] sm:leading-8">
            Work originates in Kathmandu, India, and the United States — not a single-city shop pretending to be global.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {OFFICES.map((office) => (
            <article
              key={office.code}
              className="orbit-office-card group relative flex min-h-[460px] flex-col overflow-hidden rounded-[24px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={office.image}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover object-center opacity-70 transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#07111f]/40 via-[#07111f]/55 to-[#050b16]/94" />
              </div>

              <div className="relative z-[1] flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-full ring-2 ring-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                    <OrbitFlag code={office.code} name={office.country} size={46} rounded="full" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0c43a]/55 bg-[#f0c43a]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#f0c43a]">
                    <BuildingIcon />
                    Sales & Operation Office
                  </span>
                </div>

                <div className="mt-auto pt-28">
                  <h3 className="font-[family-name:var(--font-jakarta)] text-[28px] font-extrabold leading-none text-white sm:text-[30px]">
                    {office.country}
                  </h3>
                  <p className="mt-2 text-[14px] text-white/75">{office.city}</p>
                  <p className="mt-3 max-w-[240px] text-[13px] leading-6 text-white/68">{office.body}</p>
                  <Link href={office.href} className="mt-4 inline-flex text-[13px] font-semibold text-[#f0c43a]">
                    Learn more →
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/15 pt-4">
                  {office.metrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      className={`px-1 text-center ${index === 0 ? "" : "border-l border-white/15"}`}
                    >
                      <MetricIcon name={metric.icon} />
                      <p className="mt-2 text-[9px] font-medium leading-tight text-white/75 sm:text-[10px]">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#f0c43a]/70 sm:block" aria-hidden="true" />
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75 sm:text-[11px]">
            People | Technology | Partnership | Without Borders
          </p>
          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#f0c43a]/70 sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
