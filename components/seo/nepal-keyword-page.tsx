import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { OrbitCtaBand, OrbitPageHero, OrbitPremiumTrustStrip } from "@/components/orbit/page-hero";
import type { NepalKeywordPage } from "@/lib/nepal-keyword-pages";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/site-origin";

export function NepalKeywordPageView({ page }: { page: NepalKeywordPage }) {
  const url = absoluteUrl(page.href);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.h1,
        description: page.description,
        url,
        areaServed: { "@type": "Country", name: "Nepal" },
        provider: { "@type": "Organization", name: "Global Orbit Pvt Ltd", url: SITE_ORIGIN },
        serviceType: page.focus,
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="orbit-premium-page min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/services" },
          { name: page.h1, path: page.href },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OrbitPageHero eyebrow="Nepal" title={page.h1} lede={page.lede} headingId="keyword-hero" />
      <OrbitPremiumTrustStrip />
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-14 text-[15px] leading-8 text-white/75 sm:px-6">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-3">
                {paragraph}
              </p>
            ))}
            {section.points?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <section>
          <h2 className="text-2xl font-semibold text-white">Questions</h2>
          <div className="mt-4 space-y-4">
            {page.faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-base font-semibold text-white">{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Related</h2>
          <ul className="mt-4 space-y-2">
            {page.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[#f0c43a] underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <OrbitCtaBand />
    </div>
  );
}
