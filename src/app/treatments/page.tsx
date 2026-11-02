import { PageHero } from "@/components/Breadcrumb";
import { fetchTreatmentsList } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Treatments",
    description:
      "Explore hematology treatments with Dr. Rahul Bhargava — thalassemia, leukemia, BMT, CAR-T and more at Fortis Gurugram.",
  });
}

export default async function TreatmentsPage() {
  const items = await fetchTreatmentsList();

  return (
    <>
      <PageHero title="Treatments" items={[{ label: "Treatments" }]} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-slate-500 shadow-sm">
            No treatments published yet.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <Link
                key={t.slug}
                href={`/treatments/${t.slug}`}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:border-teal/40 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-soft">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-lg font-bold text-navy">{t.title}</h2>
                  {t.excerpt ? <p className="mt-2 text-sm text-slate-500">{t.excerpt}</p> : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
