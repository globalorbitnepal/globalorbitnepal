import Image from "next/image";
import Link from "next/link";
import { TECH_MARKS } from "@/components/home/tech-marks";
import { OrbitCountryFlags, OrbitFlag } from "@/components/orbit/flags";
import { OrbitFaqList, OrbitTestimonials } from "@/components/orbit/interactive";
import { OrbitOfficesSection } from "@/components/orbit/offices-section";
import { OrbitSoftwareSection } from "@/components/orbit/software-section";
import { OrbitStudioHero } from "@/components/orbit/studio-hero";
import { OrbitStudioWhy } from "@/components/orbit/studio-why";
import type { HeroConfig } from "@/lib/hero-config";
import { HOME_TECHNOLOGIES } from "@/lib/home-content";
import {
  ORBIT_PROCESS,
  ORBIT_PROJECTS,
} from "@/lib/orbit/catalog";

const STATS = [
  { value: "75%", label: "Of first impressions about a business come from its website, app, and search listing." },
  { value: "3×", label: "Revenue lift is typical when a brochure site becomes a product people can actually use." },
  { value: "99%", label: "Of users will not reopen an app after a bad first experience." },
  { value: "5s", label: "If a page or app takes longer than five seconds, most people leave." },
] as const;

const SERVICES = [
  {
    title: "Website Development",
    body: "Fast, SEO-ready marketing sites and platforms on Next.js, Laravel, and WordPress.",
    href: "/service/website-development-nepal",
    image: "/brand/studio-service-web.jpg",
  },
  {
    title: "App Development",
    body: "Custom web and mobile apps — bookings, field teams, portals, React Native and Next.js.",
    href: "/orbit-software/custom-apps",
    image: "/brand/studio-service-apps.jpg",
  },
  {
    title: "SEO Services",
    body: "Technical, on-page, and content SEO so you get found on Google — not skipped.",
    href: "/packages/seo-growth",
    image: "/brand/studio-service-seo.jpg",
  },
] as const;

const MORE_SERVICES = [
  { title: "UI/UX Design", body: "Interfaces and journeys that convert, not just decorate.", href: "/services" },
  { title: "ERP & SaaS", body: "Billing, hotels, warehouses, CRM — software operators actually run.", href: "/orbit-software" },
  { title: "Ecommerce", body: "Stores that check out, rank, and stay fast under load.", href: "/service/ecommerce-development-nepal" },
  { title: "Cloud & Hosting", body: "Secure, reliable infrastructure with business email.", href: "/services" },
  { title: "Next.js Engineering", body: "SEO-friendly web apps and platforms on the stack we ship daily.", href: "/services" },
  { title: "Ongoing Support", body: "Care plans after launch — updates, rankings, and new features.", href: "/contact" },
] as const;

const FEATURED = ORBIT_PROJECTS.slice(0, 4);

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

export function OrbitStudioHome({ hero }: { hero: HeroConfig }) {
  return (
    <>
      <OrbitStudioHero config={hero} />

      <section className="border-y border-white/8 bg-[#09090f] px-4 py-8 sm:px-8" aria-label="Technologies">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {HOME_TECHNOLOGIES.map((name) => {
            const Mark = TECH_MARKS[name];
            return (
              <span key={name} className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/70">
                {Mark ? <Mark className="h-5 w-5 opacity-80" /> : null}
                {name}
              </span>
            );
          })}
        </div>
      </section>

      <section className="bg-[#07070b] px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="need-heading">
        <DisplayHead
          id="need-heading"
          kicker="Why you need us"
          title="Design, product, and search decide whether people stay."
        />
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((item) => (
            <article key={item.value} className="orbit-studio-glass rounded-[24px] p-6">
              <p className="font-[family-name:var(--font-jakarta)] text-[2.6rem] font-semibold tracking-tight text-white">
                {item.value}
              </p>
              <p className="mt-3 text-[14px] leading-6 text-white/62">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-[#07070b] px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-[1100px] space-y-16 text-center">
          <h2 className="font-[family-name:var(--font-jakarta)] text-[clamp(1.7rem,4.6vw,3.1rem)] font-semibold leading-[1.15] tracking-tight text-white">
            We blend strategy, design, and code to transform your vision into a product that keeps users{" "}
            <span className="text-[#f0c43a]">hooked</span>.
          </h2>
          <h2 className="font-[family-name:var(--font-jakarta)] text-[clamp(1.7rem,4.6vw,3.1rem)] font-semibold leading-[1.15] tracking-tight text-white">
            In-house designers, developers, and SEO specialists — applications and websites that{" "}
            <span className="text-[#f0c43a]">stand out</span>.
          </h2>
        </div>
      </section>

      <section className="bg-[#07070b] px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="services-heading">
        <DisplayHead
          id="services-heading"
          kicker="What we do"
          title="Websites, apps, and SEO — the full stack of growth."
          lede="You should leave this page knowing we build the site, the product, and the ranking — not a slide deck."
        />
        <div className="mx-auto grid max-w-[1200px] gap-5 lg:grid-cols-3">
          {SERVICES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="orbit-studio-glass group overflow-hidden rounded-[28px] transition-transform hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden sm:h-60">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  unoptimized
                  sizes="400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[1.15rem] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-white/62">{item.body}</p>
                <p className="mt-4 text-[13px] font-semibold text-[#f0c43a]">Visit us →</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-5 grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_SERVICES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="orbit-studio-glass rounded-[22px] p-6 transition-colors hover:border-white/25"
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-white/62">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <OrbitSoftwareSection />

      <section className="bg-[#07070b] px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="process-heading">
        <DisplayHead
          id="process-heading"
          kicker="Smooth journey"
          title="From idea to launch — then we stay."
        />
        <ol className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_PROCESS.map((item, index) => (
            <li key={item.title} className="orbit-studio-glass rounded-[24px] p-6">
              <p className="text-[12px] font-semibold tracking-[0.2em] text-[#f0c43a]">0{index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-white/62">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#09090f] px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="work-heading">
        <DisplayHead
          id="work-heading"
          kicker="Made at Global Orbit"
          title="Crafted with purpose, driven by results."
        />
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2">
          {FEATURED.map((item) => (
            <article key={item.title} className="orbit-studio-glass rounded-[24px] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#f0c43a]">{item.sector}</p>
                <OrbitFlag code={item.country} name={item.country} size={22} />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-[1.45rem] font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-white/62">{item.result}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="orbit-studio-glass inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
            Visit the full portfolio
          </Link>
        </div>
      </section>

      <OrbitOfficesSection />

      <section className="px-4 py-16 sm:px-8" aria-labelledby="countries-heading">
        <h2 id="countries-heading" className="sr-only">
          Markets we serve
        </h2>
        <OrbitCountryFlags />
      </section>

      <section className="bg-[#07070b] px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="why-heading">
        <DisplayHead
          id="why-heading"
          title="There are thousands of agencies. Why choose us?"
        />
        <OrbitStudioWhy />
      </section>

      <section className="bg-[#09090f] px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="reviews-heading">
        <DisplayHead id="reviews-heading" title="Our clients speak for us" />
        <OrbitTestimonials />
      </section>

      <section className="bg-[#07070b] px-4 py-20 sm:px-8 sm:py-24" aria-labelledby="faq-heading">
        <DisplayHead
          id="faq-heading"
          title="Frequently asked questions"
          lede="Cost, timelines, stack, SEO, and whether we are the right firm."
        />
        <OrbitFaqList />
      </section>

      <section className="relative overflow-hidden px-4 py-24 text-center sm:px-8 sm:py-28">
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
    </>
  );
}
