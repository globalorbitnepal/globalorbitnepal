"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ORBIT_PROCESS } from "@/lib/orbit/catalog";

const ACCENTS = ["#60a5fa", "#818cf8", "#c084fc", "#f0c43a", "#34d399", "#fb7185"];

function SlideLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="orbit-process-line" style={{ transitionDelay: `${delay}ms` }}>
      <span className="orbit-process-slide">{text}</span>
    </span>
  );
}

export function OrbitStudioProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="orbit-process-section orbit-studio-surface relative overflow-hidden px-4 pb-[clamp(3rem,6vh,4.5rem)] sm:px-8"
      aria-labelledby="process-heading"
    >
      <div className="orbit-process-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px]">
        <header className="orbit-process-head mx-auto max-w-3xl text-center">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">5</span>
            Smooth journey
          </p>
          <h2 id="process-heading" className="orbit-process-title">
            <SlideLine text="From idea to launch" delay={80} />
            <SlideLine text="— then we stay." delay={220} />
          </h2>
          <p className="orbit-process-lede">
            <span className="orbit-process-line" style={{ transitionDelay: "360ms" }}>
              <span className="orbit-process-slide">
                Strategy, design, build, SEO, and support — one team from first call to long after go-live.
              </span>
            </span>
          </p>
        </header>

        <div className="orbit-process-rail" aria-hidden="true">
          <span className="orbit-process-rail-fill" />
        </div>

        <ol className="orbit-process-grid">
          {ORBIT_PROCESS.map((item, index) => {
            const accent = ACCENTS[index % ACCENTS.length];
            return (
              <li
                key={item.title}
                className="orbit-process-step"
                style={
                  {
                    "--step-accent": accent,
                    "--step-i": index,
                  } as CSSProperties
                }
              >
                <article className="orbit-process-card">
                  <div className="orbit-process-card-top">
                    <span className="orbit-process-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="orbit-process-dot" />
                  </div>
                  <h3 className="orbit-process-card-title">
                    <span className="orbit-process-line" style={{ transitionDelay: `${520 + index * 90}ms` }}>
                      <span className="orbit-process-slide">{item.title}</span>
                    </span>
                  </h3>
                  <p className="orbit-process-card-body">
                    <span className="orbit-process-line" style={{ transitionDelay: `${590 + index * 90}ms` }}>
                      <span className="orbit-process-slide">{item.body}</span>
                    </span>
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
