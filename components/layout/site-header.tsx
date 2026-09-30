"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import {
  BookAppointmentButton,
  BookAppointmentModal,
} from "@/components/layout/book-appointment-modal";
import { StudioHeaderNav, StudioHeaderNavMobile } from "@/components/layout/studio-header-nav";
import type { FallbackNavItem } from "@/lib/site";

type SiteHeaderProps = {
  companyName: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
};

export function SiteHeader(_props: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.startsWith("/orbit")) return null;

  return (
    <>
      <header
        className="orbit-header-bar pointer-events-none inset-x-0 top-0 z-50 text-white fixed"
      >
        <div className="pointer-events-auto mx-auto flex w-full max-w-[1680px] items-center justify-between gap-3 px-[clamp(1rem,3vw,2.75rem)] pt-[clamp(0.35rem,0.8vw,0.55rem)]">
          <div className="min-w-0 shrink">
            <BrandLogo priority variant="bar" />
          </div>

          <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 justify-center lg:flex">
            <div className="orbit-header-glass orbit-header-glass-light inline-flex h-[clamp(2.65rem,3.6vw,3.15rem)] max-w-full items-center rounded-full px-2 py-0 xl:px-3">
              <StudioHeaderNav />
            </div>
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <BookAppointmentButton
              className="hidden lg:inline-flex"
              onClick={() => setAppointmentOpen(true)}
            />

            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-white/15 bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="pointer-events-auto mx-4 mt-2 rounded-[28px] border border-white/12 bg-[#0b0b12]/92 px-4 py-4 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              <StudioHeaderNavMobile onNavigate={() => setOpen(false)} />
              <button
                type="button"
                className="block w-full rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-[#f0c43a]"
                onClick={() => {
                  setOpen(false);
                  setAppointmentOpen(true);
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <BookAppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
