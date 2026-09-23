import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { OrbitCountryFlags } from "@/components/orbit/flags";
import { OrbitCtaBand } from "@/components/orbit/page-hero";
import { OrbitOfficesSection } from "@/components/orbit/offices-section";
import { ABOUT_CONTENT } from "@/lib/content/about";
import { buildPageMetadata } from "@/lib/seo";

const SIGNALS = [
  { value: "Kathmandu", label: "Home base" },
  { value: "End-to-end", label: "Design to operations" },
  { value: "25 countries", label: "Working radius" },
  { value: "One team", label: "Named ownership" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About Us",
    description:
      "Global Orbit Pvt Ltd — websites, apps, ERP, SaaS and SEO from offices in Nepal, India and the United States.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <section className="orbit-net relative isolate overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_82%_34%,rgba(240,196,58,0.12),transparent_30%)]" />
        <div className="orbit-neural pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative z-[1] mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="orbit-kicker">The company / 01</p>
            <h1
              id="about-hero"
              className="orbit-headline mt-5 max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.94] text-white"
            >
              A local centre of gravity.
              <span className="orbit-headline-ai mt-2 block">A global working radius.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[15px] leading-8 text-white/70 sm:text-lg sm:leading-9">
              {ABOUT_CONTENT.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="orbit-btn-gold inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
                Start a conversation <span className="ml-2">→</span>
              </Link>
              <Link href="/services" className="orbit-btn-dark inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
                Explore our work
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="orbit-glass-strong relative overflow-hidden rounded-[32px] p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[25px]">
                <Image
                  src="/brand/offices/world-bg.jpg"
                  alt="Global Orbit's connected offices across the world"
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 46vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a16] via-[#040a16]/25 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_44%,rgba(125,211,252,0.18),transparent_24%),radial-gradient(circle_at_65%_58%,rgba(240,196,58,0.18),transparent_25%)]" />
                <div className="absolute left-[36%] top-[43%] h-3 w-3 rounded-full bg-[#f0c43a] shadow-[0_0_0_8px_rgba(240,196,58,0.16),0_0_28px_rgba(240,196,58,0.9)]" />
                <div className="absolute left-[62%] top-[57%] h-3 w-3 rounded-full bg-[#7dd3fc] shadow-[0_0_0_8px_rgba(125,211,252,0.14),0_0_28px_rgba(125,211,252,0.85)]" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f0c43a]">Global Orbit Pvt Ltd</p>
                  <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">Built in Nepal. Accountable anywhere.</p>
                </div>
              </div>
            </div>
            <div className="orbit-glass absolute -bottom-5 -left-3 rounded-2xl px-4 py-3 sm:-left-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Operating principle</p>
              <p className="mt-1 text-sm font-semibold text-white">Finished systems over polished decks.</p>
            </div>
          </div>
        </div>
        <div className="relative z-[1] mx-auto mt-16 grid max-w-[1280px] grid-cols-2 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.045] backdrop-blur-xl sm:grid-cols-4">
          {SIGNALS.map((signal, index) => (
            <div key={signal.label} className={`px-4 py-5 sm:px-6 sm:py-6 ${index > 0 ? "border-l border-white/10" : ""}`}>
              <p className="text-lg font-bold text-[#f0c43a] sm:text-2xl">{signal.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">{signal.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-12 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="orbit-kicker">The story / 02</p>
            <h2 className="mt-4 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Serious build-and-operate work from Nepal.
            </h2>
          </div>
          <div className="space-y-6 text-[15px] leading-8 text-white/70 sm:text-base lg:col-span-8">
            {ABOUT_CONTENT.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="orbit-glass mt-10 grid gap-5 rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f0c43a]">What we ship</p>
                <p className="mt-3 text-lg font-semibold leading-7 text-white">Websites, apps, ERP, billing, SaaS, and SEO that survive real use.</p>
              </div>
              <div className="border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7dd3fc]">What we protect</p>
                <p className="mt-3 text-lg font-semibold leading-7 text-white">Clarity, ownership, production data, and the team that has to run it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="orbit-solutions-dots relative overflow-hidden border-y border-white/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="mission-heading">
        <div className="relative mx-auto max-w-[1180px]">
          <div className="max-w-2xl">
            <p className="orbit-kicker">The direction / 03</p>
            <h2 id="mission-heading" className="mt-4 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              A company with a point of view.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="orbit-soft-card rounded-[26px] p-7 sm:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f0c43a]">Mission</p>
              <h3 className="mt-5 text-2xl font-bold text-white">{ABOUT_CONTENT.missionTitle}</h3>
              <p className="mt-4 text-[15px] leading-8 text-white/68">{ABOUT_CONTENT.mission}</p>
            </article>
            <article className="orbit-soft-card rounded-[26px] p-7 sm:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7dd3fc]">Vision</p>
              <h3 className="mt-5 text-2xl font-bold text-white">{ABOUT_CONTENT.visionTitle}</h3>
              <p className="mt-4 text-[15px] leading-8 text-white/68">{ABOUT_CONTENT.vision}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="values-heading">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="orbit-kicker">The standard / 04</p>
              <h2 id="values-heading" className="mt-4 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                How we behave.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/60">The details are the culture. These are the promises that shape the work before the first pixel ships.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_CONTENT.values.map((value, index) => (
              <article key={value.title} className="orbit-card relative overflow-hidden rounded-3xl p-6 sm:min-h-[255px]">
                <span className="text-4xl font-bold text-white/10">0{index + 1}</span>
                <h3 className="mt-8 text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#040a16] px-4 py-20 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="approach-heading">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(240,196,58,0.13),transparent_26%),radial-gradient(circle_at_10%_90%,rgba(56,189,248,0.12),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="orbit-kicker">The approach / 05</p>
            <h2 id="approach-heading" className="mt-4 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Calm, clear, accountable.
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-white/65">A good engagement should make the next decision easier, not create another layer of mystery.</p>
            <Link href="/contact" className="orbit-btn-gold mt-8 inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">Talk to the studio →</Link>
          </div>
          <ol className="space-y-4">
            {ABOUT_CONTENT.approach.map((step, index) => (
              <li key={step} className="orbit-glass flex gap-5 rounded-2xl p-5 sm:gap-7 sm:p-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0c43a] text-sm font-bold text-[#1a1408]">0{index + 1}</span>
                <p className="pt-1 text-[15px] leading-7 text-white/78">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <OrbitOfficesSection />
      <OrbitCountryFlags />
      <OrbitCtaBand />
    </>
  );
}
