import Image from "next/image";

/** Layered cinematic scene — matches reference mockup without office/video overlays. */
export function OrbitHomeHeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020610]" aria-hidden="true">
      <Image
        src="/brand/hero-globe.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[68%_32%] contrast-[1.04] saturate-[1.06] sm:object-[64%_34%] lg:object-[58%_38%] xl:object-[54%_40%]"
      />

      <div className="orbit-hero-sunrise pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(46vh,420px)]">
        <Image
          src="/brand/places/himalaya.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-bottom opacity-[0.92] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_35%,transparent_100%)]"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[2%] left-[1%] z-[1] aspect-[4/5] w-[min(42vw,200px)] sm:bottom-[3%] sm:left-[2%] sm:w-[min(34vw,240px)] lg:left-[3.5%] lg:w-[260px]">
        <Image
          src="/brand/places/pagoda.jpg"
          alt=""
          fill
          unoptimized
          sizes="260px"
          className="object-cover object-bottom [mask-image:linear-gradient(to_top,black_65%,transparent)] drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(28vh,220px)] bg-gradient-to-b from-[#020610] via-[#020610]/40 to-transparent" />
    </div>
  );
}
