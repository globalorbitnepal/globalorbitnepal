import Link from "next/link";

export function SoftwareProductBreadcrumbs({ productName }: { productName: string }) {
  return (
    <nav className="sw-product-crumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/orbit-software">ERP Software</Link>
        </li>
        <li aria-current="page">{productName}</li>
      </ol>
    </nav>
  );
}
