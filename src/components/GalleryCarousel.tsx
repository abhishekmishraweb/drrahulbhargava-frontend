"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryCarouselItem = {
  image: string;
  title?: string;
  link?: string;
};

type Props = {
  title?: string;
  items: GalleryCarouselItem[];
  className?: string;
  id?: string;
};

export function GalleryCarousel({
  title = "Gallery",
  items,
  className = "",
  id = "gallery",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  }, [items.length]);
  const showNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, showPrev, showNext]);

  if (!items.length) return null;

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <section id={id} className={`mt-10 scroll-mt-28 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-display text-xl font-extrabold text-navy sm:text-2xl">{title}</h2>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous gallery image"
            onClick={() => trackRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next gallery image"
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
        {items.map((item, i) => (
          <figure
            key={`${item.image}-${item.title ?? i}`}
            className="w-[min(100%,280px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="block w-full cursor-zoom-in text-left"
              aria-label={item.title ? `Open ${item.title}` : `Open gallery image ${i + 1}`}
            >
              <Image
                src={item.image}
                alt={item.title || title}
                width={800}
                height={600}
                className="h-48 w-full object-cover transition hover:opacity-95"
                unoptimized
              />
            </button>
            {item.title ? (
              <figcaption className="px-3 py-2 text-sm font-medium text-slate-600">{item.title}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {active && openIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:right-6"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          ) : null}

          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.image}
              alt={active.title || title}
              width={1600}
              height={1200}
              className="max-h-[78vh] w-auto max-w-full object-contain"
              unoptimized
              priority
            />
            <div className="mt-3 flex w-full items-center justify-between gap-3 px-1 text-sm text-white/90">
              <p className="min-w-0 truncate font-medium">{active.title || ""}</p>
              <p className="shrink-0 tabular-nums text-white/70">
                {openIndex + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
