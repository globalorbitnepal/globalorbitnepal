"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isOrbitAdminPath } from "@/lib/is-orbit-admin-route";

export function OrbitChrome() {
  const pathname = usePathname();
  const [splash, setSplash] = useState(false);
  const hide = isOrbitAdminPath(pathname);

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

      <a
        className="orbit-wa-fab"
        href="https://wa.me/9779812322339"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp +977-9812322339"
      >
        <span className="orbit-wa-fab-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M19.11 17.47c-.28-.14-1.64-.81-1.9-.9s-.44-.14-.62.14-.72.9-.88 1.08-.32.21-.6.07a7.6 7.6 0 0 1-2.24-1.38 8.37 8.37 0 0 1-1.55-1.93c-.16-.28 0-.43.12-.57s.28-.32.42-.49.14-.28.21-.46.03-.35-.04-.49-.62-1.5-.85-2.05c-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.46.07-.7.35s-.92.9-.92 2.2.94 2.55 1.07 2.73 1.85 2.82 4.48 3.95c.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.64-.67 1.87-1.32s.23-1.2.16-1.32-.25-.21-.53-.35z"
            />
            <path
              fill="currentColor"
              d="M16.02 3.2A12.8 12.8 0 0 0 4.4 21.4L3.2 28.8l7.55-1.18A12.8 12.8 0 1 0 16.02 3.2zm0 23.3a10.5 10.5 0 0 1-5.35-1.47l-.38-.22-4.48.7.71-4.37-.25-.4a10.5 10.5 0 1 1 9.75 5.76z"
            />
          </svg>
        </span>
        <span className="orbit-wa-fab-copy">
          <strong>WhatsApp</strong>
          <small>+977-9812322339</small>
        </span>
      </a>

      <button type="button" className="orbit-gold-fab" aria-label="Back to top" onClick={scrollToHero}>
        <span className="orbit-gold-fab-shine" aria-hidden="true" />
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.5 14.5 12 8.8l5.5 5.7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
