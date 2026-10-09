"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppointmentRecord } from "@/lib/appointments/types";

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

export function OrbitAppointmentsPanel() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const response = await fetch("/api/orbit/appointments", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as {
      appointments: AppointmentRecord[];
      unreadCount: number;
    };
    setAppointments(data.appointments);
    setUnreadCount(data.unreadCount);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 60000);
    return () => window.clearInterval(timer);
  }, [load]);

  async function markRead(ids: string[]) {
    const response = await fetch("/api/orbit/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (response.ok) await load();
  }

  async function markAllRead() {
    const response = await fetch("/api/orbit/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
    if (response.ok) {
      setStatus("All notifications marked as read.");
      await load();
    }
  }

  return (
    <section className="orbit-studio-glass rounded-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            Appointment requests
            {unreadCount > 0 ? (
              <span className="inline-flex min-h-[1.35rem] min-w-[1.35rem] items-center justify-center rounded-full bg-[#f0c43a] px-1.5 text-[11px] font-bold text-[#14120a]">
                {unreadCount}
              </span>
            ) : null}
          </h2>
          <p className="mt-1 text-sm text-white/55">
            Submissions from the header “Book Appointment” form. New entries trigger a notification badge here.
          </p>
        </div>
        {unreadCount > 0 ? (
          <button
            type="button"
            onClick={() => void markAllRead()}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 hover:bg-white/10"
          >
            Mark all read
          </button>
        ) : null}
      </div>

      {unreadCount > 0 ? (
        <div
          className="mt-4 rounded-2xl border border-[#f0c43a]/35 bg-[#f0c43a]/10 px-4 py-3 text-sm text-[#f5e6a8]"
          role="status"
        >
          {unreadCount} new appointment{unreadCount === 1 ? "" : "s"} — review details below and follow up on WhatsApp.
        </div>
      ) : null}

      {loading ? (
        <p className="mt-6 text-sm text-white/45">Loading appointments…</p>
      ) : appointments.length === 0 ? (
        <p className="mt-6 text-sm text-white/45">No appointments yet. They will appear here when visitors submit the form.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {appointments.map((item) => (
            <li
              key={item.id}
              className={`rounded-2xl border p-4 sm:p-5 ${
                item.read ? "border-white/10 bg-black/25" : "border-[#f0c43a]/30 bg-[#f0c43a]/[0.06]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{item.fullName}</p>
                  <p className="mt-0.5 text-xs text-white/45">{formatWhen(item.createdAt)}</p>
                </div>
                {!item.read ? (
                  <button
                    type="button"
                    onClick={() => void markRead([item.id])}
                    className="text-xs font-medium text-[#f0c43a] hover:underline"
                  >
                    Mark read
                  </button>
                ) : (
                  <span className="text-xs text-white/35">Read</span>
                )}
              </div>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-white/45">WhatsApp</dt>
                  <dd className="text-white/90">{item.whatsapp}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Mobile</dt>
                  <dd className="text-white/90">{item.mobile}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Email</dt>
                  <dd className="break-all text-white/90">{item.officeEmail}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Location</dt>
                  <dd className="text-white/90">
                    {item.city}, {item.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/45">Studio</dt>
                  <dd className="text-white/90">{item.studio}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Referral</dt>
                  <dd className="text-white/90">{item.referral}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-white/45">Services</dt>
                  <dd className="text-white/90">{item.services.join(" · ")}</dd>
                </div>
                {item.specialRequest ? (
                  <div className="sm:col-span-2">
                    <dt className="text-white/45">Special request</dt>
                    <dd className="whitespace-pre-wrap text-white/85">{item.specialRequest}</dd>
                  </div>
                ) : null}
              </dl>
            </li>
          ))}
        </ul>
      )}

      {status ? <p className="mt-4 text-sm text-[#f0c43a]">{status}</p> : null}
    </section>
  );
}
