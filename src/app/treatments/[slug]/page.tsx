import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { TreatmentConsult, TreatmentFaqs } from "@/components/TreatmentConsult";
import { fetchTreatmentPage, fetchTreatmentsNav } from "@/lib/api";
import { treatments } from "@/lib/data";
import { getTreatmentPage, treatmentPages } from "@/lib/treatmentPages";
import { Clock, IndianRupee, TrendingUp } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const instant = false;

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
  const fromApi = await fetchTreatmentPage(slug);
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
        }
      : null;

  const t = treatments.find((x) => x.slug === slug);
  if (!page && !t) notFound();

  const title = page?.pageTitle ?? t!.title;
  const crumbs = [{ href: "/#specializations", label: "Treatments" }, { label: page?.navTitle ?? t!.title }];
  const banner = page?.image || `/images/treatments/${slug}.png`;

  return (
    <>
      <JsonLd json={fromApi?.schema_json} />
      <PageHero title={title} items={crumbs} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:grid-cols-12 lg:px-8 lg:py-12">
        <article className="min-w-0 lg:col-span-8">
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
                  <p className="mt-1 break-words font-display text-sm font-bold leading-snug text-navy sm:text-lg">{page.cost}</p>
                </div>
              </div>
              {page.intro.map((p, i) =>
                /<\/?[a-z][\s\S]*>/i.test(p) ? (
                  <div
                    key={`intro-${i}`}
                    className="prose-treatment mt-5 text-[15px] leading-relaxed text-slate-600 md:text-[16px] [&_a]:text-teal [&_p]:mt-0 [&_p+p]:mt-5"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ) : (
                  <p key={`intro-${i}`} className="mt-5 text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
                    {p}
                  </p>
                )
              )}
              {page.sections.map((s) => (
                <section key={s.heading} className="mt-10">
                  <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">{s.heading}</h2>
                  {s.paragraphs?.map((p, i) =>
                    /<\/?[a-z][\s\S]*>/i.test(p) ? (
                      <div
                        key={`${s.heading}-p-${i}`}
                        className="prose-treatment mt-3 leading-relaxed text-slate-600 [&_a]:text-teal [&_p]:mt-0 [&_p+p]:mt-3"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ) : (
                      <p key={`${s.heading}-p-${i}`} className="mt-3 leading-relaxed text-slate-600">
                        {p}
                      </p>
                    )
                  )}
                  {s.bullets ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {s.groups?.map((g) => (
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
              ))}
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
              <section className="mt-12">
                <h2 className="mb-4 font-display text-xl font-extrabold text-navy sm:text-2xl">Frequently asked questions</h2>
                <TreatmentFaqs faqs={page.faqs} />
              </section>
            </>
          ) : (
            <>
              <p className="text-lg text-slate-500">{t!.short}</p>
              <p className="mt-6 leading-relaxed text-slate-600">{t!.body}</p>
            </>
          )}
        </article>
        <aside className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <TreatmentConsult defaultSlug={slug} />
          </div>
        </aside>
      </div>
    </>
  );
}
