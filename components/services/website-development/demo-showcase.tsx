"use client";

import { useEffect, useRef } from "react";
import type { WebsiteDevDemo } from "@/lib/website-development-config";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import { WebsiteDemoBrowser } from "@/components/services/website-development/demo-browser";
import { DEMO_COMPONENTS } from "@/components/services/website-development/demo-templates";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

const DEMO_URLS: Record<string, string> = {
  "summit-lodge": "summitlodge.np",
  trailhead: "trailheadexpeditions.com",
  "ember-slate": "emberandslate.com",
  norwood: "norwoodatelier.com",
  "pulse-metrics": "pulsemetrics.io",
  "haven-spa": "havenspa.com.np",
};

type Header = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
};

export function WebsiteDevDemoShowcase({ demos, header }: { demos: WebsiteDevDemo[]; header: Header }) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const touch = isOrbitTouch();
      const vh = window.innerHeight;

      demos.forEach((_, index) => {
        const row = rowRefs.current[index];
        const frame = frameRefs.current[index];
        const copy = copyRefs.current[index];
        if (!row) return;

        if (reduce) {
          if (frame) frame.style.transform = "scale(1)";
          if (copy) copy.style.opacity = "1";
          return;
        }

        const rect = row.getBoundingClientRect();
        const focal = rect.top + rect.height * 0.4;
        const dist = Math.abs(focal - vh * 0.46);
        const t = smoothstep(1 - dist / (vh * 0.55));
        const scale = 0.92 + t * 0.08;
        const lift = (1 - t) * (touch ? 10 : 20);

        if (frame) {
          frame.style.transform = `translate3d(0, ${lift * 0.4}px, 0) scale(${scale})`;
        }
        if (copy) {
          copy.style.opacity = String(0.5 + t * 0.5);
          copy.style.transform = `translate3d(0, ${(1 - t) * 16}px, 0)`;
        }
      });
    };

    return bindOrbitScroll(sectionRef.current, apply, frameId);
  }, [demos]);

  return (
    <section
      ref={sectionRef}
      className="orbit-wd-demos px-4 sm:px-6 lg:px-8"
      aria-labelledby="wd-demos-heading"
    >
      <div className="mx-auto max-w-[76rem]">
        <header className="orbit-projects-portfolio-head mb-10 text-center lg:mb-12">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">{String(demos.length).padStart(2, "0")}</span>
            {header.eyebrow}
          </p>
          <h2 id="wd-demos-heading" className="orbit-projects-portfolio-title">
            {header.title} <span>{header.titleAccent}</span>
          </h2>
          <p className="orbit-projects-portfolio-lede mx-auto">{header.lede}</p>
        </header>

        <div className="orbit-wd-demo-list">
          {demos.map((demo, index) => {
            const Demo = DEMO_COMPONENTS[demo.id];
            const flip = index % 2 === 1;
            return (
              <article
                key={demo.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className={`orbit-wd-demo-row ${flip ? "is-flip" : ""}`}
              >
                <div
                  ref={(el) => {
                    copyRefs.current[index] = el;
                  }}
                  className="orbit-wd-demo-copy"
                >
                  <p className="orbit-wd-demo-index">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="orbit-wd-demo-brand">{demo.brand}</h3>
                  <p className="orbit-wd-demo-tagline">{demo.tagline}</p>
                  <p className="orbit-wd-demo-story">{demo.story}</p>
                  <ul className="orbit-wd-demo-bullets">
                    {demo.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="orbit-wd-demo-stack">
                    {demo.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div
                  ref={(el) => {
                    frameRefs.current[index] = el;
                  }}
                  className="orbit-wd-demo-frame"
                >
                  <WebsiteDemoBrowser url={DEMO_URLS[demo.id] ?? "demo.test"}>
                    {Demo ? <Demo /> : null}
                  </WebsiteDemoBrowser>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
