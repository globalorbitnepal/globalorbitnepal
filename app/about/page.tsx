import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { OrbitCountryFlags } from "@/components/orbit/flags";
import { OrbitCtaBand } from "@/components/orbit/page-hero";
import { OrbitOfficesSection } from "@/components/orbit/offices-section";
import { ABOUT_CONTENT } from "@/lib/content/about";
import { buildPageMetadata } from "@/lib/seo";

const CAPABILITIES = [
  { number: "01", title: "Web platforms", body: "Digital experiences with the speed, clarity, and confidence to move a business forward.", tone: "gold" },
  { number: "02", title: "Custom software", body: "Useful internal tools and customer portals shaped around how your people actually work.", tone: "blue" },
  { number: "03", title: "ERP & billing", body: "Connected operations for inventory, finance, hospitality, and teams that are ready to grow.", tone: "violet" },
  { number: "04", title: "SaaS products", body: "Thoughtful foundations for products that need to scale beyond a first release.", tone: "green" },
] as const;

const PRINCIPLES = [
  ["01", "Make it understandable", "The best technology gives people confidence. We make the complex feel considered, visible, and easy to own."],
  ["02", "Stay close to reality", "We work with the real constraints of your people, customers, budget, and production environment."],
  ["03", "Remain accountable", "Named ownership does not end at launch. We stay close enough to help the work perform in the real world."],
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About Us",
    description: "Global Orbit Pvt Ltd — digital products, software, ERP, SaaS and SEO from Nepal for ambitious organisations worldwide.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <main className="overflow-hidden bg-[#050505] text-white">
        <section className="relative isolate min-h-[720px] border-b border-white/10 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pb-28 lg:pt-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(240,196,58,0.15),transparent_24%),radial-gradient(circle_at_8%_70%,rgba(56,189,248,0.12),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="relative mx-auto grid max-w-[1380px] items-end gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="relative z-10">
              <p className="orbit-kicker">Global Orbit / About the studio</p>
              <h1 className="orbit-headline mt-7 max-w-5xl text-[clamp(3.4rem,8vw,8.8rem)] leading-[0.86] text-white">
                Built for the
                <span className="orbit-headline-ai block">next horizon.</span>
              </h1>
              <p className="mt-9 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                {ABOUT_CONTENT.lede}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="orbit-btn-gold inline-flex h-13 items-center rounded-full px-7 text-sm font-bold">
                  Start a conversation <span className="ml-3 text-lg">↗</span>
                </Link>
                <Link href="#our-work" className="orbit-btn-glass inline-flex h-13 items-center rounded-full px-7 text-sm font-semibold text-white">
                  See what we do
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[600px] lg:pb-3">
              <div className="absolute -inset-6 rounded-[42px] bg-[#f0c43a]/10 blur-3xl" />
              <div className="orbit-glass-strong relative rounded-[34px] p-2">
                <div className="relative aspect-[0.88] overflow-hidden rounded-[27px]">
                  <Image src="/brand/offices/world-bg.jpg" alt="Global Orbit's international working footprint" fill priority sizes="(max-width:1024px) 100vw, 45vw" className="object-cover object-center" />
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(3,9,20,0.05),rgba(3,9,20,0.82))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_42%,rgba(125,211,252,0.3),transparent_16%),radial-gradient(circle_at_68%_58%,rgba(240,196,58,0.26),transparent_18%)]" />
                  <div className="absolute left-[38%] top-[43%] h-3 w-3 rounded-full bg-[#f0c43a] shadow-[0_0_0_10px_rgba(240,196,58,0.15),0_0_32px_#f0c43a]" />
                  <div className="absolute left-[63%] top-[57%] h-3 w-3 rounded-full bg-[#7dd3fc] shadow-[0_0_0_10px_rgba(125,211,252,0.15),0_0_32px_#7dd3fc]" />
                  <div className="absolute bottom-7 left-7 right-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#f0c43a]">Kathmandu / India / USA</p>
                    <p className="mt-3 max-w-xs text-2xl font-bold leading-tight text-white sm:text-3xl">Local thinking.<br />Global consequence.</p>
                  </div>
                </div>
              </div>
              <div className="orbit-glass absolute -bottom-5 -left-4 rounded-2xl px-4 py-3 sm:-left-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">The principle</p>
                <p className="mt-1 text-sm font-semibold text-white">Ship useful things.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
            <span>Digital products</span><span className="hidden text-[#f0c43a] sm:block">✦</span>
            <span>Operational systems</span><span className="hidden text-[#f0c43a] sm:block">✦</span>
            <span>Search growth</span><span className="hidden text-[#f0c43a] sm:block">✦</span>
            <span>Built in Nepal</span><span className="hidden text-[#f0c43a] sm:block">✦</span>
            <span>Used everywhere</span>
          </div>
        </section>

        <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
            <div>
              <p className="orbit-kicker">01 / The story</p>
              <h2 className="mt-6 max-w-md font-[family-name:var(--font-jakarta)] text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
                Technology should feel like momentum.
              </h2>
            </div>
            <div className="space-y-7 text-base leading-8 text-white/65 sm:text-lg">
              {ABOUT_CONTENT.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="mt-10 border-l-2 border-[#f0c43a] pl-6 text-xl font-semibold leading-8 text-white sm:text-2xl">
                We are a build-and-operate partner for organisations that want their digital work to perform, not just appear.
              </div>
            </div>
          </div>
        </section>

        <section id="our-work" className="relative border-y border-white/10 bg-[#080808] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1380px]">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <p className="orbit-kicker">02 / What we do</p>
                <h2 className="mt-6 max-w-2xl font-[family-name:var(--font-jakarta)] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl">
                  One orbit.<br /><span className="text-white/40">Many ways forward.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-white/55">From the first strategic question to the system your team uses every day, our disciplines are designed to connect.</p>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CAPABILITIES.map((item) => (
                <article key={item.number} className={`group relative min-h-[290px] overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#f0c43a]/50 ${item.tone === "gold" ? "hover:shadow-[0_24px_60px_rgba(240,196,58,0.12)]" : ""}`}>
                  <div className="flex items-start justify-between"><span className="text-xs font-bold tracking-[0.2em] text-[#f0c43a]">{item.number}</span><span className="text-2xl text-white/25 transition group-hover:text-white">↗</span></div>
                  <div className="absolute -right-8 top-16 h-32 w-32 rounded-full bg-[#f0c43a]/10 blur-3xl transition group-hover:bg-[#f0c43a]/25" />
                  <div className="relative mt-24"><h3 className="text-xl font-bold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{item.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="orbit-kicker">03 / The standard</p>
              <h2 className="mt-6 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Good work has a point of view.</h2>
              <p className="mt-7 max-w-md text-base leading-8 text-white/60">{ABOUT_CONTENT.mission}</p>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {PRINCIPLES.map(([number, title, body]) => (
                <article key={number} className="grid gap-5 py-7 sm:grid-cols-[64px_0.8fr_1.2fr] sm:items-start">
                  <span className="text-sm font-bold text-[#f0c43a]">{number}</span>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="text-sm leading-7 text-white/55">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-[#080808] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(240,196,58,0.12),transparent_45%)]" />
          <div className="relative mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div><p className="orbit-kicker">04 / How we work</p><h2 className="mt-6 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Calm, clear, accountable.</h2><Link href="/contact" className="orbit-btn-gold mt-9 inline-flex h-13 items-center rounded-full px-7 text-sm font-bold">Talk to the studio ↗</Link></div>
            <ol className="space-y-3">{ABOUT_CONTENT.approach.map((step, index) => <li key={step} className="orbit-glass flex items-center gap-5 rounded-2xl p-5 sm:p-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0c43a] text-sm font-bold text-[#1a1408]">0{index + 1}</span><p className="text-sm leading-7 text-white/75 sm:text-base">{step}</p></li>)}</ol>
          </div>
        </section>

        <OrbitOfficesSection />
        <OrbitCountryFlags />
        <OrbitCtaBand />
      </main>
    </>
  );
}
