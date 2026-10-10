import Link from "next/link";
import { OrbitCountryFlags } from "@/components/orbit/flags";
import { OrbitFaqList, OrbitTestimonials } from "@/components/orbit/interactive";
import { OrbitOfficesSection } from "@/components/orbit/offices-section";
import { OrbitStudioMadeShowcase } from "@/components/orbit/studio-made-showcase";
import { OrbitStudioProcessSection } from "@/components/orbit/studio-process-section";
import { OrbitSoftwareSection } from "@/components/orbit/software-section";
import { OrbitStudioHero } from "@/components/orbit/studio-hero";
import { OrbitStudioNeed } from "@/components/orbit/studio-need";
import { OrbitStudioServicesShowcase } from "@/components/orbit/studio-services-showcase";
import { OrbitStudioWhatWeDo } from "@/components/orbit/studio-what-we-do";
import { OrbitStudioWhy } from "@/components/orbit/studio-why";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig } from "@/lib/need-config";
import type { WorkConfig } from "@/lib/work-config";
import type { SoftwareConfig } from "@/lib/software-config";
import type { HomeSurfaceConfig } from "@/lib/home-surface-config";
import { DEFAULT_HOME_SURFACE } from "@/lib/home-surface-config";

function DisplayHead({
  id,
  title,
  lede,
  wide = false,
}: {
  id: string;
  title: string;
  lede?: string;
  wide?: boolean;
}) {
  return (
    <div className={`mx-auto mb-12 text-center${wide ? " orbit-home-section-head" : " max-w-4xl"}`}>
      <h2
        id={id}
        className="font-[family-name:var(--font-jakarta)] text-[clamp(1.85rem,5vw,3.2rem)] font-semibold tracking-tight text-white text-balance"
      >
        {title}
      </h2>
      {lede ? <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-8 text-white/62">{lede}</p> : null}
    </div>
  );
}

export function OrbitStudioHome({
  hero,
  need,
  work,
  software,
  surface = DEFAULT_HOME_SURFACE,
}: {
  hero: HeroConfig;
  need: NeedConfig;
  work: WorkConfig;
  software: SoftwareConfig;
  surface?: HomeSurfaceConfig;
}) {
  return (
    <div className="orbit-studio-home">
      <OrbitStudioHero config={hero} />

      <OrbitStudioNeed config={need} />

      <OrbitStudioServicesShowcase />

      <OrbitStudioWhatWeDo config={work} />

      <OrbitSoftwareSection config={software} />

      <OrbitStudioProcessSection surface={surface} />

      <OrbitStudioMadeShowcase surface={surface} />

      <OrbitOfficesSection />

      <div className="orbit-home-wide-stack">
      <section className="orbit-studio-surface px-4 py-16 sm:px-8" aria-labelledby="countries-heading">
        <h2 id="countries-heading" className="sr-only">
          Markets we serve
        </h2>
        <OrbitCountryFlags />
      </section>

      <section
        className="orbit-studio-surface overflow-x-clip px-4 py-20 sm:px-8 sm:py-24"
        aria-labelledby="why-heading"
      >
        <DisplayHead id="why-heading" wide title={surface.whyTitle} />
        <OrbitStudioWhy />
      </section>

      <section className="orbit-studio-surface px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="reviews-heading">
        <DisplayHead id="reviews-heading" wide title={surface.reviewsTitle} />
        <OrbitTestimonials />
      </section>

      <section className="orbit-studio-surface px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="faq-heading">
        <DisplayHead id="faq-heading" wide title={surface.faqTitle} lede={surface.faqLede} />
        <OrbitFaqList />
      </section>

      <section className="orbit-studio-surface orbit-studio-cta relative overflow-hidden px-4 py-24 text-center sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,196,58,0.12),transparent_55%)]" />
        <h2 className="relative font-[family-name:var(--font-jakarta)] text-[clamp(1.9rem,5vw,3.4rem)] font-semibold tracking-tight text-white text-balance">
          {surface.ctaTitle}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/65 text-pretty">{surface.ctaLede}</p>
        <Link
          href="/contact"
          className="relative mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 text-sm font-semibold text-[#0b0b10]"
        >
          {surface.ctaButtonLabel}
        </Link>
      </section>
      </div>
    </div>
  );
}
