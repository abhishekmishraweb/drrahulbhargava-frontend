"use client";

import { AppointmentModal } from "@/components/AppointmentModal";
import { PhoneField } from "@/components/PhoneField";
import {
  about,
  awards,
  blogs,
  expertise,
  faqs,
  journey,
  marquee,
  site,
  specs,
  stories,
  treatments,
  videos,
} from "@/lib/data";
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  HeartPulse,
  Phone,
  MapPin,
  Minus,
  Play,
  Plus,
  Quote,
  ShieldCheck,
  Star,
  Target,
  Send,
  Trophy,
  UploadCloud,
  Users,
} from "lucide-react";
import {
  phoneFromForm,
  submitEnquiry,
  type HomeAboutSection,
  type HomeAward,
  type HomeAwardsSection,
  type HomeExpertiseItem,
  type HomeExpertiseSection,
  type HomeFeaturedBlog,
  type HomeHighlight,
  type HomeHighlightsSection,
  type HomeJourneySection,
  type HomeJourneyStep,
  type HomePatientStoriesSection,
  type HomePatientStory,
  type HomeSecondOpinionSection,
  type HomeService,
  type HomeServicesSection,
  type HomeSlider,
  type HomeAppointmentSection,
  type HomeFaqItem,
  type HomeFaqSection,
  type HomeVideoTestimonial,
  type HomeVideoTestimonialsSection,
} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

const FALLBACK_SECOND_OPINION: HomeSecondOpinionSection = {
  eyebrow: "Free Second Opinion",
  title: "A second opinion can change everything.",
  subtitle:
    "Upload your reports today. Get a clear, honest read — even if the answer is that you don't need aggressive treatment.",
  points: [
    "No referral needed — share reports from anywhere in the world",
    "Reviewed within 24 hours by Dr. Bhargava's team",
    "Honest guidance — including telling you when a transplant is not needed",
  ],
  badge_value: "24h",
  badge_label: "Average turnaround",
  badge_title: "Report review within 24 hours",
  form_title: "Request a second opinion",
  form_subtitle: "Free · No obligation · Strictly confidential",
  form_badge: "100% Free",
  form_btn: "Request second opinion",
  success_title: "Request received",
  success_text: "Our team will review your case and reach out within 24 hours.",
};

const ABOUT_STAT_ICONS = {
  heart: HeartPulse,
  clock: Clock,
  star: Star,
  users: Users,
} as const;

const HIGHLIGHT_ICONS = {
  star: Star,
  shield: ShieldCheck,
  target: Target,
  trophy: Trophy,
} as const;

const FALLBACK_ABOUT_STATS = [
  { icon: "heart" as const, value: "1500+", label: "Stem cell transplants" },
  { icon: "clock" as const, value: "23+", label: "Years experience" },
  { icon: "star" as const, value: "4.7", label: "Google rating" },
  { icon: "users" as const, value: "3000+", label: "Patients treated" },
];

const FALLBACK_HIGHLIGHTS: HomeHighlight[] = [
  {
    icon: "star",
    title: "4.7 Google Rating",
    text: "Our patients' ratings on Google reflect our dedication to high-quality service.",
    style: "outline",
  },
  {
    icon: "shield",
    title: "3000+ Successful Patients",
    text: "A testament to the effectiveness of our care and the quality of our services.",
    style: "outline",
  },
  {
    icon: "target",
    title: "Our Vision",
    text: "An anaemia-free and thalassemia-free India, with low-cost BMT for the masses. The first integrated centre of excellence in Haematology, paediatric haematology and stem cell transplant stands at Fortis Memorial Research Institute.",
    style: "soft",
  },
  {
    icon: "trophy",
    title: "Achievements",
    text: "In 2016, Dr. Bhargava became the first Indian doctor to popularise stem cell transplant in multiple sclerosis. He is considered one of the best stem cell transplant experts in Delhi and Gurgaon.",
    style: "soft",
  },
];

const FALLBACK_SLIDES: HomeSlider[] = [
  {
    id: 0,
    image: "/images/banner1.webp",
    title: "Best health care for blood cancers — with a human touch",
    highlight_word: "human",
    sub_title: "Hematology & Bone Marrow Transplant",
    description:
      "Dr. Rahul Bhargava — Principal Director & Chief Hematology at Fortis Gurugram. 1,500+ stem cell transplants. First Indian doctor to popularise BMT for multiple sclerosis.",
    button_text: "Book Appointment",
    link_url: "",
    button_text_2: "Get a Second Opinion",
    link_url_2: "#second-opinion",
  },
  {
    id: -1,
    image: "/images/banner2.webp",
    title: "Best health care for blood cancers — with a human touch",
    highlight_word: "human",
    sub_title: "Hematology & Bone Marrow Transplant",
    description:
      "Dr. Rahul Bhargava — Principal Director & Chief Hematology at Fortis Gurugram. 1,500+ stem cell transplants. First Indian doctor to popularise BMT for multiple sclerosis.",
    button_text: "Book Appointment",
    link_url: "",
    button_text_2: "Get a Second Opinion",
    link_url_2: "#second-opinion",
  },
  {
    id: -2,
    image: "/images/banner3.webp",
    title: "Best health care for blood cancers — with a human touch",
    highlight_word: "human",
    sub_title: "Hematology & Bone Marrow Transplant",
    description:
      "Dr. Rahul Bhargava — Principal Director & Chief Hematology at Fortis Gurugram. 1,500+ stem cell transplants. First Indian doctor to popularise BMT for multiple sclerosis.",
    button_text: "Book Appointment",
    link_url: "",
    button_text_2: "Get a Second Opinion",
    link_url_2: "#second-opinion",
  },
];

function highlightTitle(title: string, word?: string | null) {
  const highlight = (word || "").trim();
  if (!highlight) return title;

  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = title.split(new RegExp(`(${escaped})`, "i"));
  if (parts.length === 1) return title;

  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={i} className="hl">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function isAppointmentLink(url?: string | null) {
  const value = (url || "").trim();
  return value === "" || value === "#appointment";
}

export function HomePage({
  sliders: slidersProp,
  marqueeItems,
  services: servicesProp,
  about: aboutProp,
  awards: awardsProp,
  highlights: highlightsProp,
  expertise: expertiseProp,
  journey: journeyProp,
  secondOpinion: secondOpinionProp,
  patientStories: patientStoriesProp,
  videoTestimonials: videoTestimonialsProp,
  faq: faqProp,
  appointment: appointmentProp,
  featuredBlogs: featuredBlogsProp,
}: {
  sliders?: HomeSlider[];
  marqueeItems?: string[];
  services?: HomeServicesSection | null;
  about?: HomeAboutSection | null;
  awards?: HomeAwardsSection | null;
  highlights?: HomeHighlightsSection | null;
  expertise?: HomeExpertiseSection | null;
  journey?: HomeJourneySection | null;
  secondOpinion?: HomeSecondOpinionSection | null;
  patientStories?: HomePatientStoriesSection | null;
  videoTestimonials?: HomeVideoTestimonialsSection | null;
  faq?: HomeFaqSection | null;
  appointment?: HomeAppointmentSection | null;
  featuredBlogs?: HomeFeaturedBlog[];
}) {
  const slides = slidersProp && slidersProp.length > 0 ? slidersProp : FALLBACK_SLIDES;
  const blogItems: HomeFeaturedBlog[] =
    featuredBlogsProp && featuredBlogsProp.length > 0
      ? featuredBlogsProp
      : blogs.map((b) => ({
          slug: b.slug,
          title: b.title,
          image: b.image,
          author: b.author,
          date: b.date,
        }));
  const marqueeLabels = marqueeItems && marqueeItems.length > 0 ? marqueeItems : marquee;
  const serviceItems: HomeService[] =
    servicesProp?.items && servicesProp.items.length > 0
      ? servicesProp.items
      : specs.map((s) => ({
          slug: s.slug,
          title: s.title,
          tagline: s.tagline,
          desc: s.desc,
          points: s.points,
          conditions: s.conditions,
          btn_text: "Book a consult",
          link: `/treatments/${s.slug}`,
        }));
  const servicesEyebrow = servicesProp?.eyebrow || "Services";
  const servicesTitle = servicesProp?.title || "The Best Quality Service You Can Get";
  const servicesSubtitle =
    servicesProp?.subtitle ||
    "From aggressive blood cancers to lifelong conditions — each disease has a dedicated programme and one accountable doctor.";

  const aboutSection = {
    eyebrow: aboutProp?.eyebrow || "About Us",
    title: aboutProp?.title || "Stay Healthy With Expert Hematology",
    role: aboutProp?.role || site.title,
    hospital: aboutProp?.hospital || site.hospital,
    text: aboutProp?.text || about,
    badge_top: aboutProp?.badge_top || "1,500+ BMTs",
    experience_years: aboutProp?.experience_years || "23+",
    experience_label: aboutProp?.experience_label || "Years of Experience",
    stats: aboutProp?.stats && aboutProp.stats.length > 0 ? aboutProp.stats : FALLBACK_ABOUT_STATS,
    btn_text: aboutProp?.btn_text || "Learn More",
    btn_link: aboutProp?.btn_link || "/profile",
    image: aboutProp?.image || "/images/dr_rahul.jpg",
  };
  const aboutHasHtml = /<\/?[a-z][\s\S]*>/i.test(aboutSection.text);
  const aboutParagraphs = aboutHasHtml
    ? []
    : aboutSection.text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
  const [modal, setModal] = useState(false);
  const [banner, setBanner] = useState(0);
  const active = slides[banner] ?? slides[0];
  const [estOk, setEstOk] = useState(false);
  const [estError, setEstError] = useState("");
  const [estPending, setEstPending] = useState(false);
  const [soOk, setSoOk] = useState(false);
  const [soError, setSoError] = useState("");
  const [soPending, setSoPending] = useState(false);
  const [spec, setSpec] = useState(0);
  const [step, setStep] = useState(0);
  const [faq, setFaq] = useState(0);
  const [awardPage, setAwardPage] = useState(0);
  const [video, setVideo] = useState<string | null>(null);
  const [treat, setTreat] = useState("");
  const expRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);

  const awardsTitle = awardsProp?.title || "Accreditations & Awards";
  const awardItems: HomeAward[] =
    awardsProp?.items && awardsProp.items.length > 0
      ? awardsProp.items
      : awards.map((a) => ({
          title: a.title,
          detail: a.detail,
          image: "/images/award.webp",
        }));
  const highlightItems: HomeHighlight[] =
    highlightsProp?.items && highlightsProp.items.length > 0
      ? highlightsProp.items
      : FALLBACK_HIGHLIGHTS;
  const expertiseTitle = expertiseProp?.title || "Our Expertise";
  const expertiseItems: HomeExpertiseItem[] =
    expertiseProp?.items && expertiseProp.items.length > 0
      ? expertiseProp.items
      : expertise.map((e) => ({
          title: e.title,
          text: e.text,
          link: e.href,
          image: e.image,
        }));
  const journeySection = {
    eyebrow: journeyProp?.eyebrow || "The Treatment Pathway",
    title: journeyProp?.title || "Your BMT journey, step by step",
    subtitle:
      journeyProp?.subtitle ||
      "No black boxes. Here is exactly what happens from your first consultation to full recovery.",
  };
  const journeySteps: HomeJourneyStep[] =
    journeyProp?.steps && journeyProp.steps.length > 0
      ? journeyProp.steps
      : journey.map((j) => ({
          week: j.week,
          title: j.title,
          text: j.text,
          points: j.points,
        }));
  const journeyLen = Math.max(journeySteps.length, 1);
  const activeJourneyStep = Math.min(step, journeyLen - 1);
  const activeJourney = journeySteps[activeJourneyStep] ?? journeySteps[0];
  const secondOpinion = secondOpinionProp ?? FALLBACK_SECOND_OPINION;
  const patientStoriesSection = {
    eyebrow: patientStoriesProp?.eyebrow || "Patient Stories",
    title: patientStoriesProp?.title || "What Our Patients Say About Us",
    btn_text: patientStoriesProp?.btn_text || "View all testimonials",
    btn_link: patientStoriesProp?.btn_link || "/testimonials",
  };
  const patientStoryItems: HomePatientStory[] =
    patientStoriesProp?.items && patientStoriesProp.items.length > 0
      ? patientStoriesProp.items
      : stories.map((s) => ({
          initials: s.initials,
          color: s.color,
          quote: s.quote,
          name: s.name,
          rel: s.rel,
          city: s.city,
          treat: s.treat,
        }));
  const videoTestimonialsSection = {
    title: videoTestimonialsProp?.title || "Testimonials",
    btn_text: videoTestimonialsProp?.btn_text || "View all testimonials",
    btn_link: videoTestimonialsProp?.btn_link || "/testimonials",
  };
  const videoTestimonialItems: HomeVideoTestimonial[] =
    videoTestimonialsProp?.items && videoTestimonialsProp.items.length > 0
      ? videoTestimonialsProp.items
      : videos.map((v) => ({
          video_id: v.id,
          title: v.title,
        }));
  const faqSection = {
    eyebrow: faqProp?.eyebrow || "FAQs",
    title: faqProp?.title || "Your questions, answered straight",
    side_title: faqProp?.side_title || "Still have questions?",
    side_text:
      faqProp?.side_text ||
      "Our patient coordinators will call you back — in your language, at your time.",
    side_btn_text: faqProp?.side_btn_text || "Request a callback",
  };
  const faqItems: HomeFaqItem[] =
    faqProp?.items && faqProp.items.length > 0
      ? faqProp.items
      : faqs.map((f) => ({
          q: f.q,
          a: f.a,
        }));
  const cta = {
    eyebrow: appointmentProp?.eyebrow || "Same-week OPD",
    title: appointmentProp?.title || "Ready to meet Dr. Bhargava?",
    text:
      appointmentProp?.text ||
      "Book a hematology consult or BMT workup at Fortis Memorial Research Institute, Gurugram. Urgent cases triaged the same day.",
    image: appointmentProp?.image || "/images/dr_rahul.jpg",
    badges:
      appointmentProp?.badges && appointmentProp.badges.length > 0
        ? appointmentProp.badges
        : ["1,500+ transplants", "23+ years", "Fortis Gurugram"],
    card_title: appointmentProp?.card_title || "Schedule your visit",
    card_subtitle:
      appointmentProp?.card_subtitle || "Choose a slot — we will confirm on WhatsApp.",
    btn_text: appointmentProp?.btn_text || "Book Appointment",
    phone: appointmentProp?.phone || site.phone,
    phone_href: appointmentProp?.phone_href || site.phoneHref,
    whatsapp_text: appointmentProp?.whatsapp_text || "WhatsApp us",
    whatsapp_url: appointmentProp?.whatsapp_url || site.whatsapp,
  };
  const awardSlides = (() => {
    const chunks: HomeAward[][] = [];
    for (let i = 0; i < awardItems.length; i += 3) {
      chunks.push(awardItems.slice(i, i + 3));
    }
    return chunks.length > 0 ? chunks : [[]];
  })();
  const awardPageCount = awardSlides.length;
  const activeAwardPage = ((awardPage % awardPageCount) + awardPageCount) % awardPageCount;

  async function onEstimate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstError("");
    setEstPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const slug = String(fd.get("treatment") || treat || "").trim();
    const treatment = treatments.find((t) => t.slug === slug);
    const title = treatment?.title || slug;
    const result = await submitEnquiry({
      type: "treatment",
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: phoneFromForm(form),
      subject: `Cost estimate: ${title}`,
      product_name: title,
      source_page: "/",
      meta: { treatment_slug: slug, form: "home_estimate" },
    });
    setEstPending(false);
    if (!result.ok) {
      setEstError(result.message);
      return;
    }
    setEstOk(true);
  }

  async function onSecond(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSoError("");
    setSoPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const diagnosis = String(fd.get("diagnosis") || "").trim();
    const note = String(fd.get("message") || "").trim();
    const fileInput = form.querySelector<HTMLInputElement>('input[type="file"]');
    const fileCount = fileInput?.files?.length ?? 0;
    const result = await submitEnquiry({
      type: "appointment",
      name: String(fd.get("name") || "").trim(),
      phone: phoneFromForm(form),
      subject: diagnosis ? `Second opinion: ${diagnosis}` : "Second opinion",
      message: [
        note,
        fileCount > 0
          ? `(Patient indicated ${fileCount} report file(s) — please follow up to collect reports.)`
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
      product_name: diagnosis || undefined,
      source_page: "/",
      meta: { form: "home_second_opinion", report_files_noted: fileCount },
    });
    setSoPending(false);
    if (!result.ok) {
      setSoError(result.message);
      return;
    }
    setSoOk(true);
  }

  function scrollToSpec(i: number) {
    setSpec(i);
    const hash = `#spec-${serviceItems[i]?.slug || i}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
    requestAnimationFrame(() => {
      document.getElementById("spec-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const serviceSlugs = serviceItems.map((s) => s.slug).join("|");
  const activeSpec = Math.min(spec, Math.max(0, serviceItems.length - 1));

  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.replace("#", "");
      const i = serviceItems.findIndex((s) => hash === `spec-${s.slug}` || hash === s.slug);
      if (i >= 0) {
        setSpec(i);
        requestAnimationFrame(() => {
          document.getElementById("spec-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSlugs]);

  function EstimateCard() {
    return (
    <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:rounded-3xl sm:p-6 lg:border-white/30">
      <h3 className="text-center font-display text-[1.15rem] font-bold leading-snug text-navy sm:text-[1.35rem]">
        Get an Estimated Cost For Your Treatment
      </h3>
      {estOk ? (
        <p className="mt-6 rounded-2xl bg-teal/10 p-5 text-sm font-medium text-navy">
          Thank you! Your submission has been received. A coordinator will share an indicative range.
        </p>
      ) : (
        <form onSubmit={onEstimate} className="mt-5 space-y-3">
          <input required name="name" placeholder="Patient Name" className="field" />
          <input required name="email" type="email" placeholder="Email Address" className="field" />
          <PhoneField placeholder="Phone" />
          <label className="sr-only" htmlFor="estimate-treatment">
            Select Treatment
          </label>
          <select
            id="estimate-treatment"
            name="treatment"
            required
            value={treat}
            onChange={(e) => setTreat(e.target.value)}
            className="field"
          >
            <option value="" disabled>
              Select Treatment
            </option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
          {estError ? <p className="text-sm text-red-600">{estError}</p> : null}
          <button type="submit" disabled={estPending} className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
            <Send className="h-4 w-4" /> {estPending ? "Sending…" : "Submit Request"}
          </button>
        </form>
      )}
    </div>
    );
  }

  return (
    <>
      {/* MEDCARE + LIVE: banner carousel + estimate form */}
      <section className="relative bg-navy-deep">
        <div className="relative overflow-hidden lg:min-h-[560px]">
          <div className="absolute inset-0">
          {slides.map((slide, i) => (
            <Image
              key={`${slide.id}-${slide.image}`}
              src={slide.image}
              alt={slide.title || "Dr. Rahul Bhargava"}
              fill
              priority={i === 0}
              unoptimized
              sizes="100vw"
              className={`object-cover object-center transition-opacity duration-700 ${i === banner ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/55 to-navy-deep/85 sm:bg-gradient-to-r sm:from-navy-deep/80 sm:via-navy-deep/45 sm:to-navy-deep/20" />
          </div>
          <button
            type="button"
            aria-label="Previous banner"
            onClick={() => setBanner((b) => (b + slides.length - 1) % slides.length)}
            className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-navy shadow-lg hover:bg-teal hover:text-white sm:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next banner"
            onClick={() => setBanner((b) => (b + 1) % slides.length)}
            className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-navy shadow-lg hover:bg-teal hover:text-white sm:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="relative z-[1] mx-auto grid max-w-7xl items-center gap-5 px-4 pb-20 pt-6 sm:gap-6 sm:px-6 sm:py-10 lg:min-h-[560px] lg:grid-cols-12 lg:px-8 lg:py-0">
            <div className="lg:col-span-7">
              {active?.sub_title ? (
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-teal drop-shadow sm:text-[11px] sm:tracking-[0.28em]">
                  {active.sub_title}
                </p>
              ) : null}
              <h1 className="mt-2 max-w-xl font-display text-[1.45rem] font-extrabold leading-[1.2] text-white drop-shadow-lg sm:mt-3 sm:text-5xl lg:text-[3.35rem]">
                {highlightTitle(
                  active?.title || "Best health care for blood cancers — with a human touch",
                  active?.highlight_word || "human",
                )}
              </h1>
              {active?.description ? (
                <p className="mt-3 max-w-lg text-[13px] font-medium leading-relaxed text-white/95 drop-shadow sm:mt-5 sm:text-lg">
                  {active.description}
                </p>
              ) : null}
              <div className="mt-4 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
                {isAppointmentLink(active?.link_url) ? (
                  <button
                    type="button"
                    onClick={() => setModal(true)}
                    className="btn-primary w-full bg-white px-5 py-2.5 text-[13px] text-navy hover:bg-teal hover:text-white sm:w-auto sm:px-7 sm:py-3.5 sm:text-sm"
                  >
                    <CalendarDays className="h-4 w-4" /> {active?.button_text || "Book Appointment"}
                  </button>
                ) : (
                  <a
                    href={active?.link_url || "#"}
                    className="btn-primary w-full bg-white px-5 py-2.5 text-[13px] text-navy hover:bg-teal hover:text-white sm:w-auto sm:px-7 sm:py-3.5 sm:text-sm"
                  >
                    <CalendarDays className="h-4 w-4" /> {active?.button_text || "Book Appointment"}
                  </a>
                )}
                {(active?.button_text_2 || active?.link_url_2) && (
                  <a
                    href={active?.link_url_2 || "#second-opinion"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur hover:border-teal hover:bg-teal sm:w-auto sm:px-7 sm:py-3.5 sm:text-sm"
                  >
                    <FileSearch className="h-4 w-4" /> {active?.button_text_2 || "Get a Second Opinion"}
                  </a>
                )}
              </div>
              <div className="mt-5 flex justify-center gap-2 sm:hidden">
                {slides.map((slide, i) => (
                  <button
                    key={`${slide.id}-dot`}
                    type="button"
                    aria-label={`Banner ${i + 1}`}
                    onClick={() => setBanner(i)}
                    className={`h-2 rounded-full transition ${banner === i ? "w-6 bg-teal" : "w-2 bg-white/70"}`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden items-center lg:col-span-5 lg:flex lg:justify-end">
              <EstimateCard />
            </div>
          </div>
        </div>
        <div className="bg-soft px-4 pb-8 pt-0 sm:px-6 lg:hidden">
          <div className="relative z-10 mx-auto -mt-12 flex max-w-md justify-center sm:-mt-8">
            <EstimateCard />
          </div>
        </div>
      </section>

      <div className="marquee-wrap overflow-hidden bg-navy-deep py-3.5">
        <div className="marquee flex w-max items-center gap-10">
          {[...marqueeLabels, ...marqueeLabels].map((m, i) => (
            <span key={`${m}-${i}`} className="flex items-center gap-3 text-sm text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* MEDCARE services grid — managed from Home Admin → Services */}
      <section id="specializations" className="scroll-mt-28 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{servicesEyebrow}</p>
          <h2 className="mt-3 text-center font-display text-[1.55rem] font-extrabold text-navy sm:text-3xl md:text-[2.6rem]">
            {servicesTitle}
          </h2>
          {servicesSubtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">{servicesSubtitle}</p>
          ) : null}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((s, i) => (
              <a
                key={`${s.slug}-${s.title}`}
                href={`#spec-${s.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSpec(i);
                }}
                className={`rounded-3xl border p-7 text-left transition hover:-translate-y-1 hover:shadow-xl ${
                  activeSpec === i ? "border-teal bg-navy-deep text-white" : "border-slate-200 bg-soft hover:border-teal"
                }`}
              >
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-teal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className={`mt-2 font-display text-xl font-bold ${activeSpec === i ? "text-white" : "text-navy"}`}>{s.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${activeSpec === i ? "text-white/75" : "text-slate-500"}`}>{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
          {serviceItems[activeSpec] ? (
          <div id="spec-detail" className="mt-8 scroll-mt-32 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-navy/5 lg:grid lg:grid-cols-12">
            <div className="relative overflow-hidden bg-navy-deep px-5 py-7 text-white sm:px-8 sm:py-8 lg:col-span-5 lg:py-10">
              <HeartPulse className="absolute -right-4 -top-4 h-28 w-28 text-white/10" />
              {serviceItems[activeSpec].tagline ? (
                <p className="inline-flex rounded-full bg-teal/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-teal">
                  {serviceItems[activeSpec].tagline}
                </p>
              ) : null}
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{serviceItems[activeSpec].title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{serviceItems[activeSpec].desc}</p>
              <Link href={serviceItems[activeSpec].link || `/treatments/${serviceItems[activeSpec].slug}`} className="btn-primary mt-7 inline-flex bg-teal px-6 py-3 text-sm hover:bg-white hover:text-navy">
                {serviceItems[activeSpec].btn_text || "Book a consult"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="px-6 py-7 sm:px-8 lg:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal">Programme highlights</p>
              <ul className="mt-4 grid gap-3">
                {serviceItems[activeSpec].points.map((p, i) => (
                  <li key={p} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-soft px-4 py-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 text-sm font-medium text-navy-deep">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {serviceItems[activeSpec].conditions.map((c) => (
                  <span key={c} className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-navy ring-1 ring-teal/30">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          ) : null}
        </div>
      </section>

      {/* ABOUT — managed from Home Admin → About Us */}
      <section className="overflow-x-hidden bg-soft py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="relative mb-8 self-start lg:sticky lg:top-24 lg:col-span-5 lg:mb-0">
            <div className="relative h-[280px] overflow-hidden rounded-[1.5rem] bg-navy shadow-2xl sm:h-[480px] sm:rounded-[2rem] lg:h-[min(520px,calc(100vh-8rem))]">
              <Image
                src={aboutSection.image}
                alt="Dr. Rahul Bhargava"
                fill
                unoptimized
                className="object-cover object-[center_12%]"
              />
            </div>
            {(aboutSection.experience_years || aboutSection.experience_label) && (
              <div className="absolute -bottom-5 right-3 rounded-2xl bg-teal px-5 py-4 text-white shadow-xl sm:-bottom-6 sm:-right-6 sm:px-6 sm:py-5">
                {aboutSection.experience_years ? (
                  <p className="font-display text-4xl font-extrabold">{aboutSection.experience_years}</p>
                ) : null}
                {aboutSection.experience_label ? (
                  <p className="text-sm">{aboutSection.experience_label}</p>
                ) : null}
              </div>
            )}
            {aboutSection.badge_top ? (
              <div className="absolute -left-3 top-6 hidden items-center gap-2 rounded-2xl bg-amber px-4 py-3 text-white shadow-xl lg:flex">
                <Award className="h-5 w-5" />
                <span className="font-display text-sm font-bold">{aboutSection.badge_top}</span>
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-7">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{aboutSection.eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.55rem] font-extrabold leading-tight text-navy sm:text-3xl md:text-[2.5rem]">
              {aboutSection.title}
            </h2>
            {aboutSection.role ? (
              <p className="mt-2 text-sm font-semibold text-teal sm:text-base">{aboutSection.role}</p>
            ) : null}
            {aboutSection.hospital ? (
              <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-amber" /> {aboutSection.hospital}
              </p>
            ) : null}
            {aboutHasHtml ? (
              <div
                className="about-bio mt-3 space-y-3 text-[14px] leading-relaxed text-slate-600 sm:mt-4 sm:text-[16px] md:text-[17px] [&_p]:mt-3 [&_p:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: aboutSection.text }}
              />
            ) : (
              aboutParagraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-[14px] leading-relaxed text-slate-600 sm:mt-4 sm:text-[16px] md:text-[17px]">
                  {p}
                </p>
              ))
            )}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {aboutSection.stats.map((stat) => {
                const Icon = ABOUT_STAT_ICONS[stat.icon] || HeartPulse;
                return (
                  <div key={`${stat.value}-${stat.label}`} className="rounded-2xl bg-white p-4 shadow-sm">
                    <Icon className="mb-2 h-5 w-5 text-teal" />
                    <p className="font-display text-2xl font-extrabold text-navy">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            <Link href={aboutSection.btn_link} className="btn-ghost mt-8 px-6 py-3 text-sm">
              {aboutSection.btn_text} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AWARDS — managed from Home Admin → Awards */}
      <section className="bg-navy-deep py-12 text-white sm:py-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-[1.55rem] font-extrabold leading-tight sm:text-3xl">{awardsTitle}</h2>
          {awardPageCount > 1 ? (
            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-navy hover:bg-teal hover:text-white"
                onClick={() => setAwardPage((p) => (p - 1 + awardPageCount) % awardPageCount)}
                aria-label="Prev awards"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-navy hover:bg-teal hover:text-white"
                onClick={() => setAwardPage((p) => (p + 1) % awardPageCount)}
                aria-label="Next awards"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {awardSlides[activeAwardPage].map((a) => (
            <div key={a.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <Image src={a.image || "/images/award.webp"} alt="" width={50} height={50} unoptimized />
              <h4 className="mt-4 font-display font-bold">{a.title}</h4>
              <p className="mt-2 text-sm text-white/65">{a.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS — managed from Home Admin → Highlights */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {highlightItems.map((card) => {
            const Icon = HIGHLIGHT_ICONS[card.icon] || Star;
            if (card.style === "soft") {
              return (
                <div key={`${card.title}-${card.style}`} className="rounded-3xl bg-soft p-7">
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
                    <Icon className="h-6 w-6 text-teal" /> {card.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{card.text}</p>
                </div>
              );
            }
            return (
              <div key={`${card.title}-${card.style}`} className="flex gap-4 rounded-3xl border border-slate-200 p-6">
                <Icon className={`h-10 w-10 shrink-0 ${card.icon === "star" ? "text-amber" : "text-teal"}`} />
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{card.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-soft py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="min-w-0 font-display text-2xl font-extrabold text-navy sm:text-3xl">{expertiseTitle}</h2>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Previous expertise"
                onClick={() => expRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next expertise"
                onClick={() => expRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            ref={expRef}
            className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {expertiseItems.map((e) => (
              <Link
                key={e.title}
                href={e.link || "#"}
                className="group w-[min(100%,280px)] shrink-0 snap-start rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:bg-navy-deep hover:text-white sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
              >
                <Image
                  src={e.image || "/images/blood.webp"}
                  alt={e.title}
                  width={80}
                  height={80}
                  unoptimized
                  className="mx-auto h-20 w-20 object-contain"
                />
                <h3 className="mt-4 font-display text-lg font-bold text-navy group-hover:text-white">{e.title}</h3>
                <p className="mt-2 text-sm text-slate-500 group-hover:text-white/70">{e.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BMT journey — managed from Home Admin → Treatment Pathway */}
      <section id="journey" className="scroll-mt-28 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{journeySection.eyebrow}</p>
          <h2 className="mt-3 text-center font-display text-[1.55rem] font-extrabold text-navy sm:text-3xl">{journeySection.title}</h2>
          {journeySection.subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-500 sm:text-base">{journeySection.subtitle}</p>
          ) : null}
          <div className="relative mx-auto mt-10 w-full max-w-4xl sm:mt-14">
            <div className="relative flex justify-between px-1">
            <div className="absolute left-5 right-5 top-[18px] h-0.5 bg-slate-200 sm:left-6 sm:right-6 sm:top-6">
              <div
                className="h-full bg-teal transition-all"
                style={{ width: `${journeyLen > 1 ? (activeJourneyStep / (journeyLen - 1)) * 100 : 0}%` }}
              />
            </div>
            {journeySteps.map((j, i) => (
              <button
                key={`${j.week}-${j.title}-${i}`}
                type="button"
                onClick={() => setStep(i)}
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 font-display text-sm font-extrabold sm:h-12 sm:w-12 sm:text-base ${
                  i === activeJourneyStep
                    ? "border-teal bg-teal text-white"
                    : i < activeJourneyStep
                      ? "border-teal bg-white text-teal"
                      : "border-slate-300 bg-white text-slate-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
            </div>
          </div>
          {activeJourney ? (
          <div className="relative mx-auto mt-8 max-w-4xl sm:mt-12">
            <div className="rounded-3xl border border-slate-200 p-5 shadow-xl shadow-navy/5 sm:px-14 sm:py-8">
              {activeJourney.week ? (
                <p className="text-xs font-extrabold uppercase tracking-wider text-teal">{activeJourney.week}</p>
              ) : null}
              <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">{activeJourney.title}</h3>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">{activeJourney.text}</p>
              {activeJourney.points.length > 0 ? (
              <ul className="mt-6 space-y-2">
                {activeJourney.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" /> {p}
                  </li>
                ))}
              </ul>
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 sm:pointer-events-none sm:absolute sm:inset-0 sm:mt-0 sm:justify-between">
            {activeJourneyStep > 0 ? (
            <button
              type="button"
              aria-label="Previous journey step"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white shadow-lg hover:bg-teal sm:pointer-events-auto sm:-translate-x-1/2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            ) : <span className="hidden h-10 w-10 sm:block" />}
            {activeJourneyStep < journeyLen - 1 ? (
            <button
              type="button"
              aria-label="Next journey step"
              onClick={() => setStep((s) => Math.min(journeyLen - 1, s + 1))}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white shadow-lg hover:bg-teal sm:pointer-events-auto sm:translate-x-1/2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            ) : <span className="hidden h-10 w-10 sm:block" />}
            </div>
          </div>
          ) : null}
        </div>
      </section>

      {/* Second opinion — managed from Home Admin → Second Opinion */}
      <section id="second-opinion" className="scroll-mt-28 bg-soft py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{secondOpinion.eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.55rem] font-extrabold text-navy sm:text-3xl">{secondOpinion.title}</h2>
            {secondOpinion.subtitle ? (
              <p className="mt-4 text-slate-500">{secondOpinion.subtitle}</p>
            ) : null}
            {secondOpinion.points.length > 0 ? (
              <ul className="mt-8 space-y-4">
                {secondOpinion.points.map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-teal">{secondOpinion.badge_value}</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{secondOpinion.badge_label}</p>
                <p className="font-display font-bold text-navy">{secondOpinion.badge_title}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8">
            {soOk ? (
              <div className="py-10 text-center">
                <p className="font-display text-2xl font-bold text-navy">{secondOpinion.success_title}</p>
                <p className="mt-2 text-sm text-slate-500">{secondOpinion.success_text}</p>
              </div>
            ) : (
              <form onSubmit={onSecond} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy">{secondOpinion.form_title}</h3>
                    {secondOpinion.form_subtitle ? (
                      <p className="text-xs text-slate-500">{secondOpinion.form_subtitle}</p>
                    ) : null}
                  </div>
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-[11px] font-extrabold uppercase text-teal">
                    {secondOpinion.form_badge}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required name="name" placeholder="Full name" className="field" />
                  <PhoneField placeholder="Phone" />
                </div>
                <input
                  required
                  name="diagnosis"
                  placeholder="Current diagnosis"
                  className="field"
                  autoComplete="off"
                />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Symptoms, treatments tried, hospital visits…"
                  className="field resize-none"
                />
                <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-300 bg-soft/50 px-4 py-7 text-center hover:border-teal">
                  <UploadCloud className="mb-2 h-8 w-8 text-teal" />
                  <span className="text-sm">
                    Drag & drop reports, or <span className="font-bold text-teal underline">browse files</span>
                  </span>
                  <span className="mt-1 text-[11px] text-slate-400">PDF, JPG · max 10 MB · up to 6 files</span>
                  <input type="file" className="hidden" multiple />
                </label>
                {soError ? <p className="text-sm text-red-600">{soError}</p> : null}
                <button type="submit" disabled={soPending} className="btn-primary w-full py-4 text-sm disabled:opacity-60">
                  <FileSearch className="h-4 w-4" /> {soPending ? "Sending…" : secondOpinion.form_btn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* YouTube testimonials — managed from Home Admin → Testimonials */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="min-w-0 font-display text-2xl font-extrabold text-navy sm:text-3xl">{videoTestimonialsSection.title}</h2>
            <div className="flex shrink-0 items-center gap-3">
              <Link href={videoTestimonialsSection.btn_link} className="btn-primary hidden px-4 py-2 text-xs sm:inline-flex sm:text-sm">
                <Quote className="h-4 w-4" /> {videoTestimonialsSection.btn_text} <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => vidRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => vidRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={vidRef}
            className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {videoTestimonialItems.map((v) => (
              <button
                key={v.video_id}
                type="button"
                onClick={() => setVideo(v.video_id)}
                className="relative aspect-video w-full max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl shadow-lg sm:w-[calc(50%-10px)] sm:max-w-none lg:w-[calc(33.333%-14px)]"
              >
                <Image
                  src={`https://img.youtube.com/vi/${v.video_id}/hqdefault.jpg`}
                  alt={v.title}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </span>
                </span>
              </button>
            ))}
          </div>
          <Link href={videoTestimonialsSection.btn_link} className="btn-primary mt-6 inline-flex px-5 py-2.5 text-sm sm:hidden">
            <Quote className="h-4 w-4" /> {videoTestimonialsSection.btn_text} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {video && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4" onClick={() => setVideo(null)}>
          <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Patient testimonial"
            />
          </div>
        </div>
      )}

      {/* Patient stories — managed from Home Admin → Patient Stories */}
      <section id="stories" className="scroll-mt-28 bg-soft py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{patientStoriesSection.eyebrow}</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug text-navy sm:text-3xl">{patientStoriesSection.title}</h2>
            </div>
            <div className="mt-7 flex shrink-0 items-center gap-3">
              <Link href={patientStoriesSection.btn_link} className="btn-primary hidden px-4 py-2 text-xs sm:inline-flex sm:text-sm">
                <Quote className="h-4 w-4" /> {patientStoriesSection.btn_text} <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex gap-2 md:hidden">
                <button
                  type="button"
                  aria-label="Previous story"
                  onClick={() => storiesRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next story"
                  onClick={() => storiesRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={storiesRef}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
          >
            {patientStoryItems.map((s) => (
              <blockquote key={s.name} className="w-[min(100%,320px)] shrink-0 snap-start rounded-3xl border border-slate-200 bg-white p-6 md:w-auto md:p-7">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display font-bold text-white"
                  style={{ background: s.color }}
                >
                  {s.initials}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">“{s.quote}”</p>
                <footer className="mt-5">
                  <p className="font-display font-bold text-navy">{s.name}</p>
                  <p className="text-xs text-teal">
                    {[s.rel, s.city].filter(Boolean).join(" · ")}
                  </p>
                  {s.treat ? <p className="mt-1 text-[11px] text-slate-400">{s.treat}</p> : null}
                </footer>
              </blockquote>
            ))}
          </div>
          <Link href={patientStoriesSection.btn_link} className="btn-primary mt-6 inline-flex px-5 py-2.5 text-sm sm:hidden">
            <Quote className="h-4 w-4" /> {patientStoriesSection.btn_text} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">Blogs</p>
              <h2 className="mt-2 font-display text-[1.45rem] font-extrabold leading-snug text-navy sm:text-3xl">Why Should You Choose Us? Read Our Health Tips</h2>
            </div>
            <div className="mt-7 flex shrink-0 items-center gap-3">
              <Link href="/blogs" className="btn-primary hidden px-4 py-2 text-xs sm:inline-flex sm:text-sm">
                View All Blogs <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous blog"
                  onClick={() => blogsRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next blog"
                  onClick={() => blogsRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy text-white hover:bg-teal"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={blogsRef}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {blogItems.map((b) => (
              <Link
                key={b.slug}
                href={`/blogs/${b.slug}`}
                className="w-[min(100%,320px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <div className="bg-slate-50">
                  <Image src={b.image} alt={b.title} width={800} height={450} className="h-auto w-full" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-slate-400">
                    {[b.date, b.author].filter(Boolean).join(" · ")}
                  </p>
                  <h3 className="mt-2 font-display font-bold text-navy">{b.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/blogs" className="btn-primary mt-6 inline-flex px-5 py-2.5 text-sm sm:hidden">
            View All Blogs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQs — managed from Home Admin → FAQ */}
      <section id="faq" className="scroll-mt-28 bg-soft py-12">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{faqSection.eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.55rem] font-extrabold text-navy sm:text-3xl">{faqSection.title}</h2>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-lg font-bold text-navy">{faqSection.side_title}</h3>
              {faqSection.side_text ? (
                <p className="mt-2 text-sm text-slate-500">{faqSection.side_text}</p>
              ) : null}
              <button type="button" onClick={() => setModal(true)} className="btn-primary mt-5 px-6 py-3 text-sm">
                <Phone className="h-4 w-4" /> {faqSection.side_btn_text}
              </button>
            </div>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {faqItems.map((f, i) => (
              <button
                key={f.q}
                type="button"
                onClick={() => setFaq((open) => (open === i ? -1 : i))}
                className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left"
              >
                <span className="flex items-start justify-between gap-3">
                  <p className="font-display font-bold text-navy">{f.q}</p>
                  {faq === i ? (
                    <Minus className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  ) : (
                    <Plus className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
                  )}
                </span>
                {faq === i && <p className="mt-2 pr-8 text-sm leading-relaxed text-slate-500">{f.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-navy-deep">
          <div className="h-1.5 w-full bg-teal" />
          <div className="dots-light pointer-events-none absolute inset-0 opacity-25" />
          <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-teal/15 blur-3xl" />
          <div className="relative grid items-center gap-8 px-5 py-9 sm:px-10 sm:py-12 lg:grid-cols-12 lg:px-12">
            <div className="flex gap-4 lg:col-span-7 lg:gap-6">
              <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-4 ring-teal/40 sm:block lg:h-36 lg:w-36">
                <Image src={cta.image} alt="Dr. Rahul Bhargava" fill unoptimized className="object-cover object-top" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{cta.eyebrow}</p>
                <h2 className="mt-2 font-display text-[1.65rem] font-extrabold leading-tight text-white sm:text-3xl lg:text-[2.4rem]">
                  {cta.title}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                  {cta.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cta.badges.map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
                <p className="text-center font-display text-lg font-bold text-navy">{cta.card_title}</p>
                <p className="mt-1 text-center text-sm text-slate-500">{cta.card_subtitle}</p>
                <button
                  type="button"
                  onClick={() => setModal(true)}
                  className="btn-primary mt-5 w-full py-3.5 text-sm"
                >
                  <CalendarDays className="h-4 w-4" /> {cta.btn_text}
                </button>
                <a href={cta.phone_href} className="btn-ghost mt-3 w-full py-3 text-sm">
                  <Phone className="h-4 w-4" /> {cta.phone}
                </a>
                <a
                  href={cta.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white hover:opacity-90"
                >
                  {cta.whatsapp_text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppointmentModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
