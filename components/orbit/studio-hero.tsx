import type { HeroConfig } from "@/lib/hero-config";
import { OrbitStudioHeroCopy } from "@/components/orbit/studio-hero-copy";
import { OrbitStudioHeroVideo } from "@/components/orbit/studio-hero-video";

type Props = {
  config: HeroConfig;
};

/** Homepage hero — server-rendered H1 and copy; video layer is client-only. */
export function OrbitStudioHero({ config }: Props) {
  return (
    <section className="orbit-studio-hero" aria-labelledby="home-hero-heading">
      <OrbitStudioHeroVideo config={config} />
      <div className="orbit-studio-hero-veil" aria-hidden="true" />
      <OrbitStudioHeroCopy config={config} />
    </section>
  );
}
