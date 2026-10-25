import { PageHero } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import {
  about,
  awards as fallbackAwards,
  education as fallbackEducation,
  experience as fallbackExperience,
  memberships as fallbackMemberships,
  site,
} from "@/lib/data";
import { fetchProfilePage, type ProfilePageContent, type ProfileStat } from "@/lib/api";
import {
  ArrowRight,
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const STAT_ICONS = {
  heart: HeartPulse,
  clock: Clock,
  star: Star,
  users: Users,
} as const;

function fallbackProfile(): ProfilePageContent {
  return {
    hero_kicker: "Doctor profile",
    hero_title: "Dr. Rahul Bhargava",
    hero_subtitle: `${site.title} at ${site.hospital}.`,
    intro_eyebrow: "About the doctor",
    intro_heading: "Principal Director & Chief — Hematology",
    intro_role: site.title,
    intro_hospital: site.hospital,
    intro_bio: about,
    intro_image: "/images/dr_rahul.jpg",
    experience_years: "23+",
    experience_label: "Years of Experience",
    badge_top: "1,500+ BMTs",
    stats: [
      { icon: "heart", value: "1500+", label: "Stem cell transplants" },
      { icon: "clock", value: "23+", label: "Years experience" },
      { icon: "star", value: "4.7", label: "Google rating" },
      { icon: "users", value: "3000+", label: "Patients treated" },
    ],
    btn_text: "Book a consultation",
    btn_link: "/contact",
    phone: site.phone,
    phone_href: site.phoneHref,
    education_title: "Education",
    education: fallbackEducation,
    experience_title: "Past Experience",
    experience: fallbackExperience,
    memberships_title: "Memberships",
    memberships: fallbackMemberships,
    vision_title: "Our Vision",
    vision_text:
      "An anaemia-free and thalassemia-free India, with low-cost BMT for the masses. The first integrated centre of excellence in Haematology, paediatric haematology and stem cell transplant stands at Fortis Memorial Research Institute.",
    achievements_title: "Achievements",
    achievements_text:
      "In 2016, Dr. Bhargava became the first Indian doctor to popularise stem cell transplant in multiple sclerosis. He is considered one of the best stem cell transplant experts in Delhi and Gurgaon.",
    awards_eyebrow: "Recognition",
    awards_title: "Accreditations & Awards",
    awards: fallbackAwards.slice(0, 6).map((a) => ({
      title: a.title,
      detail: a.detail,
      image: "/images/award.webp",
    })),
    cta_eyebrow: "Same-week OPD",
    cta_title: "Ready to meet Dr. Bhargava?",
    cta_text: "Book a hematology consult or BMT workup at Fortis Memorial Research Institute, Gurugram.",
    cta_btn_text: "Book Appointment",
    cta_btn_link: "/contact",
    cta_whatsapp_text: "WhatsApp us",
    cta_whatsapp_url: site.whatsapp,
    meta_title: "Profile",
    meta_description: "",
    meta_keywords: "",
    schema_json: "",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = (await fetchProfilePage()) ?? fallbackProfile();
  return pageMetadata({
    title: page.meta_title || "Profile",
    description: page.meta_description,
    keywords: page.meta_keywords,
  });
}

function BioBlock({ bio }: { bio: string }) {
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(bio);
  if (hasHtml) {
    return (
      <div
        className="prose-profile mt-3 space-y-3 text-[14px] leading-relaxed text-slate-600 sm:mt-4 sm:text-[16px] md:text-[17px] [&_p]:mt-3 [&_p:first-child]:mt-0"
        dangerouslySetInnerHTML={{ __html: bio }}
      />
    );
  }

  return (
    <>
      {bio.split(/\n\s*\n/).map((p) => (
        <p
          key={p.slice(0, 40)}
          className="mt-3 text-[14px] leading-relaxed text-slate-600 sm:mt-4 sm:text-[16px] md:text-[17px]"
        >
          {p}
        </p>
      ))}
    </>
  );
}

export default async function ProfilePage() {
  const fromAdmin = await fetchProfilePage();
  const page = fromAdmin ?? fallbackProfile();
  const stats: ProfileStat[] =
    page.stats.length > 0
      ? page.stats
      : [
          { icon: "heart", value: "1500+", label: "Stem cell transplants" },
          { icon: "clock", value: "23+", label: "Years experience" },
          { icon: "star", value: "4.7", label: "Google rating" },
          { icon: "users", value: "3000+", label: "Patients treated" },
        ];
  const education = page.education.length > 0 ? page.education : fallbackEducation;
  const experience = page.experience.length > 0 ? page.experience : fallbackExperience;
  const memberships = page.memberships.length > 0 ? page.memberships : fallbackMemberships;
  const awards =
    page.awards.length > 0
      ? page.awards
      : fallbackAwards.slice(0, 6).map((a) => ({
          title: a.title,
          detail: a.detail,
          image: "/images/award.webp",
        }));
  const phoneHref = page.phone_href || site.phoneHref;
  const phone = page.phone || site.phone;
  const whatsappUrl = page.cta_whatsapp_url || site.whatsapp;

  return (
    <>
      <JsonLd json={page.schema_json} />
      <PageHero
        kicker={page.hero_kicker}
        title={page.hero_title}
        subtitle={page.hero_subtitle || `${site.title} at ${site.hospital}.`}
        items={[{ label: "Profile" }]}
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="relative self-start lg:sticky lg:top-24 lg:col-span-5">
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-navy shadow-2xl sm:h-[480px] lg:h-[min(520px,calc(100vh-8rem))]">
              <Image
                src={page.intro_image}
                alt={page.hero_title}
                fill
                unoptimized
                className="object-cover object-[center_12%]"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-teal px-6 py-5 text-white shadow-xl sm:-right-6">
              <p className="font-display text-4xl font-extrabold">{page.experience_years}</p>
              <p className="text-sm">{page.experience_label}</p>
            </div>
            <div className="absolute -left-3 top-6 hidden items-center gap-2 rounded-2xl bg-amber px-4 py-3 text-white shadow-xl lg:flex">
              <Award className="h-5 w-5" />
              <span className="font-display text-sm font-bold">{page.badge_top}</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{page.intro_eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.55rem] font-extrabold leading-tight text-navy sm:text-3xl md:text-[2.35rem]">
              {page.intro_heading || "Principal Director & Chief — Hematology"}
            </h2>
            <p className="mt-2 text-sm font-semibold text-teal sm:text-base">{page.intro_role || site.title}</p>
            <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-amber" /> {page.intro_hospital || site.hospital}
            </p>
            <BioBlock bio={page.intro_bio || about} />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map(({ icon, value, label }) => {
                const Icon = STAT_ICONS[icon] ?? HeartPulse;
                return (
                  <div key={label} className="rounded-2xl bg-soft p-4 shadow-sm">
                    <Icon className="mb-2 h-5 w-5 text-teal" />
                    <p className="font-display text-2xl font-extrabold text-navy">{value}</p>
                    <p className="mt-1 text-xs text-slate-500">{label}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={page.btn_link || "/contact"} className="btn-primary px-6 py-3 text-sm">
                <CalendarDays className="h-4 w-4" /> {page.btn_text} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={phoneHref} className="btn-ghost px-6 py-3 text-sm">
                <Phone className="h-4 w-4" /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
              <GraduationCap className="h-6 w-6 text-teal" /> {page.education_title}
            </h2>
            <ul className="mt-5 space-y-3">
              {education.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
              <Briefcase className="h-6 w-6 text-teal" /> {page.experience_title}
            </h2>
            <ul className="mt-5 space-y-3">
              {experience.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
              <ShieldCheck className="h-6 w-6 text-teal" /> {page.memberships_title}
            </h2>
            <ul className="mt-5 space-y-3">
              {memberships.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-3xl bg-soft p-7">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
              <Target className="h-6 w-6 text-teal" /> {page.vision_title}
            </h3>
            <p className="mt-3 leading-relaxed text-slate-600">{page.vision_text}</p>
          </div>
          <div className="rounded-3xl bg-soft p-7">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
              <Trophy className="h-6 w-6 text-teal" /> {page.achievements_title}
            </h3>
            <p className="mt-3 leading-relaxed text-slate-600">{page.achievements_text}</p>
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{page.awards_eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold">{page.awards_title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {awards.map((a) => (
              <div key={a.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <Image src={a.image || "/images/award.webp"} alt="" width={50} height={50} unoptimized />
                <h4 className="mt-4 font-display font-bold">{a.title}</h4>
                <p className="mt-2 text-sm text-white/65">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-navy-deep">
          <div className="h-1.5 w-full bg-teal" />
          <div className="relative grid items-center gap-8 px-5 py-9 sm:px-10 sm:py-12 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">{page.cta_eyebrow}</p>
              <h2 className="mt-2 font-display text-[1.65rem] font-extrabold leading-tight text-white sm:text-3xl">
                {page.cta_title}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">{page.cta_text}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Link
                href={page.cta_btn_link || "/contact"}
                className="btn-primary bg-white px-6 py-3 text-sm text-navy hover:bg-teal hover:text-white"
              >
                <CalendarDays className="h-4 w-4" /> {page.cta_btn_text}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white"
              >
                {page.cta_whatsapp_text}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
