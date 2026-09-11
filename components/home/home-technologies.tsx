import Link from "next/link";
import { Container } from "@/components/ui/container";
import { HOME_TECHNOLOGIES } from "@/lib/home-content";

export function HomeTechnologies() {
  return (
    <section
      id="technologies"
      className="scroll-mt-24 border-y border-white/10 bg-[#0b0b0b] py-5 text-white"
      aria-labelledby="technologies-heading"
    >
      <Container className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <h2
          id="technologies-heading"
          className="shrink-0 text-[11px] font-semibold uppercase leading-4 tracking-[0.16em] text-white/70"
        >
          Technologies
          <br />
          We Work With
        </h2>
        <ul className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-3 lg:justify-between">
          {HOME_TECHNOLOGIES.map((name) => (
            <li key={name} className="flex items-center gap-2 text-[11px] text-white/75">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[10px] text-[var(--color-gold)]">
                {name.slice(0, 1)}
              </span>
              {name}
            </li>
          ))}
          <li>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[11px] text-white/80 hover:text-[var(--color-gold)]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20">
                →
              </span>
              And 25+ More
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
