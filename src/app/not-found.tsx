import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-navy">404</p>
      <p className="mt-4 text-slate-500">This page is not in the clinic map.</p>
      <Link href="/" className="btn-primary mt-8 inline-flex px-7 py-3 text-sm">
        Back home
      </Link>
    </div>
  );
}
