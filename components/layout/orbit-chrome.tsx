"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isOrbitAdminPath } from "@/lib/is-orbit-admin-route";

export function OrbitChrome() {
  const pathname = usePathname();
  const [splash, setSplash] = useState(false);
  const hide = isOrbitAdminPath(pathname);
  const home = pathname === "/";

  useEffect(() => {
    if (hide) {
      setSplash(false);
      return;
    }

    const seen = window.sessionStorage.getItem("orbit-splash");
    let timer: number | undefined;
    if (!seen && pathname === "/") {
      setSplash(true);
      timer = window.setTimeout(() => {
        setSplash(false);
        window.sessionStorage.setItem("orbit-splash", "1");
      }, 1600);
    } else {
      setSplash(false);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [pathname, hide]);

  function scrollToHero() {
    const target = document.getElementById("home-hero-heading");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (hide) return null;

  const fabBottom = "max(1rem, env(safe-area-inset-bottom))";
  const fabRight = "max(1rem, env(safe-area-inset-right))";

  return (
    <>
      {splash ? (
        <div className="orbit-splash fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#071533] text-white">
          <div className="relative h-24 w-24 rounded-full border border-sky-400/40">
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400" />
            <span aria-hidden="true" className="absolute right-3 top-8 h-2 w-2 rounded-full bg-[#f0c43a]" />
          </div>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.35em] text-white/70">INITIALIZING ORBIT</p>
        </div>
      ) : null}
      {home ? (
        <button
          type="button"
          className="fixed z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0c0c14]/85 text-lg text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md"
          style={{
            right: fabRight,
            bottom: fabBottom,
          }}
          aria-label="Back to hero"
          onClick={scrollToHero}
        >
          ↑
        </button>
      ) : null}
    </>
  );
}
