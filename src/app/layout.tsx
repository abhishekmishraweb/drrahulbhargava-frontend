import { AnalyticsSnippet } from "@/components/AnalyticsSnippet";
import { Fab } from "@/components/Fab";
import { Footer } from "@/components/Footer";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { Header } from "@/components/Header";
import { fetchSiteSettings } from "@/lib/api";
import { googleVerificationToken, siteOrigin, splitKeywords } from "@/lib/seo";
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
  const favicon = settings?.favicon?.trim() || "/favicon.png";
  const title =
    settings?.home_meta_title || `${name} | Hematologist & BMT | Fortis Gurugram`;
  const description =
    settings?.home_meta_description ||
    "Principal Director & Chief Hematology at Fortis Memorial Research Institute. 1,500+ stem cell transplants. CAR-T, leukemia, thalassemia and myeloma care.";
  const image = settings?.home_og_image || undefined;
  const verification = googleVerificationToken(settings?.google_search_console_code);

  return {
    metadataBase: new URL(siteOrigin()),
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    description,
    keywords: splitKeywords(settings?.home_meta_keywords),
    icons: {
      icon: [{ url: favicon, type: "image/png" }],
      shortcut: favicon,
      apple: favicon,
    },
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
