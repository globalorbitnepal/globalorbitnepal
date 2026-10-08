/** True only for the Orbit CMS dashboard — not /orbit-software product pages. */
export function isOrbitAdminPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (
    pathname === "/orbit" ||
    pathname.startsWith("/orbit/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  );
}
