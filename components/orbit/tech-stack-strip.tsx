import { HOME_TECHNOLOGIES } from "@/lib/home-content";
import { TECH_BRAND_LOGOS, techBrandLogoUrl } from "@/lib/tech-brand-logos";

export function OrbitTechStackStrip() {
  return (
    <section
      className="orbit-tech-strip relative overflow-hidden border-y border-white/10 py-7 sm:py-9 lg:py-10 xl:py-12"
      aria-label="Technologies we use"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#ffb8d9]/12 via-[#d4c4ff]/10 to-[#a8dcff]/12"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[min(100%,1600px)] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="orbit-tech-strip-glass relative isolate overflow-hidden rounded-[22px] px-5 py-5 sm:rounded-[28px] sm:px-8 sm:py-6 lg:rounded-[32px] lg:px-12 lg:py-7 xl:px-16 xl:py-8">
          <div className="orbit-tech-strip-glass-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <ul className="relative z-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10 sm:gap-y-6 md:gap-x-12 lg:justify-between lg:gap-x-6 xl:gap-x-10 2xl:gap-x-14">
            {HOME_TECHNOLOGIES.map((name) => {
              const brand = TECH_BRAND_LOGOS[name];
              if (!brand) return null;
              return (
                <li key={name} className="flex shrink-0 items-center gap-3">
                  <img
                    src={techBrandLogoUrl(brand.slug, brand.hex)}
                    alt=""
                    width={48}
                    height={48}
                    className="orbit-tech-strip-mark h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-[3.25rem] 2xl:w-[3.25rem]"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="font-[family-name:var(--font-jakarta)] text-[14px] font-semibold tracking-[-0.02em] text-white/90 sm:text-[15px] lg:text-[16px] xl:text-[17px]">
                    {brand.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
