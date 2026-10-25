"use client";

import { PhoneField } from "@/components/PhoneField";
import { phoneFromForm, submitEnquiry } from "@/lib/api";
import { treatments } from "@/lib/data";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";

export function AppointmentModal({
  open,
  onClose,
  title = "Book an appointment",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const concern = String(fd.get("concern") || "").trim();
    const preferredDate = String(fd.get("preferred_date") || "").trim();
    const note = String(fd.get("message") || "").trim();
    const result = await submitEnquiry({
      type: "appointment",
      name: String(fd.get("name") || "").trim(),
      phone: phoneFromForm(form),
      subject: concern || title,
      message: [preferredDate ? `Preferred date: ${preferredDate}` : "", note]
        .filter(Boolean)
        .join("\n"),
      product_name: concern || undefined,
      source_page: typeof window !== "undefined" ? window.location.pathname : "/",
      meta: { preferred_date: preferredDate || null, form: "appointment_modal" },
    });
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setOk(true);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => {
            setOk(false);
            setError("");
            onClose();
          }}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-soft"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {ok ? (
          <div className="p-10 text-center">
            <p className="font-display text-2xl font-bold text-navy">Appointment requested</p>
            <p className="mt-2 text-sm text-slate-500">Our coordinator will call you shortly to confirm your slot.</p>
            <button type="button" className="btn-primary mt-6 px-8 py-3 text-sm" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-navy">{title}</h3>
            <p className="text-sm text-slate-500">Coordinator confirms within 2 working hours.</p>
            <input required name="name" placeholder="Patient's full name" className="field" />
            <PhoneField placeholder="Phone" />
            <input required name="preferred_date" type="date" className="field" />
            <select name="concern" className="field" defaultValue="" required>
              <option value="" disabled>
                Select a concern
              </option>
              {treatments.map((t) => (
                <option key={t.slug} value={t.title}>
                  {t.title}
                </option>
              ))}
            </select>
            <textarea name="message" rows={2} placeholder="Anything the doctor should know…" className="field resize-none" />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button type="submit" disabled={pending} className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
              {pending ? "Sending…" : "Request appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
