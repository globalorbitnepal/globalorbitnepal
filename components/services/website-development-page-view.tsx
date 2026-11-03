import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { AboutReveal } from "@/components/about/reveal";
import { WebsiteDevBreadcrumbs } from "@/components/services/website-development/wd-breadcrumbs";
import { WebsiteDevFaq } from "@/components/services/website-development/wd-faq";
import type { WebsiteDevelopmentPageConfig } from "@/lib/website-development-page-config";

function Badge({ children }: { children: ReactNode }) {
  return <span className="orbit-about-badge">{children}</span>;
}

const COMPARISON = [
  {
    title: "A brochure site",
    body: "A few pages, a contact form, and a logo. It exists, but it does not answer pricing, process, or objections, so visitors leave and search again.",
  },
  {
    title: "A professional business website",
    body: "Planned information architecture, mobile-first layout, fast load, unique service pages, schema, and a clear path to enquiry. It is an asset your sales team can send instead of a PDF.",
  },
  {
    title: "A web application",
    body: "Logins, dashboards, bookings, or customer portals. We scope these separately from a marketing site so the timeline and budget stay honest.",
  },
];

const MISTAKES = [
  {
    title: "Buying a theme and calling it done",
    body: "A shared theme looks like every other site in your category. Search engines and customers both notice. Original structure and copy outperform a polished skin with generic text.",
  },
  {
    title: "One page for every service",
    body: "Stuffing website development, SEO, and apps onto a single homepage splits the ranking signal. Each commercial intent deserves its own URL, heading, and internal links.",
  },
  {
    title: "Ignoring mobile data",
    body: "Most Nepali visitors arrive on mid-range Android phones. Heavy scripts, uncompressed media, and desktop-only layouts lose the enquiry before the page finishes painting.",
  },
  {
    title: "Launching without redirects",
    body: "A redesign that changes URLs without 301s throws away years of indexed pages. We map old URLs before cutover so equity moves with the new site.",
  },
  {
    title: "No one can edit the site",
    body: "If every sentence needs a developer, the site goes stale in a month. We hand over a CMS or a documented editing path and a training call.",
  },
  {
    title: "SEO added after launch",
    body: "Metadata, sitemap, schema, and heading structure are cheaper to build in than to retrofit. Technical SEO ships with the project, not as a later invoice.",
  },
];

const CHECKLIST = [
  "One H1 that states the service and the market",
  "Unique title and description on every template",
  "Self-referencing canonical on the live hostname",
  "XML sitemap and a robots.txt that does not block real pages or CSS",
  "Breadcrumb and FAQ structured data where it is honest",
  "Internal links between related services, not orphan landing pages",
  "Contact path visible without scrolling on mobile",
  "Core Web Vitals checked on a throttled mobile profile before launch",
  "Redirect map for any URL that changes",
  "Search Console and analytics connected on day one",
];

const TIMELINE = [
  { when: "Week 0", what: "Discovery call, written scope, sitemap, and a fixed timeline." },
  { when: "Week 1", what: "Information architecture, wireframes, and keyword map for each template." },
  { when: "Week 2", what: "Visual design at real breakpoints. You approve before production code." },
  { when: "Weeks 3–4", what: "Build, CMS, forms, integrations, and a staging URL you can review daily." },
  { when: "Launch week", what: "SEO pass, redirects, SSL, Search Console, and a handover call." },
  { when: "After", what: "Named aftercare. Small edits and security updates on an agreed plan." },
];

const CITIES = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Chitwan",
  "Biratnagar",
  "Butwal",
  "Nepalgunj",
  "Dharan",
  "Hetauda",
];

export function WebsiteDevelopmentPageView({ config }: { config: WebsiteDevelopmentPageConfig }) {
  const {
    hero,
    trust,
    intro,
    services,
    industries,
    processSteps,
    tech,
    seo,
    deliverables,
    perf,
    pricing,
    why,
    portfolio,
    related,
    faq,
    finalCta,
  } = config;

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
        <div className="mx-auto max-w-[82rem]">
          <div className="wd-hero-copy wd-hero-enter max-w-3xl">
            <Badge>{hero.eyebrow}</Badge>
            <h1 className="orbit-about-hero-title mt-5 text-left font-[family-name:var(--font-jakarta)]">{hero.h1}</h1>
            <p className="orbit-about-hero-lede mt-5 max-w-2xl text-left">{hero.lede}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="orbit-about-cta-primary">
                {hero.primaryCta}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={hero.secondaryHref} className="orbit-about-cta-ghost">
                {hero.secondaryCta}
              </Link>
            </div>
            <ul className="wd-trust-strip mt-10 flex flex-wrap gap-2">
              {trust.map((item) => (
                <li key={item.label}>{item.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Foundation</Badge>
              <h2 className="orbit-about-h2 mt-4">{intro.title}</h2>
              {intro.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
              <p className="mt-4 text-base leading-relaxed text-white/58">
                If you are comparing studios in Kathmandu, ask three questions before you sign: who writes the scope, who owns the code after launch, and whether technical SEO is included or sold later. Global Orbit answers all three in writing before design starts.
              </p>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-compare-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <header className="mb-8">
              <Badge>Scope</Badge>
              <h2 id="wd-compare-heading" className="orbit-about-h2 mt-4">
                Brochure, business site, or web app
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                Most quotes fail because the word “website” means three different products. We name which one you are buying.
              </p>
            </header>
            <ul className="wd-service-grid">
              {COMPARISON.map((item, index) => (
                <li key={item.title} className="wd-service-card" style={{ "--wd-i": index } as CSSProperties}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-services-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <header className="mb-8">
              <Badge>Services</Badge>
              <h2 id="wd-services-heading" className="orbit-about-h2 mt-4">
                Website development services in Nepal
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                End-to-end delivery from discovery to launch. Each line below is a real engagement type we scope in writing — corporate sites, stores, hospitality, travel, and custom applications.
              </p>
            </header>
            <ul className="wd-service-grid">
              {services.map((service, index) => (
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
            <header className="mb-10">
              <Badge>Industries</Badge>
              <h2 id="wd-industry-heading" className="orbit-about-h2 mt-4">
                Industry-specific website solutions
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                A hotel, a trekking operator, a restaurant, and a SaaS company do not share a homepage structure. We design the information architecture around how that customer actually decides.
              </p>
            </header>
            <ul className="grid gap-5 lg:grid-cols-2">
              {industries.map((panel) => (
                <li key={panel.id} className="orbit-about-glass orbit-about-story list-none p-6">
                  <h3 className="text-lg font-semibold text-white">{panel.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{panel.body}</p>
                  <ul className="mt-4 grid gap-2">
                    {panel.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/55">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-cities-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Nepal</Badge>
              <h2 id="wd-cities-heading" className="orbit-about-h2 mt-4">
                Website development for businesses across Nepal
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/58">
                The studio is in Kathmandu. Clients are not. We deliver the same written scope, staging reviews, and launch checklist whether you are in the valley or outside it. Discovery and approvals happen on calls and WhatsApp; you do not need to visit an office to get a production site.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <li key={city} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70">
                    {city}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-white/58">
                Local search still matters. A Pokhara hotel and a Kathmandu clinic should not share the same city language, service-area copy, or Google Business Profile. We write location context into the pages that need it, and we keep the rest of the site focused on the service — not stuffed with city names.
              </p>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Process</Badge>
              <h2 className="orbit-about-h2 mt-4">Our website development process</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                Six stages, in order. Design does not start before the sitemap is agreed, and launch does not happen before the SEO pass.
              </p>
              <ol className="wd-process-timeline mt-8">
                {processSteps.map((step, i) => (
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

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-time-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <header className="mb-8">
              <Badge>Timeline</Badge>
              <h2 id="wd-time-heading" className="orbit-about-h2 mt-4">
                A typical business website, week by week
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                Focused business sites usually go live in two to four weeks after content is approved. Ecommerce, booking, and custom applications take longer and get their own written schedule.
              </p>
            </header>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TIMELINE.map((item) => (
                <li key={item.when} className="orbit-about-glass list-none p-5">
                  <p className="text-sm font-semibold text-[#f0c43a]">{item.when}</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">{item.what}</p>
                </li>
              ))}
            </ol>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Technology</Badge>
              <h2 className="orbit-about-h2 mt-4">{tech.title}</h2>
              {tech.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {tech.stacks.map((stack) => (
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
              <Badge>{seo.eyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-4">{seo.title}</h2>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-white/58">
                {seo.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {seo.bullets.map((bullet) => (
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

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-check-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story">
              <Badge>Launch checklist</Badge>
              <h2 id="wd-check-heading" className="orbit-about-h2 mt-4">
                What “SEO-ready” means on a Global Orbit site
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                These are shipped with the build. They are not a separate retainer, and they are not optional extras discovered after go-live.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8" aria-labelledby="wd-mistakes-heading">
        <div className="mx-auto max-w-[82rem]">
          <AboutReveal>
            <header className="mb-8">
              <Badge>Avoid</Badge>
              <h2 id="wd-mistakes-heading" className="orbit-about-h2 mt-4">
                Mistakes that keep Nepali websites off page one
              </h2>
            </header>
            <ul className="wd-service-grid">
              {MISTAKES.map((item, index) => (
                <li key={item.title} className="wd-service-card" style={{ "--wd-i": index } as CSSProperties}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[82rem] grid gap-6 lg:grid-cols-2">
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story h-full">
              <Badge>Quality</Badge>
              <h2 className="orbit-about-h2 mt-4">{perf.title}</h2>
              {perf.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
              <ul className="mt-6 grid gap-2.5">
                {perf.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c43a]" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
          <AboutReveal>
            <div className="orbit-about-glass orbit-about-story h-full">
              <Badge>{deliverables.eyebrow}</Badge>
              <h2 className="orbit-about-h2 mt-4">{deliverables.title}</h2>
              <ul className="mt-6 grid gap-2.5">
                {deliverables.bullets.map((bullet) => (
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
              <h2 className="orbit-about-h2 mt-4">{pricing.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/58">{pricing.intro}</p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/58">
                Landing pages start from NPR 15,000. Business sites typically sit between NPR 25,000 and NPR 80,000 depending on page count, languages, and integrations. Custom ecommerce and booking systems start from NPR 1,00,000 and are quoted after a written scope — not from a menu that hides the real work.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {pricing.factors.map((factor) => (
                  <li key={factor} className="text-sm leading-relaxed text-white/55">
                    • {factor}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="orbit-about-cta-primary">
                  {pricing.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href={pricing.packagesHref} className="orbit-about-cta-ghost">
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
              <h2 className="orbit-about-h2 mt-4">{why.title}</h2>
              {why.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-white/58">
                  {p}
                </p>
              ))}
              <p className="mt-6 text-sm text-white/50">
                <Link href={portfolio.href} className="text-[#f0c43a] hover:underline">
                  {portfolio.linkLabel}
                </Link>
                {" — "}
                {portfolio.lede}
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
              <h2 id="wd-related-heading" className="orbit-about-h2 mt-4">
                Related services
              </h2>
              <ul className="sw-product-related mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
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
              <WebsiteDevFaq items={faq} />
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="orbit-projects-tight px-4 pb-16 sm:px-6 lg:px-8">
        <AboutReveal>
          <div className="orbit-about-cta wd-final-cta mx-auto max-w-[52rem] text-center">
            <h2 className="orbit-about-h2">{finalCta.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/55">{finalCta.lede}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="orbit-about-cta-primary">
                {finalCta.primary}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className="orbit-about-cta-ghost">
                {finalCta.secondary}
              </Link>
              <a href={finalCta.whatsappHref} target="_blank" rel="noreferrer" className="orbit-about-cta-ghost text-sm">
                {finalCta.whatsappLabel}
              </a>
            </div>
          </div>
        </AboutReveal>
      </section>
    </main>
  );
}
