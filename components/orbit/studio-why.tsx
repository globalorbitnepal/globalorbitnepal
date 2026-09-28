"use client";

import { useState } from "react";

const REASONS = [
  {
    title: "Valuing your time",
    body: "Clear scopes, named owners, and no silent weeks. You always know what ships next.",
  },
  {
    title: "Partnering in your success",
    body: "We stay after launch — SEO, fixes, and product iteration sit in the same company.",
  },
  {
    title: "Delivering high-quality results",
    body: "Fast pages, accessible UI, and production-grade apps. Craft is the default, not an upsell.",
  },
  {
    title: "Providing clear communication",
    body: "WhatsApp, email, or your stack. Weekly status in writing. No black-box agencies.",
  },
  {
    title: "Using the latest technology",
    body: "Next.js, React Native, Laravel, Node, and search systems chosen for the job — not a trend slide.",
  },
  {
    title: "Focusing on scalability",
    body: "Websites, apps, and SEO programmes designed to grow with traffic, markets, and teams.",
  },
] as const;

export function OrbitStudioWhy() {
  const [active, setActive] = useState(0);
  const item = REASONS[active];

  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[280px_1fr] lg:gap-14">
      <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {REASONS.map((reason, index) => (
          <li key={reason.title} className="shrink-0">
            <button
              type="button"
              className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-[13px] font-semibold transition-colors lg:rounded-2xl ${
                active === index
                  ? "bg-white text-[#0b0b10]"
                  : "orbit-studio-glass text-white/80 hover:text-white"
              }`}
              onClick={() => setActive(index)}
            >
              <span className="tabular-nums text-[11px] opacity-70">0{index + 1}</span>
              {reason.title}
            </button>
          </li>
        ))}
      </ol>
      <article className="orbit-studio-glass rounded-[28px] p-8 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f0c43a]">Why Global Orbit</p>
        <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight">
          {item.title}
        </h3>
        <p className="mt-5 max-w-xl text-[16px] leading-8 text-white/70">{item.body}</p>
      </article>
    </div>
  );
}
