"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ORBIT_BRAND } from "@/lib/orbit/brand";

export function OrbitChrome() {
  const pathname = usePathname();
  const [splash, setSplash] = useState(false);
  const [top, setTop] = useState(false);

  useEffect(() => {
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
    const onScroll = () => setTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <>
      {splash ? (
        <div className="orbit-splash fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#071533] text-white">
          <div className="relative h-24 w-24 rounded-full border border-sky-400/40">
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400" />
            <span className="absolute right-3 top-8 h-2 w-2 rounded-full bg-[#f0c43a]" />
          </div>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.35em] text-white/70">INITIALIZING ORBIT</p>
        </div>
      ) : null}
      <a
        href={ORBIT_BRAND.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-lg text-white shadow-lg"
        aria-label="WhatsApp"
      >
        W
      </a>
      {top ? (
        <button
          type="button"
          className="fixed bottom-22 right-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg"
          style={{ bottom: "5.5rem" }}
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      ) : null}
    </>
  );
}
