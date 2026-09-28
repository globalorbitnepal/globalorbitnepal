import { OrbitStudioHome } from "@/components/orbit/studio-home";
import type { HeroConfig } from "@/lib/hero-config";

export function OrbitHomeView({ hero }: { hero: HeroConfig }) {
  return <OrbitStudioHome hero={hero} />;
}
