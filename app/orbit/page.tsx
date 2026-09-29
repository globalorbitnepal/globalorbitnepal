import type { Metadata } from "next";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { getHeroConfig } from "@/lib/hero-store";
import { getNeedConfig } from "@/lib/need-store";
import { hasOrbitPassword, isOrbitAuthed } from "@/lib/orbit-auth";

export const metadata: Metadata = {
  title: "Orbit",
  robots: { index: false, follow: false },
};

export default async function OrbitEditorPage() {
  const [config, need, authed, setup] = await Promise.all([
    getHeroConfig(),
    getNeedConfig(),
    isOrbitAuthed(),
    hasOrbitPassword(),
  ]);

  return <OrbitHeroEditor initial={config} initialNeed={need} authed={authed} needsSetup={!setup} />;
}
