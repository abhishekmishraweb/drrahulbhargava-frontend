/** Lightweight Suspense fallback — avoids shipping a second full homepage in HTML. */
export function HomeSkeleton() {
  return (
    <div className="min-h-[70vh] bg-soft" aria-hidden="true">
      <div className="relative h-[min(72vh,640px)] animate-pulse bg-navy-deep/90" />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-8 w-2/3 rounded-lg bg-slate-200/80" />
        <div className="h-4 w-full rounded bg-slate-200/70" />
        <div className="h-4 w-5/6 rounded bg-slate-200/70" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 rounded-2xl bg-slate-200/60" />
          <div className="h-40 rounded-2xl bg-slate-200/60" />
          <div className="h-40 rounded-2xl bg-slate-200/60" />
        </div>
      </div>
    </div>
  );
}
