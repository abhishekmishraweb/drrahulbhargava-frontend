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
  title = "Get free medical consultation",
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
        subject: diagnosis ? `Consultation: ${diagnosis}` : title,
        message: note || undefined,
        product_name: diagnosis || undefined,
        source_page: typeof window !== "undefined" ? window.location.pathname : "/",
        meta: { form: "free_consult_modal", report_files: files.length },
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
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/60 p-3 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-slate-400 hover:bg-soft"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {ok ? (
          <div className="p-8 text-center">
            <p className="font-display text-xl font-bold text-navy">Request received</p>
            <p className="mt-2 text-sm text-slate-500">
              Our team will review your details{files.length ? " and reports" : ""} and respond shortly.
            </p>
            <button type="button" className="btn-primary mt-5 px-8 py-2.5 text-sm" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-2.5 p-4 pt-3 sm:p-5 sm:pt-4">
            <div className="pr-7">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-[1.05rem] font-bold leading-snug text-navy sm:text-lg">
                  {title}
                </h3>
                <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-teal">
                  100% FREE
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-500">Free · No obligation · Strictly confidential.</p>
            </div>

            <input required name="name" placeholder="Full name" className="field !py-2.5" />
            <PhoneField placeholder="Phone Number" />
            <input required name="diagnosis" placeholder="Current diagnosis" className="field !py-2.5" autoComplete="off" />
            <textarea
              name="message"
              rows={2}
              placeholder="Symptoms, treatments tried, hospital visits…"
              className="field resize-none !py-2.5"
            />

            <div>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-soft/50 px-3 py-2.5 hover:border-teal">
                <UploadCloud className="h-5 w-5 shrink-0 text-teal" />
                <span className="min-w-0 text-left text-xs leading-snug text-slate-600">
                  <span className="font-semibold text-navy">Attach reports</span>
                  {" — "}
                  <span className="font-bold text-teal underline">browse</span>
                  <span className="mt-0.5 block text-[10px] font-normal text-slate-400">
                    PDF, JPG · max 10 MB · up to {MAX_FILES} files
                  </span>
                </span>
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
                <ul className="mt-1.5 space-y-1">
                  {files.map((file, i) => (
                    <li
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between gap-2 rounded-lg bg-soft px-2.5 py-1.5 text-[11px] text-slate-600"
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
            <button type="submit" disabled={pending} className="btn-primary w-full py-3 text-sm disabled:opacity-60">
              <FileSearch className="h-4 w-4" /> {pending ? "Sending…" : "Request consultation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
