import type { Metadata } from "next";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { getHeroConfig } from "@/lib/hero-store";
import { hasOrbitPassword, isOrbitAuthed } from "@/lib/orbit-auth";

export const metadata: Metadata = {
  title: "Orbit editor",
  robots: { index: false, follow: false },
};

export default async function OrbitEditorPage() {
  const [config, authed, setup] = await Promise.all([
    getHeroConfig(),
    isOrbitAuthed(),
    hasOrbitPassword(),
  ]);

  return <OrbitHeroEditor initial={config} authed={authed} needsSetup={!setup} />;
}
