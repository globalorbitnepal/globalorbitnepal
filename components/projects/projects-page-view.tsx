import Link from "next/link";
import type { ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import { ProjectsCaseStudies } from "@/components/projects/projects-case-studies";
import type { ProjectsConfig } from "@/lib/projects-config";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

function GoldGradient({ children }: { children: ReactNode }) {
  return <span className="orbit-about-gold-text">{children}</span>;
}

const STUDIO_STACK = [
  { label: "Next.js", detail: "App Router, SSR, edge-ready" },
  { label: "Node.js", detail: "APIs, Orbit CMS, auth" },
  { label: "SEO & CWV", detail: "Schema, sitemaps, Core Web Vitals" },
  { label: "Design systems", detail: "Premium UI, motion, handover" },
];

export function ProjectsPageView({ config }: { config: ProjectsConfig }) {
  return (
    <main className="orbit-about-page orbit-projects-page text-white">
      <section className="orbit-projects-hero relative isolate px-4 pb-10 pt-[clamp(4.75rem,9vh,6rem)] sm:px-6 lg:px-8">
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
              <div key={stat.label} className="orbit-projects-stat-card">
                <p className="orbit-projects-stat-value">{stat.value}</p>
                <p className="orbit-projects-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsCaseStudies
        showcases={config.showcases}
        header={{
          eyebrow: config.zoomEyebrow,
          title: config.zoomTitle,
          titleAccent: config.zoomTitleAccent,
          lede: config.zoomLede,
        }}
      />

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-projects-stack-band">
              <div className="orbit-projects-stack-head">
                <Badge>Engineering</Badge>
                <h2 className="orbit-about-h3 mt-4 text-white">Stack we ship on every launch</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
                  Production-grade frontends and Node backends — the same patterns we use on the Global Orbit homepage
                  and Orbit control plane.
                </p>
              </div>
              <div className="orbit-projects-stack-grid">
                {STUDIO_STACK.map((item) => (
                  <article key={item.label} className="orbit-projects-stack-item">
                    <p className="orbit-projects-stack-label">{item.label}</p>
                    <p className="orbit-projects-stack-detail">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story orbit-projects-scope">
              <Badge>{config.scopeEyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-4">{config.scopeTitle}</h2>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-white/58 sm:text-lg">
                {config.scopeParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
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

      <section className="orbit-projects-tight px-4 pb-16 sm:px-6 lg:px-8">
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
