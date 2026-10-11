import Link from "next/link";
import { WD_BREADCRUMB } from "@/lib/website-development-content";

export function WebsiteDevBreadcrumbs() {
  return (
    <nav className="sw-product-crumb wd-page-crumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={WD_BREADCRUMB.parentHref}>{WD_BREADCRUMB.parent}</Link>
        </li>
        <li aria-current="page">{WD_BREADCRUMB.current}</li>
      </ol>
    </nav>
  );
}
