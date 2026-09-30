"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { OrbitFlag } from "@/components/orbit/flags";

const SALES_OFFICES = [
  {
    code: "np",
    country: "Nepal",
    city: "Kathmandu",
    landmark: "Famous heritage · Kathmandu",
    image: "/brand/offices/nepal.jpg",
  },
  {
    code: "in",
    country: "India",
    city: "Delhi (NCR)",
    landmark: "India Gate",
    image: "/brand/offices/india.jpg",
  },
  {
    code: "us",
    country: "USA",
    city: "United States",
    landmark: "Statue of Liberty · New York",
    image: "/brand/offices/usa.jpg",
  },
] as const;

function tiltFromEvent(node: HTMLElement, event: MouseEvent<HTMLElement>) {
  const rect = node.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  node.style.setProperty("--office-tilt-x", `${(-y * 10).toFixed(2)}deg`);
  node.style.setProperty("--office-tilt-y", `${(x * 12).toFixed(2)}deg`);
  node.style.setProperty("--office-lift", "10px");
}

function resetTilt(node: HTMLElement) {
  node.style.setProperty("--office-tilt-x", "0deg");
  node.style.setProperty("--office-tilt-y", "0deg");
  node.style.setProperty("--office-lift", "0px");
}

export function OrbitOfficesSection() {
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
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="orbit-offices-section relative isolate overflow-hidden px-4 py-[clamp(3rem,7vh,4.5rem)] sm:px-6 lg:px-8"
      aria-labelledby="offices-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/brand/offices/world-bg.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.16),transparent_55%),linear-gradient(180deg,rgba(4,8,18,0.72),rgba(4,8,18,0.9))]" />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-[1180px]">
        <header className="orbit-offices-head mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">7</span>
            3 sales offices
          </p>
          <h2 id="offices-heading" className="orbit-offices-title">
            Nepal, India &amp; the United States
          </h2>
          <p className="orbit-offices-lede">
            Three sales offices on three continents — same premium delivery, local time zones, and on-the-ground support.
          </p>
        </header>

        <ul className="orbit-offices-grid">
          {SALES_OFFICES.map((office, index) => (
            <li
              key={office.code}
              className="orbit-offices-item"
              style={{ "--office-i": index } as CSSProperties}
            >
              <article
                className="orbit-offices-card group"
                onMouseMove={(event) => tiltFromEvent(event.currentTarget, event)}
                onMouseLeave={(event) => resetTilt(event.currentTarget)}
              >
                <div className="orbit-offices-visual">
                  <Image
                    src={office.image}
                    alt={office.landmark}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700"
                  />
                  <div className="orbit-offices-visual-veil" />
                  <div className="orbit-offices-flag">
                    <OrbitFlag code={office.code} name={office.country} hd variant="hero" />
                  </div>
                </div>
                <div className="orbit-offices-copy">
                  <p className="orbit-offices-landmark">{office.landmark}</p>
                  <h3 className="orbit-offices-country">{office.country}</h3>
                  <p className="orbit-offices-city">{office.city}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
