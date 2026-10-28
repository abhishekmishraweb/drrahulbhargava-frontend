import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

type Crumb = { href?: string; label: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/80 bg-white/90 p-1.5 shadow-[0_8px_30px_rgba(14,69,96,0.08)] ring-1 ring-navy/5 backdrop-blur-sm">
        <li>
          <Link
            href="/"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white transition hover:bg-teal"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-navy/30" />
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="truncate rounded-full px-3 py-1.5 text-xs font-semibold text-navy hover:bg-soft hover:text-teal sm:text-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="truncate rounded-full bg-mist px-3.5 py-1.5 text-xs font-bold text-navy sm:text-sm">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHero({
  title,
  subtitle,
  items,
}: {
  kicker?: string;
  title?: string;
  subtitle?: string;
  items: Crumb[];
}) {
  return (
    <div className="relative overflow-hidden bg-soft">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-navy/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Breadcrumb items={items} />
        {title ? <h1 className="sr-only">{title}</h1> : null}
        {subtitle ? <p className="mt-1.5 max-w-2xl text-sm leading-snug text-slate-500 sm:text-base">{subtitle}</p> : null}
      </div>
    </div>
  );
}
