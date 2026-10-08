"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { DemoWebsite, DEMO_SITES } from "@/components/orbit/demo-sites";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import {
  EARTH_FLOATER_SLOTS,
  EARTH_MOSAIC_TILE_COUNT,
  fibonacciSpherePoints,
} from "@/lib/work-earth-mosaic";
import type { WorkConfig } from "@/lib/work-config";

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
  const rotatorRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef(0);

  const mosaicPoints = useMemo(() => fibonacciSpherePoints(EARTH_MOSAIC_TILE_COUNT), []);

  const mosaicTiles = useMemo(
    () =>
      mosaicPoints.map((pos, index) => ({
        pos,
        image: DEMO_SITES[index % DEMO_SITES.length].image,
        index,
      })),
    [mosaicPoints],
  );

  const floaters = useMemo(
    () =>
      EARTH_FLOATER_SLOTS.map((pos, index) => ({
        pos,
        site: DEMO_SITES[index % DEMO_SITES.length],
        index,
      })),
    [],
  );

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;

    const touch = isOrbitTouch();

    const setEarthVars = (spin: number, scale: number, lift: number) => {
      const node = rotatorRef.current;
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
        setEarthVars(0, 1, 0);
        if (haloRef.current) haloRef.current.style.opacity = "0.5";
        if (madeRef.current) madeRef.current.style.opacity = "1";
        return;
      }

      const spin = raw * (touch ? 145 : 210);
      const scale = touch ? 0.88 + raw * 0.22 : 0.82 + raw * 0.28;
      const lift = raw * (touch ? 6 : 14);

      setEarthVars(spin, scale, lift);

      if (haloRef.current) {
        haloRef.current.style.opacity = (0.22 + raw * 0.58).toFixed(3);
        haloRef.current.style.setProperty("--halo-scale", (0.95 + raw * 0.28).toFixed(3));
      }

      if (madeRef.current) {
        const m = madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
        madeRef.current.style.transform = `scale(${(0.94 + m * 0.06).toFixed(3)})`;
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

            <div ref={rotatorRef} className="orbit-work-earth-rotator">
              <div className="orbit-work-earth-rings" aria-hidden="true">
                <span className="orbit-work-earth-ring is-1" />
                <span className="orbit-work-earth-ring is-2" />
                <span className="orbit-work-earth-ring is-3" />
              </div>

              <div className="orbit-work-earth-globe">
                <div className="orbit-work-earth-shell">
                  <div className="orbit-work-earth-ocean" aria-hidden="true" />
                  <div className="orbit-work-earth-gold-veil" aria-hidden="true" />
                  <div className="orbit-work-earth-shine" aria-hidden="true" />
                </div>

                <ul className="orbit-work-earth-mosaic">
                  {mosaicTiles.map((tile) => (
                    <li
                      key={`m-${tile.index}`}
                      className="orbit-work-earth-mosaic-pin"
                      style={
                        {
                          "--pin-lat": tile.pos.lat,
                          "--pin-lng": tile.pos.lng,
                        } as CSSProperties
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tile.image} alt="" className="orbit-work-earth-mosaic-img" loading="lazy" />
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="orbit-work-earth-floats">
                {floaters.map(({ pos, site, index }) => (
                  <li
                    key={site.id}
                    className="orbit-work-earth-float-pin"
                    style={
                      {
                        "--pin-lat": pos.lat,
                        "--pin-lng": pos.lng,
                        "--float-i": index,
                      } as CSSProperties
                    }
                  >
                    <div className="orbit-work-earth-float">
                      <div className="orbit-work-earth-browser-chrome">
                        <span className="orbit-work-earth-browser-dots" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="orbit-work-earth-browser-url">{site.host}</span>
                      </div>
                      <DemoWebsite site={site} />
                    </div>
                  </li>
                ))}
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
