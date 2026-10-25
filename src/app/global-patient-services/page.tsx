import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { TreatmentConsult } from "@/components/TreatmentConsult";
import { stories as fallbackStories } from "@/lib/data";
import { fetchGlobalPatientServicesPage } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const fallback = {
  hero_title: "Global Patient Services",
  hero_subtitle:
    "Seamless hematology and BMT care for families travelling to Fortis Memorial Research Institute, Gurugram.",
  why_title: "Why choose us?",
  why_intro:
    "Choosing India and Dr. Rahul Bhargava for hematology and bone marrow transplant care means world-class expertise with unmatched value.",
  why_items: [
    {
      title: "Globally recognised expertise",
      text: "Dr. Rahul Bhargava is known for pioneering bone marrow transplants and treating complex blood disorders with high success rates.",
    },
    {
      title: "State-of-the-art facilities",
      text: "Care is delivered at India’s leading hospitals, with modern transplant units and international infection-control standards.",
    },
    {
      title: "Affordable excellence",
      text: "Patients receive evidence-based treatment at significantly lower cost than the USA, UK or other global healthcare destinations.",
    },
  ],
  deliver_title: "How we deliver what we promise",
  deliver_intro: "Expert medical care plus a well-supported journey from start to finish.",
  deliver_items: [
    "Extensive network of leading hospitals and transplant infrastructure.",
    "Dedicated medically trained case managers from consult to recovery.",
    "On-ground support for airport pick-up, admission and appointments.",
    "Help finding safe, budget-friendly stays near the hospital.",
    "Transparent cost estimates before treatment begins.",
  ],
  support_title: "Complete support for international patients",
  support_intro:
    "Seeking care abroad is hard. We make the stay in India as seamless as possible — from arrival to recovery.",
  support_items: [
    {
      title: "Travel & visa assistance",
      text: "Medical visa documentation, travel planning and airport pickups for a smooth arrival.",
    },
    {
      title: "Accommodation support",
      text: "Comfortable, affordable stays near Fortis Gurugram for the patient and attendant.",
    },
    {
      title: "Language interpretation",
      text: "Interpreters, translated documents and real-time help during consultations.",
    },
    {
      title: "24/7 dedicated support",
      text: "Coordinators available for medical queries, appointments and stay concerns.",
    },
  ],
  journey_title: "Your journey to recovery",
  journey_steps: [
    { n: "01", title: "Consultation", text: "Online or in person — Dr. Bhargava reviews history and builds a tailored plan." },
    { n: "02", title: "Travel and arrival", text: "Visa guidance and airport pickup so the family lands without confusion." },
    { n: "03", title: "Treatment and care", text: "World-class clinical care with international coordinators through the hospital stay." },
    { n: "04", title: "Post-treatment support", text: "Virtual follow-ups and medical guidance after you return home." },
  ],
  stories_title: "Patient stories",
  stories_intro: "Families from around the world who travelled for BMT and blood-cancer care.",
  stories: fallbackStories.slice(0, 4).map((s) => ({
    quote: s.quote,
    name: s.name,
    city: s.city,
    treat: s.treat,
  })),
  stories_link_text: "View all testimonials →",
  stories_link_url: "/testimonials",
  consult_default_slug: "thalassemia",
  meta_title: "Global Patient Services",
  meta_description: "",
  meta_keywords: "",
  schema_json: "",
};

export async function generateMetadata(): Promise<Metadata> {
  const fromApi = await fetchGlobalPatientServicesPage();
  return pageMetadata({
    title: fromApi?.meta_title || fromApi?.hero_title || fallback.meta_title,
    description: fromApi?.meta_description,
    keywords: fromApi?.meta_keywords,
  });
}

export default async function GlobalPatientServicesPage() {
  const fromApi = await fetchGlobalPatientServicesPage();
  const page = fromApi
    ? {
        ...fallback,
        ...fromApi,
        why_items: fromApi.why_items.length ? fromApi.why_items : fallback.why_items,
        deliver_items: fromApi.deliver_items.length ? fromApi.deliver_items : fallback.deliver_items,
        support_items: fromApi.support_items.length ? fromApi.support_items : fallback.support_items,
        journey_steps: fromApi.journey_steps.length ? fromApi.journey_steps : fallback.journey_steps,
        stories: fromApi.stories.length ? fromApi.stories : fallback.stories,
      }
    : fallback;

  return (
    <>
      <JsonLd json={page.schema_json} />
      <PageHero
        title={page.hero_title}
        subtitle={page.hero_subtitle}
        items={[{ label: page.hero_title }]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-12">
        <article className="lg:col-span-8">
          <h2 className="font-display text-2xl font-extrabold text-navy">{page.why_title}</h2>
          {page.why_intro ? <p className="mt-3 text-slate-600">{page.why_intro}</p> : null}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {page.why_items.map((w) => (
              <div key={w.title} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-display font-bold text-navy">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{w.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-extrabold text-navy">{page.deliver_title}</h2>
          {page.deliver_intro ? <p className="mt-3 text-slate-600">{page.deliver_intro}</p> : null}
          <ul className="mt-5 space-y-3">
            {page.deliver_items.map((d) => (
              <li key={d} className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {d}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl font-extrabold text-navy">{page.support_title}</h2>
          {page.support_intro ? <p className="mt-3 text-slate-600">{page.support_intro}</p> : null}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.support_items.map((s) => (
              <div key={s.title} className="rounded-3xl bg-soft p-5">
                <h3 className="font-display font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-extrabold text-navy">{page.journey_title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.journey_steps.map((s) => (
              <div key={`${s.n}-${s.title}`} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="font-display text-2xl font-extrabold text-teal">{s.n}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-extrabold text-navy">{page.stories_title}</h2>
          {page.stories_intro ? <p className="mt-3 text-slate-600">{page.stories_intro}</p> : null}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.stories.map((s) => (
              <blockquote key={`${s.name}-${s.city}`} className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm leading-relaxed text-slate-600">“{s.quote}”</p>
                <p className="mt-3 font-display font-bold text-navy">{s.name}</p>
                <p className="text-xs text-teal">
                  {s.city}
                  {s.city && s.treat ? " · " : ""}
                  {s.treat}
                </p>
              </blockquote>
            ))}
          </div>
          {page.stories_link_text ? (
            <Link href={page.stories_link_url || "/testimonials"} className="mt-5 inline-flex text-sm font-semibold text-teal">
              {page.stories_link_text}
            </Link>
          ) : null}
        </article>
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <TreatmentConsult defaultSlug={page.consult_default_slug || "thalassemia"} />
          </div>
        </aside>
      </div>
    </>
  );
}
