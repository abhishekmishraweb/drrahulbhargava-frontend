"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const countries = [
  { iso: "in", dial: "+91", label: "India" },
  { iso: "us", dial: "+1", label: "United States" },
  { iso: "gb", dial: "+44", label: "United Kingdom" },
  { iso: "ae", dial: "+971", label: "UAE" },
  { iso: "sa", dial: "+966", label: "Saudi Arabia" },
  { iso: "ng", dial: "+234", label: "Nigeria" },
  { iso: "ke", dial: "+254", label: "Kenya" },
  { iso: "bd", dial: "+880", label: "Bangladesh" },
  { iso: "iq", dial: "+964", label: "Iraq" },
  { iso: "eg", dial: "+20", label: "Egypt" },
  { iso: "np", dial: "+977", label: "Nepal" },
  { iso: "pk", dial: "+92", label: "Pakistan" },
  { iso: "za", dial: "+27", label: "South Africa" },
  { iso: "ru", dial: "+7", label: "Russia" },
  { iso: "fr", dial: "+33", label: "France" },
];

export function PhoneField({
  placeholder = "Phone",
  required = true,
  name = "phone",
}: {
  placeholder?: string;
  required?: boolean;
  name?: string;
}) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(countries[0]);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrap} className="relative">
      <div className="field flex items-stretch !p-0 focus-within:border-teal focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(139,195,74,0.18)]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 items-center gap-1.5 border-r border-slate-200 px-2.5 text-navy-deep sm:px-3"
          aria-label={`Country code ${code.dial}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w20/${code.iso}.png`}
            alt=""
            width={20}
            height={14}
            className="h-3.5 w-5 rounded-[2px] object-cover"
          />
          <span className="text-sm font-semibold">{code.dial}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
        <input type="hidden" name={`${name}_code`} value={code.dial} />
        <input
          required={required}
          type="tel"
          name={name}
          inputMode="tel"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[0.95rem] text-navy-deep outline-none placeholder:text-slate-400"
        />
      </div>
      {open ? (
        <ul className="absolute left-0 z-30 mt-1 max-h-56 w-56 overflow-auto rounded-xl border border-slate-100 bg-white py-1 shadow-xl">
          {countries.map((c) => (
            <li key={c.iso}>
              <button
                type="button"
                onClick={() => {
                  setCode(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-soft ${
                  code.iso === c.iso ? "font-semibold text-teal" : "text-slate-600"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt="" width={20} height={14} className="h-3.5 w-5 rounded-[2px] object-cover" />
                <span className="flex-1">{c.label}</span>
                <span className="text-slate-400">{c.dial}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
