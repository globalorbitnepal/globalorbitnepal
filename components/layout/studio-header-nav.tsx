"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  STUDIO_HEADER_NAV,
  isNavDropdown,
  type HeaderNavItem,
  type HeaderNavLink,
} from "@/lib/header-nav";

function linkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemActive(pathname: string, item: HeaderNavItem) {
  if (isNavDropdown(item)) {
    return item.children.some((child) => linkActive(pathname, child.href));
  }
  return linkActive(pathname, item.href);
}

function NavAnchor({
  href,
  label,
  active,
  className,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`orbit-header-nav-link inline-flex items-center gap-1.5 whitespace-nowrap ${active ? "is-active" : ""} ${className ?? ""}`}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function ServicesDropdown({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const menuId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const item = STUDIO_HEADER_NAV.find((entry) => isNavDropdown(entry) && entry.label === "Services");
  const children = item && isNavDropdown(item) ? item.children : [];
  const active = children.some((child) => linkActive(pathname, child.href));

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={rootRef} className="relative">
      <button
        type="button"
        className={`orbit-header-nav-link inline-flex items-center gap-1.5 whitespace-nowrap ${active ? "is-active" : ""}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
      >
        Services
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 opacity-80 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path fill="currentColor" d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="orbit-header-dropdown absolute left-1/2 top-[calc(100%+0.65rem)] z-[60] min-w-[12.5rem] -translate-x-1/2 rounded-2xl p-2"
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="flex flex-col gap-0.5">
            {children.map((child) => (
              <li key={child.href} role="none">
                <DropdownRow
                  child={child}
                  pathname={pathname}
                  onNavigate={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function DropdownRow({
  child,
  pathname,
  onNavigate,
}: {
  child: HeaderNavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = linkActive(pathname, child.href);
  const showChevron = child.label === "App" || child.label === "Website";

  return (
    <Link
      href={child.href}
      role="menuitem"
      className={`orbit-header-dropdown-link flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[17px] font-medium ${active ? "is-active" : ""}`}
      onClick={onNavigate}
    >
      <span>{child.label}</span>
      {showChevron ? (
        <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true">
          <path fill="currentColor" d="M4.5 2.5 8 6l-3.5 3.5" />
        </svg>
      ) : null}
    </Link>
  );
}

export function StudioHeaderNav({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={`orbit-header-nav-list flex flex-nowrap items-center gap-4 text-[18px] font-medium tracking-[-0.02em] xl:gap-6 xl:text-[19px] ${className ?? ""}`}>
      {STUDIO_HEADER_NAV.map((item) => {
        if (isNavDropdown(item)) {
          return <ServicesDropdown key={item.label} pathname={pathname} onNavigate={onNavigate} />;
        }
        return (
          <li key={item.href}>
            <NavAnchor
              href={item.href}
              label={item.label}
              active={itemActive(pathname, item)}
              onClick={onNavigate}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function StudioHeaderNavMobile({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const services = STUDIO_HEADER_NAV.find((entry) => isNavDropdown(entry) && entry.label === "Services");
  const serviceLinks = services && isNavDropdown(services) ? services.children : [];

  return (
    <ul className="flex flex-col gap-1 text-[15px] font-semibold">
      {STUDIO_HEADER_NAV.map((item) => {
        if (isNavDropdown(item)) {
          return (
            <li key={item.label}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-white/85"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((value) => !value)}
              >
                Services
                <span aria-hidden="true">{servicesOpen ? "−" : "+"}</span>
              </button>
              {servicesOpen ? (
                <ul className="mb-2 ml-2 border-l border-white/10 pl-3">
                  {serviceLinks.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`block rounded-lg px-3 py-2.5 ${linkActive(pathname, child.href) ? "text-white" : "text-white/70"}`}
                        onClick={onNavigate}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        }
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block rounded-xl px-3 py-3 ${itemActive(pathname, item) ? "text-white" : "text-white/80"}`}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
