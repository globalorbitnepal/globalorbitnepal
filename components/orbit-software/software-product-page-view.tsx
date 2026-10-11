import Link from "next/link";
import type { ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import { SoftwareProductUi } from "@/components/orbit/software-preview-ui";
import { SoftwareLaptopShot } from "@/components/orbit/software-laptop-shot";
import { SoftwareProductBreadcrumbs } from "@/components/orbit-software/software-product-breadcrumbs";
import { SoftwareProductFaq } from "@/components/orbit-software/software-product-faq";
import type { SoftwareProductContent } from "@/lib/software-product-types";
import { softwareShotForSlug } from "@/lib/software-shots";
import { SOFTWARE_CTA, relatedProducts } from "@/lib/software-products/shared";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

function Gold({ children }: { children: ReactNode }) {
  return <span className="orbit-about-gold-text">{children}</span>;
}

function FeatureGrid({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <AboutReveal>
      <div className="orbit-about-glass">
        <h2 className="orbit-about-h2">{title}</h2>
        <ul className="erp-pillars mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="erp-pillar">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </AboutReveal>
  );
}

function ProseBlock({ section }: { section: { heading: string; paragraphs: string[] } }) {
  return (
    <AboutReveal>
      <div className="orbit-about-glass orbit-about-story sw-product-prose">
        <h2 className="orbit-about-h2">{section.heading}</h2>
        {section.paragraphs.map((p) => (
          <p key={p.slice(0, 48)} className="mt-4 text-base leading-relaxed text-white/58">
            {p}
          </p>
        ))}
      </div>
    </AboutReveal>
  );
}

export function SoftwareProductPageView({ content }: { content: SoftwareProductContent }) {
  const shot = softwareShotForSlug(content.slug);
  const related = relatedProducts(content.relatedSlugs);

  return (
    <main className="orbit-about-page orbit-sw-product-page text-white">
      <div className="sw-product-crumb-wrap px-4 pt-[clamp(4.5rem,8vh,5.5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <SoftwareProductBreadcrumbs productName={content.h1} />
        </div>
      </div>

      <section className="orbit-projects-hero relative isolate px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="orbit-about-hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="orbit-about-hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <div className="mx-auto grid max-w-[76rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <Badge>{content.eyebrow}</Badge>
            <p className="sw-product-live mt-4">
              <span className="orbit-sw-live-pulse" aria-hidden="true" />
              Live product · production ready
            </p>
            <h1 className="orbit-about-hero-title mt-4 font-[family-name:var(--font-jakarta)] text-left">
              <span className="text-white">{content.h1}</span>
              {content.titleAccent ? (
                <>
                  <br />
                  <Gold>{content.titleAccent}</Gold>
                </>
              ) : null}
            </h1>
            <p className="orbit-about-hero-lede mt-5 max-w-xl text-left">{content.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={SOFTWARE_CTA.primaryHref} className="orbit-about-cta-primary">
                {SOFTWARE_CTA.primaryLabel}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={SOFTWARE_CTA.secondaryHref} className="orbit-about-cta-ghost">
                {SOFTWARE_CTA.secondaryLabel}
              </Link>
              <Link href={SOFTWARE_CTA.exploreHref} className="orbit-sw-feature-secondary sw-product-explore">
                {SOFTWARE_CTA.exploreLabel}
              </Link>
            </div>
            <div className="orbit-projects-hero-stats mt-10 grid gap-3 sm:grid-cols-2">
              {content.heroStats.map((stat) => (
                <div key={stat.label} className="orbit-projects-stat-card">
                  <p className="orbit-projects-stat-value">{stat.value}</p>
                  <p className="orbit-projects-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sw-product-hero-shot">
            {shot ? (
              <SoftwareLaptopShot
                src={shot.src}
                alt={`${content.h1} dashboard preview`}
                accent={content.accent}
                size="hero"
                priority
                cinema
              />
            ) : (
              <SoftwareProductUi slug={content.slug} title={content.h1} accent={content.accent} />
            )}
          </div>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <ProseBlock section={content.trust} />
        </div>
      </section>

      <section id="product-features" className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <ProseBlock section={content.overview} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="sw-ui-preview">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-about-glass sw-product-ui-wrap">
              <Badge>Interface preview</Badge>
              <h2 id="sw-ui-preview" className="orbit-about-h2 mt-4">
                Dashboard and daily screens
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
                Interactive layout below uses demonstration metrics. Production tenants show your data only.
              </p>
              <div className="sw-product-ui-stage mt-8">
                <SoftwareProductUi slug={content.slug} title={content.h1} accent={content.accent} />
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <FeatureGrid title={content.problems.title} items={content.problems.items} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <FeatureGrid title={content.coreFeatures.title} items={content.coreFeatures.items} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <FeatureGrid title={content.advancedFeatures.title} items={content.advancedFeatures.items} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <h2 className="orbit-about-h2">{content.workflow.title}</h2>
              <ol className="erp-process mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {content.workflow.steps.map((step, i) => (
                  <li key={step.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <FeatureGrid title={content.workflowExamples.title} items={content.workflowExamples.items} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <FeatureGrid title={content.benefitsByRole.title} items={content.benefitsByRole.items} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <FeatureGrid title={content.useCases.title} items={content.useCases.items} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <ProseBlock section={content.integrations} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem] grid gap-6 lg:grid-cols-2">
          <ProseBlock section={content.security} />
          <ProseBlock section={content.implementation} />
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[76rem] grid gap-6 lg:grid-cols-2">
          <ProseBlock section={content.analytics} />
          <ProseBlock section={content.whyOrbit} />
        </div>
      </section>

      {content.longForm.map((section) => (
        <section key={section.heading} className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[76rem]">
            <ProseBlock section={section} />
          </div>
        </section>
      ))}

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="sw-related">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-about-glass">
              <Badge>Related software</Badge>
              <h2 id="sw-related" className="orbit-about-h2 mt-4">Explore other Orbit products</h2>
              <ul className="sw-product-related mt-8 grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.href} className="sw-product-related-card">
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <span>View product →</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-white/45">
                <Link href="/orbit-software" className="text-[#f0c43a] hover:underline">
                  Browse all ERP software
                </Link>
                {" · "}
                <Link href="/demo" className="text-white/55 hover:text-white">
                  Software demo
                </Link>
              </p>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="sw-faq-heading">
        <div className="mx-auto max-w-[76rem]">
          <AboutReveal>
            <div className="orbit-about-glass">
              <Badge>FAQ</Badge>
              <h2 id="sw-faq-heading" className="orbit-about-h2 mt-4">
                {content.h1} — common questions
              </h2>
              <SoftwareProductFaq items={content.faq} />
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 pb-16 sm:px-6 lg:px-8">
        <AboutReveal>
          <div className="orbit-about-cta mx-auto max-w-[48rem] text-center">
            <h2 className="orbit-about-h2">{content.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/55">{content.cta.lede}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href={SOFTWARE_CTA.primaryHref} className="orbit-about-cta-primary">
                {SOFTWARE_CTA.primaryLabel}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={SOFTWARE_CTA.secondaryHref} className="orbit-about-cta-ghost">
                {SOFTWARE_CTA.secondaryLabel}
              </Link>
            </div>
          </div>
        </AboutReveal>
      </section>
    </main>
  );
}
