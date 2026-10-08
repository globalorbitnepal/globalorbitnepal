"use client";

import { useEffect, useMemo, useRef } from "react";
import { DEMO_SITES, DemoWebsite } from "@/components/orbit/demo-sites";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import type { WorkConfig } from "@/lib/work-config";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function mosaicScale(raw: number, touch: boolean) {
  const holdEnd = touch ? 0.16 : 0.22;
  const start = touch ? 1.08 : 1.12;
  if (raw <= holdEnd) return start;
  return start - (start - 1) * ((raw - holdEnd) / (1 - holdEnd));
}

function madeLabelProgress(raw: number) {
  if (raw < 0.22) return 0;
  if (raw < 0.4) return smoothStep((raw - 0.22) / 0.18);
  if (raw < 0.86) return 1;
  return 1 - smoothStep((raw - 0.86) / 0.12);
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef(0);
  const sites = useMemo(() => DEMO_SITES, []);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;

    const apply = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      if (reduce) {
        wrap.style.transform = "translate3d(0,0,0) scale3d(1,1,1)";
        if (madeRef.current) madeRef.current.style.opacity = "1";
        return;
      }

      const scale = mosaicScale(raw, isOrbitTouch());
      wrap.style.transform = `translate3d(0,0,0) scale3d(${scale.toFixed(5)}, ${scale.toFixed(5)}, 1)`;

      if (madeRef.current) {
        const m = madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
        madeRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${(0.96 + m * 0.04).toFixed(3)})`;
      }
    };

    return bindOrbitScroll(track, apply, frameRef);
  }, []);

  return (
    <section ref={trackRef} className="orbit-work-track" aria-labelledby="what-we-do-heading">
      <div className="orbit-work-pin">
        <header className="orbit-work-head">
          <p className="orbit-work-badge">
            <span className="orbit-work-badge-num">{config.badgeNum}</span>
            {config.badgeLabel}
          </p>
          <h2 id="what-we-do-heading" className="orbit-work-headline">
            {config.headline}
          </h2>
        </header>

        <div className="orbit-work-mosaic-main">
          <div ref={wrapRef} className="orbit-work-mosaic-wrap">
            <div className="orbit-work-mosaic">
              {sites.map((site) => (
                <div key={site.id} className="orbit-work-block">
                  <DemoWebsite site={site} />
                </div>
              ))}
            </div>
            <p ref={madeRef} className="orbit-work-made">
              {config.madeLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
