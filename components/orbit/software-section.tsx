"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import type { SoftwareConfig } from "@/lib/software-config";

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

  const icons = [
    <svg key="i0" {...props}><path d="M7 3.5h7l3 3V20a1.5 1.5 0 0 1-1.5 1.5h-8.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z" /><path d="M14 3.5V7h3.5M8 12h8M8 15.5h6" /></svg>,
    <svg key="i1" {...props}><path d="M3.5 18.5V10.5l8.5-4 8.5 4v8" /><path d="M7 18.5V12h10v6.5M3.5 18.5h17" /></svg>,
    <svg key="i2" {...props}><path d="M3.5 16.5c4-1 7-5.5 8.5-10.5 1.5 5 4.5 9.5 8.5 10.5" /><path d="M12 6v12.5" /></svg>,
    <svg key="i3" {...props}><path d="M4 19.5V8.5h5V19.5M9 19.5V5.5h5.5V19.5M14.5 19.5V10h5.5v9.5" /></svg>,
    <svg key="i4" {...props}><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.5M12 18v2.5M3.5 12h2.5M18 12h2.5M6.2 6.2l1.8 1.8M16 16l1.8 1.8M17.8 6.2 16 8M8 16l-1.8 1.8" /></svg>,
    <svg key="i5" {...props}><rect x="4" y="5" width="16" height="12" rx="1.5" /><path d="M8 20h8M12 17v3" /></svg>,
    <svg key="i6" {...props}><circle cx="9" cy="8" r="2.5" /><circle cx="16" cy="9" r="2" /><path d="M3.8 18a5.2 5.2 0 0 1 10.4 0M14.2 15.8a4.2 4.2 0 0 1 6 2.2" /></svg>,
    <svg key="i7" {...props}><path d="M4 19V11M9 19V6M14 19v-6M19 19V9" /></svg>,
    <svg key="i8" {...props}><rect x="8" y="3.5" width="8" height="17" rx="2" /><path d="M11 18.5h2" /></svg>,
    <svg key="i9" {...props}><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h8M8 12.5h5" /></svg>,
  ];

  return icons[index] ?? icons[0];
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Per-box zoom: hold slightly large, then settle to 1 with a light stagger. */
function boxScale(raw: number, index: number, touch: boolean) {
  const holdEnd = (touch ? 0.16 : 0.24) + index * 0.016;
  const start = touch ? 1.06 : 1.1;
  if (raw <= holdEnd) return start;
  return start - (start - 1) * ((raw - holdEnd) / (1 - holdEnd));
}

export function OrbitSoftwareSection({ config }: { config: SoftwareConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      const grid = gridRef.current;
      if (!track || !grid) return;

      const cards = grid.querySelectorAll<HTMLElement>(".orbit-soft-card");
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-soft-scrolling", raw > 0.02 && raw < 0.98);

      const touch = isOrbitTouch();
      cards.forEach((card, index) => {
        if (reduce || raw <= 0.02 || raw >= 0.98) {
          card.style.transform = "";
          return;
        }
        const scale = boxScale(raw, index, touch);
        card.style.transform = `translate3d(0,0,0) scale3d(${scale.toFixed(5)}, ${scale.toFixed(5)}, 1)`;
      });
    };

    return bindOrbitScroll(trackRef.current, apply, frameRef);
  }, []);

  return (
    <section
      ref={trackRef}
      className="orbit-soft-track relative isolate text-white"
      aria-labelledby="software-heading"
    >
      <div className="orbit-soft-pin">
        <div className="orbit-soft-veil" aria-hidden="true" />

        <div className="orbit-soft-inner relative z-[1] mx-auto flex h-full w-full max-w-[1680px] flex-col px-[clamp(1rem,3vw,3.2rem)] pb-[clamp(1rem,2vh,1.5rem)] pt-[clamp(4.8rem,8.4vh,6.1rem)]">
          <header className="orbit-soft-head mx-auto mb-4 max-w-3xl shrink-0 text-center sm:mb-5">
            <p className="orbit-work-badge mx-auto">
              <span className="orbit-work-badge-num">4</span>
              {config.kicker}
            </p>
            <h2 id="software-heading" className="orbit-soft-headline">
              {config.headline} <span>{config.headlineAccent}</span>
            </h2>
            {config.lede ? (
              <p className="orbit-soft-lede mx-auto mt-2 max-w-2xl text-[14px] leading-6 text-white/62 sm:mt-3 sm:text-[15px] sm:leading-7">
                {config.lede}
              </p>
            ) : null}
          </header>

          <div className="orbit-soft-grid-stage min-h-0 flex-1">
            <div className="orbit-soft-zoom">
              <div ref={gridRef} className="orbit-soft-grid-3d">
                {config.products.map((item, index) => {
                  const num = String(index + 1).padStart(2, "0");
                  return (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className="orbit-soft-card group relative flex min-h-0 flex-col overflow-hidden"
                      style={
                        {
                          "--soft-accent": item.accent,
                          "--i": index,
                        } as CSSProperties
                      }
                    >
                      <span className="orbit-soft-card-glow" aria-hidden="true" />
                      <span className="orbit-soft-card-shine" aria-hidden="true" />
                      <div className="flex min-w-0 items-start gap-2.5">
                        <span
                          className="orbit-soft-icon inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
                          style={{
                            background: `linear-gradient(145deg, ${item.accent}33, rgba(255,255,255,0.05))`,
                            boxShadow: `0 0 0 1px ${item.accent}66, 0 8px 18px ${item.accent}40`,
                          }}
                        >
                          <SoftIcon index={index} color={item.accent} />
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="orbit-soft-num" style={{ color: item.accent }}>
                            {num}
                          </p>
                          <h3 className="orbit-soft-card-title">{item.title}</h3>
                        </div>
                      </div>
                      <p className="orbit-soft-card-copy">{item.summary}</p>
                      <div className="orbit-soft-card-foot relative mt-auto flex min-h-0 items-end justify-between gap-2">
                        <span className="orbit-soft-more">
                          <span className="orbit-soft-more-dot" aria-hidden="true">
                            →
                          </span>
                          Learn more
                        </span>
                        {item.previewSrc ? (
                          <div className="orbit-soft-preview">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.previewSrc} alt="" />
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="orbit-soft-foot mt-4 flex shrink-0 flex-col items-start justify-between gap-2 sm:mt-5 sm:flex-row sm:items-end">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/55">{config.footerKicker}</p>
            <p className="font-[family-name:var(--font-jakarta)] text-[clamp(1.15rem,2.4vw,1.75rem)] font-semibold leading-[1.2] text-white sm:text-right">
              {config.footerTitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
