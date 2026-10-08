"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { DEMO_SITES } from "@/components/orbit/demo-sites";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import type { WorkConfig } from "@/lib/work-config";

const EARTH_PINS = [
  { lat: 12, lng: -55 },
  { lat: 22, lng: -12 },
  { lat: 8, lng: 28 },
  { lat: -18, lng: 55 },
  { lat: 32, lng: 75 },
  { lat: -8, lng: 115 },
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function madeLabelProgress(raw: number) {
  if (raw < 0.2) return 0;
  if (raw < 0.42) return smoothStep((raw - 0.2) / 0.22);
  if (raw < 0.86) return 1;
  return 1 - smoothStep((raw - 0.86) / 0.12);
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

    const setGlobeVars = (spin: number, scale: number, lift: number) => {
      const node = globeRef.current;
      if (!node) return;
      node.style.setProperty("--earth-spin", `${spin.toFixed(2)}deg`);
      node.style.setProperty("--earth-scale", scale.toFixed(4));
      node.style.setProperty("--earth-lift", `${(-lift).toFixed(2)}px`);
    };

    const apply = () => {
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      if (reduce) {
        setGlobeVars(0, 1, 0);
        if (haloRef.current) haloRef.current.style.opacity = "0.5";
        if (madeRef.current) madeRef.current.style.opacity = "1";
        return;
      }

      const spin = raw * (touch ? 120 : 165);
      const scale = touch ? 0.94 + raw * 0.14 : 0.9 + raw * 0.2;
      const lift = raw * (touch ? 4 : 10);

      setGlobeVars(spin, scale, lift);

      if (haloRef.current) {
        haloRef.current.style.opacity = (0.32 + raw * 0.5).toFixed(3);
        haloRef.current.style.setProperty("--halo-scale", (0.96 + raw * 0.22).toFixed(3));
      }

      if (madeRef.current) {
        const m = madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
        madeRef.current.style.transform = `translate3d(-50%, 0, 0) scale(${(0.94 + m * 0.06).toFixed(3)})`;
      }
    };

    return bindOrbitScroll(track, apply, frameRef);
  }, []);

  return (
    <section ref={trackRef} className="orbit-work-track orbit-work-earth-track" aria-labelledby="what-we-do-heading">
      <div className="orbit-work-pin orbit-work-earth-pin-view">
        <div className="orbit-work-earth-bg" aria-hidden="true">
          <div className="orbit-work-earth-stars" />
          <div className="orbit-work-earth-vignette" />
        </div>

        <header className="orbit-work-head orbit-work-earth-head">
          <p className="orbit-work-badge">
            <span className="orbit-work-badge-num">{config.badgeNum}</span>
            {config.badgeLabel}
          </p>
          <h2 id="what-we-do-heading" className="orbit-work-headline orbit-work-earth-headline">
            {config.headline}
          </h2>
        </header>

        <div className="orbit-work-mosaic-main orbit-work-earth-stage">
          <div className="orbit-work-earth-arena">
            <div ref={haloRef} className="orbit-work-earth-halo" aria-hidden="true" />

            <div ref={globeRef} className="orbit-work-earth-globe">
              <div className="orbit-work-earth-sphere-wrap">
                <Image
                  src="/brand/hero-globe.png"
                  alt=""
                  width={1200}
                  height={1200}
                  priority
                  sizes="(max-width: 768px) 88vmin, (max-width: 1400px) 72vmin, 840px"
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
                          sizes="(max-width: 768px) 34vw, 14vw"
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
          </div>

          <p ref={madeRef} className="orbit-work-made orbit-work-made-earth">
            {config.madeLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
