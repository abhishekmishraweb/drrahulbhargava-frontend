import { site } from "@/lib/data";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

type Props = {
  html?: string;
  className?: string;
  showActions?: boolean;
  eyebrow?: string;
  bookText?: string;
  bookHref?: string;
  whatsappText?: string;
};

/** Profile-style dark CTA — full-bleed so it isn't squeezed inside article columns. */
export function ContentCta({
  html,
  className = "",
  showActions = true,
  eyebrow = "Same-week OPD",
  bookText = "Book Appointment",
  bookHref = "/contact",
  whatsappText = "WhatsApp us",
}: Props) {
  const value = (html || "").trim();
  if (!value) return null;

  return (
    <div
      className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <aside className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-navy-deep shadow-[0_16px_48px_rgba(14,69,96,0.28)]">
        <div className="h-1.5 w-full bg-teal" />
        <div className="relative grid items-center gap-6 px-5 py-8 sm:gap-8 sm:px-10 sm:py-10 lg:grid-cols-12 lg:px-12 lg:py-12">
          <div className="min-w-0 lg:col-span-7">
            {eyebrow ? (
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{eyebrow}</p>
            ) : null}
            <div
              className="cta-profile mt-2 text-[15px] leading-relaxed text-white/80 md:text-[16px] [&_a]:font-semibold [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-[1.45rem] [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-white sm:[&_h2]:text-3xl [&_h3]:mt-2 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_li]:mt-1 [&_p]:mt-3 [&_p:first-child]:mt-0 [&_p]:max-w-xl [&_strong]:text-white [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:ps-5"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>

          {showActions ? (
            <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
              <Link
                href={bookHref}
                className="btn-primary shrink-0 bg-white px-6 py-3 text-sm text-navy hover:bg-teal hover:text-white"
              >
                <CalendarDays className="h-4 w-4" /> {bookText}
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
              >
                {whatsappText}
              </a>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
