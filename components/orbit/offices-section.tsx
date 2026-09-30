"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { OrbitFlag } from "@/components/orbit/flags";
import { ORBIT_BRAND } from "@/lib/orbit/brand";

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
      className="orbit-offices-section orbit-studio-surface relative isolate overflow-hidden px-4 py-[clamp(3rem,7vh,4.5rem)] sm:px-6 lg:px-8"
      aria-labelledby="offices-heading"
    >
      <div className="pointer-events-none absolute inset-0 orbit-studio-surface-glow" aria-hidden="true" />

      <div className="relative z-[1] mx-auto w-full max-w-[min(1180px,100%)] lg:max-w-[min(1480px,94vw)] xl:max-w-[min(1680px,92vw)]">
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
          {ORBIT_BRAND.salesOffices.map((office, index) => (
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
                  <div className="orbit-offices-contact">
                    <a href={office.phoneHref} className="orbit-offices-link">
                      <span className="orbit-offices-link-label">Phone</span>
                      {office.phone}
                    </a>
                    <a href={`mailto:${office.email}`} className="orbit-offices-link">
                      <span className="orbit-offices-link-label">Email</span>
                      {office.email}
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
