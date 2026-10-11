"use client";

import { useState } from "react";
import type { SoftwareFaqItem } from "@/lib/software-product-types";

export function SoftwareProductFaq({ items }: { items: readonly SoftwareFaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="orbit-faq orbit-sw-product-faq">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <article key={item.q} className={`orbit-faq-item${expanded ? " is-open" : ""}`}>
            <button
              type="button"
              className="orbit-faq-trigger"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span className="orbit-faq-q">{item.q}</span>
              <span className="orbit-faq-toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <div className="orbit-faq-answer">
              <p>{item.a}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
