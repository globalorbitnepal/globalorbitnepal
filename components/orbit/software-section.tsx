"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { SoftwareProductUi } from "@/components/orbit/demo-sites";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import type { SoftwareConfig } from "@/lib/software-config";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function softwareScale(raw: number, touch: boolean) {
  const holdEnd = touch ? 0.16 : 0.22;
  const start = touch ? 1.1 : 1.16;
  if (raw <= holdEnd) return start;
  return start - (start - 1) * ((raw - holdEnd) / (1 - holdEnd));
}

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

  return (
    <section
      ref={trackRef}
      className="orbit-soft-track relative isolate text-white"
      aria-labelledby="software-heading"
    >
      <div className="orbit-soft-pin">
        <div className="orbit-soft-veil" aria-hidden="true" />

        <div className="orbit-soft-inner relative z-[1] mx-auto flex h-full w-full max-w-[1680px] flex-col px-[clamp(1rem,3vw,3.2rem)] pb-[clamp(0.8rem,1.6vh,1.2rem)] pt-[clamp(4.6rem,8vh,5.8rem)]">
          <header className="orbit-soft-head mx-auto mb-3 max-w-3xl shrink-0 text-center">
            <p className="orbit-work-badge mx-auto">
              <span className="orbit-work-badge-num">4</span>
              {config.kicker}
            </p>
            <h2 id="software-heading" className="orbit-soft-headline">
              {config.headline} <span>{config.headlineAccent}</span>
            </h2>
          </header>

          <div className="orbit-soft-grid-stage min-h-0 flex-1">
            <div ref={wrapRef} className="orbit-soft-zoom">
              <div className="orbit-soft-grid-3d">
                {config.products.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="orbit-soft-card group relative flex min-h-0 flex-col overflow-hidden"
                    style={{ "--soft-accent": item.accent, "--i": index } as CSSProperties}
                  >
                    <SoftwareProductUi title={item.title} accent={item.accent} index={index} />
                    <span className="orbit-soft-card-name">{item.title}</span>
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
