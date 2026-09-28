"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ORBIT_BRAND } from "@/lib/orbit/brand";

export function OrbitChrome() {
  const pathname = usePathname();
  const [splash, setSplash] = useState(false);
  const hide = pathname.startsWith("/orbit");
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
            bottom: `calc(${fabBottom} + 3.65rem)`,
          }}
          aria-label="Back to hero"
          onClick={scrollToHero}
        >
          ↑
        </button>
      ) : null}
      <a
        href={ORBIT_BRAND.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.4)]"
        style={{ right: fabRight, bottom: fabBottom }}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.4-9.91 9.83 0 1.73.46 3.43 1.33 4.93L2 22l5.4-1.41a10.1 10.1 0 0 0 4.64 1.15h.01c5.46 0 9.91-4.4 9.91-9.83S17.5 2 12.04 2zm5.77 13.98c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.95-.31-1.64-.61-2.89-1.24-4.77-4.13-4.92-4.32-.14-.19-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.24-.27.64-.39 1.02-.39.12 0 .23 0 .33.01.3.01.44.03.64.5.24.58.83 2.02.9 2.17.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.13 1.01 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.71.8 2.01.95.3.15.5.22.57.35.08.13.08.75-.16 1.43z" />
        </svg>
      </a>
    </>
  );
}
