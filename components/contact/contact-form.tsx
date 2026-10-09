"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/app/contact/actions";

const initialState: InquiryFormState = {
  status: "idle",
  message: "",
  errors: {},
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/15 bg-[#0a1a3c] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#f0c43a]";

const premiumFieldClass =
  "orbit-contact-field mt-2 w-full rounded-2xl border border-white/12 bg-[#070a14]/80 px-4 py-3.5 text-[15px] text-white outline-none transition-[border-color,box-shadow] focus:border-[#f0c43a]/70 focus:shadow-[0_0_0_3px_rgba(240,196,58,0.12)]";

export function ContactForm({ premium }: { premium?: boolean }) {
  const inputClass = premium ? premiumFieldClass : fieldClass;
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <p
        className={`rounded-2xl border border-[#f0c43a]/25 bg-[#0a1a3c]/90 px-6 py-8 text-base leading-7 text-white ${premium ? "orbit-contact-success" : ""}`}
        role="status"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="source" value="contact" />
      <input type="hidden" name="pagePath" value="/contact" />
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" autoComplete="name" required className={inputClass} />
        {state.errors.name ? (
          <p className="mt-2 text-sm text-[var(--color-copper)]">{state.errors.name}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
        {state.errors.email ? (
          <p className="mt-2 text-sm text-[var(--color-copper)]">{state.errors.email}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          Phone <span className="font-normal text-[var(--color-muted)]">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-medium">
          Subject <span className="font-normal text-[var(--color-muted)]">(optional)</span>
        </label>
        <input id="subject" name="subject" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" required rows={7} className={inputClass} />
        {state.errors.message ? (
          <p className="mt-2 text-sm text-[var(--color-copper)]">{state.errors.message}</p>
        ) : null}
      </div>
      {state.status === "error" && state.message ? (
        <p className="text-sm text-[var(--color-copper)]" role="alert">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className={
          premium
            ? "orbit-about-cta-primary mt-2 disabled:opacity-60"
            : "inline-flex min-h-11 items-center justify-center rounded-full bg-[#f0c43a] px-6 py-2.5 text-sm font-medium text-[#1a1408] disabled:opacity-60"
        }
      >
        {pending ? "Sending…" : "Send enquiry"}
        {premium ? <span aria-hidden="true">→</span> : null}
      </button>
      <p className="text-xs leading-5 text-white/40">
        {premium
          ? "Your brief is stored securely. We reply within one business day."
          : "Stored as an Inquiry record. We reply when we can."}
      </p>
    </form>
  );
}
