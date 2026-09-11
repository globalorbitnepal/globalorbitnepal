import { HOME_TECHNOLOGIES } from "@/lib/home-content";
import { TECH_MARKS } from "@/components/home/tech-marks";

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
          <div className="tech-marquee-track flex w-max items-center gap-10 pr-10">
            {row.map((name, index) => {
              const Mark = TECH_MARKS[name];
              return (
                <div
                  key={`${name}-${index}`}
                  className="flex items-center gap-2.5 text-[#2a3238]"
                >
                  {Mark ? <Mark /> : null}
                  <span className="text-[13px] font-semibold">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
