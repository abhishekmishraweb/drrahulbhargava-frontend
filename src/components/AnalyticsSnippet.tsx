"use client";

import { useEffect } from "react";

/** Injects the admin Google Analytics / GTM HTML snippet into the document head. */
export function AnalyticsSnippet({ html }: { html?: string | null }) {
  useEffect(() => {
    const raw = (html || "").trim();
    if (!raw || typeof document === "undefined") return;

    const holder = document.createElement("div");
    holder.innerHTML = raw;
    const added: HTMLElement[] = [];

    holder.querySelectorAll("script").forEach((old) => {
      const script = document.createElement("script");
      Array.from(old.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
      script.text = old.text;
      document.head.appendChild(script);
      added.push(script);
    });

    return () => {
      added.forEach((node) => node.remove());
    };
  }, [html]);

  return null;
}
