import type { Metadata } from "next";
import { SERVICE_CATALOG } from "@/lib/content/services";
import { listPublishedServices } from "@/lib/db/services";
import { getSiteSettings } from "@/lib/db/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { ServiceCardList } from "@/components/site/service-card-list";
import { SectionHeading } from "@/components/home/section-heading";
import { Container } from "@/components/ui/container";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Services",
    description:
      "Web development, hosting, SEO, and digital solutions from Global Orbit Nepal—four practices, one accountable team in Kathmandu.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const [settings, dbServices] = await Promise.all([
    getSiteSettings(),
    listPublishedServices(),
  ]);
  const companyName = settings?.companyName || FALLBACK_SITE.companyName;

  const overlay = SERVICE_CATALOG.map((service) => {
    const fromDb = dbServices.find((row) => row.slug === service.slug);
    return {
      slug: service.slug,
      index: service.index,
      title: fromDb?.title || service.title,
      summary: fromDb?.summary || service.summary,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${companyName} services`,
    itemListElement: overlay.map((service, position) => ({
      "@type": "ListItem",
      position: position + 1,
      name: service.title,
      url: `/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Services"
        title="Four practices. One team that stays."
        lede="We will not sell you a department we do not run. Each service has a named page so you can see the problem, the work, and the process before you write."
        headingId="services-hero-heading"
        primaryCta={{ href: "/contact", label: "Start with a brief" }}
        secondaryCta={{ href: "/about", label: "About the firm" }}
      />
      <section className="bg-[var(--color-paper)] py-16 sm:py-20" aria-labelledby="services-list-heading">
        <Container>
          <SectionHeading
            id="services-list-heading"
            eyebrow="Catalogue"
            title="Choose a path"
            description="Cards open a dedicated page. Copy here is editorial; published Service rows in the database override titles and summaries when they exist."
          />
          <div className="mt-12">
            <ServiceCardList items={overlay} />
          </div>
        </Container>
      </section>
      <PageCta companyName={companyName} email={settings?.email || undefined} />
    </>
  );
}
