import { Logo } from "@/components/Logo";
import { navTreatments, site } from "@/lib/data";
import type { SiteSettings } from "@/lib/api";
import { fetchTreatmentsNav } from "@/lib/api";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

function SocialGlyph({ name }: { name: string }) {
  const className = "h-4 w-4 fill-current";
  if (name === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.6a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6.5 9H4V20h2.5V9zM5.2 4A1.5 1.5 0 1 0 5.2 7 1.5 1.5 0 0 0 5.2 4zM20 20h-2.5v-5.4c0-1.5-.5-2.5-1.8-2.5s-2 1-2 2.5V20H11V9h2.4v1.5A3 3 0 0 1 16 9c2.3 0 4 1.5 4 4.6V20z" />
    </svg>
  );
}

const defaultAbout =
  "MBBS, MD, DM (Clinical Haematology). Principal Director & Chief Hematology at Fortis Memorial Research Institute. Empowering wellness through knowledge and care.";

export async function Footer({ settings }: { settings?: SiteSettings | null }) {
  const fromApi = await fetchTreatmentsNav();
  const treatments = fromApi.length > 0 ? fromApi : navTreatments;

  const siteName = settings?.site_name || site.name;
  const logoTagline = settings?.logo_tagline || "Hematology · BMT";
  const about = settings?.footer_about || defaultAbout;
  const copyright =
    settings?.footer_copyright ||
    "Copyright © 2026 Dr. Rahul Bhargava. This website is for information only and is not a substitute for professional medical advice.";
  const socials = settings?.socials?.length ? settings.socials : site.socials;
  const address = settings?.address || site.address;
  const email = settings?.email || site.email;
  const phone = settings?.phone || site.phone;
  const phoneHref = settings?.phoneHref || site.phoneHref;
  const footerLogo = settings?.footer_logo || settings?.header_logo || "";
  const aboutIsHtml = /<\/?[a-z][\s\S]*>/i.test(about);

  return (
    <footer className="bg-navy-deep text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo light name={siteName} tagline={logoTagline} imageUrl={footerLogo || undefined} />
          {aboutIsHtml ? (
            <div
              className="text-sm leading-relaxed [&_a]:text-teal [&_p]:mt-0"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          ) : (
            <p className="text-sm leading-relaxed">{about}</p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-teal hover:text-white"
              >
                <SocialGlyph name={s.name} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-display font-bold text-white">Treatments</h4>
          <ul className="space-y-2 text-sm">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link href={`/treatments/${t.slug}`} className="hover:text-teal">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-display font-bold text-white">Quick links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/global-patient-services" className="hover:text-teal">
                Global Patient Services
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-teal">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-teal">
                Patient Stories
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-teal">
                News / Blogs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-teal">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-display font-bold text-white">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              {address}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal" />
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal" />
              <a href={phoneHref} className="hover:text-white">
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">{copyright}</div>
    </footer>
  );
}
