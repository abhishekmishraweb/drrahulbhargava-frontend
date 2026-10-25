import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { blogs as fallbackBlogs } from "@/lib/data";
import { fetchBlogs, fetchBlogsListingPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchBlogsListingPage();
  return pageMetadata({
    title: page?.meta_title || page?.hero_title || "Blogs",
    description: page?.meta_description || page?.hero_subtitle,
    keywords: page?.meta_keywords,
  });
}

export default async function BlogsPage() {
  const [page, fromApi] = await Promise.all([fetchBlogsListingPage(), fetchBlogs()]);

  const heroKicker = page?.hero_kicker || "Health tips";
  const heroTitle = page?.hero_title || "Blogs";
  const heroSubtitle =
    page?.hero_subtitle ||
    "Health tips from Dr. Rahul Bhargava’s hematology practice at Fortis Gurugram.";

  const items =
    fromApi.length > 0
      ? fromApi
      : fallbackBlogs.map((b) => ({
          id: 0,
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt,
          image: b.image,
          author: b.author,
          date: b.date,
          published_at: b.date,
        }));

  return (
    <>
      <JsonLd json={page?.schema_json} />
      <PageHero
        kicker={heroKicker}
        title={heroTitle}
        subtitle={heroSubtitle}
        items={[{ label: heroTitle }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <Link
              key={b.slug}
              href={`/blogs/${b.slug}`}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg"
            >
              <div className="bg-slate-50">
                <Image
                  src={b.image}
                  alt={b.title}
                  width={800}
                  height={450}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400">
                  {b.date}
                  {b.author ? ` · ${b.author}` : ""}
                </p>
                <h2 className="mt-2 font-display text-lg font-bold text-navy">{b.title}</h2>
                {b.excerpt ? <p className="mt-2 text-sm text-slate-500">{b.excerpt}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
