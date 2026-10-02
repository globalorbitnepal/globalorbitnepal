"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  STUDIO_HEADER_NAV,
  isNavDropdown,
  navLinkActive,
  navLinkTreeActive,
  type HeaderNavItem,
  type HeaderNavLink,
} from "@/lib/header-nav";

function itemActive(pathname: string, item: HeaderNavItem) {
  if (isNavDropdown(item)) {
    return item.children.some((child) => navLinkTreeActive(pathname, child));
  }
  return item.href ? navLinkActive(pathname, item.href) : false;
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

function DropdownRow({
  child,
  pathname,
  onNavigate,
}: {
  child: HeaderNavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = navLinkTreeActive(pathname, child);
  const hasSub = Boolean(child.children?.length);

  if (hasSub && child.children) {
    return (
      <div
        className="orbit-header-flyout-row group relative"
        onMouseEnter={() => {}}
      >
        <span
          className={`orbit-header-dropdown-link flex cursor-default items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[17px] font-medium ${active ? "is-active" : ""}`}
        >
          <span>{child.label}</span>
          <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true">
            <path fill="currentColor" d="M4.5 2.5 8 6l-3.5 3.5" />
          </svg>
        </span>
        <div className="orbit-header-flyout-sub pointer-events-none absolute left-[calc(100%+0.35rem)] top-0 z-[70] min-w-[11.5rem] rounded-2xl p-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
          <ul className="flex flex-col gap-0.5">
            {child.children.map((sub) => (
              <li key={sub.href ?? sub.label} role="none">
                <Link
                  href={sub.href ?? "#"}
                  role="menuitem"
                  className={`orbit-header-dropdown-link block rounded-xl px-3.5 py-2.5 text-[15px] font-medium ${sub.href && navLinkActive(pathname, sub.href) ? "is-active" : ""}`}
                  onClick={onNavigate}
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={child.href ?? "#"}
      role="menuitem"
      className={`orbit-header-dropdown-link flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[17px] font-medium ${child.href && navLinkActive(pathname, child.href) ? "is-active" : ""}`}
      onClick={onNavigate}
    >
      <span>{child.label}</span>
      {child.label === "Website" ? (
        <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true">
          <path fill="currentColor" d="M4.5 2.5 8 6l-3.5 3.5" />
        </svg>
      ) : null}
    </Link>
  );
}

function ServicesDropdown({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const menuId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const item = STUDIO_HEADER_NAV.find((entry) => isNavDropdown(entry) && entry.label === "Services");
  const children = item && isNavDropdown(item) ? item.children : [];
  const active = children.some((child) => navLinkTreeActive(pathname, child));

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
              <li key={child.label} role="none">
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

function MobileNavLink({
  link,
  pathname,
  depth,
  onNavigate,
}: {
  link: HeaderNavLink;
  pathname: string;
  depth: number;
  onNavigate?: () => void;
}) {
  if (link.children?.length) {
    return (
      <ul className={`${depth ? "ml-2 border-l border-white/10 pl-3" : ""} flex flex-col gap-1`}>
        <li className="px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0c43a]/80">{link.label}</li>
        {link.children.map((sub) => (
          <li key={sub.href ?? sub.label}>
            <MobileNavLink link={sub} pathname={pathname} depth={depth + 1} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    );
  }

  if (!link.href) return null;

  return (
    <Link
      href={link.href}
      className={`block rounded-lg px-3 py-2.5 ${navLinkActive(pathname, link.href) ? "text-white" : "text-white/70"}`}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
}

export function StudioHeaderNav({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={`orbit-header-nav-list flex flex-nowrap items-center text-[clamp(0.95rem,1.05vw,1.125rem)] font-medium tracking-[-0.02em] ${className ?? ""}`}>
      {STUDIO_HEADER_NAV.map((item) => {
        if (isNavDropdown(item)) {
          return <ServicesDropdown key={item.label} pathname={pathname} onNavigate={onNavigate} />;
        }
        return (
          <li key={item.href}>
            <NavAnchor
              href={item.href!}
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
                <div className="mb-2 ml-2 border-l border-white/10 pl-3">
                  {serviceLinks.map((child) => (
                    <div key={child.label} className="mb-2">
                      <MobileNavLink link={child} pathname={pathname} depth={0} onNavigate={onNavigate} />
                    </div>
                  ))}
                </div>
              ) : null}
            </li>
          );
        }
        return (
          <li key={item.href}>
            <Link
              href={item.href!}
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
