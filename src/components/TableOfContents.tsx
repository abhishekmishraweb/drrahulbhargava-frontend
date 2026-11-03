"use client";

import { List, X } from "lucide-react";
import { useEffect, useState } from "react";

export type TocItem = { href: string; label: string };

type Props = {
  items: TocItem[];
  title?: string;
};

export function TableOfContents({ items, title = "Table of Contents" }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!items.length) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Open page sections"
        aria-expanded={open}
        aria-controls="page-toc"
        onClick={() => setOpen(true)}
        className="fixed left-3 top-1/2 z-[80] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-navy/75 text-white shadow-[0_10px_28px_rgba(15,39,68,0.28)] backdrop-blur-sm transition hover:bg-navy hover:shadow-[0_10px_28px_rgba(15,39,68,0.35)] sm:left-5 sm:h-14 sm:w-14"
      >
        <List className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div
        id="page-toc"
        className={`fixed inset-0 z-[100] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        hidden={!open}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close sections menu"
          className={`absolute inset-0 border-0 bg-navy/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`absolute bottom-0 left-0 top-0 flex w-[min(86vw,320px)] flex-col overflow-hidden rounded-r-[22px] bg-white shadow-[12px_0_40px_rgba(12,35,64,0.22)] transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-[104%]"
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-navy/10 px-4 py-3.5">
            <strong className="font-display text-[15px] font-extrabold text-navy">{title}</strong>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-navy/5 text-navy hover:bg-navy/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto py-2">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-slate-100 px-4 py-3 text-sm font-semibold text-navy last:border-b-0 hover:bg-soft hover:text-teal"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
