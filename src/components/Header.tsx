"use client";

import { AppointmentModal } from "@/components/AppointmentModal";
import { Logo } from "@/components/Logo";
import { blogs, navTreatments, site, treatments } from "@/lib/data";
import { fetchTreatmentsNav, type SiteSettings, type TreatmentNavItem } from "@/lib/api";
import { applyGoogleTranslate, langByCode, langs, readSavedLang, type Lang } from "@/lib/langs";
import { ChevronDown, Clock, Menu, Minus, Phone, Plus, Search, Stethoscope, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

export function Header({ settings }: { settings?: SiteSettings | null }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [treatOpen, setTreatOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(langs[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [menuTreatments, setMenuTreatments] = useState<TreatmentNavItem[]>(navTreatments);
  const langBox = useRef<HTMLDivElement>(null);

  const phone = settings?.phone || site.phone;
  const phoneHref = settings?.phoneHref || site.phoneHref;
  const hours = settings?.working_hours || site.hours;
  const ctaText = settings?.header_cta_text || "Get free medical consultation";
  const siteName = settings?.site_name || site.name;
  const logoTagline = settings?.logo_tagline || "Hematology · BMT";
  const headerLogo = settings?.header_logo || "";


  useEffect(() => {
    setLang(langByCode(readSavedLang()));
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchTreatmentsNav().then((items) => {
      if (!cancelled && items.length > 0) setMenuTreatments(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!langBox.current?.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setTreatOpen(false);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function pickLang(next: Lang) {
    setLang(next);
    setLangOpen(false);
    applyGoogleTranslate(next.code);
    if (next.code === "en") window.location.reload();
  }

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    const pages = [
      { href: "/", title: "Home", kind: "Pages" },
      { href: "/profile", title: "Profile — Dr. Rahul Bhargava", kind: "Pages" },
      { href: "/contact", title: "Contact", kind: "Pages" },
      { href: "/global-patient-services", title: "Global Patient Services", kind: "Pages" },
      { href: "/disclaimer", title: "Disclaimer", kind: "Pages" },
      ...treatments.map((t) => ({ href: `/treatments/${t.slug}`, title: t.title, kind: "Treatments" })),
      ...blogs.map((b) => ({ href: `/blogs/${b.slug}`, title: b.title, kind: "Blogs" })),
    ];
    return pages.filter((p) => p.title.toLowerCase().includes(s)).slice(0, 8);
  }, [q]);

  function goSearch(e: FormEvent) {
    e.preventDefault();
    if (results[0]) {
      router.push(results[0].href);
      setSearchOpen(false);
      setQ("");
    }
  }

  return (
    <>
      <div className={`bg-navy-deep text-[12px] text-white sm:text-[13px] ${open ? "max-lg:hidden" : ""}`}>
        <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-between gap-2 px-3 py-1.5 sm:px-6 md:grid md:h-[46px] md:grid-cols-3 md:py-0 lg:px-8">
          <a href={phoneHref} className="flex min-w-0 items-center gap-1.5 font-semibold hover:text-teal">
            <Phone className="h-3.5 w-3.5 shrink-0 text-teal sm:h-4 sm:w-4" />
            <span className="truncate">{phone}</span>
          </a>
          <span className="hidden items-center justify-center gap-2 text-[13px] text-white/80 md:inline-flex">
            <Clock className="h-4 w-4 text-teal" />
            {hours}
            {!hours.toLowerCase().includes("sun") ? " · Sun by appointment" : ""}
          </span>
          <button
            type="button"
            onClick={() => setModal(true)}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-white hover:bg-teal-dark sm:ml-auto sm:gap-2 sm:px-5 sm:py-2 sm:text-[12px]"
          >
            <Stethoscope className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="sm:hidden">Free consult</span>
            <span className="hidden sm:inline">{ctaText}</span>
          </button>
        </div>
      </div>

      <header className="sticky top-0 z-[80] border-b border-slate-200/70 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-[82px] sm:px-6 lg:grid lg:h-[90px] lg:grid-cols-[auto_1fr_auto] lg:gap-4 lg:px-8">
          <Link href="/" aria-label="Home" className="min-w-0">
            <Logo name={siteName} tagline={logoTagline} imageUrl={headerLogo || undefined} />
          </Link>
          <nav className="hidden min-w-0 items-center justify-center gap-6 font-display lg:flex xl:gap-8">
            {[
              ["/", "Home"],
              ["/profile", "Profile"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`whitespace-nowrap text-[16px] font-semibold tracking-wide ${
                  path === href ? "text-teal" : "text-navy-deep hover:text-teal"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="group relative">
              <Link
                href="/treatments/thalassemia"
                className={`flex items-center gap-1 whitespace-nowrap text-[16px] font-semibold tracking-wide ${
                  path.startsWith("/treatments") ? "text-teal" : "text-navy-deep hover:text-teal"
                }`}
              >
                Treatments <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="invisible absolute left-0 top-full z-50 w-64 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-slate-100 bg-white py-2 shadow-xl">
                {menuTreatments.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/treatments/${t.slug}`}
                    className={`block px-4 py-2.5 text-[15px] font-semibold hover:bg-soft hover:text-teal ${
                      path === `/treatments/${t.slug}` ? "bg-soft text-teal" : "text-slate-600"
                    }`}
                  >
                    {t.title}
                  </Link>
                ))}
                </div>
              </div>
            </div>
            <Link href="/blogs" className={`whitespace-nowrap text-[16px] font-semibold tracking-wide ${path.startsWith("/blogs") ? "text-teal" : "text-navy-deep hover:text-teal"}`}>
              Blogs
            </Link>
            <Link href="/contact" className={`whitespace-nowrap text-[16px] font-semibold tracking-wide ${path === "/contact" ? "text-teal" : "text-navy-deep hover:text-teal"}`}>
              Contact
            </Link>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <div className="relative" ref={langBox}>
              <button
                type="button"
                onClick={() => {
                  setLangOpen((v) => !v);
                  setSearchOpen(false);
                  setOpen(false);
                }}
                className="notranslate flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-sm font-semibold text-navy hover:border-teal sm:px-3"
                aria-label="Language"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://flagcdn.com/w20/${lang.iso}.png`} alt="" width={20} height={14} className="h-3.5 w-5 rounded-[2px] object-cover" />
                <span className="hidden uppercase sm:inline">{lang.code}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              {langOpen && (
                <ul className="notranslate absolute right-0 z-[120] mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white py-1 shadow-xl">
                  {langs.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        onClick={() => pickLang(l)}
                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-soft ${
                          lang.code === l.code ? "font-semibold text-teal" : "text-slate-600"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://flagcdn.com/w20/${l.iso}.png`} alt="" width={20} height={14} className="h-3.5 w-5 rounded-[2px] object-cover" />
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setLangOpen(false);
              }}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-navy hover:border-teal hover:text-teal sm:h-10 sm:w-10"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-lg p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {open ? (
          <div className="fixed inset-x-0 bottom-0 top-16 z-[70] overflow-y-auto bg-white px-4 py-4 sm:top-[82px] lg:hidden">
            {[
              ["/", "Home"],
              ["/profile", "Profile"],
              ["/blogs", "Blogs"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-3 font-medium ${path === href || (href !== "/" && path.startsWith(href)) ? "bg-soft text-teal" : "text-navy"}`}
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setTreatOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-medium text-navy"
            >
              Treatments
              {treatOpen ? <Minus className="h-4 w-4 text-teal" /> : <Plus className="h-4 w-4 text-navy" />}
            </button>
            {treatOpen
              ? menuTreatments.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/treatments/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-5 py-2 text-sm text-slate-600"
                  >
                    {t.title}
                  </Link>
                ))
              : null}
            {[
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-3 font-medium ${path === href ? "bg-soft text-teal" : "text-navy"}`}
              >
                {label}
              </Link>
            ))}
          </div>
      ) : null}

      {searchOpen && (
        <div className="fixed inset-0 z-[85] flex items-start justify-center bg-navy/55 p-4 pt-24 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-navy">What are you looking for?</h3>
              <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full p-1 text-slate-400 hover:bg-soft" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={goSearch} className="mt-4 flex gap-2">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search treatments, blogs, pages…"
                className="field"
              />
              <button type="submit" className="btn-primary shrink-0 px-4" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Treatments · Blogs · Pages</p>
            {results.length > 0 && (
              <ul className="mt-3 divide-y divide-slate-100">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={() => {
                        setSearchOpen(false);
                        setQ("");
                      }}
                      className="flex items-center justify-between py-2.5 text-sm hover:text-teal"
                    >
                      <span className="text-navy">{r.title}</span>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">{r.kind}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <AppointmentModal open={modal} onClose={() => setModal(false)} title="Get free medical consultation" />
    </>
  );
}
