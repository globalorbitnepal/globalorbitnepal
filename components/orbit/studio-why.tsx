"use client";

import { useEffect, useState } from "react";

const REASONS = [
  {
    title: "Valuing your time",
    body: "Clear scopes, named owners, and no silent weeks. You always know what ships next — with written weekly status, realistic dates, and a single point of contact who can answer without forwarding you around.",
  },
  {
    title: "Partnering in your success",
    body: "We stay after launch. SEO, fixes, content updates, and product iteration sit in the same company — not a handoff to a faceless support queue. Your roadmap and our engineering calendar stay aligned quarter to quarter.",
  },
  {
    title: "Delivering high-quality results",
    body: "Fast pages, accessible UI, and production-grade apps. Craft is the default: performance budgets, responsive layouts, and code you can hand to another team without embarrassment.",
  },
  {
    title: "Providing clear communication",
    body: "WhatsApp, email, Slack, or your stack — you choose. We document decisions, share staging links early, and flag risk before it becomes a surprise invoice or a missed season.",
  },
  {
    title: "Using the latest technology",
    body: "Next.js, React Native, Laravel, Node, and search systems chosen for the job — not a trend slide. We adopt tools when they reduce risk for your users, not when they look good in a pitch deck.",
  },
  {
    title: "Focusing on scalability",
    body: "Websites, apps, and SEO programmes designed to grow with traffic, markets, and teams. Architecture, hosting, and content structure are planned so the next country or product line does not mean a rebuild.",
  },
] as const;

export function OrbitStudioWhy() {
  const [active, setActive] = useState(0);
  const item = REASONS[active];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % REASONS.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="orbit-why">
      <div className="orbit-why-layout">
        <nav className="orbit-why-nav" aria-label="Why choose Global Orbit">
          <ol className="orbit-why-tabs">
            {REASONS.map((reason, index) => {
              const isActive = active === index;
              return (
                <li key={reason.title}>
                  <button
                    type="button"
                    className={`orbit-why-tab${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setActive(index)}
                  >
                    <span className="orbit-why-tab-num">0{index + 1}</span>
                    <span className="orbit-why-tab-label">{reason.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <article key={active} className="orbit-why-panel">
          <div className="orbit-why-panel-shine" aria-hidden="true" />
          <p className="orbit-why-kicker">Why Global Orbit</p>
          <h3 className="orbit-why-title">{item.title}</h3>
          <p className="orbit-why-body">{item.body}</p>
          <div className="orbit-why-progress" aria-hidden="true">
            <span className="orbit-why-progress-fill" style={{ width: `${((active + 1) / REASONS.length) * 100}%` }} />
          </div>
        </article>
      </div>
    </div>
  );
}
