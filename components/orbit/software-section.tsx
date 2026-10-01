"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { SoftwareProductUi } from "@/components/orbit/software-preview-ui";
import type { SoftwareConfig } from "@/lib/software-config";

const FEATURED_SLUGS = [
  "billing-software",
  "hotel-management-system",
  "ota-management-system",
  "warehouse-management",
  "restaurant-pos",
  "crm-software",
] as const;

const PILLS = [
  { label: "All Products", color: "#a78bfa", active: true },
  { label: "Hospitality", color: "#c084fc" },
  { label: "Travel & OTA", color: "#38bdf8" },
  { label: "Inventory", color: "#34d399" },
  { label: "Manufacturing", color: "#fbbf24" },
  { label: "Restaurant", color: "#fb923c" },
  { label: "CRM & Sales", color: "#818cf8" },
  { label: "Warehouse", color: "#4ade80" },
];

const CARD_ACCENTS: Record<(typeof FEATURED_SLUGS)[number], string> = {
  "billing-software": "#6366f1",
  "hotel-management-system": "#818cf8",
  "ota-management-system": "#eab308",
  "warehouse-management": "#22c55e",
  "restaurant-pos": "#f97316",
  "crm-software": "#06b6d4",
};

export function OrbitSoftwareSection({ config }: { config: SoftwareConfig }) {
  const products = FEATURED_SLUGS.map((slug) => {
    const item = config.products.find((p) => p.slug === slug);
    if (!item) return null;
    return { ...item, accent: CARD_ACCENTS[slug] };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section
      className="orbit-soft-track orbit-soft-catalog relative isolate text-white"
      aria-labelledby="software-heading"
    >
      <div className="orbit-soft-pin orbit-soft-catalog-pin">
        <div className="orbit-soft-catalog-glow" aria-hidden="true" />

        <div className="orbit-soft-inner orbit-soft-catalog-inner relative z-[1] mx-auto w-full max-w-[1280px] px-[clamp(1rem,3vw,2rem)] pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(4.5rem,8vh,5.5rem)]">
          <header className="orbit-soft-catalog-head mx-auto max-w-3xl text-center">
            <p className="orbit-soft-kicker">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="orbit-soft-kicker-icon">
                <path
                  d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
                  fill="currentColor"
                />
              </svg>
              {config.kicker}
            </p>
            <h2 id="software-heading" className="orbit-soft-headline orbit-soft-catalog-title">
              {config.headline}{" "}
              <span>{config.headlineAccent}</span>
            </h2>
            <p className="orbit-soft-catalog-lede">{config.lede}</p>
          </header>

          <div className="orbit-sw-pills orbit-soft-catalog-pills" aria-hidden="true">
            {PILLS.map((pill) => (
              <span
                key={pill.label}
                className={pill.active ? "is-active" : undefined}
                style={{ "--pill": pill.color } as CSSProperties}
              >
                {!pill.active ? <i /> : null}
                {pill.label}
              </span>
            ))}
          </div>

          <div className="orbit-soft-catalog-grid">
            {products.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="orbit-soft-card orbit-soft-catalog-card group relative flex min-h-0 flex-col overflow-hidden"
                style={{ "--soft-accent": item.accent } as CSSProperties}
              >
                <SoftwareProductUi
                  slug={item.slug}
                  title={item.title}
                  summary={item.summary}
                  accent={item.accent}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
