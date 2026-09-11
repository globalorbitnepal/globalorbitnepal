type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  invert?: boolean;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  invert = false,
}: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <p
        className={`text-xs font-medium uppercase tracking-[0.22em] ${invert ? "text-[var(--color-copper-light)]" : "text-[var(--color-brand)]"}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight sm:text-4xl ${invert ? "text-white" : "text-[var(--color-ink)]"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-7 sm:text-[1.05rem] sm:leading-8 ${invert ? "text-white/70" : "text-[var(--color-muted)]"}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
