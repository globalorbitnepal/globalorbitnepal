"use client";

import { useState } from "react";
import { ORBIT_FAQS, ORBIT_TESTIMONIALS } from "@/lib/orbit/catalog";

export function OrbitFaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="orbit-faq">
      {ORBIT_FAQS.map((item, index) => {
        const expanded = open === index;
        return (
          <article key={item.q} className={`orbit-faq-item${expanded ? " is-open" : ""}`}>
            <button
              type="button"
              className="orbit-faq-trigger"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="orbit-faq-q">{item.q}</span>
              <span className="orbit-faq-toggle" aria-hidden="true">
                {expanded ? "−" : "+"}
              </span>
            </button>
            {expanded ? (
              <div className="orbit-faq-answer">
                <p>{item.a}</p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function OrbitTestimonials() {
  const [index, setIndex] = useState(0);
  const item = ORBIT_TESTIMONIALS[index];

  const go = (delta: number) => {
    setIndex((value) => (value + delta + ORBIT_TESTIMONIALS.length) % ORBIT_TESTIMONIALS.length);
  };

  return (
    <div className="orbit-reviews">
      <div className="orbit-reviews-shell">
        <span className="orbit-reviews-quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote key={index} className="orbit-reviews-quote">
          <p>{item.quote}</p>
        </blockquote>
        <footer className="orbit-reviews-meta">
          <cite className="orbit-reviews-name">{item.name}</cite>
          <span className="orbit-reviews-place">{item.place}</span>
        </footer>
      </div>

      <div className="orbit-reviews-controls">
        <button type="button" className="orbit-reviews-arrow" aria-label="Previous review" onClick={() => go(-1)}>
          ←
        </button>
        <div className="orbit-reviews-dots" role="tablist" aria-label="Reviews">
          {ORBIT_TESTIMONIALS.map((entry, i) => (
            <button
              key={`${entry.name}-${entry.place}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Review ${i + 1} of ${ORBIT_TESTIMONIALS.length}`}
              className={`orbit-reviews-dot${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" className="orbit-reviews-arrow" aria-label="Next review" onClick={() => go(1)}>
          →
        </button>
      </div>
    </div>
  );
}
