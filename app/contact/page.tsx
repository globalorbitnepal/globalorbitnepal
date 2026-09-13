import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { OrbitPageHero } from "@/components/orbit/page-hero";
import { ORBIT_BRAND } from "@/lib/orbit/brand";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Contact",
    description: "Free consultation with Global Orbit — offices in Nepal, India and the United States.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="Contact"
        title="Get a free consultation"
        lede="Say what you run, what must not break, and when you need to be live."
        headingId="contact-hero"
      />
      <section className="mx-auto grid max-w-[1100px] gap-12 px-4 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-semibold text-white">Reach the firm</h2>
          <ul className="mt-6 space-y-3 text-sm text-white/75">
            {ORBIT_BRAND.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="hover:text-[#f0c43a]">
                  {phone.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${ORBIT_BRAND.email}`}>{ORBIT_BRAND.email}</a>
            </li>
            <li>
              <a href={ORBIT_BRAND.webmail} target="_blank" rel="noreferrer">
                Business Mail
              </a>
            </li>
            {ORBIT_BRAND.offices.map((office) => (
              <li key={office.code}>
                {office.country} — {office.role}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
