import type { Metadata } from "next";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { getHeroConfig } from "@/lib/hero-store";
import { getNeedConfig } from "@/lib/need-store";
import { getWorkConfig } from "@/lib/work-store";
import { hasOrbitPassword, isOrbitAuthed } from "@/lib/orbit-auth";

export const metadata: Metadata = {
  title: "Orbit",
  robots: { index: false, follow: false },
};

export default async function OrbitEditorPage() {
  const [config, need, work, authed, setup] = await Promise.all([
    getHeroConfig(),
    getNeedConfig(),
    getWorkConfig(),
    isOrbitAuthed(),
    hasOrbitPassword(),
  ]);

  return (
    <OrbitHeroEditor
      initial={config}
      initialNeed={need}
      initialWork={work}
      authed={authed}
      needsSetup={!setup}
    />
  );
}
