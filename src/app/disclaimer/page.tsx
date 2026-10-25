import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { fetchLegalPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const fallback = {
  slug: "disclaimer",
  eyebrow: "Legal",
  title: "Disclaimer",
  lead: "This website is for education and awareness. It is not a substitute for a hematologist’s advice.",
  updated_label: "",
  intro: "",
  sections: [
    {
      id: "education",
      title: "",
      paragraphs: [
        "www.drrahulbhargavahematologist.com is meant to educate and create awareness about the health issues related to hematology and overall blood health. This shall not be treated as a substitute for a professional hematologist’s advice or prescription.",
        "There is no guarantee of specific results, and the results for any treatment mentioned on the website may vary, as every individual and their health conditions are different.",
        "Always consult Dr. Rahul Bhargava or your treating physician before making decisions about diagnosis, medicines or transplant. Sharing reports through this site does not create a doctor–patient relationship until a consult is confirmed.",
      ],
      bullets: [] as string[],
    },
  ],
  cta_eyebrow: "",
  cta_heading: "Contact the team",
  cta_text: "",
  cta_phone: "",
  meta_title: "Disclaimer",
  meta_description: "",
  meta_keywords: "",
  schema_json: "",
};

export async function generateMetadata(): Promise<Metadata> {
  const fromApi = await fetchLegalPage("disclaimer");
  return pageMetadata({
    title: fromApi?.meta_title || fromApi?.title || fallback.meta_title,
    description: fromApi?.meta_description || fromApi?.lead,
    keywords: fromApi?.meta_keywords,
  });
}

export default async function DisclaimerPage() {
  const fromApi = await fetchLegalPage("disclaimer");
  const page = fromApi
    ? {
        ...fallback,
        ...fromApi,
        sections: fromApi.sections.length ? fromApi.sections : fallback.sections,
      }
    : fallback;

  const introIsHtml = /<\/?[a-z][\s\S]*>/i.test(page.intro);
  const ctaIsHtml = /<\/?[a-z][\s\S]*>/i.test(page.cta_text);
  const phoneHref = page.cta_phone.replace(/[^\d+]/g, "");

  return (
    <>
      <JsonLd json={page.schema_json} />
      <PageHero
        kicker={page.eyebrow || "Legal"}
        title={page.title}
        subtitle={page.lead}
        items={[{ label: page.title }]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          {page.updated_label ? (
            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-teal">
              Updated {page.updated_label}
            </p>
          ) : null}

          {page.intro ? (
            introIsHtml ? (
              <div
                className="leading-relaxed text-slate-600 [&_a]:text-teal [&_p]:mt-0 [&_p+p]:mt-5"
                dangerouslySetInnerHTML={{ __html: page.intro }}
              />
            ) : (
              <p className="leading-relaxed text-slate-600">{page.intro}</p>
            )
          ) : null}

          {page.sections.map((section, index) => (
            <section
              key={section.id || `${section.title}-${index}`}
              className={page.intro || index > 0 ? "mt-8" : undefined}
            >
              {section.title ? (
                <h2 className="font-display text-lg font-extrabold text-navy sm:text-xl">{section.title}</h2>
              ) : null}
              {section.paragraphs.map((p, i) =>
                /<\/?[a-z][\s\S]*>/i.test(p) ? (
                  <div
                    key={`${section.id}-p-${i}`}
                    className={`${section.title || i > 0 ? "mt-4" : ""} leading-relaxed text-slate-600 [&_a]:text-teal`}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ) : (
                  <p
                    key={`${section.id}-p-${i}`}
                    className={`${section.title || i > 0 ? "mt-4" : ""} leading-relaxed text-slate-600`}
                  >
                    {p}
                  </p>
                )
              )}
              {section.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {(page.cta_heading || page.cta_text || page.cta_phone) && (
            <div className="mt-10 border-t border-slate-100 pt-8">
              {page.cta_eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-teal">{page.cta_eyebrow}</p>
              ) : null}
              {page.cta_heading ? (
                <h2 className="mt-1 font-display text-xl font-extrabold text-navy">{page.cta_heading}</h2>
              ) : null}
              {page.cta_text ? (
                ctaIsHtml ? (
                  <div
                    className="mt-3 leading-relaxed text-slate-600 [&_a]:text-teal"
                    dangerouslySetInnerHTML={{ __html: page.cta_text }}
                  />
                ) : (
                  <p className="mt-3 leading-relaxed text-slate-600">{page.cta_text}</p>
                )
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex px-6 py-3 text-sm">
                  Contact the team
                </Link>
                {page.cta_phone ? (
                  <a href={`tel:${phoneHref}`} className="inline-flex items-center text-sm font-semibold text-teal">
                    {page.cta_phone}
                  </a>
                ) : null}
              </div>
            </div>
          )}

          {!page.cta_heading && !page.cta_text && !page.cta_phone ? (
            <Link href="/contact" className="btn-primary mt-8 inline-flex px-6 py-3 text-sm">
              Contact the team
            </Link>
          ) : null}
        </div>
      </article>
    </>
  );
}
