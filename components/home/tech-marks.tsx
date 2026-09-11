import type { ReactNode } from "react";

function Mark({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#e0d6c4] bg-white/70 px-1.5 text-[10px] font-bold tracking-wide text-[#1c242c] shadow-[0_4px_12px_rgba(40,30,16,0.06)] backdrop-blur-md">
      {children}
    </span>
  );
}

export const TECH_MARKS: Record<string, () => ReactNode> = {
  WordPress: () => <Mark>WP</Mark>,
  NestJS: () => <Mark>Nest</Mark>,
  Laravel: () => <Mark>Lv</Mark>,
  PHP: () => <Mark>PHP</Mark>,
  "Next.js": () => <Mark>Next</Mark>,
  "React.js": () => <Mark>React</Mark>,
  "Vue.js": () => <Mark>Vue</Mark>,
  "Nuxt.js": () => <Mark>Nuxt</Mark>,
  Angular: () => <Mark>Ng</Mark>,
  "Node.js": () => <Mark>Node</Mark>,
  Python: () => <Mark>Py</Mark>,
  TypeScript: () => <Mark>TS</Mark>,
};
