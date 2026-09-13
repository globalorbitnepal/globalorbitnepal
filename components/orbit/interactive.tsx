"use client";

import { useState } from "react";
import { ORBIT_FAQS, ORBIT_TESTIMONIALS } from "@/lib/orbit/catalog";

export function OrbitFaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10">
      {ORBIT_FAQS.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              {item.q}
              <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            {expanded ? <p className="px-5 pb-4 text-sm leading-7 text-white/70">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

export function OrbitTestimonials() {
  const [index, setIndex] = useState(0);
  const item = ORBIT_TESTIMONIALS[index];

  return (
    <div className="orbit-card mx-auto max-w-3xl rounded-3xl px-8 py-10 text-center">
      <p className="text-lg leading-8 text-white">&ldquo; {item.quote} &rdquo;</p>
      <p className="mt-6 text-sm font-semibold text-[#f0c43a]">
        {item.name} · {item.place}
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <button type="button" className="rounded-full border border-white/20 px-3 py-1 text-xs" aria-label="Previous" onClick={() => setIndex((value) => (value === 0 ? ORBIT_TESTIMONIALS.length - 1 : value - 1))}>
          Prev
        </button>
        {ORBIT_TESTIMONIALS.map((entry, i) => (
          <button
            key={entry.name}
            type="button"
            aria-label={`Testimonial ${i + 1}`}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-[#f0c43a]" : "bg-white/30"}`}
            onClick={() => setIndex(i)}
          />
        ))}
        <button type="button" className="rounded-full border border-white/20 px-3 py-1 text-xs" aria-label="Next" onClick={() => setIndex((value) => (value + 1) % ORBIT_TESTIMONIALS.length)}>
          Next
        </button>
      </div>
    </div>
  );
}
