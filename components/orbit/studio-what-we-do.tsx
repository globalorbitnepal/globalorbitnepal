"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import {
  WORK_TILE_SLOTS,
  workTileBySlot,
  type WorkConfig,
  type WorkTile,
} from "@/lib/work-config";

function Chrome({ title }: { title: string }) {
  return (
    <div className="orbit-work-chrome">
      <span className="orbit-work-dot" />
      <span className="orbit-work-dot is-amber" />
      <span className="orbit-work-dot is-green" />
      <p>{title}</p>
    </div>
  );
}

function PhoneBar({ time }: { time: string }) {
  return (
    <div className="orbit-work-phonebar">
      <span>{time}</span>
      <span className="orbit-work-phonebar-notch" />
      <span>5G</span>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeIn(t: number) {
  return t ** 3;
}

function isPhoneTile(tile: WorkTile) {
  return tile.type === "phone-screen" || tile.type === "phone-app";
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const frameRef = useRef(0);

  const tiles = useMemo(
    () => WORK_TILE_SLOTS.map((slot) => workTileBySlot(config, slot)),
    [config],
  );
  const count = tiles.length;

  useEffect(() => {
    tiles.forEach((tile) => {
      const src = tile.imageSrc || "/brand/work/summit-seek.jpg";
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [tiles]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      if (!track) return;
      const touch = isOrbitTouch();

      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      const global = raw * count;

      track.classList.toggle("is-work-scrolling", raw > 0.01 && raw < 0.99);

      tiles.forEach((_, index) => {
        const slide = slideRefs.current[index];
        const meta = metaRefs.current[index];
        const dot = dotRefs.current[index];
        const t = global - index;

        if (reduce) {
          const active = index === 0;
          if (slide) {
            slide.style.opacity = active ? "1" : "0";
            slide.style.transform = "translate3d(0, 0, 0) rotateX(0deg) scale3d(1, 1, 1)";
            slide.style.zIndex = active ? "5" : "1";
          }
          if (meta) meta.style.opacity = active ? "1" : "0";
          if (dot) dot.classList.toggle("is-active", active);
          return;
        }

        let opacity = 0;
        let scale = 0.52;
        let rotX = 26;
        let tz = -520;
        let zIndex = 1;

        if (t < -0.15) {
          opacity = 0;
        } else if (t < 0.32) {
          const p = easeOut((t + 0.15) / 0.47);
          opacity = p;
          scale = 0.52 + p * 0.54;
          rotX = 26 * (1 - p);
          tz = -520 + p * 520;
          zIndex = 4 + index;
        } else if (t < 0.68) {
          opacity = 1;
          scale = 1.06;
          rotX = 0;
          tz = 0;
          zIndex = 12 + index;
        } else if (t < 1.15) {
          const p = easeIn((t - 0.68) / 0.47);
          opacity = 1 - p;
          scale = 1.06 + p * 0.38;
          rotX = touch ? 0 : -14 * p;
          tz = touch ? 0 : -280 * p;
          zIndex = 10 - index;
        } else {
          opacity = 0;
          scale = 1.44;
        }

        if (slide) {
          const enterLift = t < 0.32 ? (1 - easeOut((t + 0.15) / 0.47)) * (touch ? 22 : 40) : 0;
          const exitLift = t > 0.68 ? easeIn(clamp((t - 0.68) / 0.47, 0, 1)) * (touch ? -18 : -32) : 0;
          const ty = enterLift + exitLift;
          const rx = touch ? 0 : rotX;
          const z = touch ? 0 : tz;
          slide.style.opacity = String(opacity);
          slide.style.transform = `translate3d(0, ${ty.toFixed(2)}px, ${z.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
          slide.style.zIndex = String(zIndex);
          slide.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
          slide.classList.toggle("is-work-active", t >= 0.28 && t <= 0.72);
        }

        if (meta) {
          let metaIn = 0;
          if (t >= 0.3 && t <= 0.7) metaIn = 1;
          else if (t < 0.3) metaIn = easeOut(clamp((t + 0.08) / 0.38, 0, 1));
          else metaIn = 1 - easeIn(clamp((t - 0.7) / 0.38, 0, 1));
          meta.style.opacity = String(clamp(metaIn, 0, 1));
          meta.style.transform = `translate3d(0, ${((1 - metaIn) * 18).toFixed(1)}px, 0)`;
        }

        if (dot) dot.classList.toggle("is-active", t >= 0.28 && t <= 0.72);
      });
    };

    return bindOrbitScroll(trackRef.current, apply, frameRef);
  }, [count, tiles]);

  return (
    <section
      ref={trackRef}
      className="orbit-work-track"
      aria-labelledby="what-we-do-heading"
      style={{ "--work-slides": count } as CSSProperties}
    >
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

        <div className="orbit-work-stage">
          {tiles.map((tile, index) => {
            const phone = isPhoneTile(tile);
            const src = tile.imageSrc || "/brand/work/summit-seek.jpg";
            return (
              <div
                key={tile.slot}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                className="orbit-work-slide"
              >
                <div className={`orbit-work-device${phone ? " is-phone" : " is-desktop"}`}>
                  {phone ? (
                    <PhoneBar time={tile.phoneTime || "09:41"} />
                  ) : (
                    <Chrome title={tile.chromeTitle || tile.title || "website"} />
                  )}
                  <div className="orbit-work-shot-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="orbit-work-shot"
                      src={src}
                      alt={tile.title || tile.chromeTitle || "Project preview"}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                </div>
                <div
                  ref={(node) => {
                    metaRefs.current[index] = node;
                  }}
                  className="orbit-work-meta"
                >
                  <p className="orbit-work-meta-title">{tile.title || tile.chromeTitle}</p>
                  {tile.subtitle ? <p className="orbit-work-meta-sub">{tile.subtitle}</p> : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="orbit-work-foot" aria-hidden="true">
          <div className="orbit-work-dots">
            {tiles.map((tile, index) => (
              <span
                key={tile.slot}
                ref={(node) => {
                  dotRefs.current[index] = node;
                }}
                className="orbit-work-dot"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
