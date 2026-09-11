import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/home/section-heading";
import { HOME_SOLUTIONS } from "@/lib/home-content";
import { ButtonLink } from "@/components/ui/button-link";

export function HomeSolutions() {
  return (
    <section
      id="work"
      className="scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="work-heading"
    >
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title="Problems we like to be handed"
          description="Representative engagements—not a logo wall. Named case studies will appear here as clients agree to be public."
        />
        <ul className="mt-14 space-y-4">
          {HOME_SOLUTIONS.map((solution) => (
            <li
              key={solution.title}
              className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] p-6 transition-transform duration-300 motion-safe:hover:-translate-y-0.5 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">
                {solution.category}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-tight">
                {solution.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-[var(--color-muted)]">
                {solution.body}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href="/services" variant="ghost">
            Browse services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
