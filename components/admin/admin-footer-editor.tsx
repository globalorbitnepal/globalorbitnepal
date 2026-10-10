"use client";

import type { FooterConfig, FooterNavLink, FooterOffice, FooterSocialLink } from "@/lib/footer-config";

type Props = {
  footer: FooterConfig;
  busy: boolean;
  onChange: (next: FooterConfig) => void;
  onSave: () => void;
};

function LinkList({
  title,
  items,
  onChange,
}: {
  title: string;
  items: FooterNavLink[];
  onChange: (items: FooterNavLink[]) => void;
}) {
  return (
    <fieldset className="go-cms-fieldset">
      <legend>{title}</legend>
      {items.map((item, i) => (
        <div key={i} className="go-cms-row">
          <input
            value={item.label}
            placeholder="Label"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, label: e.target.value };
              onChange(next);
            }}
          />
          <input
            value={item.href}
            placeholder="/path"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, href: e.target.value };
              onChange(next);
            }}
          />
          <input
            value={item.icon}
            placeholder="icon id"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, icon: e.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            className="go-cms-ghost"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="go-cms-ghost"
        onClick={() => onChange([...items, { label: "New link", href: "/", icon: "home" }])}
      >
        Add link
      </button>
    </fieldset>
  );
}

function OfficeList({
  items,
  onChange,
}: {
  items: FooterOffice[];
  onChange: (items: FooterOffice[]) => void;
}) {
  return (
    <fieldset className="go-cms-fieldset">
      <legend>Sales offices</legend>
      {items.map((office, i) => (
        <div key={i} className="go-cms-stack">
          <div className="go-cms-row">
            <input
              value={office.country}
              placeholder="Country"
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...office, country: e.target.value };
                onChange(next);
              }}
            />
            <input
              value={office.code}
              placeholder="Flag code (np)"
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...office, code: e.target.value };
                onChange(next);
              }}
            />
          </div>
          <input
            value={office.phone}
            placeholder="Phone display"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...office, phone: e.target.value };
              onChange(next);
            }}
          />
          <input
            value={office.phoneHref}
            placeholder="tel:+..."
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...office, phoneHref: e.target.value };
              onChange(next);
            }}
          />
          <input
            value={office.email}
            placeholder="Email"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...office, email: e.target.value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </fieldset>
  );
}

function SocialList({
  items,
  onChange,
}: {
  items: FooterSocialLink[];
  onChange: (items: FooterSocialLink[]) => void;
}) {
  return (
    <fieldset className="go-cms-fieldset">
      <legend>Social links</legend>
      {items.map((item, i) => (
        <div key={i} className="go-cms-row">
          <input
            value={item.label}
            placeholder="Facebook"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, label: e.target.value };
              onChange(next);
            }}
          />
          <input
            value={item.href}
            placeholder="https://"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, href: e.target.value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </fieldset>
  );
}

export function AdminFooterEditor({ footer, busy, onChange, onSave }: Props) {
  return (
    <section className="go-cms-card">
      <h2>Footer content</h2>
      <p className="go-cms-help">
        Explore, services, stats, sales offices, newsletter bar, social, and legal links shown site-wide.
      </p>
      <div className="go-cms-form">
        <label>
          Explore column title
          <input
            value={footer.exploreHeading}
            onChange={(e) => onChange({ ...footer, exploreHeading: e.target.value })}
          />
        </label>
        <label>
          Services column title
          <input
            value={footer.servicesHeading}
            onChange={(e) => onChange({ ...footer, servicesHeading: e.target.value })}
          />
        </label>
        <label>
          Offices column title
          <input
            value={footer.officesHeading}
            onChange={(e) => onChange({ ...footer, officesHeading: e.target.value })}
          />
        </label>

        <fieldset className="go-cms-fieldset">
          <legend>Stats row</legend>
          {footer.stats.map((stat, i) => (
            <div key={i} className="go-cms-row">
              <input
                value={stat.label}
                onChange={(e) => {
                  const stats = [...footer.stats];
                  stats[i] = { ...stat, label: e.target.value };
                  onChange({ ...footer, stats });
                }}
              />
              <select
                value={stat.icon}
                onChange={(e) => {
                  const stats = [...footer.stats];
                  stats[i] = { ...stat, icon: e.target.value as FooterConfig["stats"][0]["icon"] };
                  onChange({ ...footer, stats });
                }}
              >
                <option value="rocket">Projects</option>
                <option value="clients">Clients</option>
                <option value="star">Ratings</option>
              </select>
            </div>
          ))}
        </fieldset>

        <LinkList
          title="Explore links"
          items={footer.explore}
          onChange={(explore) => onChange({ ...footer, explore })}
        />
        <LinkList
          title="Services links"
          items={footer.services}
          onChange={(services) => onChange({ ...footer, services })}
        />
        <OfficeList items={footer.offices} onChange={(offices) => onChange({ ...footer, offices })} />

        <label>
          Connect title
          <input
            value={footer.connectTitle}
            onChange={(e) => onChange({ ...footer, connectTitle: e.target.value })}
          />
        </label>
        <label>
          Connect description
          <textarea
            value={footer.connectLede}
            onChange={(e) => onChange({ ...footer, connectLede: e.target.value })}
          />
        </label>
        <label>
          Email placeholder
          <input
            value={footer.subscribePlaceholder}
            onChange={(e) => onChange({ ...footer, subscribePlaceholder: e.target.value })}
          />
        </label>
        <label>
          Subscribe button
          <input
            value={footer.subscribeButton}
            onChange={(e) => onChange({ ...footer, subscribeButton: e.target.value })}
          />
        </label>

        <SocialList items={footer.social} onChange={(social) => onChange({ ...footer, social })} />

        <fieldset className="go-cms-fieldset">
          <legend>Legal links</legend>
          {footer.legal.map((item, i) => (
            <div key={i} className="go-cms-row">
              <input
                value={item.label}
                onChange={(e) => {
                  const legal = [...footer.legal];
                  legal[i] = { ...item, label: e.target.value };
                  onChange({ ...footer, legal });
                }}
              />
              <input
                value={item.href}
                onChange={(e) => {
                  const legal = [...footer.legal];
                  legal[i] = { ...item, href: e.target.value };
                  onChange({ ...footer, legal });
                }}
              />
            </div>
          ))}
        </fieldset>

        <button type="button" disabled={busy} onClick={onSave}>
          Publish footer
        </button>
      </div>
    </section>
  );
}
