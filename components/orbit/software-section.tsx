"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { SoftwareLaptopShot } from "@/components/orbit/software-laptop-shot";
import type { SoftwareConfig } from "@/lib/software-config";
import { softwareShotForSlug } from "@/lib/software-shots";

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
  "hotel-management-system": "#a855f7",
  "ota-management-system": "#eab308",
  "warehouse-management": "#22c55e",
  "restaurant-pos": "#f97316",
  "crm-software": "#06b6d4",
};

const TAGLINES: Record<(typeof FEATURED_SLUGS)[number], string> = {
  "billing-software": "Smart invoicing for modern businesses",
  "hotel-management-system": "Complete solution for hotels & resorts",
  "ota-management-system": "Manage all your channels in one place",
  "warehouse-management": "Track inventory with real-time updates",
  "restaurant-pos": "Modern POS for restaurants & cafes",
  "crm-software": "Manage leads, customers and sales",
};

export function OrbitSoftwareSection({ config }: { config: SoftwareConfig }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("is-revealed");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          root.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const products = FEATURED_SLUGS.map((slug) => {
    const item = config.products.find((p) => p.slug === slug);
    const shot = softwareShotForSlug(slug);
    if (!item || !shot) return null;
    return {
      ...item,
      accent: CARD_ACCENTS[slug],
      tagline: TAGLINES[slug],
      shotSrc: shot.src,
    };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item));

  const heroProduct = products[heroIndex] ?? products[0];

  useEffect(() => {
    if (products.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timer = window.setInterval(() => {
      setHeroVisible(false);
      window.setTimeout(() => {
        setHeroIndex((i) => (i + 1) % products.length);
        setHeroVisible(true);
      }, 380);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [products.length]);

  return (
    <section
      ref={sectionRef}
      className="orbit-soft-track orbit-soft-catalog relative isolate text-white"
      aria-labelledby="software-heading"
    >
      <div className="orbit-soft-pin orbit-soft-catalog-pin">
        <div className="orbit-soft-catalog-glow" aria-hidden="true" />

        <div className="orbit-soft-inner orbit-soft-catalog-inner relative z-[1] mx-auto w-full px-[clamp(1rem,2.5vw,2.5rem)] pb-[clamp(2.75rem,5vh,4.5rem)] pt-[clamp(4.25rem,7vh,5.25rem)]">
          <header className="orbit-soft-catalog-head mx-auto max-w-[46rem] text-center">
            <p className="orbit-soft-kicker">
              <span className="orbit-soft-kicker-dot" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="orbit-soft-kicker-icon">
                  <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" fill="currentColor" />
                </svg>
              </span>
              {config.kicker}
            </p>
            <h2 id="software-heading" className="orbit-soft-headline orbit-soft-catalog-title">
              {config.headline}{" "}
              <span>{config.headlineAccent}</span>
            </h2>
            <p className="orbit-soft-catalog-lede">{config.lede}</p>
          </header>

          <div className="orbit-soft-catalog-pills-wrap">
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
          </div>

          {heroProduct ? (
            <div className="orbit-soft-catalog-hero" style={{ "--soft-accent": heroProduct.accent } as CSSProperties}>
              <div className={`orbit-soft-catalog-hero-stage${heroVisible ? " is-visible" : ""}`}>
                <SoftwareLaptopShot
                  src={heroProduct.shotSrc}
                  alt={`${heroProduct.title} dashboard`}
                  accent={heroProduct.accent}
                  size="hero"
                  priority
                />
              </div>
              <div className="orbit-soft-catalog-hero-meta">
                <p className="orbit-soft-catalog-hero-kicker">Live product preview</p>
                <h3 className="orbit-soft-catalog-hero-title">{heroProduct.title}</h3>
                <p className="orbit-soft-catalog-hero-tag">{heroProduct.tagline}</p>
                <div className="orbit-soft-catalog-hero-dots" role="tablist" aria-label="Product previews">
                  {products.map((item, index) => (
                    <button
                      key={item.slug}
                      type="button"
                      role="tab"
                      aria-selected={index === heroIndex}
                      aria-label={item.title}
                      className={index === heroIndex ? "is-active" : undefined}
                      style={{ "--dot": item.accent } as CSSProperties}
                      onClick={() => {
                        setHeroVisible(false);
                        window.setTimeout(() => {
                          setHeroIndex(index);
                          setHeroVisible(true);
                        }, 200);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="orbit-soft-catalog-grid">
            {products.map((item, index) => (
              <Link
                key={item.slug}
                href={item.href}
                className="orbit-soft-card orbit-soft-catalog-card orbit-soft-catalog-shot-card group"
                style={
                  {
                    "--soft-accent": item.accent,
                    "--card-i": index,
                  } as CSSProperties
                }
              >
                <div className="orbit-soft-shot-card-inner">
                  <SoftwareLaptopShot
                    src={item.shotSrc}
                    alt={`${item.title} interface`}
                    accent={item.accent}
                    size="card"
                    priority={index < 2}
                  />
                  <div className="orbit-soft-shot-card-foot">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.tagline}</p>
                    </div>
                    <span className="orbit-soft-shot-card-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H9M17 7v8" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
