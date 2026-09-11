"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/app/contact/actions";

const initialState: InquiryFormState = {
  status: "idle",
  message: "",
  errors: {},
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-brand)]";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <p className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] px-6 py-8 text-base leading-7" role="status">
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
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" autoComplete="name" required className={fieldClass} />
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
          className={fieldClass}
        />
        {state.errors.email ? (
          <p className="mt-2 text-sm text-[var(--color-copper)]">{state.errors.email}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          Phone <span className="font-normal text-[var(--color-muted)]">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-medium">
          Subject <span className="font-normal text-[var(--color-muted)]">(optional)</span>
        </label>
        <input id="subject" name="subject" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" required rows={7} className={fieldClass} />
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
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-dark)] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-xs leading-5 text-[var(--color-muted)]">
        Stored as an Inquiry record. Email notifications are not sent from this form yet.
      </p>
    </form>
  );
}
