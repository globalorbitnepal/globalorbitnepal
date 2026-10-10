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
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageVisible, setStageVisible] = useState(true);

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
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
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

  const active = products[activeIndex] ?? products[0];

  const pickProduct = (index: number) => {
    if (index === activeIndex) return;
    setStageVisible(false);
    window.setTimeout(() => {
      setActiveIndex(index);
      setStageVisible(true);
    }, 280);
  };

  useEffect(() => {
    if (products.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timer = window.setInterval(() => {
      setStageVisible(false);
      window.setTimeout(() => {
        setActiveIndex((i) => (i + 1) % products.length);
        setStageVisible(true);
      }, 280);
    }, 6400);

    return () => window.clearInterval(timer);
  }, [products.length]);

  return (
    <section
      ref={sectionRef}
      className="orbit-soft-track orbit-soft-catalog orbit-sw-showcase relative isolate overflow-x-clip text-white"
      aria-labelledby="software-heading"
    >
      <div className="orbit-soft-pin orbit-soft-catalog-pin orbit-sw-showcase-pin">
        <div className="orbit-sw-showcase-ambient" aria-hidden="true">
          <div className="orbit-sw-showcase-mesh" />
          <div className="orbit-sw-showcase-grid" />
        </div>

        <div className="orbit-soft-inner orbit-soft-catalog-inner orbit-sw-showcase-inner relative z-[1] mx-auto w-full px-[clamp(1rem,2.5vw,2.5rem)] pb-[clamp(3rem,6vh,5rem)] pt-[clamp(4.25rem,7vh,5.5rem)]">
          <header className="orbit-soft-catalog-head orbit-sw-showcase-head mx-auto max-w-[48rem] text-center">
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
              <span className="orbit-sw-showcase-accent">{config.headlineAccent}</span>
            </h2>
            <p className="orbit-soft-catalog-lede">{config.lede}</p>
          </header>

          {active ? (
            <div className="orbit-sw-showcase-body">
              <div
                className="orbit-sw-product-rail"
                role="tablist"
                aria-label="Software products"
              >
                {products.map((item, index) => (
                  <button
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    className={`orbit-sw-product-tab${index === activeIndex ? " is-active" : ""}`}
                    style={{ "--sw-accent": item.accent } as CSSProperties}
                    onClick={() => pickProduct(index)}
                  >
                    <span className="orbit-sw-product-tab-dot" aria-hidden="true" />
                    {item.title}
                  </button>
                ))}
              </div>

              <article
                className="orbit-sw-feature"
                style={{ "--sw-accent": active.accent } as CSSProperties}
                role="tabpanel"
                aria-labelledby={`sw-product-${active.slug}`}
              >
                <div className="orbit-sw-feature-copy">
                  <p className="orbit-sw-feature-eyebrow">
                    <span className="orbit-sw-live-pulse" aria-hidden="true" />
                    Live product · production ready
                  </p>
                  <h3 id={`sw-product-${active.slug}`} className="orbit-sw-feature-title">
                    {active.title}
                  </h3>
                  <p className="orbit-sw-feature-lede">{active.tagline}</p>
                  <div className="orbit-sw-feature-actions">
                    <Link href={active.href} className="orbit-sw-feature-cta">
                      Explore {active.title}
                      <span aria-hidden="true">→</span>
                    </Link>
                    <Link href="/orbit-software" className="orbit-sw-feature-secondary">
                      All software
                    </Link>
                  </div>
                </div>

                <div
                  className={`orbit-sw-feature-stage${stageVisible ? " is-visible" : ""}`}
                >
                  <div className="orbit-sw-feature-spotlight" aria-hidden="true" />
                  <div className="orbit-sw-feature-frame">
                    <SoftwareLaptopShot
                      src={active.shotSrc}
                      alt={`${active.title} dashboard`}
                      accent={active.accent}
                      size="hero"
                      priority
                      cinema
                    />
                  </div>
                </div>
              </article>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
