"use client";

import { PhoneField } from "@/components/PhoneField";
import { phoneFromForm, submitEnquiry } from "@/lib/api";
import { treatments } from "@/lib/data";
import { Minus, Plus, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function TreatmentConsult({ defaultSlug }: { defaultSlug: string }) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const slug = String(fd.get("treatment") || defaultSlug).trim();
    const treatment = treatments.find((t) => t.slug === slug);
    const title = treatment?.title || slug;
    const result = await submitEnquiry({
      type: "treatment",
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: phoneFromForm(form),
      subject: `Consultation: ${title}`,
      product_name: title,
      source_page: typeof window !== "undefined" ? window.location.pathname : "/",
      meta: { treatment_slug: slug, form: "treatment_consult" },
    });
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setOk(true);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
      <h3 className="text-center font-display text-xl font-bold text-navy">Book a Consultation Call</h3>
      {ok ? (
        <p className="mt-4 rounded-2xl bg-teal/10 p-4 text-sm font-medium text-navy">
          Thank you. A coordinator will call you shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input required name="name" placeholder="Patient Name" className="field" />
          <input required name="email" type="email" placeholder="Email Address" className="field" />
          <PhoneField placeholder="Phone" />
          <select required name="treatment" className="field" defaultValue={defaultSlug}>
            {treatments.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button type="submit" disabled={pending} className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
            <Send className="h-4 w-4" /> {pending ? "Sending…" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

export function TreatmentFaqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <button
          key={f.q}
          type="button"
          onClick={() => setOpen((cur) => (cur === i ? -1 : i))}
          className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left"
        >
          <span className="flex items-start justify-between gap-3">
            <p className="font-display font-bold text-navy">{f.q}</p>
            {open === i ? (
              <Minus className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
            ) : (
              <Plus className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
            )}
          </span>
          {open === i ? <p className="mt-2 pr-8 text-sm leading-relaxed text-slate-500">{f.a}</p> : null}
        </button>
      ))}
    </div>
  );
}
