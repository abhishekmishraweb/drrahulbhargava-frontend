import { PageHero } from "@/components/Breadcrumb";
import { BlogContactForm } from "@/components/BlogContactForm";
import { ContentCta } from "@/components/ContentCta";
import { JsonLd } from "@/components/JsonLd";
import { TreatmentFaqs } from "@/components/TreatmentConsult";
import { blogs } from "@/lib/data";
import { getBlogPage } from "@/lib/blogPages";
import { fetchBlog, fetchBlogs, fetchTreatmentsNav } from "@/lib/api";
import { CalendarDays, User } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

const prose =
  "prose-blog max-w-none text-[15px] leading-relaxed text-slate-600 md:text-[16px] [&_a]:text-teal [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy [&_h4]:mt-5 [&_h4]:font-display [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-navy [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:mt-4 [&_strong]:font-bold [&_strong]:text-navy [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";

function HtmlBlock({ html, className = "" }: { html: string; className?: string }) {
  if (!html.trim()) return null;
  return <div className={`${prose} ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function CtaBlock({ html }: { html: string }) {
  return <ContentCta html={html} />;
}

export async function generateStaticParams() {
  const fromApi = await fetchBlogs();
  const slugs = new Set([...fromApi.map((b) => b.slug), ...blogs.map((b) => b.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fromApi = await fetchBlog(slug);
  const page = getBlogPage(slug);
  const b = blogs.find((x) => x.slug === slug);
  return pageMetadata({
    title: fromApi?.meta_title || fromApi?.title || page?.title || b?.title || "Blog",
    description: fromApi?.meta_description || fromApi?.excerpt || page?.excerpt || b?.excerpt,
    keywords: fromApi?.meta_keywords,
    image: fromApi?.image,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [fromApi, navTreatments] = await Promise.all([fetchBlog(slug), fetchTreatmentsNav()]);
  const fallbackPage = getBlogPage(slug);
  const b = blogs.find((x) => x.slug === slug);

  if (!fromApi && !fallbackPage && !b) notFound();

  const title = fromApi?.title ?? fallbackPage?.title ?? b!.title;
  const image = fromApi?.image || fallbackPage?.image || b!.image;
  const date = fromApi?.date || fallbackPage?.date || b!.date;
  const author = fromApi?.author || fallbackPage?.author || b!.author;

  const relatedSlugs = fromApi?.related_treatments ?? [];
  const related =
    relatedSlugs.length > 0
      ? navTreatments.filter((t) => relatedSlugs.includes(t.slug))
      : navTreatments.slice(0, 4);

  return (
    <>
      <JsonLd json={fromApi?.schema_json} />
      <PageHero title={title} items={[{ href: "/blogs", label: "Blogs" }, { label: title }]} />

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:space-y-10 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:rounded-3xl">
          <Image
            src={image}
            alt={title}
            width={1600}
            height={900}
            className="h-auto w-full max-w-full object-contain"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-teal" /> By {author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-teal" /> {date}
          </span>
        </div>

        {fromApi ? (
          <>
            {/* 1. Short content */}
            <HtmlBlock html={fromApi.short_content || fromApi.excerpt} />

            {/* 2. Contact form */}
            <BlogContactForm blogSlug={slug} />

            {/* 3. Main content */}
            <HtmlBlock html={fromApi.content} />

            {/* 4. CTA social */}
            <CtaBlock html={fromApi.cta_social} />

            {/* 5. Content Box 1 */}
            <HtmlBlock html={fromApi.optional_content_1} />

            {/* 6. CTA package */}
            <CtaBlock html={fromApi.cta_1} />

            {/* 7. Content Box 2 */}
            <HtmlBlock html={fromApi.optional_content_2} />

            {/* 8. CTA */}
            <CtaBlock html={fromApi.cta_2} />

            {/* 9. Content Box 3 */}
            <HtmlBlock html={fromApi.optional_content_3} />

            {/* 10. FAQs */}
            {fromApi.faqs.length > 0 ? (
              <section>
                <h2 className="mb-4 font-display text-2xl font-extrabold text-navy">{fromApi.faqs_heading}</h2>
                <TreatmentFaqs faqs={fromApi.faqs} />
              </section>
            ) : null}
          </>
        ) : fallbackPage ? (
          <>
            {fallbackPage.intro.map((p, i) => (
              <p key={`intro-${i}`} className="text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
                {p}
              </p>
            ))}
            <BlogContactForm blogSlug={slug} />
            {fallbackPage.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-2xl font-extrabold text-navy">{s.heading}</h2>
                {s.paragraphs?.map((p, i) => (
                  <p key={`${s.heading}-p-${i}`} className="mt-3 leading-relaxed text-slate-600">
                    {p}
                  </p>
                ))}
                {s.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                    {s.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <section>
              <h2 className="mb-4 font-display text-2xl font-extrabold text-navy">Frequently asked questions</h2>
              <TreatmentFaqs faqs={fallbackPage.faqs} />
            </section>
          </>
        ) : (
          <>
            <p className="text-lg text-slate-500">{b!.excerpt}</p>
            <BlogContactForm blogSlug={slug} />
          </>
        )}

        {/* 11. Related Treatments */}
        {related.length > 0 ? (
          <section>
            <h2 className="mb-4 font-display text-2xl font-extrabold text-navy">Related Treatments</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/treatments/${t.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-display text-base font-bold text-navy shadow-sm transition hover:border-teal/40 hover:text-teal"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
