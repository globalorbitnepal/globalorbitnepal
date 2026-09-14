import Link from "next/link";
import { TECH_MARKS } from "@/components/home/tech-marks";
import { OrbitCountryFlags, OrbitFlag } from "@/components/orbit/flags";
import { OrbitHomeHero } from "@/components/orbit/home-hero";
import { OrbitFaqList, OrbitTestimonials } from "@/components/orbit/interactive";
import { OrbitCtaBand } from "@/components/orbit/page-hero";
import { OrbitSoftwareSection } from "@/components/orbit/software-section";
import { OrbitSolutionsSection } from "@/components/orbit/solutions-section";
import { HOME_TECHNOLOGIES } from "@/lib/home-content";
import { ORBIT_BRAND } from "@/lib/orbit/brand";
import {
  ORBIT_AUTOMATION,
  ORBIT_INDUSTRIES,
  ORBIT_PROCESS,
  ORBIT_PROJECTS,
  ORBIT_TOOLS,
  ORBIT_WHY,
} from "@/lib/orbit/catalog";

function SectionHead({ id, title, lede }: { id: string; title: string; lede: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="orbit-kicker">Global Orbit</p>
      <h2 id={id} className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <div className="orbit-gold-rule" />
      {lede ? <p className="mt-5 text-[16px] leading-8 text-white/62">{lede}</p> : null}
    </div>
  );
}

export function OrbitHomeView() {
  return (
    <>
      <OrbitHomeHero />

      <section className="border-y border-white/10 bg-[#071533]/80 px-4 py-10 backdrop-blur-xl" aria-label="Technologies we use">
        <p className="orbit-kicker text-center">The stack we ship in</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
          {HOME_TECHNOLOGIES.map((name) => {
            const Mark = TECH_MARKS[name];
            return (
              <span key={name} className="inline-flex items-center gap-2 text-sm font-semibold text-white/88">
                {Mark ? <Mark className="h-6 w-6" /> : null}
                {name}
              </span>
            );
          })}
        </div>
      </section>

      <OrbitSoftwareSection />

      <OrbitSolutionsSection />

      <section className="px-4 py-20 sm:py-24" aria-labelledby="offices-heading">
        <SectionHead
          id="offices-heading"
          title="Three offices. One standard."
          lede="Work originates in Kathmandu, India, and the United States — not a single-city shop pretending to be global."
        />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {ORBIT_BRAND.offices.map((office) => (
            <article key={office.code} className="orbit-card rounded-[28px] px-8 py-10 text-center">
              <span className="mx-auto inline-flex ring-2 ring-[#f0c43a]/50 rounded-full">
                <OrbitFlag code={office.code} name={office.country} size={72} rounded="full" />
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-white">{office.country}</h3>
              {office.name !== office.country ? (
                <p className="mt-1 text-sm text-white/55">{office.name}</p>
              ) : null}
              <p className="mt-3 text-sm leading-6 text-white/70">{office.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#071533]/60 px-4 py-20 sm:py-24" aria-labelledby="why-heading">
        <SectionHead
          id="why-heading"
          title="Why operators stay"
          lede="Speed, structure, and aftercare — the unglamorous reasons a site still works on a Tuesday."
        />
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_WHY.map((item) => (
            <article key={item.title} className="orbit-card rounded-[22px] p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:py-24" aria-labelledby="projects-heading">
        <SectionHead
          id="projects-heading"
          title="Twenty-five sites on the record"
          lede="Hotels, treks, restaurants, hospitals, factories, billing SaaS, and partner portals — each with the market flag."
        />
        <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ORBIT_PROJECTS.map((item) => (
            <article key={item.title} className="orbit-card rounded-[22px] p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#f0c43a]">{item.sector}</p>
                <OrbitFlag code={item.country} name={item.country} size={22} />
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug text-white">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-5 text-white/60">{item.result}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="text-sm font-semibold text-[#f0c43a]">
            Open the full portfolio →
          </Link>
        </div>
      </section>

      <section className="bg-[#071533]/60 px-4 py-20 sm:py-24" aria-labelledby="seo-heading">
        <SectionHead
          id="seo-heading"
          title="Rankings you can audit"
          lede="Before / after is shown as structure, not a screenshot of someone else’s Search Console."
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <article className="orbit-card rounded-[22px] p-7">
            <h3 className="font-semibold text-white">Organic traffic</h3>
            <p className="mt-1 text-sm text-white/50">Monthly sessions, typical programme</p>
            <div className="mt-8 flex h-44 items-end gap-10 px-8">
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[34%] rounded-t-lg bg-white/20" />
                <p className="mt-2 text-center text-xs text-white/45">Before</p>
              </div>
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[90%] rounded-t-lg bg-[#2ee59d]" />
                <p className="mt-2 text-center text-xs text-white/45">After</p>
              </div>
            </div>
          </article>
          <article className="orbit-card rounded-[22px] p-7">
            <h3 className="font-semibold text-white">Keyword position</h3>
            <p className="mt-1 text-sm text-white/50">Average target term</p>
            <div className="mt-8 flex h-44 items-end gap-10 px-8">
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[72%] rounded-t-lg bg-white/20" />
                <p className="mt-2 text-center text-xs text-white/45">Pos 18</p>
              </div>
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[20%] rounded-t-lg bg-[#f0c43a]" />
                <p className="mt-2 text-center text-xs text-white/45">Pos 3</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-20 sm:py-24" aria-labelledby="countries-heading">
        <div id="countries-heading" className="sr-only">
          Markets
        </div>
        <OrbitCountryFlags />
      </section>

      <section className="bg-[#071533]/60 px-4 py-20 sm:py-24" aria-labelledby="auto-heading">
        <SectionHead
          id="auto-heading"
          title="Operations that run after midnight"
          lede="Chat, workflow, content, reporting, email, and CRM — connected so the site is not a dead brochure."
        />
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_AUTOMATION.map((item) => (
            <article key={item.title} className="orbit-card rounded-[22px] p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:py-24" aria-labelledby="industries-heading">
        <SectionHead
          id="industries-heading"
          title="Industries we already know"
          lede="Hospitality, trekking, restaurants, manufacturing, education, health, logistics."
        />
        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {ORBIT_INDUSTRIES.map((item) => (
            <li key={item} className="orbit-card rounded-full px-5 py-2.5 text-sm text-white/80">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#071533]/60 px-4 py-20 sm:py-24" aria-labelledby="tools-heading">
        <SectionHead
          id="tools-heading"
          title="Tools chosen for production"
          lede="Frontend, backend, commerce, and marketing — picked for the job, not a trend slide."
        />
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(ORBIT_TOOLS).map(([group, tools]) => (
            <article key={group} className="orbit-card rounded-[22px] p-6">
              <h3 className="font-semibold text-[#f0c43a]">{group}</h3>
              <ul className="mt-3 space-y-1 text-sm text-white/75">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:py-24" aria-labelledby="process-heading">
        <SectionHead id="process-heading" title="How work moves" lede="Six stages. Named owner. No silent handoff." />
        <ol className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_PROCESS.map((item, index) => (
            <li key={item.title} className="orbit-card rounded-[22px] p-6">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#f0c43a]">0{index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#071533]/60 px-4 py-20 sm:py-24" aria-labelledby="reviews-heading">
        <SectionHead id="reviews-heading" title="What clients say" lede="Operators, not anonymous five-star widgets." />
        <OrbitTestimonials />
      </section>

      <section className="px-4 py-20 sm:py-24" aria-labelledby="faq-heading">
        <SectionHead
          id="faq-heading"
          title="Questions we answer on the first call"
          lede="Cost, timelines, stack, maintenance, and whether we are the right firm."
        />
        <OrbitFaqList />
      </section>

      <OrbitCtaBand />
    </>
  );
}
