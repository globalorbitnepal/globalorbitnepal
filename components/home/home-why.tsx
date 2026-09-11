import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/home/section-heading";
import { HOME_WHY } from "@/lib/home-content";

export function HomeWhy() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-y border-[var(--color-line)] bg-[var(--color-paper)] py-20 sm:py-24"
      aria-labelledby="why-heading"
    >
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="Why us"
          title="A quieter kind of ambitious"
          description="Choose a firm that treats your production systems as if they were our own—because after handover, they still are our problem too."
        />
        <ol className="mt-14 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {HOME_WHY.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-3 py-8 sm:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-baseline sm:gap-8"
            >
              <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--color-copper)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tight">
                {item.title}
              </h3>
              <p className="text-[0.95rem] leading-7 text-[var(--color-muted)]">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
