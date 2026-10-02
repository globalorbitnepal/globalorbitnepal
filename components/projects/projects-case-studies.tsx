"use client";

import { useEffect, useRef } from "react";
import type { ProjectShowcase } from "@/lib/projects-config";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

const PROJECT_TAGS: Record<string, string[]> = {
  "first-choice-interior": ["Next.js", "Lead forms", "Interior UX"],
  "aakash-bhairab-travels": ["OTA search", "Trust badges", "Multi-destination"],
  "kaya-healing-spa": ["Spa booking", "Service grid", "Mobile-first"],
  "marlo-hotels": ["Hotel booking", "Availability UI", "Premium lobby"],
  "thamel-spa-wellness": ["Wellness CTA", "Gold brand", "Local SEO"],
  "zen-spa-healing": ["Dual hero CTA", "Packages", "Performance"],
  "thamel-park-hotel": ["Booking widget", "Room flows", "Hospitality"],
  "ambition-holidays": ["Trek catalog", "Reviews", "Adventure SEO"],
  "summit-seek-himalaya": ["Expeditions", "Ethical travel", "Global CDN"],
};

type Header = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
};

type Props = {
  showcases: ProjectShowcase[];
  header: Header;
};

export function ProjectsCaseStudies({ showcases, header }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shotRefs = useRef<(HTMLImageElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const touch = isOrbitTouch();
      const vh = window.innerHeight;

      showcases.forEach((_, index) => {
        const row = rowRefs.current[index];
        const frame = frameRefs.current[index];
        const shot = shotRefs.current[index];
        const copy = copyRefs.current[index];
        if (!row) return;

        if (reduce) {
          if (frame) frame.style.transform = "scale(1)";
          if (shot) shot.style.transform = "scale(1.02)";
          if (copy) copy.style.opacity = "1";
          return;
        }

        const rect = row.getBoundingClientRect();
        const focal = rect.top + rect.height * 0.42;
        const dist = Math.abs(focal - vh * 0.46);
        const t = smoothstep(1 - dist / (vh * 0.52));
        const scale = 0.9 + t * 0.1;
        const imgScale = 1.18 - t * 0.14;
        const lift = (1 - t) * (touch ? 12 : 22);

        if (frame) {
          frame.style.transform = `translate3d(0, ${lift * 0.35}px, 0) scale(${scale})`;
          frame.style.boxShadow = `0 ${24 + t * 32}px ${60 + t * 40}px rgba(0,0,0,${0.45 + t * 0.15}), 0 0 ${40 + t * 50}px rgba(240,196,58,${0.04 + t * 0.08})`;
        }
        if (shot) {
          shot.style.transform = `scale(${imgScale})`;
        }
        if (copy) {
          copy.style.opacity = String(0.55 + t * 0.45);
          copy.style.transform = `translate3d(0, ${(1 - t) * 14}px, 0)`;
        }
      });
    };

    return bindOrbitScroll(sectionRef.current, apply, frameId);
  }, [showcases]);

  function scrollToCase(index: number) {
    rowRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section ref={sectionRef} className="orbit-projects-portfolio px-4 sm:px-6 lg:px-8" aria-labelledby="projects-portfolio-heading">
      <div className="mx-auto max-w-[76rem]">
        <header className="orbit-projects-portfolio-head text-center">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">{String(showcases.length).padStart(2, "0")}</span>
            {header.eyebrow}
          </p>
          <h2 id="projects-portfolio-heading" className="orbit-projects-portfolio-title">
            {header.title} <span>{header.titleAccent}</span>
          </h2>
          <p className="orbit-projects-portfolio-lede mx-auto">{header.lede}</p>
        </header>

        <div className="orbit-projects-mosaic" aria-label="Jump to project">
          {showcases.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className="orbit-projects-mosaic-cell"
              onClick={() => scrollToCase(index)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageSrc} alt="" className="orbit-projects-mosaic-img" loading="lazy" />
              <span className="orbit-projects-mosaic-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="orbit-projects-mosaic-label">{item.title}</span>
            </button>
          ))}
        </div>

        <ol className="orbit-projects-cases">
          {showcases.map((item, index) => {
            const tags = PROJECT_TAGS[item.slug] ?? ["Next.js", "SEO", "CMS"];
            const flip = index % 2 === 1;
            return (
              <li
                key={item.slug}
                id={`project-${item.slug}`}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                className={`orbit-projects-case ${flip ? "is-flip" : ""}`}
              >
                <div
                  ref={(node) => {
                    copyRefs.current[index] = node;
                  }}
                  className="orbit-projects-case-copy"
                >
                  <p className="orbit-projects-case-index">{String(index + 1).padStart(2, "0")}</p>
                  <p className="orbit-made-sector text-left">{item.category}</p>
                  <h3 className="orbit-projects-case-title">{item.title}</h3>
                  <p className="orbit-projects-case-sub">{item.subtitle}</p>
                  <ul className="orbit-projects-case-tags">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>

                <div
                  ref={(node) => {
                    frameRefs.current[index] = node;
                  }}
                  className="orbit-projects-case-frame orbit-projects-frame"
                >
                  <div className="orbit-projects-chrome" aria-hidden="true">
                    <span className="orbit-projects-chrome-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="orbit-projects-chrome-url">{item.chromeUrl}</span>
                  </div>
                  <div className="orbit-projects-case-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={(node) => {
                        shotRefs.current[index] = node;
                      }}
                      src={item.imageSrc}
                      alt={`${item.title} — website preview`}
                      className="orbit-projects-case-shot"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
