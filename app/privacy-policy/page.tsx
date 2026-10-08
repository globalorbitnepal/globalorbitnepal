import type { Metadata } from "next";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { applyPageSeo } from "@/lib/apply-page-seo";

const BODY = `Global Orbit Pvt Ltd ("we", "us") respects your privacy. This policy explains what we collect when you use our website, contact forms, and client portals, and how we use it.

We collect information you submit voluntarily — name, email, phone, company, and project details — to respond to enquiries and deliver services. Technical logs (IP address, browser type, pages visited) help us secure the site and improve performance.

We do not sell personal data. We share information only with subprocessors needed to run email, hosting, analytics, or payment — under contracts that require appropriate safeguards.

You may request access, correction, or deletion of your data by emailing support@theglobalorbit.com. We retain enquiry records as long as needed for business and legal purposes.

This policy may be updated; the latest version is always published on this page.`;

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/privacy-policy", {
    title: "Privacy Policy",
    description: "How Global Orbit collects, uses, and protects your information.",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <OrbitArticlePage
      eyebrow="Legal"
      title="Privacy Policy"
      summary="How we handle your data when you browse, enquire, or work with Global Orbit."
      body={BODY}
    />
  );
}
