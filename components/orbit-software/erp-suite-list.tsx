"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ErpProductShot } from "@/components/orbit-software/erp-product-shot";
import { ERP_SUITES } from "@/lib/orbit-software-page";

export function ErpSuiteList() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stackRef.current;
    if (!root) return;
    const rows = root.querySelectorAll(".erp-suite-row");
    if (!("IntersectionObserver" in window)) {
      rows.forEach((row) => row.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );
    rows.forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  return (
    <section className="erp-suites px-4 sm:px-6 lg:px-8" aria-labelledby="erp-suites-heading">
      <div className="mx-auto max-w-[88rem]">
        <header className="mb-10 text-center lg:mb-14">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">12</span>
            Product lines
          </p>
          <h2 id="erp-suites-heading" className="orbit-projects-portfolio-title">
            Live operator software — <span>on a real screen</span>
          </h2>
          <p className="orbit-projects-portfolio-lede mx-auto">
            Full product dashboards in laptop and phone frames — uncropped, 16:9-clear, and sized for every device.
          </p>
        </header>

        <div ref={stackRef} className="erp-suite-stack">
          {ERP_SUITES.map((suite, index) => (
            <article key={suite.slug} className={`erp-suite-row ${index % 2 === 1 ? "is-flip" : ""}`}>
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
                <ErpProductShot suite={suite} priority={index < 2} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
