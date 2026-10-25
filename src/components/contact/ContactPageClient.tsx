"use client";

import { PageHero } from "@/components/Breadcrumb";
import { PhoneField } from "@/components/PhoneField";
import { phoneFromForm, submitEnquiry, type ContactPageContent } from "@/lib/api";
import { site } from "@/lib/data";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Plane, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const ICONS = {
  map: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
} as const;

export function ContactPageClient({ content }: { content: ContactPageContent }) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const subject = String(fd.get("subject") || "").trim();
    const result = await submitEnquiry({
      type: "contact",
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: phoneFromForm(form),
      subject: subject || "Contact form",
      message: String(fd.get("message") || "").trim(),
      product_name: subject || undefined,
      source_page: "/contact",
      meta: { form: "contact_page" },
    });
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setOk(true);
  }

  const phoneCard = content.info_cards.find((c) => c.icon === "phone");
  const phoneHref = phoneCard?.href || site.phoneHref;
  const whatsappUrl = content.whatsapp_url || site.whatsapp;
  const subjects =
    content.form_subjects.length > 0
      ? content.form_subjects
      : ["Bone Marrow Transplant", "Leukemia", "Thalassemia", "Other"];

  return (
    <>
      <PageHero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        items={[{ label: "Contact" }]}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {content.info_cards.map((item) => {
              const Icon = ICONS[item.icon] ?? MapPin;
              return (
                <div key={item.label} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                  <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-teal">
                    <Icon className="h-4 w-4" /> {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-2 block text-sm font-semibold leading-relaxed text-navy hover:text-teal"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-navy">{item.value}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={phoneHref} className="btn-primary px-6 py-3 text-sm">
              <Phone className="h-4 w-4" /> {content.call_btn_text}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              {content.whatsapp_btn_text}
            </a>
          </div>

          {content.map_embed_url ? (
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
              <iframe
                title={content.map_title || "Clinic location"}
                src={content.map_embed_url}
                className="h-64 w-full border-0 sm:h-80"
                loading="lazy"
              />
            </div>
          ) : null}

          <div className="rounded-[1.75rem] bg-navy-deep p-7 text-white">
            <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">
              <Plane className="h-4 w-4" /> {content.global_eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold">{content.global_title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{content.global_text}</p>
            {content.global_points.length > 0 ? (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {content.global_points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-white/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {p}
                  </li>
                ))}
              </ul>
            ) : null}
            <Link href={content.global_link_url} className="mt-5 inline-flex text-sm font-semibold text-teal">
              {content.global_link_text}
            </Link>
          </div>

          {content.disclaimer_text ? (
            <div className="rounded-2xl border border-slate-200 bg-soft p-5 text-xs leading-relaxed text-slate-500">
              {content.disclaimer_text}{" "}
              <Link href={content.disclaimer_link_url} className="font-semibold text-navy hover:text-teal">
                {content.disclaimer_link_text}
              </Link>
            </div>
          ) : null}
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              {ok ? (
                <div className="py-8 text-center">
                  <p className="font-display text-2xl font-bold text-navy">{content.form_success_title}</p>
                  <p className="mt-2 text-sm text-slate-500">{content.form_success_text}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                  <h2 className="font-display text-2xl font-bold text-navy">{content.form_heading}</h2>
                  {content.form_intro ? <p className="text-sm text-slate-500">{content.form_intro}</p> : null}
                  <input required name="name" placeholder="Patient name" className="field" />
                  <PhoneField placeholder="Phone" />
                  <input required name="email" type="email" placeholder="Email" className="field" />
                  <select name="subject" className="field" defaultValue="" required>
                    <option value="" disabled>
                      Treatment interest
                    </option>
                    {subjects.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Your message / brief history"
                    className="field resize-none"
                  />
                  {error ? <p className="text-sm text-red-600">{error}</p> : null}
                  <button type="submit" disabled={pending} className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
                    <Send className="h-4 w-4" /> {pending ? "Sending…" : content.form_btn_text}
                  </button>
                </form>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
