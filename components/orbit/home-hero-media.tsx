import Image from "next/image";

/**
 * Coded cinematic hero scene (no mockup plate).
 * Layers: space → globe → sunrise → mountains → pagoda → vignettes.
 */
export function OrbitHomeHeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020610]" aria-hidden="true">
      <div className="orbit-hero-stars absolute inset-0" />

      <Image
        src="/brand/hero-globe.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[76%_18%] contrast-[1.05] saturate-[1.08] sm:object-[72%_20%] lg:object-[center_center] xl:object-[52%_42%]"
      />

      <div className="orbit-hero-sunrise pointer-events-none absolute inset-0" />
      <div className="orbit-hero-horizon pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(44vh,400px)]">
        <Image
          src="/brand/places/himalaya.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-bottom opacity-[0.95] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_8%,rgba(0,0,0,0.75)_45%,transparent_100%)]"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[1.5%] left-[1.5%] z-[2] aspect-[5/6] w-[min(38vw,210px)] sm:bottom-[2%] sm:left-[2.5%] sm:w-[min(32vw,250px)] lg:bottom-[2.5%] lg:left-[3%] lg:w-[270px]">
        <Image
          src="/brand/places/pagoda.jpg"
          alt=""
          fill
          unoptimized
          sizes="270px"
          className="object-cover object-bottom [mask-image:linear-gradient(to_top,black_55%,transparent)] drop-shadow-[0_28px_50px_rgba(0,0,0,0.7)]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#020610]/90 via-[#020610]/35 to-transparent lg:h-44" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#020610] via-[#020610]/55 to-transparent" />
    </div>
  );
}
