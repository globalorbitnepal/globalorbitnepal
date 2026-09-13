import Link from "next/link";

type OrbitPageHeroProps = {
  eyebrow?: string;
  title: string;
  lede: string;
  headingId: string;
};

export function OrbitPageHero({ eyebrow, title, lede, headingId }: OrbitPageHeroProps) {
  return (
    <section className="orbit-net px-4 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-4xl">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f0c43a]">{eyebrow}</p>
        ) : null}
        <h1 id={headingId} className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/70">{lede}</p>
      </div>
    </section>
  );
}

export function OrbitCtaBand() {
  return (
    <section className="orbit-net px-4 py-16 text-center">
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready To Grow Your Business Online?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-white/70">
        Let&apos;s build something extraordinary together. Free consultation — no commitment.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/contact" className="orbit-btn-gold inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
          Get Free Consultation
        </Link>
        <Link href="/contact" className="orbit-btn-dark inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold">
          Contact Now
        </Link>
      </div>
    </section>
  );
}
