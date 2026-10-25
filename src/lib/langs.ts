export const langs = [
  { code: "en", label: "English", iso: "gb" },
  { code: "hi", label: "Hindi", iso: "in" },
  { code: "fr", label: "French", iso: "fr" },
  { code: "ar", label: "Arabic", iso: "sa" },
  { code: "bn", label: "Bengali", iso: "bd" },
  { code: "ru", label: "Russian", iso: "ru" },
  { code: "es", label: "Spanish", iso: "es" },
] as const;

export type Lang = (typeof langs)[number];
export const LANG_STORAGE = "drb-lang";

export function langByCode(code: string): Lang {
  return langs.find((l) => l.code === code) ?? langs[0];
}

export function readSavedLang(): string {
  if (typeof document === "undefined") return "en";
  const stored = window.localStorage.getItem(LANG_STORAGE);
  const cookie = document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]+)/);
  return stored || cookie?.[1] || "en";
}

function setCombo(code: string) {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo || !combo.options.length) return false;
  combo.value = code;
  combo.dispatchEvent(new Event("change"));
  return true;
}

export function applyGoogleTranslate(code: string) {
  window.localStorage.setItem(LANG_STORAGE, code);
  document.documentElement.lang = code === "en" ? "en" : code;
  document.documentElement.dir = code === "ar" ? "rtl" : "ltr";

  if (code === "en") {
    document.cookie = "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    setCombo("en");
    return;
  }

  document.cookie = `googtrans=/en/${code};path=/`;
  if (setCombo(code)) return;

  window.setTimeout(() => {
    if (!setCombo(code)) window.location.reload();
  }, 700);
}
