"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type TreatmentCarouselItem = {
  slug: string;
  title: string;
  image?: string;
};

type Props = {
  title?: string;
  treatments: TreatmentCarouselItem[];
  className?: string;
};

export function TreatmentsCarousel({
  title = "Related Treatments",
  treatments,
  className = "",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (!treatments.length) return null;

  return (
    <section className={className}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-display text-xl font-extrabold text-navy sm:text-2xl">{title}</h2>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous treatment"
            onClick={() => trackRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next treatment"
            onClick={() => trackRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {treatments.map((item) => (
          <Link
            key={item.slug}
            href={`/treatments/${item.slug}`}
            className="group w-[min(100%,260px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-teal/40 sm:w-[calc(50%-8px)]"
          >
            <div className="relative aspect-[16/10] bg-soft">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(min-width: 640px) 50vw, 80vw"
                  className="object-contain transition duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-navy/5 text-sm font-semibold text-slate-400">
                  Treatment
                </div>
              )}
            </div>
            <div className="px-4 py-3">
              <p className="font-display text-sm font-bold leading-snug text-navy transition group-hover:text-teal sm:text-base">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
