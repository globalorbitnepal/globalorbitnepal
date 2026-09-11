import type { Metadata } from "next";
import { ABOUT_CONTENT } from "@/lib/content/about";
import { getSiteSettings } from "@/lib/db/site-settings";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { SplitSection } from "@/components/site/split-section";
import { Container } from "@/components/ui/container";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About",
    description:
      "Global Orbit Nepal is an independent Kathmandu technology company. Mission, vision, values, and how we approach delivery—without invented statistics.",
    path: "/about",
  });
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const companyName = settings?.companyName || FALLBACK_SITE.companyName;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${companyName}`,
    url: "/about",
    mainEntity: organizationJsonLd({
      name: companyName,
      description: FALLBACK_SITE.defaultSeoDescription,
      email: settings?.email || undefined,
      phone: settings?.phone || undefined,
      address: settings?.address || FALLBACK_SITE.address,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={ABOUT_CONTENT.eyebrow}
        title={ABOUT_CONTENT.hero}
        lede={ABOUT_CONTENT.lede}
        headingId="about-hero-heading"
        primaryCta={{ href: "/contact", label: "Talk to us" }}
        secondaryCta={{ href: "/services", label: "Services" }}
      />
      <SplitSection title={ABOUT_CONTENT.storyTitle} headingId="about-story">
        {ABOUT_CONTENT.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </SplitSection>
      <SplitSection title={ABOUT_CONTENT.missionTitle} headingId="about-mission">
        <p>{ABOUT_CONTENT.mission}</p>
      </SplitSection>
      <SplitSection title={ABOUT_CONTENT.visionTitle} headingId="about-vision">
        <p>{ABOUT_CONTENT.vision}</p>
      </SplitSection>
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-16 sm:py-20" aria-labelledby="about-values">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-brand)]">
            How we behave
          </p>
          <h2
            id="about-values"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight"
          >
            {ABOUT_CONTENT.valuesTitle}
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {ABOUT_CONTENT.values.map((value) => (
              <li key={value.title} className="border-t border-[var(--color-line)] pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl">{value.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-[var(--color-muted)]">{value.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <SplitSection title={ABOUT_CONTENT.approachTitle} headingId="about-approach">
        <ul className="list-disc space-y-3 pl-5">
          {ABOUT_CONTENT.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SplitSection>
      <PageCta companyName={companyName} email={settings?.email || undefined} />
    </>
  );
}
