"use client";

import { PhoneField } from "@/components/PhoneField";
import { phoneFromForm, submitEnquiry } from "@/lib/api";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function BlogContactForm({ blogSlug }: { blogSlug: string }) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await submitEnquiry({
      type: "contact",
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: phoneFromForm(form),
      subject: String(fd.get("subject") || "Blog enquiry").trim(),
      message: String(fd.get("message") || "").trim(),
      source_page: typeof window !== "undefined" ? window.location.pathname : `/blogs/${blogSlug}`,
      meta: { form: "blog_contact", blog_slug: blogSlug },
    });
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setOk(true);
    form.reset();
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">Get in touch</h2>
      <p className="mt-1 text-sm text-slate-500">Share your details and our team will respond shortly.</p>
      {ok ? (
        <p className="mt-4 rounded-2xl bg-teal/10 p-4 text-sm font-medium text-navy">
          Thank you. We have received your message.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
          <input required name="name" placeholder="Full name" className="field sm:col-span-1" />
          <input required name="email" type="email" placeholder="Email address" className="field sm:col-span-1" />
          <div className="sm:col-span-1">
            <PhoneField placeholder="Phone" />
          </div>
          <input name="subject" placeholder="Subject" className="field sm:col-span-1" defaultValue="Blog enquiry" />
          <textarea
            name="message"
            rows={4}
            placeholder="How can we help?"
            className="field sm:col-span-2"
          />
          {error ? <p className="text-sm text-red-600 sm:col-span-2">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full py-3.5 text-sm sm:col-span-2 disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {pending ? "Sending…" : "Submit"}
          </button>
        </form>
      )}
    </section>
  );
}
