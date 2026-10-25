type LogoProps = {
  light?: boolean;
  name?: string;
  tagline?: string;
  imageUrl?: string;
};

export function Logo({
  light = false,
  name = "Dr. Rahul Bhargava",
  tagline = "Hematology · BMT",
  imageUrl = "/images/dr_rahul.jpg",
}: LogoProps) {
  return (
    <span className="flex min-w-0 items-center gap-2 sm:gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl || "/images/dr_rahul.jpg"}
        alt={name}
        className="h-9 w-9 shrink-0 rounded-full object-cover object-top ring-2 ring-teal/35 sm:h-[52px] sm:w-[52px] sm:ring-[3px]"
      />
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate font-display text-[14px] font-extrabold tracking-tight sm:text-[18px] ${
            light ? "text-white" : "text-navy"
          }`}
        >
          {name}
        </span>
        <span
          className={`block text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.18em] ${
            light ? "text-white/70" : "text-teal"
          }`}
        >
          {tagline}
        </span>
      </span>
    </span>
  );
}
