import { SectionHeading } from "@/components/home/section-heading";
import { ServiceCardList } from "@/components/site/service-card-list";
import { Container } from "@/components/ui/container";

export function HomeServices() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-paper)] py-20 sm:py-24"
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="The work we take seriously"
          description="Four practices, one team. We will not sell you a department we do not run."
        />
        <div className="mt-14">
          <ServiceCardList />
        </div>
      </Container>
    </section>
  );
}
