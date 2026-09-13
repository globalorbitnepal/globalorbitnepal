import { ORBIT_COUNTRIES } from "@/lib/orbit/catalog";

export function OrbitFlag({ code, name, size = 36 }: { code: string; name: string; size?: number }) {
  return (
    <span className="inline-flex flex-col items-center gap-1" title={name}>
      <img
        src={`https://flagcdn.com/w80/${code}.png`}
        alt=""
        width={size}
        height={Math.round(size * 0.75)}
        className="rounded-[3px] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.35)] ring-1 ring-white/25"
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}

export function OrbitCountryFlags({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "px-4 py-14"}>
      {compact ? null : (
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Trusted in 25 countries</h2>
          <p className="mt-3 text-[15px] leading-7 text-white/65">
            Official flags for every market we ship into — Nepal first, then the Gulf, Asia, Europe, and North America.
          </p>
        </div>
      )}
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
        {ORBIT_COUNTRIES.map((country) => (
          <li key={country.code} className="flex flex-col items-center gap-1">
            <OrbitFlag code={country.code} name={country.name} size={compact ? 28 : 40} />
            {compact ? null : <span className="text-[10px] font-medium uppercase tracking-wide text-white/55">{country.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
