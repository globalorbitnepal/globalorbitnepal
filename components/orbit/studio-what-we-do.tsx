"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { DEMO_SITES } from "@/components/orbit/demo-sites";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import type { WorkConfig } from "@/lib/work-config";

const EARTH_PINS = [
  { lat: -8, lng: -42 },
  { lat: 14, lng: -18 },
  { lat: 28, lng: 8 },
  { lat: 6, lng: 32 },
  { lat: -22, lng: 52 },
  { lat: 38, lng: 68 },
  { lat: -12, lng: 98 },
  { lat: 22, lng: 128 },
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function madeLabelProgress(raw: number) {
  if (raw < 0.18) return 0;
  if (raw < 0.38) return smoothStep((raw - 0.18) / 0.2);
  if (raw < 0.88) return 1;
  return 1 - smoothStep((raw - 0.88) / 0.1);
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef(0);

  const sites = useMemo(() => DEMO_SITES.slice(0, EARTH_PINS.length), []);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;

    const touch = isOrbitTouch();

    const apply = () => {
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      if (reduce) {
        if (globeRef.current) globeRef.current.style.transform = "translate3d(0,0,0) scale(1)";
        if (haloRef.current) haloRef.current.style.opacity = "0.55";
        if (madeRef.current) madeRef.current.style.opacity = "1";
        return;
      }

      const spin = raw * (touch ? 140 : 200);
      const scale = touch ? 1.12 - raw * 0.1 : 1.22 - raw * 0.18;
      const lift = raw * (touch ? 6 : 14);

      if (globeRef.current) {
        globeRef.current.style.transform = `translate3d(0, ${(-lift).toFixed(2)}px, 0) rotateY(${spin.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      }
      if (haloRef.current) {
        haloRef.current.style.opacity = (0.35 + raw * 0.45).toFixed(3);
        haloRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${(0.92 + raw * 0.2).toFixed(3)})`;
      }

      if (madeRef.current) {
        const m = madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
        madeRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${(0.94 + m * 0.06).toFixed(3)})`;
      }
    };

    return bindOrbitScroll(track, apply, frameRef);
  }, []);

  return (
    <section ref={trackRef} className="orbit-work-track orbit-work-earth-track" aria-labelledby="what-we-do-heading">
      <div className="orbit-work-pin">
        <div className="orbit-work-earth-bg" aria-hidden="true">
          <div className="orbit-work-earth-stars" />
          <div ref={haloRef} className="orbit-work-earth-halo" />
        </div>

        <header className="orbit-work-head">
          <p className="orbit-work-badge">
            <span className="orbit-work-badge-num">{config.badgeNum}</span>
            {config.badgeLabel}
          </p>
          <h2 id="what-we-do-heading" className="orbit-work-headline">
            {config.headline}
          </h2>
        </header>

        <div className="orbit-work-mosaic-main orbit-work-earth-stage">
          <div ref={globeRef} className="orbit-work-earth-globe">
            <div className="orbit-work-earth-sphere-wrap">
              <Image
                src="/brand/hero-globe.png"
                alt=""
                width={1200}
                height={1200}
                priority
                sizes="(max-width: 768px) 72vmin, 58vmin"
                className="orbit-work-earth-sphere-img"
              />
              <div className="orbit-work-earth-atmosphere" aria-hidden="true" />
            </div>

            <ul className="orbit-work-earth-pins">
              {sites.map((site, index) => {
                const pin = EARTH_PINS[index];
                return (
                  <li
                    key={site.id}
                    className="orbit-work-earth-pin"
                    style={
                      {
                        "--pin-lat": pin.lat,
                        "--pin-lng": pin.lng,
                        "--pin-i": index,
                      } as CSSProperties
                    }
                  >
                    <div className="orbit-work-earth-pin-card">
                      <Image
                        src={site.image}
                        alt=""
                        width={320}
                        height={200}
                        sizes="(max-width: 768px) 28vw, 12vw"
                        className="orbit-work-earth-pin-img"
                      />
                      <div className="orbit-work-earth-pin-meta">
                        <span>{site.kicker}</span>
                        <strong>{site.title}</strong>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <p ref={madeRef} className="orbit-work-made orbit-work-made-earth">
            {config.madeLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
