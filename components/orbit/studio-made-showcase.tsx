"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { ORBIT_PORTFOLIO_SHOWCASE } from "@/lib/portfolio-showcase";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeIn(t: number) {
  return t ** 3;
}

export function OrbitStudioMadeShowcase() {
  const trackRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const frameRef = useRef(0);
  const count = ORBIT_PORTFOLIO_SHOWCASE.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      if (!track) return;

      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      const global = raw * count;

      ORBIT_PORTFOLIO_SHOWCASE.forEach((_, index) => {
        const slide = slideRefs.current[index];
        const meta = metaRefs.current[index];
        const dot = dotRefs.current[index];
        const t = global - index;

        if (reduce) {
          const active = index === 0;
          if (slide) {
            slide.style.opacity = active ? "1" : "0";
            slide.style.transform = "translate3d(0, 0, 0) rotateX(0deg) scale3d(1, 1, 1)";
            slide.style.zIndex = active ? "3" : "1";
          }
          if (meta) meta.style.opacity = active ? "1" : "0";
          if (dot) dot.classList.toggle("is-active", active);
          return;
        }

        let opacity = 0;
        let scale = 0.7;
        let rotX = 22;
        let tz = -420;
        let zIndex = 1;

        if (t < -0.2) {
          opacity = 0;
          scale = 0.68;
          rotX = 24;
          tz = -460;
        } else if (t < 0.34) {
          const p = easeOut((t + 0.2) / 0.54);
          opacity = p;
          scale = 0.68 + p * 0.32;
          rotX = 24 * (1 - p);
          tz = -460 + p * 460;
          zIndex = 2 + index;
        } else if (t < 0.66) {
          opacity = 1;
          scale = 1;
          rotX = 0;
          tz = 0;
          zIndex = 10 + index;
        } else if (t < 1.2) {
          const p = easeIn((t - 0.66) / 0.54);
          opacity = 1 - p * 0.92;
          scale = 1 + p * 0.22;
          rotX = -18 * p;
          tz = -320 * p;
          zIndex = 8 - index;
        } else {
          opacity = 0;
          scale = 1.18;
          rotX = -18;
          tz = -320;
        }

        if (slide) {
          slide.style.opacity = String(opacity);
          slide.style.transform = `translate3d(0, ${t > 0.66 ? easeIn(clamp((t - 0.66) / 0.54, 0, 1)) * -24 : t < 0.34 ? (1 - easeOut((t + 0.2) / 0.54)) * 32 : 0}px, ${tz}px) rotateX(${rotX}deg) scale3d(${scale}, ${scale}, 1)`;
          slide.style.zIndex = String(zIndex);
          slide.style.pointerEvents = opacity > 0.35 ? "auto" : "none";
        }

        if (meta) {
          let metaIn = 0;
          if (t >= 0.28 && t <= 0.72) metaIn = 1;
          else if (t < 0.28) metaIn = easeOut(clamp((t + 0.05) / 0.33, 0, 1));
          else metaIn = 1 - easeIn(clamp((t - 0.72) / 0.35, 0, 1));
          meta.style.opacity = String(clamp(metaIn, 0, 1));
          meta.style.transform = `translate3d(0, ${(1 - clamp(metaIn, 0, 1)) * 16}px, 0)`;
        }

        if (dot) {
          dot.classList.toggle("is-active", t >= 0.25 && t <= 0.75);
        }
      });
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [count]);

  return (
    <section
      ref={trackRef}
      className="orbit-made-track"
      aria-labelledby="made-heading"
      style={{ "--made-slides": count } as CSSProperties}
    >
      <div className="orbit-made-pin">
        <header className="orbit-made-head">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">6</span>
            Made at Global Orbit
          </p>
          <h2 id="made-heading" className="orbit-made-title">
            Crafted with purpose, <span>driven by results.</span>
          </h2>
        </header>

        <div className="orbit-made-stage">
          {ORBIT_PORTFOLIO_SHOWCASE.map((item, index) => (
            <div
              key={item.image}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className="orbit-made-slide"
            >
              <div className="orbit-made-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="orbit-made-shot" loading={index < 2 ? "eager" : "lazy"} />
              </div>
              <div
                ref={(node) => {
                  metaRefs.current[index] = node;
                }}
                className="orbit-made-meta"
              >
                <p className="orbit-made-sector">{item.sector}</p>
                <p className="orbit-made-name">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="orbit-made-foot">
          <div className="orbit-made-dots" aria-hidden="true">
            {ORBIT_PORTFOLIO_SHOWCASE.map((item, index) => (
              <span
                key={item.image}
                ref={(node) => {
                  dotRefs.current[index] = node;
                }}
                className="orbit-made-dot"
              />
            ))}
          </div>
          <Link href="/projects" className="orbit-made-cta">
            Visit the full portfolio
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
