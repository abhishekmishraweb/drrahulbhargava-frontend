import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { stories, videos as fallbackVideos } from "@/lib/data";
import {
  fetchTestimonialsPage,
  testimonialColor,
  testimonialInitials,
} from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const fromApi = await fetchTestimonialsPage();
  return pageMetadata({
    title: fromApi?.meta_title || fromApi?.hero_title || "Testimonials",
    description: fromApi?.meta_description || fromApi?.hero_subtitle,
    keywords: fromApi?.meta_keywords,
  });
}

export default async function TestimonialsPage() {
  const fromApi = await fetchTestimonialsPage();

  const heroEyebrow = fromApi?.hero_eyebrow || "Patient Stories";
  const heroTitle = fromApi?.hero_title || "Testimonials";
  const heroSubtitle =
    fromApi?.hero_subtitle ||
    "Real families who travelled to Dr. Rahul Bhargava for BMT, blood cancer care, and honest second opinions.";

  const cards =
    fromApi?.testimonials && fromApi.testimonials.length > 0
      ? fromApi.testimonials.map((t) => ({
          key: String(t.id || t.name),
          initials: testimonialInitials(t.name),
          color: testimonialColor(t.id || t.name),
          quote: t.message,
          name: t.name,
          rel: t.position,
          city: t.country,
          treat: t.treatment,
        }))
      : stories.map((s) => ({
          key: s.name,
          initials: s.initials,
          color: s.color,
          quote: s.quote,
          name: s.name,
          rel: s.rel,
          city: s.city,
          treat: s.treat,
        }));

  const videos =
    fromApi?.videos && fromApi.videos.length > 0
      ? fromApi.videos.map((v) => ({ id: v.video_id, title: v.title }))
      : fallbackVideos;

  const videosTitle = fromApi?.videos_title || "Video stories";

  return (
    <>
      <JsonLd json={fromApi?.schema_json} />
      <PageHero
        kicker={heroEyebrow}
        title={heroTitle}
        subtitle={heroSubtitle}
        items={[{ label: heroTitle }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((s) => (
            <blockquote key={s.key} className="rounded-3xl border border-slate-200 bg-white p-7">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full font-display font-bold text-white"
                style={{ background: s.color }}
              >
                {s.initials}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">“{s.quote}”</p>
              <footer className="mt-5">
                <p className="font-display font-bold text-navy">{s.name}</p>
                <p className="text-xs text-teal">
                  {[s.rel, s.city].filter(Boolean).join(" · ")}
                </p>
                {s.treat ? <p className="mt-1 text-[11px] text-slate-400">{s.treat}</p> : null}
              </footer>
            </blockquote>
          ))}
        </div>

        {videos.length > 0 ? (
          <>
            <h2 className="mt-16 font-display text-2xl font-extrabold text-navy">{videosTitle}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <Link
                  key={v.id}
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video overflow-hidden rounded-2xl shadow-lg"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    fill
                    className="object-cover"
                  />
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
