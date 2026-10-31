import { PageHero } from "@/components/Breadcrumb";
import { fetchReviewer } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

const prose =
  "prose-blog max-w-none text-[15px] leading-relaxed text-slate-600 md:text-[16px] [&_a]:text-teal [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:mt-4 [&_strong]:font-bold [&_strong]:text-navy [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const reviewer = await fetchReviewer(slug);
  return pageMetadata({
    title: reviewer ? `${reviewer.name} | Reviewer` : "Reviewer",
    description: reviewer?.bio || reviewer?.designation,
    image: reviewer?.image || undefined,
  });
}

export default async function ReviewerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reviewer = await fetchReviewer(slug);
  if (!reviewer) notFound();

  const aboutHtml = (reviewer.about || "").trim();
  const bio = (reviewer.bio || "").trim();

  return (
    <>
      <PageHero
        title={reviewer.name}
        items={[{ href: "/", label: "Home" }, { label: "Reviewer" }, { label: reviewer.name }]}
      />

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {reviewer.image ? (
            <Image
              src={reviewer.image}
              alt={reviewer.name}
              width={160}
              height={160}
              className="h-36 w-36 rounded-2xl object-cover sm:h-40 sm:w-40"
              unoptimized
            />
          ) : (
            <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-teal text-3xl font-extrabold text-white sm:h-40 sm:w-40">
              {reviewer.name
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((p) => p[0]?.toUpperCase() ?? "")
                .join("")}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{reviewer.name}</h1>
            {reviewer.designation ? (
              <p className="mt-1 text-base font-semibold text-slate-700">{reviewer.designation}</p>
            ) : null}
            {reviewer.affiliation ? (
              <p className="mt-1 text-sm text-slate-500">{reviewer.affiliation}</p>
            ) : null}
            {reviewer.experience ? (
              <p className="mt-2 text-sm font-semibold text-teal">Experience: {reviewer.experience}</p>
            ) : null}
            {reviewer.linkedin ? (
              <a
                href={reviewer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#0A66C2] hover:underline"
              >
                LinkedIn profile
              </a>
            ) : null}
          </div>
        </div>

        {aboutHtml ? (
          <div className={prose} dangerouslySetInnerHTML={{ __html: aboutHtml }} />
        ) : bio ? (
          <p className="text-[15px] leading-relaxed text-slate-600 md:text-[16px]">{bio}</p>
        ) : null}

        <div>
          <Link href="/" className="text-sm font-bold text-teal hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
