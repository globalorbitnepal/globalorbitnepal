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
import { OrbitTechStackStrip } from "@/components/orbit/tech-stack-strip";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig } from "@/lib/need-config";
import type { WorkConfig } from "@/lib/work-config";
import type { SoftwareConfig } from "@/lib/software-config";

function DisplayHead({
  id,
  kicker,
  title,
  lede,
}: {
  id: string;
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-4xl text-center">
      {kicker ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f0c43a]">{kicker}</p>
      ) : null}
      <h2
        id={id}
        className="mt-3 font-[family-name:var(--font-jakarta)] text-[clamp(1.85rem,5vw,3.2rem)] font-semibold tracking-tight text-white"
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
}: {
  hero: HeroConfig;
  need: NeedConfig;
  work: WorkConfig;
  software: SoftwareConfig;
}) {
  return (
    <div className="orbit-studio-home">
      <OrbitStudioHero config={hero} />

      <OrbitStudioNeed config={need} />

      <OrbitStudioServicesShowcase />

      <OrbitTechStackStrip />

      <OrbitStudioWhatWeDo config={work} />

      <OrbitSoftwareSection config={software} />

      <OrbitStudioProcessSection />

      <OrbitStudioMadeShowcase />

      <OrbitOfficesSection />

      <section className="orbit-studio-surface px-4 py-16 sm:px-8" aria-labelledby="countries-heading">
        <h2 id="countries-heading" className="sr-only">
          Markets we serve
        </h2>
        <OrbitCountryFlags />
      </section>

      <section className="orbit-studio-surface px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="why-heading">
        <DisplayHead
          id="why-heading"
          title="There are thousands of agencies. Why choose us?"
        />
        <OrbitStudioWhy />
      </section>

      <section className="orbit-studio-surface px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="reviews-heading">
        <DisplayHead id="reviews-heading" title="Our clients speak for us" />
        <OrbitTestimonials />
      </section>

      <section className="orbit-studio-surface px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="faq-heading">
        <DisplayHead
          id="faq-heading"
          title="Frequently asked questions"
          lede="Cost, timelines, stack, SEO, and whether we are the right firm."
        />
        <OrbitFaqList />
      </section>

      <section className="orbit-studio-surface orbit-studio-cta relative overflow-hidden px-4 py-24 text-center sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,196,58,0.12),transparent_55%)]" />
        <h2 className="relative font-[family-name:var(--font-jakarta)] text-[clamp(1.9rem,5vw,3.4rem)] font-semibold tracking-tight text-white">
          Let’s bring your project to life.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/65">
          Websites, apps, ERP, and SEO from studios in Nepal, India, and the United States.
        </p>
        <Link
          href="/contact"
          className="relative mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 text-sm font-semibold text-[#0b0b10]"
        >
          Start a project
        </Link>
      </section>
    </div>
  );
}
