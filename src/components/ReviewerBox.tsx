import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type MedicalReviewerInfo = {
  name: string;
  designation?: string;
  affiliation?: string;
  bio?: string;
  image?: string | null;
  linkedin?: string;
  link_text?: string;
  link_url?: string;
};

type Props = {
  reviewer: MedicalReviewerInfo | null | undefined;
  heading?: string;
  className?: string;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReviewerBox({ reviewer, heading = "Reviewer", className = "" }: Props) {
  if (!reviewer?.name) return null;

  const linkUrl = (reviewer.link_url || "").trim();
  const linkText = (reviewer.link_text || "View Profile").trim() || "View Profile";
  const linkedin = (reviewer.linkedin || "").trim();
  const image = (reviewer.image || "").trim();

  return (
    <section id="reviewer" className={`scroll-mt-28 ${className}`}>
      <h2 className="mb-4 font-display text-xl font-extrabold text-navy sm:text-2xl">{heading}</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5">
          <div className="shrink-0">
            {image ? (
              <Image
                src={image}
                alt={reviewer.name}
                width={112}
                height={112}
                className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
                unoptimized
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-teal text-xl font-extrabold text-white sm:h-28 sm:w-28">
                {initials(reviewer.name) || "DR"}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display text-lg font-extrabold text-navy sm:text-xl">{reviewer.name}</p>
                {reviewer.designation ? (
                  <p className="mt-0.5 text-sm font-semibold text-slate-700">{reviewer.designation}</p>
                ) : null}
                {reviewer.affiliation ? (
                  <p className="mt-0.5 text-sm text-slate-500">{reviewer.affiliation}</p>
                ) : null}
              </div>
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${reviewer.name} on LinkedIn`}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-[13px] font-extrabold text-white hover:opacity-90"
                >
                  in
                </a>
              ) : null}
            </div>

            {reviewer.bio ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{reviewer.bio}</p>
            ) : null}

            {linkUrl ? (
              linkUrl.startsWith("http://") || linkUrl.startsWith("https://") ? (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-teal hover:underline"
                >
                  {linkText} <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={linkUrl}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-teal hover:underline"
                >
                  {linkText} <ArrowRight className="h-4 w-4" />
                </Link>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
