import type { Metadata } from "next";

export function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function splitKeywords(raw?: string | null): string[] | undefined {
  const items = (raw || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

export function googleVerificationToken(raw?: string | null): string | undefined {
  const value = (raw || "").trim();
  if (!value) return undefined;
  const fromMeta = value.match(/content=["']([^"']+)["']/i);
  return (fromMeta?.[1] || value).trim() || undefined;
}

export function pageMetadata(input: {
  title?: string;
  description?: string;
  keywords?: string | null;
  image?: string | null;
}): Metadata {
  const title = input.title?.trim() || undefined;
  const description = input.description?.trim() || undefined;
  const keywords = splitKeywords(input.keywords);
  const image = input.image?.trim() || undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
