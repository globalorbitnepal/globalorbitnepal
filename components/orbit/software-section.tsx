"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { SoftwareProductUi } from "@/components/orbit/software-preview-ui";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import type { SoftwareConfig } from "@/lib/software-config";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function softwareScale(raw: number, touch: boolean) {
  if (touch) return 1;
  const holdEnd = 0.14;
  const start = 1.015;
  if (raw <= holdEnd) return start;
  return start - (start - 1) * ((raw - holdEnd) / (1 - holdEnd));
}

const FEATURED = [
  "billing-software",
  "hotel-management-system",
  "ota-management-system",
  "warehouse-management",
  "manufacturing-erp",
  "restaurant-pos",
  "crm-software",
  "saas-management-system",
];

const PILLS = [
  { label: "Billing & Finance", color: "#60a5fa" },
  { label: "Hospitality", color: "#a78bfa" },
  { label: "Travel & OTA", color: "#38bdf8" },
  { label: "Inventory", color: "#34d399" },
  { label: "Manufacturing", color: "#f0c43a" },
  { label: "Restaurant", color: "#fb923c" },
  { label: "CRM & Sales", color: "#818cf8" },
  { label: "Warehouse", color: "#4ade80" },
  { label: "SaaS Platform", color: "#c4b5fd" },
];

export function OrbitSoftwareSection({ config }: { config: SoftwareConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-soft-scrolling", raw > 0.02 && raw < 0.98);

      if (reduce) {
        wrap.style.transform = "translate3d(0,0,0) scale3d(1,1,1)";
        return;
      }

      const scale = softwareScale(raw, isOrbitTouch());
      wrap.style.transform = `translate3d(0,0,0) scale3d(${scale.toFixed(5)}, ${scale.toFixed(5)}, 1)`;
    };

    return bindOrbitScroll(trackRef.current, apply, frameRef);
  }, []);

  const products = FEATURED.map((slug) => config.products.find((item) => item.slug === slug)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <section
      ref={trackRef}
      className="orbit-soft-track relative isolate text-white"
      aria-labelledby="software-heading"
    >
      <div className="orbit-soft-pin">
        <div className="orbit-soft-veil" aria-hidden="true" />

        <div className="orbit-soft-inner relative z-[1] mx-auto flex h-full w-full max-w-[1680px] flex-col px-[clamp(1rem,3vw,3.2rem)] pb-[clamp(0.8rem,1.6vh,1.2rem)] pt-[clamp(4.8rem,8.4vh,6rem)]">
          <header className="orbit-soft-head mx-auto mb-3 max-w-4xl shrink-0 text-center">
            <p className="orbit-work-badge mx-auto">
              <span className="orbit-work-badge-num">4</span>
              {config.kicker}
            </p>
            <h2 id="software-heading" className="orbit-soft-headline">
              {config.headline} <span>{config.headlineAccent}</span>
            </h2>
          </header>

          <div className="orbit-sw-pills" aria-hidden="true">
            {PILLS.map((pill) => (
              <span key={pill.label} style={{ "--pill": pill.color } as CSSProperties}>
                <i />
                {pill.label}
              </span>
            ))}
          </div>

          <div className="orbit-soft-grid-stage min-h-0 flex-1">
            <div ref={wrapRef} className="orbit-soft-zoom">
              <div className="orbit-soft-grid-3d">
                {products.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="orbit-soft-card group relative flex h-full min-h-0 flex-col overflow-hidden"
                    style={{ "--soft-accent": item.accent, "--i": index } as CSSProperties}
                  >
                    <SoftwareProductUi slug={item.slug} title={item.title} accent={item.accent} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
