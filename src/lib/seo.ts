import type { Metadata } from "next";

export function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://drrahulbhargava-frontend.vercel.app").replace(
    /\/$/,
    ""
  );
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

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${siteOrigin()}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export type OgImageItem = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

/** Prefer a proper 1200×630 social card; admin logo is often too small for LinkedIn. */
export function ogImageEntry(input?: {
  url?: string | null;
  alt?: string;
  preferGenerated?: boolean;
}): OgImageItem[] {
  const alt = input?.alt || "Dr. Rahul Bhargava — Hematologist & BMT, Fortis Gurugram";
  const custom = input?.url?.trim();
  const useCustom = !!custom && !input?.preferGenerated;

  return [
    {
      url: useCustom ? absoluteUrl(custom!) : absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt,
    },
  ];
}

export function pageMetadata(input: {
  title?: string;
  description?: string;
  keywords?: string | null;
  image?: string | null;
  path?: string;
}): Metadata {
  const title = input.title?.trim() || undefined;
  const description = input.description?.trim() || undefined;
  const keywords = splitKeywords(input.keywords);
  const path = input.path?.trim() || undefined;
  const url = path ? absoluteUrl(path) : undefined;
  const images = ogImageEntry({
    url: input.image,
    alt: title,
    preferGenerated: !input.image?.trim(),
  });

  return {
    title,
    description,
    keywords,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Dr. Rahul Bhargava",
      locale: "en_IN",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((img) => img.url),
    },
  };
}
