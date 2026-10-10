import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { FALLBACK_SITE } from "@/lib/site";

type GlobalJsonLdProps = {
  companyName: string;
  description: string;
  email?: string;
  phone?: string;
  address?: string;
};

export function GlobalJsonLd({ companyName, description, email, phone, address }: GlobalJsonLdProps) {
  const org = organizationJsonLd({
    name: companyName,
    description,
    email,
    phone,
    address: address || FALLBACK_SITE.address,
  });
  const site = websiteJsonLd({ name: companyName, description });
  const local = localBusinessJsonLd({
    name: companyName,
    description,
    email,
    phone,
    address: address || FALLBACK_SITE.address,
  });
  const graph = { "@context": "https://schema.org", "@graph": [org, site, local] };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}
