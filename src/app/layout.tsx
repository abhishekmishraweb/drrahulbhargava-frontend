import { AnalyticsSnippet } from "@/components/AnalyticsSnippet";
import { Fab } from "@/components/Fab";
import { Footer } from "@/components/Footer";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { Header } from "@/components/Header";
import { fetchSiteSettings } from "@/lib/api";
import { googleVerificationToken, ogImageEntry, siteOrigin, splitKeywords } from "@/lib/seo";
import type { Metadata } from "next";
import { Nunito, Outfit } from "next/font/google";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const name = settings?.site_name || "Dr. Rahul Bhargava";
  const origin = siteOrigin();
  const favicon = settings?.favicon?.trim() || "/favicon.png";
  const title =
    settings?.home_meta_title || `${name} | Hematologist & BMT | Fortis Gurugram`;
  const description =
    settings?.home_meta_description ||
    "Principal Director & Chief Hematology at Fortis Memorial Research Institute. 1,500+ stem cell transplants. CAR-T, leukemia, thalassemia and myeloma care.";
  // Logo uploads are usually too small for LinkedIn — use generated 1200×630 card.
  const images = ogImageEntry({ alt: title, preferGenerated: true });
  const verification = googleVerificationToken(settings?.google_search_console_code);

  return {
    metadataBase: new URL(origin),
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    description,
    keywords: splitKeywords(settings?.home_meta_keywords),
    alternates: {
      canonical: origin,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: favicon, type: "image/png" },
        { url: favicon, sizes: "32x32", type: "image/png" },
      ],
      shortcut: favicon,
      apple: favicon,
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title,
      description,
      type: "website",
      url: origin,
      siteName: name,
      locale: "en_IN",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((img) => img.url),
    },
    other: {
      "theme-color": "#156f9f",
    },
    verification: verification ? { google: verification } : undefined,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await fetchSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AnalyticsSnippet html={settings?.google_analytics_code} />
        <GoogleTranslate />
        <Header settings={settings} />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer settings={settings} />
        <Fab settings={settings} />
      </body>
    </html>
  );
}
