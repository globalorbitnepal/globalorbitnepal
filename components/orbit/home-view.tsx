import { OrbitStudioHome } from "@/components/orbit/studio-home";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig } from "@/lib/need-config";

export function OrbitHomeView({ hero, need }: { hero: HeroConfig; need: NeedConfig }) {
  return <OrbitStudioHome hero={hero} need={need} />;
}
