"use client";

import { useCallback, useEffect, useState } from "react";
import { INQUIRY_STATUSES, INQUIRY_STATUS_LABEL } from "@/lib/inquiry-status";
import type { InquiryStatus } from "@prisma/client";

type InquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: InquiryStatus;
  createdAt: string;
};

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function AdminInquiriesPanel() {
  const [items, setItems] = useState<InquiryRow[]>([]);
  const [total, setTotal] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (status) params.set("status", status);
    if (query.trim()) params.set("q", query.trim());
    const response = await fetch(`/api/orbit/inquiries?${params}`, { cache: "no-store" });
    if (!response.ok) {
      setError("Could not load inquiries.");
      setLoading(false);
      return;
    }
    const data = (await response.json()) as {
      items: InquiryRow[];
      total: number;
      newCount: number;
      pageCount: number;
    };
    setItems(data.items);
    setTotal(data.total);
    setNewCount(data.newCount);
    setPageCount(data.pageCount);
    setError("");
    setLoading(false);
  }, [page, status, query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function changeStatus(id: string, next: InquiryStatus) {
    const response = await fetch("/api/orbit/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    if (response.ok) await load();
  }

  return (
    <section className="cms-leads">
      <header className="cms-leads-head">
        <div>
          <h2>Enquiries</h2>
          <p>
            {newCount} new · {total} matching this filter. Contact form, newsletter, and appointment copies land here.
          </p>
        </div>
        <div className="cms-leads-filters">
          <input
            value={query}
            onChange={(event) => {
              setPage(1);
              setQuery(event.target.value);
            }}
            placeholder="Search name, email, message"
          />
          <select
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value);
            }}
          >
            <option value="">All statuses</option>
            {INQUIRY_STATUSES.map((item) => (
              <option key={item} value={item}>
                {INQUIRY_STATUS_LABEL[item]}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading ? <p className="cms-leads-empty">Loading enquiries…</p> : null}
      {error ? <p className="cms-leads-empty">{error}</p> : null}
      {!loading && !items.length ? <p className="cms-leads-empty">No enquiries match this filter.</p> : null}

      <ul className="cms-leads-list">
        {items.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className={open ? "is-open" : ""}>
              <button type="button" className="cms-leads-row" onClick={() => setOpenId(open ? null : item.id)}>
                <strong>{item.name}</strong>
                <span>{item.email}</span>
                <span>{item.subject || "Enquiry"}</span>
                <span>{formatWhen(item.createdAt)}</span>
                <em data-status={item.status}>{INQUIRY_STATUS_LABEL[item.status]}</em>
              </button>
              {open ? (
                <div className="cms-leads-detail">
                  {item.phone ? <p>Phone: {item.phone}</p> : null}
                  <p>{item.message}</p>
                  <label>
                    Status
                    <select value={item.status} onChange={(event) => void changeStatus(item.id, event.target.value as InquiryStatus)}>
                      {INQUIRY_STATUSES.map((value) => (
                        <option key={value} value={value}>
                          {INQUIRY_STATUS_LABEL[value]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {pageCount > 1 ? (
        <div className="cms-leads-pager">
          <button type="button" disabled={page <= 1} onClick={() => setPage((n) => n - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {pageCount}
          </span>
          <button type="button" disabled={page >= pageCount} onClick={() => setPage((n) => n + 1)}>
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
}
