import { HOME_TECHNOLOGIES } from "@/lib/home-content";

export function TechMarquee() {
  const row = [...HOME_TECHNOLOGIES, ...HOME_TECHNOLOGIES];

  return (
    <section
      id="technologies"
      className="border-t border-[#e4dac8] bg-[#f4efe4]/80 py-5 backdrop-blur-xl"
      aria-label="Technologies we work with"
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-5 sm:px-8">
        <p className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b6458] md:block">
          Technologies
          <span className="mt-1 block font-medium tracking-[0.08em] text-[#1c242c]">
            We work with
          </span>
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f4efe4] to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f4efe4] to-transparent sm:w-16" />
          <div className="tech-marquee-track flex w-max items-center gap-4 pr-4">
            {row.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="inline-flex h-10 items-center rounded-full border border-[#e0d6c4] bg-white/70 px-4 text-[13px] font-semibold text-[#1c242c] shadow-[0_4px_12px_rgba(40,30,16,0.06)] backdrop-blur-md"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
