import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, isServiceSlug, SERVICE_CATALOG } from "@/lib/content/services";
import { getPublishedServiceBySlug } from "@/lib/db/services";
import { getSiteSettings } from "@/lib/db/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { ProcessList } from "@/components/site/process-list";
import { SplitSection } from "@/components/site/split-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICE_CATALOG.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getServiceBySlug(slug);
  if (!catalog) {
    return { title: "Service" };
  }
  const db = await getPublishedServiceBySlug(slug);
  return buildPageMetadata({
    title: db?.title ? `${db.title}` : catalog.seoTitle,
    description: db?.summary || catalog.seoDescription,
    path: `/services/${catalog.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) {
    notFound();
  }

  const catalog = getServiceBySlug(slug);
  if (!catalog) {
    notFound();
  }

  const [settings, db] = await Promise.all([
    getSiteSettings(),
    getPublishedServiceBySlug(slug),
  ]);
  const companyName = settings?.companyName || FALLBACK_SITE.companyName;
  const title = db?.title || catalog.title;
  const summary = db?.summary || catalog.summary;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: summary,
    provider: {
      "@type": "Organization",
      name: companyName,
    },
    areaServed: "NP",
    url: `/services/${catalog.slug}`,
  };

  const siblings = SERVICE_CATALOG.filter((item) => item.slug !== catalog.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={`Service ${catalog.index}`}
        title={catalog.hero}
        lede={summary}
        headingId="service-hero-heading"
        primaryCta={{ href: "/contact", label: "Discuss this work" }}
        secondaryCta={{ href: "/services", label: "All services" }}
      />
      <SplitSection title={catalog.needTitle} headingId="service-need">
        <p>{catalog.need}</p>
      </SplitSection>
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-16 sm:py-20" aria-labelledby="service-provide">
        <Container>
          <h2
            id="service-provide"
            className="font-[family-name:var(--font-display)] text-3xl tracking-tight"
          >
            {catalog.provideTitle}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {catalog.provide.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--background)] p-6 text-[0.95rem] leading-7 text-[var(--color-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-16 sm:py-20" aria-labelledby="service-process">
        <Container>
          <h2
            id="service-process"
            className="font-[family-name:var(--font-display)] text-3xl tracking-tight"
          >
            {catalog.processTitle}
          </h2>
          <div className="mt-10">
            <ProcessList items={[...catalog.process]} />
          </div>
        </Container>
      </section>
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-16 sm:py-20" aria-labelledby="service-benefits">
        <Container>
          <h2
            id="service-benefits"
            className="font-[family-name:var(--font-display)] text-3xl tracking-tight"
          >
            {catalog.benefitsTitle}
          </h2>
          <ul className="mt-8 list-disc space-y-3 pl-5 text-[0.95rem] leading-7 text-[var(--color-muted)]">
            {catalog.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-10">
            <ButtonLink href="/contact">Request a conversation</ButtonLink>
          </p>
        </Container>
      </section>
      <section className="py-16" aria-labelledby="other-services">
        <Container>
          <h2
            id="other-services"
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
          >
            Other services
          </h2>
          <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {siblings.map((item) => (
              <li key={item.slug}>
                <ButtonLink href={`/services/${item.slug}`} variant="ghost">
                  {item.title}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <PageCta companyName={companyName} email={settings?.email || undefined} />
    </>
  );
}
