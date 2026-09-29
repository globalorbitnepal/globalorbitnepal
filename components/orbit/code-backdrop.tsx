const CODE_SNIPPET = `const orbit = await deploy({
  stack: ["Next.js", "React", "SEO"],
  regions: ["NP", "IN", "US"],
});
export default orbit;
function buildApp() {
  return prisma.user.findMany();
}
"use client";
await fetch("/api/orbit/hero");
type Hero = { headline: string };
`.repeat(6);

const COLUMNS = 14;

export function OrbitCodeBackdrop() {
  return (
    <div className="orbit-code-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="orbit-code-backdrop-veil absolute inset-0" />
      <div className="orbit-code-backdrop-grid flex h-full w-full justify-between gap-[clamp(0.35rem,1.2vw,1.25rem)] px-[clamp(0.5rem,2vw,2.5rem)]">
        {Array.from({ length: COLUMNS }, (_, index) => (
          <div
            key={index}
            className="orbit-code-column min-w-0 flex-1"
            style={{
              animationDuration: `${16 + (index % 5) * 3.5}s`,
              animationDelay: `${-(index * 2.4)}s`,
            }}
          >
            <pre>{CODE_SNIPPET}</pre>
            <pre>{CODE_SNIPPET}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
