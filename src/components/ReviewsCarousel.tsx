"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

export type ReviewItem = {
  author: string;
  rating: number;
  text: string;
  date: string;
  link?: string;
};

type Props = {
  title?: string;
  reviews: ReviewItem[];
  className?: string;
};

export function ReviewsCarousel({ title = "Google Reviews", reviews, className = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (!reviews.length) return null;

  return (
    <section className={`mt-12 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-display text-xl font-extrabold text-navy sm:text-2xl">{title}</h2>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => trackRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => trackRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
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
        {reviews.map((review, i) => {
          const name = review.author || "Patient";
          return (
            <article
              key={`${name}-${i}`}
              className="w-[min(100%,300px)] shrink-0 snap-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:w-[calc(50%-8px)]"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star < Math.round(review.rating) ? "fill-current" : "text-slate-200"}`}
                  />
                ))}
              </div>
              {review.text ? <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p> : null}
              <p className="mt-3 font-display text-sm font-bold text-navy">
                {review.link ? (
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal hover:underline"
                  >
                    {name}
                  </a>
                ) : (
                  name
                )}
                {review.date ? <span className="ml-2 font-normal text-slate-400">{review.date}</span> : null}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
