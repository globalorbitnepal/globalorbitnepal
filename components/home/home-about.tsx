import { Container } from "@/components/ui/container";
import { HOME_ABOUT } from "@/lib/home-content";
import { ButtonLink } from "@/components/ui/button-link";

export function HomeAbout() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[var(--background)] py-20 sm:py-24"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-brand)]">
              {HOME_ABOUT.kicker}
            </p>
            <h2
              id="about-heading"
              className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight sm:text-4xl"
            >
              {HOME_ABOUT.title}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-5 text-base leading-8 text-[var(--color-muted)] sm:text-[1.05rem]">
              {HOME_ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-12 grid gap-6 border-t border-[var(--color-line)] pt-8 sm:grid-cols-3">
              {HOME_ABOUT.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <ButtonLink href="/about">Read about the firm</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
