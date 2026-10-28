import { site } from "@/lib/data";
import Link from "next/link";

type Props = {
  html?: string;
  className?: string;
  showActions?: boolean;
};

/** Medigence-style dark CTA card used on blog & treatment pages. */
export function ContentCta({ html, className = "", showActions = true }: Props) {
  const value = (html || "").trim();
  if (!value) return null;

  return (
    <aside
      className={`overflow-hidden rounded-2xl bg-[#124a36] p-5 text-white shadow-[0_12px_40px_rgba(18,74,54,0.28)] sm:rounded-3xl sm:p-6 ${className}`}
    >
      <div
        className="cta-medigence text-[15px] leading-relaxed text-white/90 md:text-[16px] [&_a]:mt-3 [&_a]:flex [&_a]:w-full [&_a]:items-center [&_a]:justify-center [&_a]:gap-2 [&_a]:rounded-lg [&_a]:bg-[#f2f2f7] [&_a]:px-4 [&_a]:py-3 [&_a]:text-center [&_a]:text-[15px] [&_a]:font-semibold [&_a]:text-[#1a1a1a] [&_a]:no-underline hover:[&_a]:bg-white [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-white sm:[&_h2]:text-2xl [&_h3]:mt-3 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_li]:mt-1 [&_p]:mt-2 [&_p:first-child]:mt-0 [&_strong]:text-white [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_a[href*='wa.me']]:bg-[#4ade80] [&_a[href*='wa.me']]:text-[#053b24] hover:[&_a[href*='wa.me']]:bg-[#86efac] [&_a[href*='whatsapp']]:bg-[#4ade80] [&_a[href*='whatsapp']]:text-[#053b24] hover:[&_a[href*='whatsapp']]:bg-[#86efac]"
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {showActions ? (
        <div className="mt-4 space-y-2.5">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4ade80] px-4 py-3.5 text-[15px] font-semibold text-[#053b24] transition hover:bg-[#86efac]"
          >
            <WhatsAppIcon />
            Connect with an Expert
          </a>
          <Link
            href="/contact"
            className="flex w-full items-center justify-center rounded-lg bg-[#f2f2f7] px-4 py-3 text-[15px] font-semibold text-[#1a1a1a] transition hover:bg-white"
          >
            Request a Free Consultation
          </Link>
        </div>
      ) : null}

      <div className="mt-5 border-t border-white/15 pt-4">
        <p className="font-display text-2xl font-extrabold leading-none text-[#4ade80]">15 min</p>
        <p className="mt-1 text-sm text-white/75">Average response time</p>
        <p className="mt-2 text-xs text-white/55">Serving patients worldwide in multiple languages.</p>
      </div>
    </aside>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
