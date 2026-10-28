import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { TreatmentConsult, TreatmentFaqs } from "@/components/TreatmentConsult";
import { fetchBlogs, fetchTreatmentPage, fetchTreatmentsNav } from "@/lib/api";
import { treatments } from "@/lib/data";
import { getTreatmentPage, treatmentPages } from "@/lib/treatmentPages";
import { CalendarDays, Clock, IndianRupee, Star, TrendingUp } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

const prose =
  "prose-treatment max-w-none text-[15px] leading-relaxed text-slate-600 md:text-[16px] [&_a]:text-teal [&_p]:mt-0 [&_p+p]:mt-3";

function HtmlBlock({ html, className = "" }: { html?: string; className?: string }) {
  const value = (html || "").trim();
  if (!value) return null;
  return <div className={`${prose} ${className}`} dangerouslySetInnerHTML={{ __html: value }} />;
}

function CtaBlock({ html }: { html?: string }) {
  const value = (html || "").trim();
  if (!value) return null;
  return (
    <aside className="mt-8 rounded-3xl border border-teal/25 bg-gradient-to-br from-teal/10 via-white to-navy/5 p-5 sm:p-7">
      <HtmlBlock
        html={value}
        className="[&_a]:inline-flex [&_a]:items-center [&_a]:gap-2 [&_a]:rounded-full [&_a]:bg-teal [&_a]:px-5 [&_a]:py-2.5 [&_a]:font-bold [&_a]:text-white [&_a]:no-underline hover:[&_a]:bg-teal-dark [&_p]:mt-2"
      />
    </aside>
  );
}

function formatPageDate(value?: string) {
  const raw = (value || "").trim();
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

function SectionBlock({
  heading,
  paragraphs,
  bullets,
  groups,
}: {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  groups?: Array<{ title: string; bullets: string[] }>;
}) {
  return (
    <section className="mt-10">
      {heading ? <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">{heading}</h2> : null}
      {paragraphs?.map((p, i) =>
        /<\/?[a-z][\s\S]*>/i.test(p) ? (
          <div
            key={`${heading}-p-${i}`}
            className={`${prose} mt-3`}
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ) : (
          <p key={`${heading}-p-${i}`} className="mt-3 leading-relaxed text-slate-600">
            {p}
          </p>
        )
      )}
      {bullets?.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {groups?.map((g) => (
        <div key={g.title} className="mt-5">
          <h3 className="font-display text-lg font-bold text-navy">{g.title}</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-600">
            {g.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export async function generateStaticParams() {
  const fromApi = await fetchTreatmentsNav();
  const slugs = new Set([
    ...fromApi.map((t) => t.slug),
    ...treatmentPages.map((t) => t.slug),
    ...treatments.map((t) => t.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fromApi = await fetchTreatmentPage(slug);
  const page = fromApi ?? getTreatmentPage(slug);
  const t = treatments.find((x) => x.slug === slug);
  return pageMetadata({
    title: fromApi?.meta_title || page?.pageTitle || t?.title || "Treatment",
    description: fromApi?.meta_description,
    keywords: fromApi?.meta_keywords,
    image: fromApi?.image,
  });
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [fromApi, allBlogs] = await Promise.all([fetchTreatmentPage(slug), fetchBlogs()]);
  const fallback = getTreatmentPage(slug);
  const page = fromApi
    ? {
        navTitle: fromApi.navTitle,
        pageTitle: fromApi.pageTitle,
        stay: fromApi.stay,
        cost: fromApi.cost,
        success: fromApi.success,
        intro: fromApi.intro,
        sections: fromApi.sections,
        table: fromApi.table ?? undefined,
        faqs: fromApi.faqs,
        image: fromApi.image,
        videos_heading: fromApi.videos_heading,
        videos_intro: fromApi.videos_intro,
        videos: fromApi.videos,
        section_cta: fromApi.section_cta,
        gallery_heading: fromApi.gallery_heading,
        media_gallery: fromApi.media_gallery,
        google_reviews_heading: fromApi.google_reviews_heading,
        google_reviews: fromApi.google_reviews,
        related_heading: fromApi.related_heading,
        related_blogs: fromApi.related_blogs,
        published_at: fromApi.published_at,
        content_updated_at: fromApi.content_updated_at,
      }
    : fallback
      ? {
          navTitle: fallback.navTitle,
          pageTitle: fallback.pageTitle,
          stay: fallback.stay,
          cost: fallback.cost,
          success: fallback.success,
          intro: fallback.intro,
          sections: fallback.sections,
          table: fallback.table,
          faqs: fallback.faqs,
          image: `/images/treatments/${slug}.png`,
          videos_heading: undefined as string | undefined,
          videos_intro: undefined as string | undefined,
          videos: [] as Array<{ video_id: string; title: string; meta: string }>,
          section_cta: undefined as string | undefined,
          gallery_heading: undefined as string | undefined,
          media_gallery: [] as Array<{ image: string; title: string; link?: string }>,
          google_reviews_heading: undefined as string | undefined,
          google_reviews: [] as Array<{ author: string; rating: number; text: string; date: string }>,
          related_heading: undefined as string | undefined,
          related_blogs: [] as string[],
          published_at: undefined as string | undefined,
          content_updated_at: undefined as string | undefined,
        }
      : null;

  const t = treatments.find((x) => x.slug === slug);
  if (!page && !t) notFound();

  const title = page?.pageTitle ?? t!.title;
  const crumbs = [{ href: "/#specializations", label: "Treatments" }, { label: page?.navTitle ?? t!.title }];
  const banner = page?.image || `/images/treatments/${slug}.png`;
  const relatedBlogSlugs = page?.related_blogs ?? [];
  const relatedBlogs =
    relatedBlogSlugs.length > 0
      ? allBlogs.filter((b) => relatedBlogSlugs.includes(b.slug))
      : [];
  const publishedLabel = formatPageDate(page?.published_at);
  const updatedLabel = formatPageDate(page?.content_updated_at);

  const videosBlock =
    page && (page.videos.length > 0 || page.section_cta) ? (
      <>
        {page.videos.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">
              {page.videos_heading || "Doctor videos"}
            </h2>
            {page.videos_intro ? <p className="mt-2 text-slate-600">{page.videos_intro}</p> : null}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {page.videos.map((video) => (
                <div key={video.video_id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="aspect-video bg-slate-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.video_id}`}
                      title={video.title || "Doctor video"}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {(video.title || video.meta) && (
                    <div className="px-4 py-3">
                      {video.title ? <p className="font-display font-bold text-navy">{video.title}</p> : null}
                      {video.meta ? <p className="mt-0.5 text-sm text-slate-500">{video.meta}</p> : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}
        <CtaBlock html={page.section_cta} />
      </>
    ) : null;

  const galleryBlock =
    page && page.media_gallery.length > 0 ? (
      <section className="mt-10">
        <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">
          {page.gallery_heading || "Hospital, certificates & patients"}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.media_gallery.map((item) => {
            const img = (
              <Image
                src={item.image}
                alt={item.title || title}
                width={800}
                height={600}
                className="h-48 w-full object-cover"
                unoptimized
              />
            );
            return (
              <figure
                key={item.image + item.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {img}
                  </a>
                ) : (
                  img
                )}
                {item.title ? (
                  <figcaption className="px-3 py-2 text-sm font-medium text-slate-600">{item.title}</figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      </section>
    ) : null;

  return (
    <>
      <JsonLd json={fromApi?.schema_json} />
      <PageHero items={crumbs} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="sr-only">{title}</h1>
          <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:rounded-3xl">
            <Image
              src={banner}
              alt={title}
              width={1600}
              height={900}
              className="h-auto w-full max-w-full object-contain"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>

          {page ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {page.stay ? (
                  <div className="rounded-2xl bg-soft p-3 sm:p-4">
                    <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-teal sm:gap-2 sm:text-[11px]">
                      <Clock className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Stay in India
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-navy sm:text-lg">{page.stay}</p>
                  </div>
                ) : null}
                {page.success ? (
                  <div className="rounded-2xl bg-soft p-3 sm:p-4">
                    <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-teal sm:gap-2 sm:text-[11px]">
                      <TrendingUp className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Success rate
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-navy sm:text-lg">{page.success}</p>
                  </div>
                ) : null}
                <div className="col-span-2 rounded-2xl bg-soft p-3 sm:col-span-1 sm:p-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-teal sm:gap-2 sm:text-[11px]">
                    <IndianRupee className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Cost
                  </p>
                  <p className="mt-1 break-words font-display text-sm font-bold leading-snug text-navy sm:text-lg">
                    {page.cost}
                  </p>
                </div>
              </div>

              {/* 1. Intro */}
              {page.intro.map((p, i) =>
                /<\/?[a-z][\s\S]*>/i.test(p) ? (
                  <div
                    key={`intro-${i}`}
                    className={`${prose} mt-5`}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ) : (
                  <p key={`intro-${i}`} className="mt-5 text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
                    {p}
                  </p>
                )
              )}

              {/* Contact form after intro */}
              <div className="mt-8">
                <TreatmentConsult defaultSlug={slug} />
              </div>

              {/* Sections with videos after #1 and gallery after #2 */}
              {page.sections.map((s, index) => (
                <div key={`${s.heading}-${index}`}>
                  <SectionBlock
                    heading={s.heading}
                    paragraphs={s.paragraphs}
                    bullets={s.bullets}
                    groups={s.groups}
                  />
                  {index === 0 ? videosBlock : null}
                  {index === 1 ? galleryBlock : null}
                </div>
              ))}
              {page.sections.length === 0 ? (
                <>
                  {videosBlock}
                  {galleryBlock}
                </>
              ) : null}
              {page.sections.length === 1 ? galleryBlock : null}

              {page.table ? (
                <section className="mt-10">
                  <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">{page.table.caption}</h2>
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead className="bg-navy text-white">
                        <tr>
                          {page.table.headers.map((h) => (
                            <th key={h} className="px-4 py-3 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {page.table.rows.map((row) => (
                          <tr key={row[0]} className="odd:bg-white even:bg-soft">
                            {row.map((cell) => (
                              <td key={cell} className="px-4 py-3 text-slate-600">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              {page.faqs.length > 0 ? (
                <section className="mt-12">
                  <h2 className="mb-4 font-display text-xl font-extrabold text-navy sm:text-2xl">
                    Frequently asked questions
                  </h2>
                  <TreatmentFaqs faqs={page.faqs} />
                </section>
              ) : null}

              {(publishedLabel || updatedLabel) && (
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {publishedLabel ? (
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-teal">
                        <CalendarDays className="h-3.5 w-3.5" /> Date Published
                      </p>
                      <p className="mt-1 font-display font-bold text-navy">{publishedLabel}</p>
                    </div>
                  ) : null}
                  {updatedLabel ? (
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-teal">
                        <CalendarDays className="h-3.5 w-3.5" /> Date Last Updated
                      </p>
                      <p className="mt-1 font-display font-bold text-navy">{updatedLabel}</p>
                    </div>
                  ) : null}
                </div>
              )}

              {page.google_reviews.length > 0 ? (
                <section className="mt-12">
                  <h2 className="mb-4 font-display text-xl font-extrabold text-navy sm:text-2xl">
                    {page.google_reviews_heading || "Google Reviews"}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {page.google_reviews.map((review, i) => (
                      <article
                        key={`${review.author}-${i}`}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star < Math.round(review.rating) ? "fill-current" : "text-slate-200"}`}
                            />
                          ))}
                        </div>
                        {review.text ? <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p> : null}
                        <p className="mt-3 font-display text-sm font-bold text-navy">
                          {review.author || "Patient"}
                          {review.date ? <span className="ml-2 font-normal text-slate-400">{review.date}</span> : null}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              {relatedBlogs.length > 0 ? (
                <section className="mt-12">
                  <h2 className="mb-4 font-display text-xl font-extrabold text-navy sm:text-2xl">
                    {page.related_heading || "Related Blogs"}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedBlogs.map((blog) => (
                      <Link
                        key={blog.slug}
                        href={`/blogs/${blog.slug}`}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-display text-base font-bold text-navy shadow-sm transition hover:border-teal/40 hover:text-teal"
                      >
                        {blog.title}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-lg text-slate-500">{t!.short}</p>
              <p className="mt-6 leading-relaxed text-slate-600">{t!.body}</p>
              <div className="mt-8">
                <TreatmentConsult defaultSlug={slug} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
