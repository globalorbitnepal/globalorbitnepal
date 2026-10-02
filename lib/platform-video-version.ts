/** Bump when platform preview files are re-encoded so browsers drop stale cache. */
export const PLATFORM_VIDEO_CACHE_VERSION = "20261003-unique";

export function platformVideoSrc(path: string) {
  if (!path.startsWith("/brand/platform-apps/")) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}v=${PLATFORM_VIDEO_CACHE_VERSION}`;
}
