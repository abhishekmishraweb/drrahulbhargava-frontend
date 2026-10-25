import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { TreatmentConsult, TreatmentFaqs } from "@/components/TreatmentConsult";
import { blogs } from "@/lib/data";
import { getBlogPage } from "@/lib/blogPages";
import { fetchBlog, fetchBlogs } from "@/lib/api";
import { CalendarDays, User } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const instant = false;

export async function generateStaticParams() {
  const fromApi = await fetchBlogs();
  const slugs = new Set([
    ...fromApi.map((b) => b.slug),
    ...blogs.map((b) => b.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
  const fromApi = await fetchBlog(slug);
  const fallbackPage = getBlogPage(slug);
  const b = blogs.find((x) => x.slug === slug);

  if (!fromApi && !fallbackPage && !b) notFound();

  const title = fromApi?.title ?? fallbackPage?.title ?? b!.title;
  const image = fromApi?.image || fallbackPage?.image || b!.image;
  const date = fromApi?.date || fallbackPage?.date || b!.date;
  const author = fromApi?.author || fallbackPage?.author || b!.author;

  return (
    <>
      <JsonLd json={fromApi?.schema_json} />
      <PageHero title={title} items={[{ href: "/blogs", label: "Blogs" }, { label: title }]} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:grid-cols-12 lg:px-8 lg:py-12">
        <article className="min-w-0 lg:col-span-8">
          <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:rounded-3xl">
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
          <div className="mb-6 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-teal" /> By {author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-teal" /> {date}
            </span>
          </div>

          {fromApi ? (
            <>
              {fromApi.content ? (
                <div
                  className="prose-blog max-w-none text-[15px] leading-relaxed text-slate-600 md:text-[16px] [&_a]:text-teal [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy [&_h3]:mt-5 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy [&_li]:mt-1 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: fromApi.content }}
                />
              ) : null}
              {[fromApi.optional_content_1, fromApi.optional_content_2, fromApi.optional_content_3]
                .filter(Boolean)
                .map((html, i) => (
                  <div
                    key={`box-${i}`}
                    className="prose-blog mt-8 max-w-none leading-relaxed text-slate-600 [&_a]:text-teal [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-navy [&_p]:mt-3"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ))}
              {fromApi.faqs.length > 0 ? (
                <section className="mt-12">
                  <h2 className="mb-4 font-display text-2xl font-extrabold text-navy">{fromApi.faqs_heading}</h2>
                  <TreatmentFaqs faqs={fromApi.faqs} />
                </section>
              ) : null}
            </>
          ) : fallbackPage ? (
            <>
              {fallbackPage.intro.map((p, i) => (
                <p key={`intro-${i}`} className="mt-4 text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
                  {p}
                </p>
              ))}
              {fallbackPage.sections.map((s) => (
                <section key={s.heading} className="mt-10">
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
                  {s.groups?.map((g) => (
                    <div key={g.title} className="mt-5">
                      <h3 className="font-display text-lg font-bold text-navy">{g.title}</h3>
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-600">
                        {g.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
              <section className="mt-12">
                <h2 className="mb-4 font-display text-2xl font-extrabold text-navy">Frequently asked questions</h2>
                <TreatmentFaqs faqs={fallbackPage.faqs} />
              </section>
            </>
          ) : (
            <>
              <p className="text-lg text-slate-500">{b!.excerpt}</p>
              <p className="mt-6 leading-relaxed text-slate-600">
                This article is an educational overview from Dr. Rahul Bhargava’s hematology practice at Fortis Memorial
                Research Institute, Gurugram.
              </p>
            </>
          )}
        </article>
        <aside className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <TreatmentConsult defaultSlug="thalassemia" />
          </div>
        </aside>
      </div>
    </>
  );
}
