"use client";

import { PhoneField } from "@/components/PhoneField";
import { phoneFromForm, submitEnquiry } from "@/lib/api";
import { FileSearch, UploadCloud, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const MAX_FILES = 6;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";

export function AppointmentModal({
  open,
  onClose,
  title = "Request a second opinion",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!open) {
      setOk(false);
      setError("");
      setPending(false);
      setFiles([]);
    }
  }, [open]);

  function onPickFiles(list: FileList | null) {
    if (!list?.length) return;
    setError("");
    const next = [...files];
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) {
        setError(`You can attach up to ${MAX_FILES} files.`);
        break;
      }
      if (file.size > MAX_BYTES) {
        setError(`${file.name} is larger than 10 MB.`);
        continue;
      }
      const okType =
        /pdf$/i.test(file.type) ||
        /^image\/(jpeg|png)$/i.test(file.type) ||
        /\.(pdf|jpe?g|png)$/i.test(file.name);
      if (!okType) {
        setError(`${file.name} must be PDF, JPG, or PNG.`);
        continue;
      }
      next.push(file);
    }
    setFiles(next.slice(0, MAX_FILES));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const diagnosis = String(fd.get("diagnosis") || "").trim();
    const note = String(fd.get("message") || "").trim();
    const result = await submitEnquiry(
      {
        type: "appointment",
        name: String(fd.get("name") || "").trim(),
        phone: phoneFromForm(form),
        subject: diagnosis ? `Second opinion: ${diagnosis}` : "Second opinion",
        message: note || undefined,
        product_name: diagnosis || undefined,
        source_page: typeof window !== "undefined" ? window.location.pathname : "/",
        meta: { form: "second_opinion_modal", report_files: files.length },
      },
      files
    );
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
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 hover:bg-soft"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {ok ? (
          <div className="p-10 text-center">
            <p className="font-display text-2xl font-bold text-navy">Request received</p>
            <p className="mt-2 text-sm text-slate-500">
              Our team will review your details{files.length ? " and reports" : ""} and respond shortly.
            </p>
            <button type="button" className="btn-primary mt-6 px-8 py-3 text-sm" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3 pr-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-navy">{title}</h3>
                <p className="mt-1 text-xs text-slate-500">Free · No obligation · Strictly confidential.</p>
              </div>
              <span className="shrink-0 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-extrabold uppercase text-teal">
                100% FREE
              </span>
            </div>

            <input required name="name" placeholder="Full name" className="field" />
            <PhoneField placeholder="Phone Number" />
            <input required name="diagnosis" placeholder="Current diagnosis" className="field" autoComplete="off" />
            <textarea
              name="message"
              rows={3}
              placeholder="Symptoms, treatments tried, hospital visits…"
              className="field resize-none"
            />

            <div>
              <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-300 bg-soft/50 px-4 py-6 text-center hover:border-teal">
                <UploadCloud className="mb-2 h-8 w-8 text-teal" />
                <span className="text-sm">
                  Drag & drop reports, or <span className="font-bold text-teal underline">browse files</span>
                </span>
                <span className="mt-1 text-[11px] text-slate-400">PDF, JPG · max 10 MB · up to {MAX_FILES} files</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept={ACCEPT}
                  onChange={(e) => {
                    onPickFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
              {files.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {files.map((file, i) => (
                    <li
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between gap-2 rounded-lg bg-soft px-3 py-2 text-xs text-slate-600"
                    >
                      <span className="min-w-0 truncate font-medium">{file.name}</span>
                      <button
                        type="button"
                        className="shrink-0 font-semibold text-red-500 hover:underline"
                        onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button type="submit" disabled={pending} className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
              <FileSearch className="h-4 w-4" /> {pending ? "Sending…" : "Request second opinion"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
