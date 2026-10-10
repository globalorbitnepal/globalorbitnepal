import Link from "next/link";
import type { ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import type { AboutConfig } from "@/lib/about-config";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

function GoldGradient({ children }: { children: ReactNode }) {
  return <span className="orbit-about-gold-text">{children}</span>;
}

export function AboutPageView({ config }: { config: AboutConfig }) {
  return (
    <main className="orbit-about-page min-h-screen overflow-hidden text-white">
      <section className="orbit-about-hero relative isolate px-4 pb-20 pt-[clamp(5rem,10vh,6.5rem)] text-center sm:px-6 lg:px-8">
        <div className="orbit-about-hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="orbit-about-hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-[52rem]">
          <Badge>{config.heroEyebrow}</Badge>
          <h1 className="orbit-about-hero-title mt-6 font-[family-name:var(--font-jakarta)]">
            About Global Orbit — {config.heroTitleBefore}{" "}
            <GoldGradient>{config.heroTitleAccent}</GoldGradient>{" "}
            <span className="text-white/92">{config.heroTitleAfter}</span>
          </h1>
          <p className="orbit-about-hero-lede mx-auto mt-7 max-w-2xl">{config.heroLede}</p>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>{config.storyEyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-5">{config.storyTitle}</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-white/58 sm:text-lg">
                {config.storyParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[72rem] gap-6 md:grid-cols-2">
          <AboutReveal className="h-full">
            <article className="orbit-about-glass orbit-about-mv h-full">
              <div className="orbit-about-mv-icon is-gold">◎</div>
              <h2 className="orbit-about-h3">{config.missionTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">{config.missionBody}</p>
            </article>
          </AboutReveal>
          <AboutReveal className="h-full" delay={100}>
            <article className="orbit-about-glass orbit-about-mv h-full">
              <div className="orbit-about-mv-icon is-violet">◉</div>
              <h2 className="orbit-about-h3">{config.visionTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">{config.visionBody}</p>
            </article>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <header className="mb-10 text-center lg:mb-14">
            <Badge>{config.valuesEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">
              {config.valuesTitle} <GoldGradient>{config.valuesTitleAccent}</GoldGradient>
            </h2>
          </header>
          <div className="grid gap-5 sm:grid-cols-2">
            {config.values.map((value, index) => (
              <AboutReveal key={value.title} delay={index * 80}>
                <article className="orbit-about-glass orbit-about-value h-full">
                  <h3 className="text-lg font-bold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/52">{value.body}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-about-section relative px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(680px,80vw)] w-[min(680px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6366f1]/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-[72rem]">
          <header className="mb-12 text-center lg:mb-16">
            <Badge>{config.journeyEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">
              {config.journeyTitle} <GoldGradient>{config.journeyTitleAccent}</GoldGradient>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55 sm:text-lg">{config.journeyLede}</p>
          </header>
          <div className="relative mx-auto max-w-3xl">
            <div className="orbit-about-timeline-line" aria-hidden="true" />
            <div className="space-y-7">
              {config.journey.map((item, index) => (
                <AboutReveal key={`${item.year}-${item.title}`} delay={index * 70}>
                  <article className="orbit-about-timeline-item">
                    <div className="orbit-about-timeline-dot" aria-hidden="true">
                      ✦
                    </div>
                    <div className="orbit-about-glass orbit-about-timeline-card">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-[#818cf8]">{item.year}</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">Milestone</span>
                      </div>
                      <h3 className="mt-1 text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/50">{item.body}</p>
                    </div>
                  </article>
                </AboutReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="orbit-about-stats border-y border-white/[0.06] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[72rem] grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {config.stats.map((stat, index) => (
            <AboutReveal key={stat.label} delay={index * 90}>
              <div className="orbit-about-glass orbit-about-stat text-center">
                <p className="orbit-about-stat-value">{stat.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/48">{stat.label}</p>
              </div>
            </AboutReveal>
          ))}
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <header className="mb-10 text-center lg:mb-14">
            <Badge>{config.approachEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">{config.approachTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55">{config.approachLede}</p>
          </header>
          <div className="grid gap-5 lg:grid-cols-3">
            {config.approachSteps.map((step, index) => (
              <AboutReveal key={step.title} delay={index * 100}>
                <article className="orbit-about-glass orbit-about-step h-full">
                  <span className="orbit-about-step-num">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/52">{step.body}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <header className="mb-10 text-center lg:mb-14">
            <Badge>{config.teamEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">{config.teamTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55">{config.teamLede}</p>
          </header>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {config.team.map((member, index) => (
              <AboutReveal key={member.role} delay={index * 90}>
                <article className="orbit-about-glass orbit-about-team h-full text-center">
                  <div className="orbit-about-team-icon">{member.icon}</div>
                  <h3 className="mt-5 text-lg font-bold">{member.role}</h3>
                  <p className="mt-2 text-sm text-white/50">{member.specialty}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <header className="mb-10 text-center lg:mb-14">
            <Badge>{config.presenceEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">{config.presenceTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55">{config.presenceLede}</p>
          </header>
          <div className="grid gap-5 lg:grid-cols-3">
            {config.regions.map((region, index) => (
              <AboutReveal key={region.title} delay={index * 90}>
                <article className="orbit-about-glass orbit-about-region h-full">
                  <h3 className="text-lg font-bold text-[#f0c43a]">{region.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/52">{region.body}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-about-section px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <AboutReveal>
            <div>
              <Badge>{config.whyEyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-5">{config.whyTitle}</h2>
            </div>
          </AboutReveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {config.whyBullets.map((reason, index) => (
              <AboutReveal key={reason.slice(0, 40)} delay={index * 50}>
                <li className="orbit-about-glass orbit-about-why flex items-start gap-3 text-sm text-white/68">
                  <span className="text-[#f0c43a]">✓</span>
                  <span>{reason}</span>
                </li>
              </AboutReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="orbit-about-cta px-4 py-16 text-center sm:px-6 lg:py-24">
        <AboutReveal>
          <h2 className="mx-auto max-w-3xl font-[family-name:var(--font-jakarta)] text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.65rem]">
            {config.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/58">{config.ctaLede}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={config.ctaPrimaryHref} className="orbit-btn-gold inline-flex h-12 items-center rounded-full px-7 text-sm font-bold">
              {config.ctaPrimaryLabel}
            </Link>
            <Link
              href={config.ctaSecondaryHref}
              className="orbit-btn-glass inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold text-white"
            >
              {config.ctaSecondaryLabel}
            </Link>
          </div>
        </AboutReveal>
      </section>
    </main>
  );
}
