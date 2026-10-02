import Link from "next/link";
import type { ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import { CustomAppsProcessTimeline } from "@/components/orbit-software/custom-apps-process";
import type { CustomAppsConfig } from "@/lib/custom-apps-config";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

function GoldGradient({ children }: { children: ReactNode }) {
  return <span className="orbit-about-gold-text">{children}</span>;
}

const CAP_ICONS = ["◆", "◎", "▣", "◈", "⬡", "✦"];

export function CustomAppsPageView({ config }: { config: CustomAppsConfig }) {
  return (
    <main className="orbit-about-page orbit-custom-apps-page text-white">
      <section className="orbit-custom-apps-hero relative isolate px-4 pb-10 pt-[clamp(4.75rem,9vh,6rem)] sm:px-6 lg:px-8">
        <div className="orbit-about-hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="orbit-about-hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-[76rem]">
          <div className="mx-auto max-w-[54rem] text-center">
            <Badge>{config.heroEyebrow}</Badge>
            <h1 className="orbit-about-hero-title mt-5 font-[family-name:var(--font-jakarta)]">
              <span className="text-white">{config.heroTitleBefore} </span>
              <GoldGradient>{config.heroTitleAccent}</GoldGradient>
              <br />
              <span className="text-white/92">{config.heroTitleAfter}</span>
            </h1>
            <p className="orbit-about-hero-lede mx-auto mt-5 max-w-2xl">{config.heroLede}</p>
          </div>
          <div className="orbit-projects-hero-stats mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.stats.map((stat) => (
              <div key={stat.label} className="orbit-projects-stat-card orbit-custom-apps-stat">
                <p className="orbit-projects-stat-value">{stat.value}</p>
                <p className="orbit-projects-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story orbit-custom-apps-overview">
              <Badge>{config.overviewEyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-4">{config.overviewTitle}</h2>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-white/58 sm:text-lg">
                {config.overviewParagraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <header className="mb-8 text-center lg:mb-10">
            <Badge>{config.capabilitiesEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-4">
              {config.capabilitiesTitle} <GoldGradient>{config.capabilitiesTitleAccent}</GoldGradient>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/52 sm:text-base">{config.capabilitiesLede}</p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.capabilities.map((card, index) => (
              <AboutReveal key={card.title} delay={index * 60} className="h-full">
                <article className="orbit-custom-apps-cap-card h-full">
                  <span className="orbit-custom-apps-cap-icon" aria-hidden="true">
                    {CAP_ICONS[index % CAP_ICONS.length]}
                  </span>
                  <h3 className="orbit-custom-apps-cap-title">{card.title}</h3>
                  <p className="orbit-custom-apps-cap-body">{card.body}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-custom-apps-platforms">
              <div className="orbit-custom-apps-platforms-head">
                <Badge>{config.platformsEyebrow}</Badge>
                <h2 className="orbit-about-h3 mt-4 text-white">{config.platformsTitle}</h2>
              </div>
              <div className="orbit-custom-apps-platforms-grid">
                {config.platforms.map((item) => (
                  <article key={item.title} className="orbit-custom-apps-platform">
                    <h3 className="text-base font-bold text-[#f0c43a]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/52">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <header className="mb-8 text-center">
            <Badge>{config.useCasesEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-4">{config.useCasesTitle}</h2>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {config.useCases.map((item, index) => (
              <AboutReveal key={item.title} delay={index * 70}>
                <article className="orbit-custom-apps-use-case">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.body}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <header className="mb-8 text-center lg:mb-10">
            <Badge>{config.processEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-4">{config.processTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/52 sm:text-base">{config.processLede}</p>
          </header>
          <CustomAppsProcessTimeline steps={config.processSteps} />
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-projects-stack-band">
              <Badge>{config.stackEyebrow}</Badge>
              <h2 className="orbit-about-h3 mt-4 text-white">{config.stackTitle}</h2>
              <div className="orbit-projects-stack-grid mt-5">
                {config.stackItems.map((item) => (
                  <article key={item.title} className="orbit-projects-stack-item">
                    <p className="orbit-projects-stack-label">{item.title}</p>
                    <p className="orbit-projects-stack-detail">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[76rem] gap-4 lg:grid-cols-2">
          <AboutReveal>
            <div className="orbit-about-glass orbit-custom-apps-deliver h-full">
              <Badge>{config.deliverablesEyebrow}</Badge>
              <h2 className="orbit-about-h3 mt-4 text-white">{config.deliverablesTitle}</h2>
              <ul className="mt-5 space-y-2.5">
                {config.deliverablesBullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
          <AboutReveal delay={80}>
            <div className="orbit-custom-apps-assurance h-full">
              <h2 className="orbit-about-h3 text-white">{config.assuranceTitle}</h2>
              <ul className="mt-5 space-y-2.5">
                {config.assuranceBullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-white/58">
                    <span className="text-[#818cf8]" aria-hidden="true">
                      ✓
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-custom-apps-section px-4 pb-16 sm:px-6 lg:px-8">
        <AboutReveal>
          <div className="orbit-about-cta mx-auto max-w-[48rem] text-center">
            <h2 className="orbit-about-h2">{config.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/55">{config.ctaLede}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href={config.ctaPrimaryHref} className="orbit-about-cta-primary">
                {config.ctaPrimaryLabel}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={config.ctaSecondaryHref} className="orbit-about-cta-ghost">
                {config.ctaSecondaryLabel}
              </Link>
            </div>
          </div>
        </AboutReveal>
      </section>
    </main>
  );
}
