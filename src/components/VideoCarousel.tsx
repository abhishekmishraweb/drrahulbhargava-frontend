"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export type CarouselVideo = {
  video_id: string;
  title?: string;
  meta?: string;
};

type Props = {
  title?: string;
  intro?: string;
  videos: CarouselVideo[];
  btnText?: string;
  btnLink?: string;
  className?: string;
};

export function VideoCarousel({
  title = "Testimonials",
  intro,
  videos,
  btnText = "View all testimonials",
  btnLink = "/testimonials",
  className = "",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  if (!videos.length) return null;

  return (
    <section className={`mt-10 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">{title}</h2>
          {intro ? <p className="mt-2 text-sm text-slate-600 sm:text-base">{intro}</p> : null}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous video"
            onClick={() => trackRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next video"
            onClick={() => trackRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((v) => (
          <button
            key={v.video_id}
            type="button"
            onClick={() => setActive(v.video_id)}
            className="relative aspect-video w-[min(100%,320px)] shrink-0 snap-start overflow-hidden rounded-2xl shadow-lg sm:w-[calc(50%-10px)] sm:max-w-none"
          >
            <Image
              src={`https://img.youtube.com/vi/${v.video_id}/hqdefault.jpg`}
              alt={v.title || "Video"}
              fill
              unoptimized
              sizes="(min-width: 640px) 50vw, 85vw"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </span>
            </span>
            {(v.title || v.meta) && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-left">
                {v.title ? <span className="block truncate text-sm font-bold text-white">{v.title}</span> : null}
                {v.meta ? <span className="mt-0.5 block truncate text-xs text-white/80">{v.meta}</span> : null}
              </span>
            )}
          </button>
        ))}
      </div>

      {btnLink ? (
        <Link href={btnLink} className="btn-primary mt-6 inline-flex w-full justify-center px-5 py-2.5 text-sm sm:w-auto">
          <Quote className="h-4 w-4" /> {btnText} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}

      {active ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
