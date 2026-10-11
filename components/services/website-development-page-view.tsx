import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import { WebsiteDevDemoShowcase } from "@/components/services/website-development/demo-showcase";
import { WebsiteDevHeroShowcase } from "@/components/services/website-development/hero-showcase";
import { WebsiteDevBreadcrumbs } from "@/components/services/website-development/wd-breadcrumbs";
import { WebsiteDevFaq } from "@/components/services/website-development/wd-faq";
import {
  WD_FINAL_CTA,
  WD_INDUSTRIES,
  WD_INTRO,
  WD_HERO,
  WD_PERF_A11Y,
  WD_PRICING,
  WD_PROCESS_STEPS,
  WD_RELATED,
  WD_SERVICES,
  WD_TECH,
  WD_TRUST,
  WD_WHY,
  WD_FAQ_EXTENDED,
} from "@/lib/website-development-content";
import {
  WEBSITE_DEV_DEMOS,
  WEBSITE_DEV_DELIVERABLES,
  WEBSITE_DEV_PORTFOLIO,
  WEBSITE_DEV_SEO,
} from "@/lib/website-development-config";
import Image from "next/image";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

export function WebsiteDevelopmentPageView() {
  return (
    <main className="orbit-about-page orbit-wd-page text-white">
      <div className="sw-product-crumb-wrap px-4 pt-[clamp(4.5rem,8vh,5.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <WebsiteDevBreadcrumbs />
        </div>
      </div>

      <section className="orbit-wd-hero-section relative isolate px-4 pb-14 pt-4 sm:px-6 lg:px-8">
        <div className="orbit-about-hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="orbit-about-hero-grid pointer-events-none absolute inset-0 -z-10 opacity-35" aria-hidden="true" />
        <div className="mx-auto grid max-w-[82rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="wd-hero-copy wd-hero-enter">
            <Badge>{WD_HERO.eyebrow}</Badge>
            <h1 className="orbit-about-hero-title mt-5 text-left font-[family-name:var(--font-jakarta)]">{WD_HERO.h1}</h1>
            <p className="orbit-about-hero-lede mt-5 max-w-xl text-left">{WD_HERO.lede}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="orbit-about-cta-primary">
                {WD_HERO.primaryCta}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={WD_HERO.secondaryHref} className="orbit-about-cta-ghost">
                {WD_HERO.secondaryCta}
              </Link>
            </div>
            <ul className="wd-trust-strip mt-10 flex flex-wrap gap-2">
              {WD_TRUST.map((item) => (
                <li key={item.label}>{item.label}</li>
              ))}
            </ul>
          </div>
          <WebsiteDevHeroShowcase />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Foundation</Badge>
              <h2 className="orbit-about-h2 mt-4">{WD_INTRO.title}</h2>
              {WD_INTRO.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-services-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <header className="mb-8">
              <Badge>Services</Badge>
              <h2 id="wd-services-heading" className="orbit-about-h2 mt-4">
                Website development services
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                End-to-end delivery from discovery to launch — each line below maps to a real engagement type we scope in writing.
              </p>
            </header>
            <ul className="wd-service-grid">
              {WD_SERVICES.map((service, index) => (
                <li key={service.title} className="wd-service-card" style={{ "--wd-i": index } as CSSProperties}>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  {service.href ? (
                    <Link href={service.href} className="wd-service-link">
                      Learn more →
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-industry-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <header className="mb-10 text-center">
              <Badge>Industries</Badge>
              <h2 id="wd-industry-heading" className="orbit-about-h2 mt-4">
                Industry-specific website solutions
              </h2>
            </header>
            <ul className="wd-industry-grid">
              {WD_INDUSTRIES.map((panel) => (
                <li key={panel.id} className="wd-industry-panel">
                  <div className="wd-industry-visual">
                    <Image src={panel.image} alt={panel.imageAlt} width={800} height={500} sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="wd-industry-copy">
                    <h3>{panel.title}</h3>
                    <p>{panel.body}</p>
                    <ul>
                      {panel.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </AboutReveal>
        </div>
      </section>

      <WebsiteDevDemoShowcase
        demos={WEBSITE_DEV_DEMOS}
        header={{
          eyebrow: "Fictional demos · original art direction",
          title: "Six coded homepages,",
          titleAccent: "six distinct industries",
          lede:
            "Each frame is a working interface — navigation, forms, and product UI. These are fictional brands for demonstration; your project receives original design after discovery.",
        }}
      />

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Process</Badge>
              <h2 className="orbit-about-h2 mt-4">Our website development process</h2>
              <ol className="wd-process-timeline mt-8">
                {WD_PROCESS_STEPS.map((step, i) => (
                  <li key={step.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      <p className="wd-process-deliverable">
                        <strong>Deliverable:</strong> {step.deliverable}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Technology</Badge>
              <h2 className="orbit-about-h2 mt-4">{WD_TECH.title}</h2>
              {WD_TECH.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {WD_TECH.stacks.map((stack) => (
                  <li key={stack} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                    {stack}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>{WEBSITE_DEV_SEO.eyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-4">{WEBSITE_DEV_SEO.title}</h2>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-white/58">
                {WEBSITE_DEV_SEO.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {WEBSITE_DEV_SEO.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] grid gap-6 lg:grid-cols-2">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story h-full">
              <Badge>Quality</Badge>
              <h2 className="orbit-about-h2 mt-4">{WD_PERF_A11Y.title}</h2>
              {WD_PERF_A11Y.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
            </div>
          </AboutReveal>
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story h-full">
              <Badge>{WEBSITE_DEV_DELIVERABLES.eyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-4">{WEBSITE_DEV_DELIVERABLES.title}</h2>
              <ul className="mt-6 grid gap-2.5">
                {WEBSITE_DEV_DELIVERABLES.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Pricing</Badge>
              <h2 className="orbit-about-h2 mt-4">{WD_PRICING.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/58">{WD_PRICING.intro}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {WD_PRICING.factors.map((factor) => (
                  <li key={factor} className="text-sm leading-relaxed text-white/55">• {factor}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="orbit-about-cta-primary">
                  {WD_PRICING.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href={WD_PRICING.packagesHref} className="orbit-about-cta-ghost">
                  View packages
                </Link>
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Global Orbit</Badge>
              <h2 className="orbit-about-h2 mt-4">{WD_WHY.title}</h2>
              {WD_WHY.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
              <p className="mt-6 text-sm text-white/50">
                <Link href={WEBSITE_DEV_PORTFOLIO.href} className="text-[#f0c43a] hover:underline">
                  {WEBSITE_DEV_PORTFOLIO.linkLabel}
                </Link>
                {" — "}
                {WEBSITE_DEV_PORTFOLIO.lede}
              </p>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-related-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass">
              <Badge>Related</Badge>
              <h2 id="wd-related-heading" className="orbit-about-h2 mt-4">Related services</h2>
              <ul className="sw-product-related mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {WD_RELATED.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="sw-product-related-card">
                      <h3>{item.label}</h3>
                      <span>View →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-faq-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass">
              <Badge>FAQ</Badge>
              <h2 id="wd-faq-heading" className="orbit-about-h2 mt-4">
                Website development Nepal — frequently asked questions
              </h2>
              <WebsiteDevFaq items={WD_FAQ_EXTENDED} />
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 pb-16 sm:px-6 lg:px-8">
        <AboutReveal>
          <div className="orbit-about-cta wd-final-cta mx-auto max-w-[52rem] text-center">
            <h2 className="orbit-about-h2">{WD_FINAL_CTA.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/55">{WD_FINAL_CTA.lede}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="orbit-about-cta-primary">
                {WD_FINAL_CTA.primary}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className="orbit-about-cta-ghost">
                {WD_FINAL_CTA.secondary}
              </Link>
              <a
                href={WD_FINAL_CTA.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="orbit-about-cta-ghost text-sm"
              >
                {WD_FINAL_CTA.whatsappLabel}
              </a>
            </div>
          </div>
        </AboutReveal>
      </section>
    </main>
  );
}
