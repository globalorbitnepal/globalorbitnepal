import { Container } from "@/components/ui/container";

type SplitSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  headingId: string;
  children: React.ReactNode;
};

export function SplitSection({
  id,
  eyebrow,
  title,
  headingId,
  children,
}: SplitSectionProps) {
  return (
    <section
      id={id}
      className="border-t border-[var(--color-line)] py-16 sm:py-20"
      aria-labelledby={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {eyebrow ? (
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-brand)]">
                {eyebrow}
              </p>
            ) : null}
            <h2
              id={headingId}
              className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight"
            >
              {title}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[var(--color-muted)] lg:col-span-8">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
