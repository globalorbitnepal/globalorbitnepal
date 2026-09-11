import type { Metadata } from "next";
import { CONTACT_PLACEHOLDERS } from "@/lib/content/about";
import { getSiteSettings } from "@/lib/db/site-settings";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Contact",
    description:
      "Write to Global Orbit Nepal with a short brief. Enquiries are stored for the team. Public email and phone appear when they have been published in site settings.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const companyName = settings?.companyName || FALLBACK_SITE.companyName;
  const email = settings?.email || "";
  const phone = settings?.phone || "";
  const address = settings?.address || FALLBACK_SITE.address;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${companyName}`,
    mainEntity: organizationJsonLd({
      name: companyName,
      description: FALLBACK_SITE.defaultSeoDescription,
      email: email || undefined,
      phone: phone || undefined,
      address,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Contact"
        title="A brief is more useful than a pitch."
        lede="Say what you run, what must not break, and when you need to be live. If we are the wrong firm, we will say so."
        headingId="contact-hero-heading"
      />
      <section className="py-16 sm:py-20" aria-labelledby="contact-details-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2
                id="contact-details-heading"
                className="font-[family-name:var(--font-display)] text-3xl tracking-tight"
              >
                Reach the firm
              </h2>
              <dl className="mt-8 space-y-6 text-sm leading-7">
                <div>
                  <dt className="uppercase tracking-[0.18em] text-[var(--color-muted)]">Email</dt>
                  <dd className="mt-1">
                    {email ? (
                      <a className="text-[var(--color-brand)]" href={`mailto:${email}`}>
                        {email}
                      </a>
                    ) : (
                      CONTACT_PLACEHOLDERS.emailNote
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.18em] text-[var(--color-muted)]">Phone</dt>
                  <dd className="mt-1">{phone || "Phone number to be published."}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.18em] text-[var(--color-muted)]">Studio</dt>
                  <dd className="mt-1">{address}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.18em] text-[var(--color-muted)]">Hours</dt>
                  <dd className="mt-1">{CONTACT_PLACEHOLDERS.hours}</dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
                Enquiry form
              </h2>
              <p className="mt-3 mb-8 text-[0.95rem] leading-7 text-[var(--color-muted)]">
                Fields map to the Inquiry model. Nothing is emailed automatically from this
                page yet.
              </p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
