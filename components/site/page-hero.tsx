import type { ReactNode } from "react";
import { OrbitMark } from "@/components/home/orbit-mark";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
  headingId: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  lede,
  headingId,
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-hero)] text-[var(--color-hero-ink)]"
      aria-labelledby={headingId}
    >
      <div className="pointer-events-none absolute -right-28 top-6 h-[28rem] w-[28rem] text-[var(--color-copper)] opacity-80 motion-safe:animate-[orbit-slow_48s_linear_infinite] sm:-right-16">
        <OrbitMark className="h-full w-full" />
      </div>
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <p className="reveal text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-copper-light)]">
          {eyebrow}
        </p>
        <h1
          id={headingId}
          className="reveal-delay-1 mt-5 max-w-3xl font-[family-name:var(--font-display)] text-[2.1rem] leading-[1.14] tracking-tight sm:text-5xl"
        >
          {title}
        </h1>
        <p className="reveal-delay-2 mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
          {lede}
        </p>
        {primaryCta || secondaryCta ? (
          <div className="reveal-delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
            {primaryCta ? (
              <ButtonLink href={primaryCta.href} variant="onDark">
                {primaryCta.label}
              </ButtonLink>
            ) : null}
            {secondaryCta ? (
              <ButtonLink href={secondaryCta.href} variant="onDarkGhost">
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
