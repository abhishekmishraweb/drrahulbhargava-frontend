import { PageHero } from "@/components/Breadcrumb";
import { BlogContactForm } from "@/components/BlogContactForm";
import { ContentCta } from "@/components/ContentCta";
import { JsonLd } from "@/components/JsonLd";
import { ReviewerBox } from "@/components/ReviewerBox";
import { TableOfContents } from "@/components/TableOfContents";
import { TreatmentFaqs } from "@/components/TreatmentConsult";
import { TreatmentsCarousel } from "@/components/TreatmentsCarousel";
import { fetchBlog, fetchBlogs, fetchTreatmentsNav } from "@/lib/api";
import { tocLabelFromHtml } from "@/lib/tocLabel";
import { CalendarDays, User } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const instant = false;

const prose =
  "prose-blog max-w-none text-[15px] leading-relaxed text-slate-600 md:text-[16px] [&_a]:text-teal [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy [&_h4]:mt-5 [&_h4]:font-display [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-navy [&_p]:mt-4 [&_strong]:font-bold [&_strong]:text-navy";

function HtmlBlock({ html, className = "" }: { html: string; className?: string }) {
  if (!html.trim()) return null;
  return <div className={`${prose} ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function CtaBlock({ html }: { html: string }) {
  return <ContentCta html={html} />;
}

export async function generateStaticParams() {
  const fromApi = await fetchBlogs();
  return fromApi.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fromApi = await fetchBlog(slug);
  return pageMetadata({
    title: fromApi?.meta_title || fromApi?.title || "Blog",
    description: fromApi?.meta_description || fromApi?.excerpt,
    keywords: fromApi?.meta_keywords,
    image: fromApi?.image,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [fromApi, navTreatments] = await Promise.all([fetchBlog(slug), fetchTreatmentsNav()]);

  if (!fromApi) notFound();

  const { title, image, date, author } = fromApi;

  // Only tagged treatments (no generic fallback)
  const relatedSlugs = fromApi.related_treatments ?? [];
  const related = navTreatments.filter((t) => relatedSlugs.includes(t.slug));

  const blogToc = [
    ...(fromApi.short_content || fromApi.excerpt
      ? [
          {
            href: "#intro",
            label: tocLabelFromHtml(fromApi.short_content || fromApi.excerpt, "Introduction"),
          },
        ]
      : []),
    { href: "#contact", label: "Get in touch" },
    ...(fromApi.content
      ? [{ href: "#content", label: tocLabelFromHtml(fromApi.content, "Main content") }]
      : []),
    ...(fromApi.optional_content_1
      ? [{ href: "#box-1", label: tocLabelFromHtml(fromApi.optional_content_1, "Section 1") }]
      : []),
    ...(fromApi.optional_content_2
      ? [{ href: "#box-2", label: tocLabelFromHtml(fromApi.optional_content_2, "Section 2") }]
      : []),
    ...(fromApi.optional_content_3
      ? [{ href: "#box-3", label: tocLabelFromHtml(fromApi.optional_content_3, "Section 3") }]
      : []),
    ...(fromApi.faqs.length ? [{ href: "#faqs", label: fromApi.faqs_heading || "FAQs" }] : []),
    ...(fromApi.reviewer?.name ? [{ href: "#reviewer", label: "Reviewer" }] : []),
    ...(related.length ? [{ href: "#related-treatments", label: "Related Treatments" }] : []),
  ];

  return (
    <>
      <JsonLd json={fromApi.schema_json} />
      <PageHero items={[{ href: "/blogs", label: "Blogs" }, { label: title }]} />
      <TableOfContents items={blogToc} />

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

        <h1 className="font-display text-[1.45rem] font-extrabold leading-snug text-navy sm:text-4xl lg:text-[2.4rem]">
          {title}
        </h1>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-teal" /> By {author}
          </span>
          {fromApi.reviewer?.name ? (
            <span className="inline-flex items-center gap-1.5">
              Reviewed by <span className="font-semibold text-navy">{fromApi.reviewer.name}</span>
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-teal" /> {date}
          </span>
        </div>

        <div id="intro" className="scroll-mt-28">
          <HtmlBlock html={fromApi.short_content || fromApi.excerpt} />
        </div>

        <div id="contact" className="scroll-mt-28">
          <BlogContactForm blogSlug={slug} />
        </div>

        <div id="content" className="scroll-mt-28">
          <HtmlBlock html={fromApi.content} />
        </div>

        <CtaBlock html={fromApi.cta_social} />

        <div id="box-1" className="scroll-mt-28">
          <HtmlBlock html={fromApi.optional_content_1} />
        </div>

        <CtaBlock html={fromApi.cta_1} />

        <div id="box-2" className="scroll-mt-28">
          <HtmlBlock html={fromApi.optional_content_2} />
        </div>

        <CtaBlock html={fromApi.cta_2} />

        <div id="box-3" className="scroll-mt-28">
          <HtmlBlock html={fromApi.optional_content_3} />
        </div>

        {fromApi.faqs.length > 0 ? (
          <section id="faqs" className="scroll-mt-28">
            <h2 className="mb-4 font-display text-2xl font-extrabold text-navy">{fromApi.faqs_heading}</h2>
            <TreatmentFaqs faqs={fromApi.faqs} />
          </section>
        ) : null}

        {fromApi.reviewer?.name ? <ReviewerBox reviewer={fromApi.reviewer} /> : null}

        {related.length > 0 ? (
          <div id="related-treatments" className="scroll-mt-28">
            <TreatmentsCarousel
              treatments={related.map((t) => ({
                slug: t.slug,
                title: t.title,
                image: t.image || `/images/treatments/${t.slug}.png`,
              }))}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
