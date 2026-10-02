import Link from "next/link";
import type { ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import type { CareersConfig } from "@/lib/careers-config";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

function GoldGradient({ children }: { children: ReactNode }) {
  return <span className="orbit-about-gold-text">{children}</span>;
}

export function CareersPageView({ config }: { config: CareersConfig }) {
  return (
    <main className="orbit-about-page min-h-screen overflow-hidden text-white">
      <section className="orbit-about-hero relative isolate px-4 pb-20 pt-[clamp(5rem,10vh,6.5rem)] text-center sm:px-6 lg:px-8">
        <div className="orbit-about-hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="orbit-about-hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-[52rem]">
          <Badge>{config.heroEyebrow}</Badge>
          <h1 className="orbit-about-hero-title mt-6 font-[family-name:var(--font-jakarta)]">
            <span className="text-white">{config.heroTitleBefore} </span>
            <GoldGradient>{config.heroTitleAccent}</GoldGradient>
            <br />
            <span className="text-white/92">{config.heroTitleAfter}</span>
          </h1>
          <p className="orbit-about-hero-lede mx-auto mt-7 max-w-2xl">{config.heroLede}</p>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>{config.cultureEyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-5">{config.cultureTitle}</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-white/58 sm:text-lg">
                {config.cultureParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <header className="mb-10 text-center lg:mb-14">
            <Badge>{config.perksEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">
              {config.perksTitle} <GoldGradient>{config.perksTitleAccent}</GoldGradient>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55">{config.perksLede}</p>
          </header>
          <div className="grid gap-5 sm:grid-cols-2">
            {config.perks.map((perk, index) => (
              <AboutReveal key={perk.title} delay={index * 80}>
                <article className="orbit-about-glass orbit-about-value h-full">
                  <h3 className="text-lg font-bold text-white">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/52">{perk.body}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="orbit-about-section scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <header className="mb-10 text-center lg:mb-14">
            <Badge>{config.rolesEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">
              {config.rolesTitle} <GoldGradient>{config.rolesTitleAccent}</GoldGradient>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55">{config.rolesLede}</p>
          </header>
          <div className="space-y-4">
            {config.roles.map((role, index) => (
              <AboutReveal key={role.slug} delay={index * 90}>
                <Link
                  href={`/careers/${role.slug}`}
                  className="orbit-about-glass orbit-career-role group block no-underline"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#818cf8]">
                        {role.department} · {role.employmentType}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white transition group-hover:text-[#f0c43a]">
                        {role.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/52">{role.summary}</p>
                      <p className="mt-3 text-xs font-medium text-white/45">{role.location}</p>
                    </div>
                    <span className="orbit-career-role-arrow inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#f0c43a]">
                      View role
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </AboutReveal>
            ))}
          </div>
          <p className="orbit-about-glass mt-8 px-5 py-4 text-center text-sm text-white/50">{config.applyNote}</p>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <header className="mb-10 text-center lg:mb-14">
            <Badge>{config.processEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">{config.processTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55">{config.processLede}</p>
          </header>
          <div className="grid gap-5 lg:grid-cols-3">
            {config.processSteps.map((step, index) => (
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
            <Badge>{config.officesEyebrow}</Badge>
            <h2 className="orbit-about-h2 mt-5">{config.officesTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55">{config.officesLede}</p>
          </header>
          <div className="grid gap-5 lg:grid-cols-3">
            {config.offices.map((office, index) => (
              <AboutReveal key={office.title} delay={index * 90}>
                <article className="orbit-about-glass orbit-about-region h-full">
                  <h3 className="text-lg font-bold text-[#f0c43a]">{office.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/52">{office.body}</p>
                </article>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[48rem]">
          <AboutReveal>
            <blockquote className="orbit-about-glass orbit-career-quote text-center">
              <p className="text-lg leading-relaxed text-white/78 sm:text-xl">&ldquo;{config.quoteText}&rdquo;</p>
              <footer className="mt-6 text-sm text-white/45">
                <strong className="block font-semibold text-white/75">{config.quoteAuthor}</strong>
                {config.quoteRole}
              </footer>
            </blockquote>
          </AboutReveal>
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
