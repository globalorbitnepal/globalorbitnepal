import { absoluteUrl } from "@/lib/site-origin";

type Crumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD for rich results. Keeps Google's understanding of site
 * hierarchy consistent across landing, package, and article pages.
 */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}
