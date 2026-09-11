import { Container } from "@/components/ui/container";
import { HOME_QUOTE, HOME_TRUST_STATS } from "@/lib/home-content";

export function HomeTrustBar() {
  return (
    <section className="bg-[#080808] py-8 text-white sm:py-10" aria-label="Company snapshot">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Trusted by businesses worldwide
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {HOME_TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-[11px] text-white/50">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
        <figure className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <blockquote className="font-[family-name:var(--font-display)] text-lg leading-8 text-white/85">
            “{HOME_QUOTE}”
          </blockquote>
          <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
            Global Orbit Pvt Ltd
          </figcaption>
          <p className="mt-6 text-right text-[10px] uppercase tracking-[0.16em] text-white/35">
            Global presence
            <br />
            Local support
          </p>
        </figure>
      </Container>
    </section>
  );
}
