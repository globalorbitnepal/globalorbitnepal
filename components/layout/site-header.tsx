"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import {
  BookAppointmentButton,
  BookAppointmentModal,
} from "@/components/layout/book-appointment-modal";
import { StudioHeaderNav, StudioHeaderNavMobile } from "@/components/layout/studio-header-nav";
import type { FallbackNavItem } from "@/lib/site";
import { isOrbitAdminPath } from "@/lib/is-orbit-admin-route";

type SiteHeaderProps = {
  companyName: string;
  headerLogoSrc?: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
};

function useIsCompactNav() {
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return compact;
}

export function SiteHeader({ headerLogoSrc }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCompactNav = useIsCompactNav();
  const [pastHomeHero, setPastHomeHero] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    // Permanent: phone/tablet always keep logo + ☰ on home (no hide-on-scroll flicker).
    if (!isHome || isCompactNav) {
      setPastHomeHero(false);
      return;
    }

    const hero = document.querySelector(".orbit-studio-hero");
    const update = () => {
      if (!hero) {
        setPastHomeHero(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setPastHomeHero(rect.bottom <= 72);
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome, isCompactNav]);

  if (isOrbitAdminPath(pathname)) return null;

  const headerHidden = isHome && !isCompactNav && pastHomeHero;

  return (
    <>
      <header
        className={`orbit-header-bar pointer-events-none inset-x-0 top-0 z-50 text-white fixed${headerHidden ? " orbit-header-bar--past-hero" : ""}${isCompactNav ? " orbit-header-bar--always-on" : ""}`}
        aria-hidden={headerHidden}
      >
        <div className="orbit-header-inner pointer-events-auto mx-auto w-full max-w-[1680px]">
          <div className="orbit-header-side is-left">
            <BrandLogo variant="bar" src={headerLogoSrc} priority={isHome} />
          </div>

          <nav aria-label="Main navigation" className="orbit-header-center">
            <div className="orbit-header-glass orbit-header-glass-light orbit-header-nav-pill inline-flex items-center rounded-full">
              <StudioHeaderNav />
            </div>
          </nav>

          <div className="orbit-header-side is-right">
            <BookAppointmentButton onClick={() => setAppointmentOpen(true)} />

            <button
              type="button"
              className={`orbit-header-menu-btn orbit-header-menu-btn--dots inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5${open ? " is-open" : ""}`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="orbit-header-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`orbit-mobile-menu lg:hidden${open ? " is-open" : ""}`}
          aria-hidden={!open}
        >
          <button
            type="button"
            className="orbit-mobile-menu-backdrop"
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            className="orbit-mobile-menu-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="orbit-mobile-menu-head">
              <p className="orbit-mobile-menu-eyebrow">Navigate</p>
              <button
                type="button"
                className="orbit-mobile-menu-close"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="orbit-mobile-menu-body">
              <StudioHeaderNavMobile onNavigate={() => setOpen(false)} />
              <button
                type="button"
                className="orbit-mobile-menu-cta"
                onClick={() => {
                  setOpen(false);
                  setAppointmentOpen(true);
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </header>

      <BookAppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
