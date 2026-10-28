import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

type Crumb = { href?: string; label: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="inline-flex max-w-full items-center gap-0.5 rounded-full border border-white/80 bg-white/90 p-0.5 shadow-[0_4px_16px_rgba(14,69,96,0.06)] ring-1 ring-navy/5 backdrop-blur-sm">
        <li>
          <Link
            href="/"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy text-white transition hover:bg-teal"
            aria-label="Home"
          >
            <Home className="h-3 w-3" />
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-0.5">
              <ChevronRight className="h-3 w-3 shrink-0 text-navy/30" />
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="truncate rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none text-navy hover:bg-soft hover:text-teal sm:text-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="truncate rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-bold leading-none text-navy sm:text-xs">
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
  items,
}: {
  kicker?: string;
  title?: string;
  subtitle?: string;
  items: Crumb[];
}) {
  return (
    <div className="relative overflow-hidden bg-soft">
      <div className="relative mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        <Breadcrumb items={items} />
        {title ? <h1 className="sr-only">{title}</h1> : null}
      </div>
    </div>
  );
}
