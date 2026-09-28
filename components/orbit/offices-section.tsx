import Image from "next/image";
import { OrbitFlag } from "@/components/orbit/flags";

const STUDIOS = [
  { code: "np", country: "Nepal", city: "Kathmandu" },
  { code: "in", country: "India", city: "Delhi (NCR)" },
  { code: "us", country: "USA", city: "United States" },
] as const;

export function OrbitOfficesSection() {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="offices-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/offices/world-bg.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#040a16]/78" />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-[900px]">
        <h2 id="offices-heading" className="sr-only">
          Global studios
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {STUDIOS.map((studio) => (
            <li
              key={studio.code}
              className="orbit-studio-glass flex items-center gap-4 rounded-[20px] px-5 py-4 sm:flex-col sm:items-center sm:gap-3 sm:px-4 sm:py-6 sm:text-center"
            >
              <OrbitFlag code={studio.code} name={studio.country} hd variant="hero" />
              <div>
                <p className="font-[family-name:var(--font-jakarta)] text-[17px] font-semibold text-white">{studio.country}</p>
                <p className="mt-0.5 text-[12px] text-white/55">{studio.city}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
