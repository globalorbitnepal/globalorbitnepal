import Link from "next/link";
import { OrbitFaqList, OrbitTestimonials } from "@/components/orbit/interactive";
import { OrbitCtaBand } from "@/components/orbit/page-hero";
import {
  ORBIT_AUTOMATION,
  ORBIT_INDUSTRIES,
  ORBIT_PROCESS,
  ORBIT_PROJECTS,
  ORBIT_SOFTWARE,
  ORBIT_SOLUTIONS,
  ORBIT_TOOLS,
  ORBIT_WHY,
} from "@/lib/orbit/catalog";

function SectionHead({ id, title, lede }: { id: string; title: string; lede: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <h2 id={id} className="text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-7 text-white/65">{lede}</p>
    </div>
  );
}

export function OrbitHomeView() {
  return (
    <>
      <section className="orbit-net relative overflow-hidden px-4 py-24 text-center sm:py-32" aria-labelledby="home-hero-heading">
        <h1 id="home-hero-heading" className="mx-auto max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Website &amp; Software
          <span className="mt-2 block">
            Development Company <span className="text-[#2ee59d]">in Nepal</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-8 text-white/75">
          Global Orbit is a Nepal-based website and software development company delivering business
          websites, hotel websites, trekking websites, restaurant websites, custom software, ERP
          systems, and SEO services — trusted by businesses across Kathmandu and 15+ countries.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="orbit-btn-gold inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
            Get Free Consultation →
          </Link>
          <Link href="/services" className="orbit-btn-dark inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
            Explore Our Services
          </Link>
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          <span className="text-[#2ee59d]">●</span> Website Development &nbsp;
          <span className="text-[#f0c43a]">●</span> Custom Software &nbsp;
          <span className="text-sky-400">●</span> ERP &amp; SEO Services
        </p>
      </section>

      <section className="border-y border-white/10 bg-[#071533] px-4 py-8" aria-label="Technologies we use">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
          Technologies we use
        </p>
        <p className="mt-3 text-center text-sm font-semibold text-white/80">
          Next.js · Laravel · React · Node.js · WordPress · MySQL · PostgreSQL
        </p>
      </section>

      <section className="px-4 py-16 sm:py-20" aria-labelledby="software-heading">
        <SectionHead
          id="software-heading"
          title="Enterprise Software Products"
          lede="Powerful, ready-to-deploy software solutions built for every industry."
        />
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ORBIT_SOFTWARE.map((item) => (
            <Link key={item.slug} href={item.href} className="orbit-card rounded-2xl p-5 hover:border-[#f0c43a]/50">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.summary}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#f0c43a]">Learn More</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/orbit-software" className="text-sm font-semibold text-[#f0c43a]">
            Explore All Software →
          </Link>
        </div>
      </section>

      <section className="bg-[#071533] px-4 py-16 sm:py-20" aria-labelledby="solutions-heading">
        <SectionHead
          id="solutions-heading"
          title="Complete Digital Solutions For Your Business"
          lede="From stunning websites to top Google rankings — everything you need to dominate online."
        />
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_SOLUTIONS.map((item) => (
            <Link key={item.title} href={item.href} className="orbit-card rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.summary}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="text-sm font-semibold text-[#f0c43a]">
            Explore All Services →
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20" aria-labelledby="why-heading">
        <SectionHead id="why-heading" title="Why Businesses Choose Us" lede="We don't just build websites — we build digital empires" />
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_WHY.map((item) => (
            <article key={item.title} className="orbit-card rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#071533] px-4 py-16 sm:py-20" aria-labelledby="projects-heading">
        <SectionHead
          id="projects-heading"
          title="Projects That Delivered Results"
          lede="Real clients, real numbers — see how we transformed these businesses online."
        />
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ORBIT_PROJECTS.map((item) => (
            <article key={item.title} className="orbit-card rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#f0c43a]">{item.sector}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/65">{item.result}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="text-sm font-semibold text-[#f0c43a]">
            View All Projects →
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20" aria-labelledby="seo-heading">
        <SectionHead
          id="seo-heading"
          title="Real Rankings, Real Traffic"
          lede="Data-driven SEO that delivers measurable results — not just promises."
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <article className="orbit-card rounded-2xl p-6">
            <h3 className="font-semibold text-white">Organic Traffic Growth</h3>
            <p className="mt-1 text-sm text-white/55">Before vs After SEO — Monthly sessions</p>
            <div className="mt-6 flex h-40 items-end gap-8 px-6">
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[32%] rounded-t bg-white/25" />
                <p className="mt-2 text-center text-xs text-white/50">Before</p>
              </div>
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[88%] rounded-t bg-[#2ee59d]" />
                <p className="mt-2 text-center text-xs text-white/50">After</p>
              </div>
            </div>
          </article>
          <article className="orbit-card rounded-2xl p-6">
            <h3 className="font-semibold text-white">Keyword Ranking Improvements</h3>
            <p className="mt-1 text-sm text-white/55">Google SERP position before vs after</p>
            <div className="mt-6 flex h-40 items-end gap-8 px-6">
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[70%] rounded-t bg-white/25" />
                <p className="mt-2 text-center text-xs text-white/50">Pos 18</p>
              </div>
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="h-[18%] rounded-t bg-[#f0c43a]" />
                <p className="mt-2 text-center text-xs text-white/50">Pos 3</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#071533] px-4 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-semibold text-white">Trusted By Businesses Across 15+ Countries</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/65">
          Helping brands grow globally through development, SEO, and digital marketing.
        </p>
      </section>

      <section className="px-4 py-16 sm:py-20" aria-labelledby="auto-heading">
        <SectionHead
          id="auto-heading"
          title="Work Smarter, Not Harder"
          lede="Intelligent automation that runs 24/7 — growing your business while you sleep."
        />
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_AUTOMATION.map((item) => (
            <article key={item.title} className="orbit-card rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#071533] px-4 py-16 sm:py-20" aria-labelledby="industries-heading">
        <SectionHead
          id="industries-heading"
          title="We Serve All Industries"
          lede="Specialized expertise across 12+ verticals — deep knowledge of your market."
        />
        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {ORBIT_INDUSTRIES.map((item) => (
            <li key={item} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 py-16 sm:py-20" aria-labelledby="tools-heading">
        <SectionHead
          id="tools-heading"
          title="Tools We Master"
          lede="Industry-leading technologies chosen for performance, scalability, and results."
        />
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(ORBIT_TOOLS).map(([group, tools]) => (
            <article key={group} className="orbit-card rounded-2xl p-5">
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

      <section className="bg-[#071533] px-4 py-16 sm:py-20" aria-labelledby="process-heading">
        <SectionHead id="process-heading" title="How We Work" lede="A streamlined, transparent process that delivers results on time" />
        <ol className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_PROCESS.map((item, index) => (
            <li key={item.title} className="orbit-card rounded-2xl p-5">
              <p className="text-xs font-semibold text-[#f0c43a]">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-4 py-16 sm:py-20" aria-labelledby="reviews-heading">
        <SectionHead id="reviews-heading" title="What Our Clients Say" lede="" />
        <OrbitTestimonials />
      </section>

      <section className="bg-[#071533] px-4 py-16 sm:py-20" aria-labelledby="faq-heading">
        <SectionHead
          id="faq-heading"
          title="Frequently Asked Questions"
          lede="Everything you need to know about working with Global Orbit."
        />
        <OrbitFaqList />
      </section>

      <OrbitCtaBand />
    </>
  );
}
