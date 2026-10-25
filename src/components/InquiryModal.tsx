"use client";

import { PhoneField } from "@/components/PhoneField";
import { phoneFromForm, submitEnquiry } from "@/lib/api";
import { treatments } from "@/lib/data";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";

export function InquiryModal({
  open,
  onClose,
  title = "Book a consultation",
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
    const treatment = String(fd.get("treatment") || "").trim();
    const result = await submitEnquiry({
      type: "appointment",
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim() || undefined,
      phone: phoneFromForm(form),
      subject: treatment || title,
      message: String(fd.get("message") || "").trim() || undefined,
      product_name: treatment || undefined,
      source_page: typeof window !== "undefined" ? window.location.pathname : "/",
      meta: { form: "inquiry_modal" },
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
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/50 p-4 sm:items-center">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
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
          <div className="py-8 text-center">
            <p className="font-display text-2xl font-bold text-navy">Request received</p>
            <p className="mt-2 text-sm text-slate-500">
              A coordinator will call you shortly. For urgent queries, dial +91 99997 36555.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold text-navy">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">Share details — we respond on WhatsApp or phone.</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input required name="name" placeholder="Patient name" className="field" />
              <PhoneField placeholder="Phone" />
              <input name="email" type="email" placeholder="Email" className="field" />
              <select name="treatment" className="field" defaultValue="" required>
                <option value="" disabled>
                  Select treatment
                </option>
                {treatments.map((t) => (
                  <option key={t.slug} value={t.title}>
                    {t.title}
                  </option>
                ))}
              </select>
              <textarea name="message" rows={3} placeholder="Brief history" className="field resize-none" />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button type="submit" disabled={pending} className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
                {pending ? "Sending…" : "Submit request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
