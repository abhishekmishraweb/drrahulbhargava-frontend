"use client";

import { applyGoogleTranslate, readSavedLang } from "@/lib/langs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          opts: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          id: string,
        ) => void;
      };
    };
  }
}

export function GoogleTranslate() {
  const path = usePathname();

  useEffect(() => {
    const saved = readSavedLang();
    if (saved && saved !== "en") {
      const t = window.setTimeout(() => applyGoogleTranslate(saved), 350);
      return () => window.clearTimeout(t);
    }
  }, [path]);

  useEffect(() => {
    const boot = window.setTimeout(() => {
      window.googleTranslateElementInit = () => {
        if (!window.google?.translate) return;
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,fr,ar,bn,ru,es",
            autoDisplay: false,
          },
          "google_translate_element",
        );
        const saved = readSavedLang();
        if (saved && saved !== "en") {
          window.setTimeout(() => applyGoogleTranslate(saved), 500);
        }
      };

      if (document.getElementById("google-translate-script")) {
        window.googleTranslateElementInit();
        return;
      }

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }, 600);

    return () => window.clearTimeout(boot);
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden />;
}
