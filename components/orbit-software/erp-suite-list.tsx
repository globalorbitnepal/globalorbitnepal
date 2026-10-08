"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ErpConsole } from "@/components/orbit-software/erp-console";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import { ERP_SUITES } from "@/lib/orbit-software-page";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function ErpSuiteList() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const frameId = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => {
      const vh = window.innerHeight;
      const touch = isOrbitTouch();
      rowRefs.current.forEach((row) => {
        if (!row) return;
        if (reduce) {
          row.style.opacity = "1";
          row.style.transform = "none";
          return;
        }
        const rect = row.getBoundingClientRect();
        const mid = rect.top + rect.height * 0.42;
        const t = smoothstep(1 - Math.abs(mid - vh * 0.48) / (vh * 0.62));
        row.style.opacity = String(0.42 + t * 0.58);
        row.style.transform = `translate3d(0, ${(1 - t) * (touch ? 12 : 22)}px, 0)`;
      });
    };
    return bindOrbitScroll(sectionRef.current, apply, frameId);
  }, []);

  return (
    <section ref={sectionRef} className="erp-suites px-4 sm:px-6 lg:px-8" aria-labelledby="erp-suites-heading">
      <div className="mx-auto max-w-[76rem]">
        <header className="mb-10 text-center lg:mb-14">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">12</span>
            Product lines
          </p>
          <h2 id="erp-suites-heading" className="orbit-projects-portfolio-title">
            Replace the old catalog boxes with <span>working consoles</span>
          </h2>
          <p className="orbit-projects-portfolio-lede mx-auto">
            Each row is a coded operator surface — not a homepage video, not a three-column card dump.
          </p>
        </header>

        <div className="erp-suite-stack">
          {ERP_SUITES.map((suite, index) => (
            <article
              key={suite.slug}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className={`erp-suite-row ${index % 2 === 1 ? "is-flip" : ""}`}
            >
              <div className="erp-suite-copy">
                <p className="erp-suite-index">
                  {suite.index} · {suite.kicker}
                </p>
                <h3>{suite.title}</h3>
                <p>{suite.body}</p>
                <ul>
                  {suite.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link href={suite.href} className="erp-suite-link">
                  Open product
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="erp-suite-stage">
                <ErpConsole suite={suite} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
