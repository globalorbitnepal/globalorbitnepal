"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import {
  BookAppointmentButton,
  BookAppointmentModal,
} from "@/components/layout/book-appointment-modal";
import { NavLinks } from "@/components/layout/nav-links";
import type { FallbackNavItem } from "@/lib/site";

type SiteHeaderProps = {
  companyName: string;
  items: FallbackNavItem[];
  email?: string;
  phone?: string;
};

export function SiteHeader({ items }: SiteHeaderProps) {
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
            <div className="orbit-header-glass inline-flex h-11 items-center rounded-full px-4 py-0 xl:px-7">
              <NavLinks items={items} variant="headerStudio" />
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
            <ul className="flex flex-col gap-1 text-[15px] font-semibold">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-3 py-3 ${
                      pathname === item.href ? "text-white" : "text-white/80"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="block w-full rounded-xl px-3 py-3 text-left text-[#f0c43a]"
                  onClick={() => {
                    setOpen(false);
                    setAppointmentOpen(true);
                  }}
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </header>

      <BookAppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
