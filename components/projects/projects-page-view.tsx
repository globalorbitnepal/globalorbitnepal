import Link from "next/link";
import type { ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import { ProjectsZoomShowcase } from "@/components/projects/projects-zoom-showcase";
import type { ProjectsConfig } from "@/lib/projects-config";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

function GoldGradient({ children }: { children: ReactNode }) {
  return <span className="orbit-about-gold-text">{children}</span>;
}

export function ProjectsPageView({ config }: { config: ProjectsConfig }) {
  return (
    <main className="orbit-about-page orbit-projects-page min-h-screen overflow-hidden text-white">
      <section className="orbit-about-hero relative isolate px-4 pb-16 pt-[clamp(5rem,10vh,6.5rem)] text-center sm:px-6 lg:px-8">
        <div className="orbit-about-hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="orbit-about-hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-[54rem]">
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
            <div className="orbit-about-glass orbit-projects-stats grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-[family-name:var(--font-jakarta)] text-3xl font-bold text-[#f0c43a] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>
          </AboutReveal>
        </div>
      </section>

      <ProjectsZoomShowcase
        showcases={config.showcases}
        header={{
          eyebrow: config.zoomEyebrow,
          title: config.zoomTitle,
          titleAccent: config.zoomTitleAccent,
          lede: config.zoomLede,
        }}
      />

      <section className="orbit-about-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[72rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>{config.scopeEyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-5">{config.scopeTitle}</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-white/58 sm:text-lg">
                {config.scopeParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {config.scopeBullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-white/55 sm:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-about-section px-4 pb-24 sm:px-6 lg:px-8">
        <AboutReveal>
          <div className="orbit-about-cta mx-auto max-w-[48rem] text-center">
            <h2 className="orbit-about-h2">{config.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55">{config.ctaLede}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
