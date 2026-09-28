import Image from "next/image";

/** Reference art as photographic plate; HTML carries all live text and UI. */
export function OrbitHomeHeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030912]" aria-hidden="true">
      <Image
        src="/brand/hero-orbit-reference.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[52%_42%] contrast-[1.02] saturate-[1.04] sm:object-[50%_40%] lg:object-[48%_38%] xl:object-[46%_36%]"
      />
    </div>
  );
}
