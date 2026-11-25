type Props = {
  title?: string;
  subtitle?: string;
  badge?: string;
  align?: "start" | "center";
  className?: string;
};

export function ConsultFormHeader({
  title = "Request a Consultation with Dr. Rahul Bhargava",
  subtitle = "Free · No obligation · Strictly confidential",
  badge = "100% FREE",
  align = "start",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={`flex items-start gap-3 ${centered ? "flex-col items-center text-center" : "justify-between"} ${className}`}
    >
      <div className={centered ? "" : "min-w-0"}>
        <h2
          className={`font-display font-extrabold leading-snug text-navy ${
            centered ? "text-xl sm:text-[1.35rem]" : "text-xl sm:text-2xl"
          }`}
        >
          {title}
        </h2>
        {subtitle ? <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p> : null}
      </div>
      {badge ? (
        <span className="shrink-0 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-teal">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
