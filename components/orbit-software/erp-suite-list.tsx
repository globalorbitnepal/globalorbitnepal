import Link from "next/link";
import { ErpConsole } from "@/components/orbit-software/erp-console";
import { ERP_SUITES } from "@/lib/orbit-software-page";

export function ErpSuiteList() {
  return (
    <section className="erp-suites px-4 sm:px-6 lg:px-8" aria-labelledby="erp-suites-heading">
      <div className="mx-auto max-w-[76rem]">
        <header className="mb-10 text-center lg:mb-14">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">12</span>
            Product lines
          </p>
          <h2 id="erp-suites-heading" className="orbit-projects-portfolio-title">
            Live operator software — <span>not catalog boxes</span>
          </h2>
          <p className="orbit-projects-portfolio-lede mx-auto">
            Invoices, occupancy, channel health, pick lists, and POS tickets coded as real product chrome.
          </p>
        </header>

        <div className="erp-suite-stack">
          {ERP_SUITES.map((suite, index) => (
            <article key={suite.slug} className={`erp-suite-row ${index % 2 === 1 ? "is-flip" : ""}`}>
              <div className="erp-suite-copy">
                <p className="erp-suite-index">
                  {suite.index} · {suite.kicker}
                </p>
                <h3>{suite.title}</h3>
                <p>{suite.body}</p>
                <ul>
                  {suite.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link href={suite.href} className="erp-suite-link">
                  Open product
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="erp-suite-stage">
                <ErpConsole suite={suite} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
