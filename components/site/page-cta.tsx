import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

type PageCtaProps = {
  companyName: string;
  heading?: string;
  body?: string;
  email?: string;
};

export function PageCta({
  companyName,
  heading = "Tell us what is actually stuck.",
  body,
  email,
}: PageCtaProps) {
  const description =
    body ??
    `A short brief is enough: what you run today, what must not break, and when you need to be live. ${companyName} will reply with a clear view — including if we are not the right firm.`;

  return (
    <section
      className="bg-[var(--color-hero)] py-20 text-[var(--color-hero-ink)] sm:py-24"
      aria-labelledby="page-cta-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-copper-light)]">
            Next step
          </p>
          <h2
            id="page-cta-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-5 text-base leading-8 text-white/70">{description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" variant="onDark">
              Contact
            </ButtonLink>
            {email ? (
              <ButtonLink href={`mailto:${email}`} variant="onDarkGhost">
                {email}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
