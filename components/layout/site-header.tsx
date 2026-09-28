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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white">
        <div className="pointer-events-auto mx-auto flex max-w-[1600px] items-center gap-2 px-4 pt-2 sm:gap-3 sm:px-6 sm:pt-2.5 lg:gap-4 lg:px-10 lg:pt-3">
          <BrandLogo priority variant="bar" />

          <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 justify-center lg:flex">
            <div className="orbit-header-glass orbit-header-glass-light inline-flex h-11 max-w-full items-center rounded-full px-3 py-0 sm:px-4 xl:px-6">
              <StudioHeaderNav />
            </div>
          </nav>

          <BookAppointmentButton
            className="ml-auto hidden lg:inline-flex"
            onClick={() => setAppointmentOpen(true)}
          />

          <button
            type="button"
            className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-white/15 bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
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
