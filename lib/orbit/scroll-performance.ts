export function isOrbitTouch(): boolean {
  if (typeof window === "undefined") return false;
  return (
    document.documentElement.classList.contains("orbit-touch") ||
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function trackNearViewport(track: HTMLElement, margin = 120): boolean {
  const rect = track.getBoundingClientRect();
  const vh = window.innerHeight;
  return rect.bottom > -margin && rect.top < vh + margin;
}

/** Passive scroll + resize with rAF coalescing; skips work when track is off-screen. */
export function bindOrbitScroll(
  track: HTMLElement | null,
  apply: () => void,
  frameRef: { current: number },
): () => void {
  const run = () => {
    if (!track || !trackNearViewport(track)) return;
    apply();
  };

  const onScroll = () => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      run();
    });
  };

  run();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
  };
}
