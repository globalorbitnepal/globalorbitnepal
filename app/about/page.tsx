import Link from "next/link";
import type { Metadata } from "next";
import { AboutReveal } from "@/components/about/reveal";
import { buildPageMetadata } from "@/lib/seo";

const JOURNEY = [
  ["2016", "Founded in Nepal", "Started as a web development team in Kathmandu with a passion for premium digital experiences."],
  ["2018", "SEO Division Launched", "Expanded to provide comprehensive SEO and Google ranking services across Nepal."],
  ["2020", "International Clients", "Began serving businesses from USA, UK, UAE, Australia and more."],
  ["2022", "Software Products Launched", "Developed and launched our own line of ERP and business management software products."],
  ["2024", "250+ Projects Delivered", "Reached the milestone of 250 successful digital projects worldwide."],
  ["2025", "Expanding Globally", "Continuing rapid growth, serving businesses across 15+ countries."],
] as const;

const STATS = [
  ["250+", "Projects Completed"],
  ["120+", "SEO Clients"],
  ["15+", "Countries"],
  ["9+", "Years Experience"],
] as const;

const TEAM = [
  ["CEO & Founder", "Strategy & Vision", "◈"],
  ["Lead Developer", "Technology & Innovation", "</>"],
  ["SEO Director", "SEO & Digital Marketing", "⌁"],
  ["Design Lead", "UI/UX & Branding", "✦"],
] as const;

const REASONS = [
  "9+ years of proven experience serving Nepal & international clients",
  "Data-driven SEO strategies for sustainable growth",
  "Ultra-fast websites under 1 second load",
  "Dedicated project manager for every client",
  "Transparent pricing — no hidden fees",
  "Ongoing support after project delivery",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About Us",
    description: "Global Orbit Pvt Ltd is a Nepal-based software company providing ERP software, business management systems, web development, and SEO services.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#021430] text-white">
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-32 text-center sm:px-6 lg:px-8">
        <div className="orbit-about-orb pointer-events-none absolute left-1/2 top-10 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-500/[0.08] blur-[120px]" />
        <div className="orbit-about-grid pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
        <div className="mx-auto max-w-7xl">
          <span className="orbit-about-reveal mb-6 inline-block rounded-full border border-amber-400/30 bg-amber-400/[0.12] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">About Us</span>
          <h1 className="orbit-about-reveal orbit-about-delay-1 mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">Nepal&apos;s Trusted </span><span className="bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent [filter:drop-shadow(0_0_12px_rgba(251,191,36,0.4))]">Software Company</span><br />
            <span className="text-white">Crafting Digital Excellence </span><span className="bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent [filter:drop-shadow(0_0_12px_rgba(251,191,36,0.4))]">Since 2016</span>
          </h1>
          <p className="orbit-about-reveal orbit-about-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">Global Orbit Pvt Ltd is a Nepal-based software company providing ERP software, business management systems, web development, and SEO services. Based in Kathmandu, we serve businesses across Nepal and 15+ countries worldwide.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <AboutReveal className="h-full"><article className="group relative flex h-full items-start gap-5 overflow-hidden rounded-2xl border border-sky-400/[0.15] bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-300/40 hover:shadow-[0_20px_60px_rgba(56,189,248,0.12)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl transition group-hover:bg-sky-400/25" />
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/[0.1] text-2xl text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.13)]">◎</div>
            <div><h2 className="mb-2 text-xl font-bold">Our Mission</h2><p className="text-sm leading-relaxed text-white/55">To deliver world-class digital solutions that empower businesses to grow, innovate, and succeed in the global marketplace.</p></div>
          </article></AboutReveal>
          <AboutReveal className="h-full" delay={120}><article className="group relative flex h-full items-start gap-5 overflow-hidden rounded-2xl border border-amber-400/[0.15] bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_20px_60px_rgba(251,191,36,0.12)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl transition group-hover:bg-amber-400/25" />
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.1] text-2xl text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.13)]">◉</div>
            <div><h2 className="mb-2 text-xl font-bold">Our Vision</h2><p className="text-sm leading-relaxed text-white/55">To become the most trusted digital agency in South Asia, known for premium quality, innovation, and exceptional results.</p></div>
          </article></AboutReveal>
        </div>
      </section>

      <section className="relative py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.045] blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center lg:mb-16">
            <span className="mb-5 inline-block rounded-full border border-amber-400/30 bg-amber-400/[0.12] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Our Journey</span>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.2rem]"><span>From Nepal to </span><span className="bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">The World</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 sm:text-lg">A story of passion, innovation, and relentless pursuit of excellence</p>
          </header>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute bottom-0 left-[1.75rem] top-0 w-0.5 bg-gradient-to-b from-transparent via-sky-400/50 via-amber-400/50 to-transparent" />
            <div className="space-y-7">
              {JOURNEY.map(([year, title, body], index) => <AboutReveal key={year} delay={index * 90}><article className="relative flex gap-6 pl-2"><div className="relative z-10 flex shrink-0"><div className="orbit-about-pulse flex h-9 w-9 items-center justify-center rounded-full border border-sky-200/30 bg-gradient-to-br from-sky-400 to-sky-600 text-xs text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]">✦</div></div><div className="group flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.07]"><div className="flex items-center justify-between gap-4"><span className="text-sm font-bold text-sky-400">{year}</span><span className="text-xs uppercase tracking-[0.18em] text-white/25 transition group-hover:text-sky-300/70">Milestone</span></div><h3 className="mt-1 text-base font-bold">{title}</h3><p className="mt-1 text-sm text-white/50">{body}</p></div></article></AboutReveal>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[0.06] py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map(([value, label], index) => <AboutReveal key={label} delay={index * 100}><div className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.07]"><p className="text-4xl font-bold text-amber-400 drop-shadow-[0_0_18px_rgba(251,191,36,0.22)] sm:text-5xl">{value}</p><p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">{label}</p></div></AboutReveal>)}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center lg:mb-16"><span className="mb-5 inline-block rounded-full border border-amber-400/30 bg-amber-400/[0.12] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Our Team</span><h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.2rem]">Expert Professionals</h2><p className="mx-auto mt-4 max-w-2xl text-base text-white/60 sm:text-lg">A talented team of developers, designers, and SEO specialists</p></header>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map(([role, specialty, icon], index) => <AboutReveal key={role} delay={index * 100}><article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-amber-400/40 hover:shadow-[0_24px_60px_rgba(2,8,23,0.45)]"><div className="pointer-events-none absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl transition group-hover:bg-amber-400/20" /><div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-sky-400/30 bg-gradient-to-br from-sky-400/20 to-amber-400/20 text-2xl text-amber-300 shadow-[0_0_28px_rgba(56,189,248,0.12)]">{icon}</div><h3 className="relative mt-5 text-lg font-bold">{role}</h3><p className="relative mt-2 text-sm text-white/50">{specialty}</p></article></AboutReveal>)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><span className="mb-5 inline-block rounded-full border border-amber-400/30 bg-amber-400/[0.12] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Why Global Orbit</span><h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.2rem]">Why Choose Us?</h2></div>
          <ul className="grid gap-3 sm:grid-cols-2">{REASONS.map((reason) => <li key={reason} className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 text-sm text-white/70 backdrop-blur-xl transition hover:border-sky-400/30 hover:bg-white/[0.07]"><span className="text-lg text-amber-400 transition group-hover:scale-110">✓</span><span>{reason}</span></li>)}</ul>
        </div>
      </section>

      <section className="orbit-net px-4 py-16 text-center sm:px-6 lg:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Ready To Grow Your Business Online?</h2>
        <p className="mt-5 text-white/60">Let&apos;s build something extraordinary together. Free consultation — no commitment.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/contact" className="orbit-btn-gold inline-flex h-12 items-center rounded-full px-7 text-sm font-bold">Contact Now</Link><Link href="/contact" className="orbit-btn-glass inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold text-white">Get Free Consultation</Link></div>
      </section>

    </main>
  );
}
