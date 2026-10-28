const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost/drrahulbhargava-admin/api/v1";

export type HomeSlider = {
  id: number;
  title?: string | null;
  highlight_word?: string | null;
  sub_title?: string | null;
  description?: string | null;
  link_url?: string | null;
  link_url_2?: string | null;
  button_text?: string | null;
  button_text_2?: string | null;
  image: string;
  order?: number;
};

export type HomeService = {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  points: string[];
  conditions: string[];
  btn_text: string;
  link: string;
};

export type HomeServicesSection = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: HomeService[];
};

export type HomeAboutStat = {
  icon: "heart" | "clock" | "star" | "users";
  value: string;
  label: string;
};

export type HomeAboutSection = {
  eyebrow: string;
  title: string;
  role: string;
  hospital: string;
  text: string;
  badge_top: string;
  experience_years: string;
  experience_label: string;
  stats: HomeAboutStat[];
  btn_text: string;
  btn_link: string;
  image: string;
};

export type HomeAward = {
  title: string;
  detail: string;
  image: string;
};

export type HomeAwardsSection = {
  title: string;
  items: HomeAward[];
};

export type HomeHighlight = {
  icon: "star" | "shield" | "target" | "trophy";
  title: string;
  text: string;
  style: "outline" | "soft";
};

export type HomeHighlightsSection = {
  items: HomeHighlight[];
};

export type HomeExpertiseItem = {
  title: string;
  text: string;
  link: string;
  image: string;
};

export type HomeExpertiseSection = {
  title: string;
  items: HomeExpertiseItem[];
};

export type HomeJourneyStep = {
  week: string;
  title: string;
  text: string;
  points: string[];
};

export type HomeJourneySection = {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: HomeJourneyStep[];
};

export type HomeSecondOpinionSection = {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: string[];
  badge_value: string;
  badge_label: string;
  badge_title: string;
  form_title: string;
  form_subtitle: string;
  form_badge: string;
  form_btn: string;
  success_title: string;
  success_text: string;
};

export type HomePatientStory = {
  initials: string;
  color: string;
  quote: string;
  name: string;
  rel: string;
  city: string;
  treat: string;
};

export type HomePatientStoriesSection = {
  eyebrow: string;
  title: string;
  btn_text: string;
  btn_link: string;
  items: HomePatientStory[];
};

export type HomeVideoTestimonial = {
  video_id: string;
  title: string;
};

export type HomeVideoTestimonialsSection = {
  title: string;
  btn_text: string;
  btn_link: string;
  items: HomeVideoTestimonial[];
};

export type HomeFaqItem = {
  q: string;
  a: string;
};

export type HomeFaqSection = {
  eyebrow: string;
  title: string;
  side_title: string;
  side_text: string;
  side_btn_text: string;
  items: HomeFaqItem[];
};

export type HomeAppointmentSection = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  badges: string[];
  card_title: string;
  card_subtitle: string;
  btn_text: string;
  phone: string;
  phone_href: string;
  whatsapp_text: string;
  whatsapp_url: string;
};

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
};

type HomeApiData = {
  sliders?: HomeSlider[];
  marquee?: {
    items?: Array<string | { text?: string }>;
  };
  appointment?: Record<string, unknown>;
  services_cards?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    items?: Array<Record<string, unknown>>;
  };
  about?: Record<string, unknown>;
  awards?: {
    title?: string;
    items?: Array<Record<string, unknown>>;
  };
  highlights?: {
    items?: Array<Record<string, unknown>>;
  };
  expertise?: {
    title?: string;
    items?: Array<Record<string, unknown>>;
  };
  process?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    steps?: Array<Record<string, unknown>>;
  };
  second_opinion?: Record<string, unknown>;
  patient_stories?: {
    eyebrow?: string;
    title?: string;
    btn_text?: string;
    btn_link?: string;
    items?: Array<Record<string, unknown>>;
  };
  testimonials?: {
    title?: string;
    btn_text?: string;
    btn_link?: string;
    items?: Array<Record<string, unknown>>;
  };
  faq?: {
    eyebrow?: string;
    title?: string;
    side_title?: string;
    side_text?: string;
    side_btn_text?: string;
    items?: Array<Record<string, unknown>>;
  };
  featured_blogs?: Array<Record<string, unknown>>;
};

function normalizeService(item: Record<string, unknown>): HomeService | null {
  const title = String(item.title ?? "").trim();
  const desc = String(item.desc ?? item.text ?? "").trim();
  if (!title && !desc) return null;

  const slug = String(item.slug ?? "").trim() || title.toLowerCase().replace(/\s+/g, "-");
  const pointsRaw = item.points;
  const conditionsRaw = item.conditions;

  const points = Array.isArray(pointsRaw)
    ? pointsRaw.map((p) => String(p).trim()).filter(Boolean)
    : String(pointsRaw ?? "")
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

  const conditions = Array.isArray(conditionsRaw)
    ? conditionsRaw.map((c) => String(c).trim()).filter(Boolean)
    : String(conditionsRaw ?? "")
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

  return {
    slug,
    title,
    tagline: String(item.tagline ?? "").trim(),
    desc,
    points,
    conditions,
    btn_text: String(item.btn_text ?? "Book a consult").trim() || "Book a consult",
    link: String(item.link ?? "").trim() || `/treatments/${slug}`,
  };
}

function normalizeAboutStat(item: Record<string, unknown>): HomeAboutStat | null {
  const value = String(item.value ?? item.n ?? "").trim();
  const label = String(item.label ?? item.l ?? "").trim();
  if (!value && !label) return null;

  const rawIcon = String(item.icon ?? "heart").trim().toLowerCase();
  const icon =
    rawIcon === "clock" || rawIcon === "star" || rawIcon === "users" || rawIcon === "heart"
      ? rawIcon
      : "heart";

  return { icon, value, label };
}

function normalizeAbout(raw?: Record<string, unknown>): HomeAboutSection | null {
  if (!raw || typeof raw !== "object") return null;

  const title = String(raw.title ?? raw.title_html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const text = String(raw.text ?? "").trim();
  const image = String(raw.image_1 ?? raw.image ?? "").trim();

  const stats = Array.isArray(raw.stats)
    ? raw.stats
        .filter((s): s is Record<string, unknown> => !!s && typeof s === "object")
        .map((s) => normalizeAboutStat(s))
        .filter((s): s is HomeAboutStat => s !== null)
    : [];

  if (!title && !text && !image && stats.length === 0) return null;

  return {
    eyebrow: String(raw.eyebrow ?? raw.tagline ?? "About Us").trim() || "About Us",
    title: title || "Stay Healthy With Expert Hematology",
    role: String(raw.role ?? "").trim(),
    hospital: String(raw.hospital ?? "").trim(),
    text,
    badge_top: String(raw.badge_top ?? "").trim(),
    experience_years: String(raw.experience_years ?? "").trim(),
    experience_label: String(raw.experience_label ?? "").trim(),
    stats,
    btn_text: String(raw.btn_text ?? "Learn More").trim() || "Learn More",
    btn_link: String(raw.btn_link ?? "/profile").trim() || "/profile",
    image: image || "/images/dr_rahul.jpg",
  };
}

function normalizeAward(item: Record<string, unknown>): HomeAward | null {
  const title = String(item.title ?? "").trim();
  const detail = String(item.detail ?? item.text ?? "").trim();
  if (!title && !detail) return null;

  return {
    title,
    detail,
    image: String(item.image ?? "").trim() || "/images/award.webp",
  };
}

function normalizeHighlight(item: Record<string, unknown>): HomeHighlight | null {
  const title = String(item.title ?? "").trim();
  const text = String(item.text ?? "").trim();
  if (!title && !text) return null;

  const rawIcon = String(item.icon ?? "star").trim().toLowerCase();
  const icon =
    rawIcon === "shield" || rawIcon === "target" || rawIcon === "trophy" || rawIcon === "star"
      ? rawIcon
      : "star";

  const rawStyle = String(item.style ?? "outline").trim().toLowerCase();
  const style = rawStyle === "soft" ? "soft" : "outline";

  return { icon, title, text, style };
}

function normalizeExpertise(item: Record<string, unknown>): HomeExpertiseItem | null {
  const title = String(item.title ?? "").trim();
  const text = String(item.text ?? "").trim();
  if (!title && !text) return null;

  const link = String(item.link ?? item.href ?? "").trim() || "#";
  const image = String(item.image ?? "").trim() || "/images/blood.webp";

  return { title, text, link, image };
}

function normalizeJourneyStep(item: Record<string, unknown>): HomeJourneyStep | null {
  const week = String(item.week ?? "").trim();
  const title = String(item.title ?? "").trim();
  const text = String(item.text ?? "").trim();
  if (!week && !title && !text) return null;

  const pointsRaw = item.points;
  const points = Array.isArray(pointsRaw)
    ? pointsRaw.map((p) => String(p).trim()).filter(Boolean)
    : String(pointsRaw ?? "")
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

  return { week, title, text, points };
}

function normalizeSecondOpinion(raw?: Record<string, unknown>): HomeSecondOpinionSection | null {
  if (!raw || typeof raw !== "object") return null;

  const title = String(raw.title ?? "").trim();
  const pointsRaw = raw.points;
  const points = Array.isArray(pointsRaw)
    ? pointsRaw
        .map((p) => (typeof p === "string" ? p.trim() : String((p as { text?: string })?.text ?? "").trim()))
        .filter(Boolean)
    : [];

  if (!title && points.length === 0) return null;

  return {
    eyebrow: String(raw.eyebrow ?? "Free Second Opinion").trim() || "Free Second Opinion",
    title: title || "A second opinion can change everything.",
    subtitle: String(raw.subtitle ?? "").trim(),
    points,
    badge_value: String(raw.badge_value ?? "24h").trim() || "24h",
    badge_label: String(raw.badge_label ?? "Average turnaround").trim() || "Average turnaround",
    badge_title: String(raw.badge_title ?? "Report review within 24 hours").trim() || "Report review within 24 hours",
    form_title: String(raw.form_title ?? "Request a second opinion").trim() || "Request a second opinion",
    form_subtitle: String(raw.form_subtitle ?? "Free · No obligation · Strictly confidential").trim(),
    form_badge: String(raw.form_badge ?? "100% Free").trim() || "100% Free",
    form_btn: String(raw.form_btn ?? "Request second opinion").trim() || "Request second opinion",
    success_title: String(raw.success_title ?? "Request received").trim() || "Request received",
    success_text: String(raw.success_text ?? "Our team will review your case and reach out within 24 hours.").trim(),
  };
}

function normalizePatientStory(item: Record<string, unknown>): HomePatientStory | null {
  const name = String(item.name ?? item.title ?? "").trim();
  const quote = String(item.quote ?? item.text ?? "").trim();
  if (!name && !quote) return null;

  let initials = String(item.initials ?? "").trim().toUpperCase();
  if (!initials && name) {
    const parts = name.split(/\s+/);
    initials = `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return {
    initials: initials || "P",
    color: String(item.color ?? "#8BC34A").trim() || "#8BC34A",
    quote,
    name,
    rel: String(item.rel ?? item.role ?? "").trim(),
    city: String(item.city ?? "").trim(),
    treat: String(item.treat ?? "").trim(),
  };
}

function extractYoutubeId(value: string): string {
  const raw = value.trim();
  if (!raw) return "";
  if (/^[A-Za-z0-9_-]{6,20}$/.test(raw)) return raw;
  const match = raw.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,20})/);
  return match?.[1] ?? "";
}

function normalizeVideoTestimonial(item: Record<string, unknown>): HomeVideoTestimonial | null {
  const videoId = extractYoutubeId(String(item.video_id ?? item.id ?? "").trim());
  if (!videoId) return null;

  return {
    video_id: videoId,
    title: String(item.title ?? item.name ?? "Patient story").trim() || "Patient story",
  };
}

function normalizeFaqItem(item: Record<string, unknown>): HomeFaqItem | null {
  const q = String(item.question ?? item.q ?? "").trim();
  const a = String(item.answer ?? item.a ?? "").trim();
  if (!q && !a) return null;
  return { q, a };
}

function normalizeFaq(raw?: HomeApiData["faq"]): HomeFaqSection | null {
  if (!raw || typeof raw !== "object") return null;

  const items = (raw.items ?? [])
    .map((item) => normalizeFaqItem(item))
    .filter((item): item is HomeFaqItem => item !== null);

  const title = String(raw.title ?? "").trim();
  if (!title && items.length === 0) return null;

  return {
    eyebrow: String(raw.eyebrow ?? "FAQs").trim() || "FAQs",
    title: title || "Your questions, answered straight",
    side_title: String(raw.side_title ?? "Still have questions?").trim() || "Still have questions?",
    side_text: String(raw.side_text ?? "").trim(),
    side_btn_text: String(raw.side_btn_text ?? "Request a callback").trim() || "Request a callback",
    items,
  };
}

function phoneToHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (!digits) return "";
  return digits.startsWith("+") ? `tel:${digits}` : `tel:+${digits}`;
}

function normalizeAppointment(raw?: Record<string, unknown>): HomeAppointmentSection | null {
  if (!raw || typeof raw !== "object") return null;

  const title = String(raw.title ?? raw.title_html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const text = String(raw.text ?? "").trim();
  const image = String(raw.image ?? raw.image_1 ?? "").trim();

  const badgesRaw = raw.badges;
  const badges = Array.isArray(badgesRaw)
    ? badgesRaw
        .map((b) => (typeof b === "string" ? b.trim() : String((b as { text?: string })?.text ?? "").trim()))
        .filter(Boolean)
    : [];

  if (!title && !text && !image && badges.length === 0) return null;

  const phone = String(raw.phone ?? raw.hotline ?? "").trim();

  return {
    eyebrow: String(raw.eyebrow ?? raw.tagline ?? "Same-week OPD").trim() || "Same-week OPD",
    title: title || "Ready to meet Dr. Bhargava?",
    text,
    image: image || "/images/dr_rahul.jpg",
    badges,
    card_title: String(raw.card_title ?? "Schedule your visit").trim() || "Schedule your visit",
    card_subtitle: String(raw.card_subtitle ?? "").trim(),
    btn_text: String(raw.btn_text ?? "Book Appointment").trim() || "Book Appointment",
    phone,
    phone_href: phoneToHref(phone),
    whatsapp_text: String(raw.whatsapp_text ?? "WhatsApp us").trim() || "WhatsApp us",
    whatsapp_url: String(raw.whatsapp_url ?? "").trim(),
  };
}

const emptyHome = {
  sliders: [] as HomeSlider[],
  marquee: [] as string[],
  services: null as HomeServicesSection | null,
  about: null as HomeAboutSection | null,
  awards: null as HomeAwardsSection | null,
  highlights: null as HomeHighlightsSection | null,
  expertise: null as HomeExpertiseSection | null,
  journey: null as HomeJourneySection | null,
  secondOpinion: null as HomeSecondOpinionSection | null,
  patientStories: null as HomePatientStoriesSection | null,
  videoTestimonials: null as HomeVideoTestimonialsSection | null,
  faq: null as HomeFaqSection | null,
  appointment: null as HomeAppointmentSection | null,
  featuredBlogs: [] as HomeFeaturedBlog[],
};

export async function fetchHomeContent(): Promise<{
  sliders: HomeSlider[];
  marquee: string[];
  services: HomeServicesSection | null;
  about: HomeAboutSection | null;
  awards: HomeAwardsSection | null;
  highlights: HomeHighlightsSection | null;
  expertise: HomeExpertiseSection | null;
  journey: HomeJourneySection | null;
  secondOpinion: HomeSecondOpinionSection | null;
  patientStories: HomePatientStoriesSection | null;
  videoTestimonials: HomeVideoTestimonialsSection | null;
  faq: HomeFaqSection | null;
  appointment: HomeAppointmentSection | null;
  featuredBlogs: HomeFeaturedBlog[];
}> {
  try {
    const res = await fetch(`${API_BASE}/home`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      return emptyHome;
    }

    const json = (await res.json()) as ApiEnvelope<HomeApiData>;
    const data = json?.data;

    const sliders = Array.isArray(data?.sliders)
      ? data.sliders.filter((s) => typeof s?.image === "string" && s.image.trim() !== "")
      : [];

    const marquee = (data?.marquee?.items ?? [])
      .map((item) => (typeof item === "string" ? item.trim() : (item?.text || "").trim()))
      .filter(Boolean);

    const serviceItems = (data?.services_cards?.items ?? [])
      .map((item) => normalizeService(item))
      .filter((item): item is HomeService => item !== null);

    const services =
      serviceItems.length > 0
        ? {
            eyebrow: String(data?.services_cards?.eyebrow ?? "Services").trim() || "Services",
            title:
              String(data?.services_cards?.title ?? "The Best Quality Service You Can Get").trim() ||
              "The Best Quality Service You Can Get",
            subtitle: String(data?.services_cards?.subtitle ?? "").trim(),
            items: serviceItems,
          }
        : null;

    const about = normalizeAbout(data?.about);

    const awardItems = (data?.awards?.items ?? [])
      .map((item) => normalizeAward(item))
      .filter((item): item is HomeAward => item !== null);

    const awards =
      awardItems.length > 0
        ? {
            title: String(data?.awards?.title ?? "Accreditations & Awards").trim() || "Accreditations & Awards",
            items: awardItems,
          }
        : null;

    const highlightItems = (data?.highlights?.items ?? [])
      .map((item) => normalizeHighlight(item))
      .filter((item): item is HomeHighlight => item !== null);

    const highlights = highlightItems.length > 0 ? { items: highlightItems } : null;

    const expertiseItems = (data?.expertise?.items ?? [])
      .map((item) => normalizeExpertise(item))
      .filter((item): item is HomeExpertiseItem => item !== null);

    const expertise =
      expertiseItems.length > 0
        ? {
            title: String(data?.expertise?.title ?? "Our Expertise").trim() || "Our Expertise",
            items: expertiseItems,
          }
        : null;

    const journeySteps = (data?.process?.steps ?? [])
      .map((item) => normalizeJourneyStep(item))
      .filter((item): item is HomeJourneyStep => item !== null);

    const journey =
      journeySteps.length > 0
        ? {
            eyebrow:
              String(data?.process?.eyebrow ?? "The Treatment Pathway").trim() || "The Treatment Pathway",
            title:
              String(data?.process?.title ?? "Your BMT journey, step by step").trim() ||
              "Your BMT journey, step by step",
            subtitle: String(data?.process?.subtitle ?? "").trim(),
            steps: journeySteps,
          }
        : null;

    const secondOpinion = normalizeSecondOpinion(data?.second_opinion);

    const storyItems = (data?.patient_stories?.items ?? [])
      .map((item) => normalizePatientStory(item))
      .filter((item): item is HomePatientStory => item !== null);

    const patientStories =
      storyItems.length > 0
        ? {
            eyebrow:
              String(data?.patient_stories?.eyebrow ?? "Patient Stories").trim() || "Patient Stories",
            title:
              String(data?.patient_stories?.title ?? "What Our Patients Say About Us").trim() ||
              "What Our Patients Say About Us",
            btn_text:
              String(data?.patient_stories?.btn_text ?? "View all testimonials").trim() ||
              "View all testimonials",
            btn_link: String(data?.patient_stories?.btn_link ?? "/testimonials").trim() || "/testimonials",
            items: storyItems,
          }
        : null;

    const videoItems = (data?.testimonials?.items ?? [])
      .map((item) => normalizeVideoTestimonial(item))
      .filter((item): item is HomeVideoTestimonial => item !== null);

    const videoTestimonials =
      videoItems.length > 0
        ? {
            title: String(data?.testimonials?.title ?? "Testimonials").trim() || "Testimonials",
            btn_text:
              String(data?.testimonials?.btn_text ?? "View all testimonials").trim() ||
              "View all testimonials",
            btn_link: String(data?.testimonials?.btn_link ?? "/testimonials").trim() || "/testimonials",
            items: videoItems,
          }
        : null;

    const faq = normalizeFaq(data?.faq);
    const appointment = normalizeAppointment(data?.appointment);

    const featuredBlogs = (data?.featured_blogs ?? [])
      .map((row) => {
        const slug = String(row.slug ?? "").trim();
        const title = String(row.title ?? "").trim();
        if (!slug || !title) return null;
        return {
          slug,
          title,
          image: String(row.image ?? "").trim() || "/images/blog-placeholder.webp",
          author: String(row.author_name ?? row.author ?? "Team").trim() || "Team",
          date: String(row.date ?? "").trim(),
        } satisfies HomeFeaturedBlog;
      })
      .filter((b): b is HomeFeaturedBlog => b !== null);

    return {
      sliders,
      marquee,
      services,
      about,
      awards,
      highlights,
      expertise,
      journey,
      secondOpinion,
      patientStories,
      videoTestimonials,
      faq,
      appointment,
      featuredBlogs,
    };
  } catch {
    return emptyHome;
  }
}

export type ProfileStat = {
  icon: "heart" | "clock" | "star" | "users";
  value: string;
  label: string;
};

export type ProfileAward = {
  title: string;
  detail: string;
  image: string;
};

export type ProfilePageContent = {
  hero_kicker: string;
  hero_title: string;
  hero_subtitle: string;
  intro_eyebrow: string;
  intro_heading: string;
  intro_role: string;
  intro_hospital: string;
  intro_bio: string;
  intro_image: string;
  experience_years: string;
  experience_label: string;
  badge_top: string;
  stats: ProfileStat[];
  btn_text: string;
  btn_link: string;
  phone: string;
  phone_href: string;
  education_title: string;
  education: string[];
  experience_title: string;
  experience: string[];
  memberships_title: string;
  memberships: string[];
  vision_title: string;
  vision_text: string;
  achievements_title: string;
  achievements_text: string;
  awards_eyebrow: string;
  awards_title: string;
  awards: ProfileAward[];
  cta_eyebrow: string;
  cta_title: string;
  cta_text: string;
  cta_btn_text: string;
  cta_btn_link: string;
  cta_whatsapp_text: string;
  cta_whatsapp_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  schema_json: string;
};

function asTextList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => (typeof item === "string" ? item.trim() : String((item as { text?: string })?.text ?? "").trim()))
    .filter(Boolean);
}

function normalizeProfileStat(item: Record<string, unknown>): ProfileStat | null {
  const value = String(item.value ?? item.n ?? "").trim();
  const label = String(item.label ?? item.l ?? "").trim();
  if (!value && !label) return null;
  const rawIcon = String(item.icon ?? "heart").trim().toLowerCase();
  const icon =
    rawIcon === "clock" || rawIcon === "star" || rawIcon === "users" || rawIcon === "heart"
      ? rawIcon
      : "heart";
  return { icon, value, label };
}

function normalizeProfileAward(item: Record<string, unknown>): ProfileAward | null {
  const title = String(item.title ?? "").trim();
  const detail = String(item.detail ?? item.text ?? "").trim();
  if (!title && !detail) return null;
  return {
    title,
    detail,
    image: String(item.image ?? "").trim() || "/images/award.webp",
  };
}

export async function fetchProfilePage(): Promise<ProfilePageContent | null> {
  try {
    const res = await fetch(`${API_BASE}/pages/profile`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const stats = Array.isArray(data.stats)
      ? data.stats
          .filter((s): s is Record<string, unknown> => !!s && typeof s === "object")
          .map((s) => normalizeProfileStat(s))
          .filter((s): s is ProfileStat => s !== null)
      : [];

    const awards = Array.isArray(data.awards)
      ? data.awards
          .filter((a): a is Record<string, unknown> => !!a && typeof a === "object")
          .map((a) => normalizeProfileAward(a))
          .filter((a): a is ProfileAward => a !== null)
      : [];

    const phone = String(data.phone ?? "").trim();

    return {
      hero_kicker: String(data.hero_kicker ?? "Doctor profile").trim() || "Doctor profile",
      hero_title: String(data.hero_title ?? "Dr. Rahul Bhargava").trim() || "Dr. Rahul Bhargava",
      hero_subtitle: String(data.hero_subtitle ?? "").trim(),
      intro_eyebrow: String(data.intro_eyebrow ?? "About the doctor").trim() || "About the doctor",
      intro_heading: String(data.intro_heading ?? "").trim(),
      intro_role: String(data.intro_role ?? "").trim(),
      intro_hospital: String(data.intro_hospital ?? "").trim(),
      intro_bio: String(data.intro_bio ?? "").trim(),
      intro_image: String(data.intro_image ?? "").trim() || "/images/dr_rahul.jpg",
      experience_years: String(data.experience_years ?? "23+").trim() || "23+",
      experience_label: String(data.experience_label ?? "Years of Experience").trim() || "Years of Experience",
      badge_top: String(data.badge_top ?? "1,500+ BMTs").trim() || "1,500+ BMTs",
      stats,
      btn_text: String(data.btn_text ?? "Book a consultation").trim() || "Book a consultation",
      btn_link: String(data.btn_link ?? "/contact").trim() || "/contact",
      phone,
      phone_href: phoneToHref(phone),
      education_title: String(data.education_title ?? "Education").trim() || "Education",
      education: asTextList(data.education),
      experience_title: String(data.experience_title ?? "Past Experience").trim() || "Past Experience",
      experience: asTextList(data.experience),
      memberships_title: String(data.memberships_title ?? "Memberships").trim() || "Memberships",
      memberships: asTextList(data.memberships),
      vision_title: String(data.vision_title ?? "Our Vision").trim() || "Our Vision",
      vision_text: String(data.vision_text ?? "").trim(),
      achievements_title: String(data.achievements_title ?? "Achievements").trim() || "Achievements",
      achievements_text: String(data.achievements_text ?? "").trim(),
      awards_eyebrow: String(data.awards_eyebrow ?? "Recognition").trim() || "Recognition",
      awards_title: String(data.awards_title ?? "Accreditations & Awards").trim() || "Accreditations & Awards",
      awards,
      cta_eyebrow: String(data.cta_eyebrow ?? "Same-week OPD").trim() || "Same-week OPD",
      cta_title: String(data.cta_title ?? "Ready to meet Dr. Bhargava?").trim() || "Ready to meet Dr. Bhargava?",
      cta_text: String(data.cta_text ?? "").trim(),
      cta_btn_text: String(data.cta_btn_text ?? "Book Appointment").trim() || "Book Appointment",
      cta_btn_link: String(data.cta_btn_link ?? "/contact").trim() || "/contact",
      cta_whatsapp_text: String(data.cta_whatsapp_text ?? "WhatsApp us").trim() || "WhatsApp us",
      cta_whatsapp_url: String(data.cta_whatsapp_url ?? "").trim(),
      meta_title: String(data.meta_title ?? "").trim(),
      meta_description: String(data.meta_description ?? "").trim(),
      meta_keywords: String(data.meta_keywords ?? "").trim(),
      schema_json: String(data.schema_json ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export type TreatmentNavItem = {
  title: string;
  slug: string;
};

export type TreatmentSectionGroup = {
  title: string;
  bullets: string[];
};

export type TreatmentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  groups?: TreatmentSectionGroup[];
};

export type TreatmentVideo = {
  video_id: string;
  title: string;
  meta: string;
};

export type TreatmentGalleryItem = {
  image: string;
  title: string;
  link?: string;
};

export type TreatmentReview = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type TreatmentPageContent = {
  slug: string;
  navTitle: string;
  pageTitle: string;
  stay?: string;
  cost?: string;
  success?: string;
  extra_stat_label?: string;
  extra_stat_value?: string;
  intro: string[];
  sections: TreatmentSection[];
  table?: { caption: string; headers: string[]; rows: string[][] } | null;
  faqs: Array<{ q: string; a: string }>;
  videos_heading?: string;
  videos_intro?: string;
  videos: TreatmentVideo[];
  section_cta?: string;
  gallery_heading?: string;
  media_gallery: TreatmentGalleryItem[];
  google_reviews_heading?: string;
  google_reviews: TreatmentReview[];
  related_heading?: string;
  related_blogs: string[];
  published_at?: string;
  content_updated_at?: string;
  image: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  schema_json?: string;
};

export async function fetchTreatmentsNav(): Promise<TreatmentNavItem[]> {
  try {
    const opts: RequestInit & { next?: { revalidate: number } } =
      typeof window === "undefined" ? { next: { revalidate: 30 } } : { cache: "no-store" };
    const res = await fetch(`${API_BASE}/treatments?nav=1`, opts);
    if (!res.ok) return [];
    const json = (await res.json()) as ApiEnvelope<Array<Record<string, unknown>>>;
    const rows = Array.isArray(json?.data) ? json.data : [];
    return rows
      .map((row) => ({
        title: String(row.title ?? "").trim(),
        slug: String(row.slug ?? "").trim(),
      }))
      .filter((row) => row.title && row.slug);
  } catch {
    return [];
  }
}

export async function fetchTreatmentPage(slug: string): Promise<TreatmentPageContent | null> {
  try {
    const res = await fetch(`${API_BASE}/treatments/${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const sections = Array.isArray(data.sections)
      ? data.sections
          .filter((s): s is Record<string, unknown> => !!s && typeof s === "object")
          .map((s) => {
            const groupsRaw = Array.isArray(s.groups) ? s.groups : [];
            const groups = groupsRaw
              .filter((g): g is Record<string, unknown> => !!g && typeof g === "object")
              .map((g) => ({
                title: String(g.title ?? "").trim(),
                bullets: Array.isArray(g.bullets)
                  ? g.bullets.map((b) => String(b).trim()).filter(Boolean)
                  : [],
              }))
              .filter((g) => g.title || g.bullets.length > 0);

            return {
              heading: String(s.heading ?? "").trim(),
              paragraphs: Array.isArray(s.paragraphs)
                ? s.paragraphs.map((p) => String(p).trim()).filter(Boolean)
                : undefined,
              bullets: Array.isArray(s.bullets)
                ? s.bullets.map((b) => String(b).trim()).filter(Boolean)
                : undefined,
              groups: groups.length > 0 ? groups : undefined,
            };
          })
          .filter((s) => s.heading || (s.paragraphs && s.paragraphs.length) || (s.bullets && s.bullets.length))
      : [];

    const tableRaw = data.table;
    let table: TreatmentPageContent["table"] = null;
    if (tableRaw && typeof tableRaw === "object") {
      const t = tableRaw as Record<string, unknown>;
      const headers = Array.isArray(t.headers) ? t.headers.map((h) => String(h)) : [];
      const rows = Array.isArray(t.rows)
        ? t.rows
            .filter((r): r is unknown[] => Array.isArray(r))
            .map((r) => r.map((c) => String(c)))
        : [];
      if (headers.length || rows.length) {
        table = {
          caption: String(t.caption ?? "").trim(),
          headers,
          rows,
        };
      }
    }

    const faqs = Array.isArray(data.faqs)
      ? data.faqs
          .filter((f): f is Record<string, unknown> => !!f && typeof f === "object")
          .map((f) => ({
            q: String(f.q ?? f.question ?? "").trim(),
            a: String(f.a ?? f.answer ?? "").trim(),
          }))
          .filter((f) => f.q || f.a)
      : [];

    const videos = Array.isArray(data.videos)
      ? data.videos
          .filter((v): v is Record<string, unknown> => !!v && typeof v === "object")
          .map((v) => ({
            video_id: String(v.video_id ?? v.id ?? "").trim(),
            title: String(v.title ?? "").trim(),
            meta: String(v.meta ?? "").trim(),
          }))
          .filter((v) => v.video_id)
      : [];

    const media_gallery = Array.isArray(data.media_gallery)
      ? data.media_gallery
          .filter((g): g is Record<string, unknown> => !!g && typeof g === "object")
          .map((g) => ({
            image: String(g.image ?? "").trim(),
            title: String(g.title ?? "").trim(),
            link: String(g.link ?? "").trim() || undefined,
          }))
          .filter((g) => g.image)
      : [];

    const google_reviews = Array.isArray(data.google_reviews)
      ? data.google_reviews
          .filter((r): r is Record<string, unknown> => !!r && typeof r === "object")
          .map((r) => ({
            author: String(r.author ?? r.name ?? "").trim(),
            rating: Number(r.rating ?? 5) || 5,
            text: String(r.text ?? r.review ?? "").trim(),
            date: String(r.date ?? "").trim(),
          }))
          .filter((r) => r.author || r.text)
      : [];

    const related_blogs = Array.isArray(data.related_blogs)
      ? data.related_blogs.map((s) => String(s).trim()).filter(Boolean)
      : [];

    const pageSlug = String(data.slug ?? slug).trim() || slug;
    const image = String(data.image ?? "").trim() || `/images/treatments/${pageSlug}.png`;

    return {
      slug: pageSlug,
      navTitle: String(data.title ?? data.navTitle ?? "").trim() || pageSlug,
      pageTitle: String(data.page_title ?? data.pageTitle ?? "").trim() || pageSlug,
      stay: String(data.stay ?? "").trim() || undefined,
      cost: String(data.cost ?? data.cost_label ?? "").trim() || undefined,
      success: String(data.success ?? data.success_rate ?? "").trim() || undefined,
      extra_stat_label: String(data.extra_stat_label ?? "").trim() || undefined,
      extra_stat_value: String(data.extra_stat_value ?? "").trim() || undefined,
      intro: Array.isArray(data.intro) ? data.intro.map((p) => String(p).trim()).filter(Boolean) : [],
      sections,
      table,
      faqs,
      videos_heading: String(data.videos_heading ?? "").trim() || undefined,
      videos_intro: String(data.videos_intro ?? "").trim() || undefined,
      videos,
      section_cta: String(data.section_cta ?? "").trim() || undefined,
      gallery_heading: String(data.gallery_heading ?? "").trim() || undefined,
      media_gallery,
      google_reviews_heading: String(data.google_reviews_heading ?? "").trim() || undefined,
      google_reviews,
      related_heading: String(data.related_heading ?? "").trim() || undefined,
      related_blogs,
      published_at: String(data.published_at ?? "").trim() || undefined,
      content_updated_at: String(data.content_updated_at ?? "").trim() || undefined,
      image,
      meta_title: String(data.meta_title ?? "").trim() || undefined,
      meta_description: String(data.meta_description ?? "").trim() || undefined,
      meta_keywords: String(data.meta_keywords ?? "").trim() || undefined,
      schema_json: String(data.schema_json ?? "").trim() || undefined,
    };
  } catch {
    return null;
  }
}

export type ContactInfoCard = {
  icon: "map" | "phone" | "mail" | "clock";
  label: string;
  value: string;
  href: string;
};

export type ContactPageContent = {
  hero_title: string;
  hero_subtitle: string;
  info_cards: ContactInfoCard[];
  call_btn_text: string;
  whatsapp_btn_text: string;
  whatsapp_url: string;
  map_title: string;
  map_embed_url: string;
  global_eyebrow: string;
  global_title: string;
  global_text: string;
  global_points: string[];
  global_link_text: string;
  global_link_url: string;
  disclaimer_text: string;
  disclaimer_link_text: string;
  disclaimer_link_url: string;
  form_heading: string;
  form_intro: string;
  form_subjects: string[];
  form_btn_text: string;
  form_success_title: string;
  form_success_text: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  schema_json: string;
};

function normalizeContactInfoCard(item: Record<string, unknown>): ContactInfoCard | null {
  const label = String(item.label ?? item.title ?? "").trim();
  const value = String(item.value ?? item.description ?? "").trim();
  if (!label && !value) return null;

  const rawIcon = String(item.icon ?? "map").trim().toLowerCase();
  const icon =
    rawIcon === "phone" || rawIcon === "mail" || rawIcon === "clock" || rawIcon === "map"
      ? rawIcon
      : rawIcon.includes("phone")
        ? "phone"
        : rawIcon.includes("envelope") || rawIcon.includes("mail")
          ? "mail"
          : rawIcon.includes("clock")
            ? "clock"
            : "map";

  return {
    icon,
    label,
    value,
    href: String(item.href ?? "").trim(),
  };
}

export async function fetchContactPage(): Promise<ContactPageContent | null> {
  try {
    const res = await fetch(`${API_BASE}/pages/contact`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const infoCards = Array.isArray(data.info_cards)
      ? data.info_cards
          .filter((c): c is Record<string, unknown> => !!c && typeof c === "object")
          .map((c) => normalizeContactInfoCard(c))
          .filter((c): c is ContactInfoCard => c !== null)
      : [];

    return {
      hero_title: String(data.hero_title ?? "Contact & global patients").trim() || "Contact & global patients",
      hero_subtitle: String(data.hero_subtitle ?? "").trim(),
      info_cards: infoCards,
      call_btn_text: String(data.call_btn_text ?? "Call now").trim() || "Call now",
      whatsapp_btn_text: String(data.whatsapp_btn_text ?? "WhatsApp us").trim() || "WhatsApp us",
      whatsapp_url: String(data.whatsapp_url ?? "").trim(),
      map_title: String(data.map_title ?? "").trim(),
      map_embed_url: String(data.map_embed_url ?? "").trim(),
      global_eyebrow: String(data.cta_eyebrow ?? "International patients").trim() || "International patients",
      global_title: String(data.cta_heading ?? "Global patient services").trim() || "Global patient services",
      global_text: String(data.cta_text ?? "").trim(),
      global_points: asTextList(data.global_points),
      global_link_text: String(data.global_link_text ?? "Read Global Patient Services →").trim(),
      global_link_url: String(data.global_link_url ?? "/global-patient-services").trim() || "/global-patient-services",
      disclaimer_text: String(data.disclaimer_text ?? "").trim(),
      disclaimer_link_text: String(data.disclaimer_link_text ?? "Full disclaimer").trim() || "Full disclaimer",
      disclaimer_link_url: String(data.disclaimer_link_url ?? "/disclaimer").trim() || "/disclaimer",
      form_heading: String(data.form_heading ?? "Send a query").trim() || "Send a query",
      form_intro: String(data.form_intro ?? "").trim(),
      form_subjects: asTextList(data.form_subjects),
      form_btn_text: String(data.form_btn_text ?? "Send").trim() || "Send",
      form_success_title: String(data.form_success_title ?? "Query sent").trim() || "Query sent",
      form_success_text: String(data.form_success_text ?? "").trim(),
      meta_title: String(data.meta_title ?? "").trim(),
      meta_description: String(data.meta_description ?? "").trim(),
      meta_keywords: String(data.meta_keywords ?? "").trim(),
      schema_json: String(data.schema_json ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export type GlobalPatientTitleText = {
  title: string;
  text: string;
};

export type GlobalPatientJourneyStep = {
  n: string;
  title: string;
  text: string;
};

export type GlobalPatientStory = {
  quote: string;
  name: string;
  city: string;
  treat: string;
};

export type GlobalPatientServicesContent = {
  hero_title: string;
  hero_subtitle: string;
  why_title: string;
  why_intro: string;
  why_items: GlobalPatientTitleText[];
  deliver_title: string;
  deliver_intro: string;
  deliver_items: string[];
  support_title: string;
  support_intro: string;
  support_items: GlobalPatientTitleText[];
  journey_title: string;
  journey_steps: GlobalPatientJourneyStep[];
  stories_title: string;
  stories_intro: string;
  stories: GlobalPatientStory[];
  stories_link_text: string;
  stories_link_url: string;
  consult_default_slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  schema_json: string;
};

function asTitleTextList(value: unknown): GlobalPatientTitleText[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => ({
      title: String(item.title ?? "").trim(),
      text: String(item.text ?? item.description ?? "").trim(),
    }))
    .filter((item) => item.title || item.text);
}

export async function fetchGlobalPatientServicesPage(): Promise<GlobalPatientServicesContent | null> {
  try {
    const res = await fetch(`${API_BASE}/pages/global-patient-services`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const journeySteps = Array.isArray(data.journey_steps)
      ? data.journey_steps
          .filter((s): s is Record<string, unknown> => !!s && typeof s === "object")
          .map((s) => ({
            n: String(s.n ?? "").trim(),
            title: String(s.title ?? "").trim(),
            text: String(s.text ?? "").trim(),
          }))
          .filter((s) => s.n || s.title || s.text)
      : [];

    const stories = Array.isArray(data.stories)
      ? data.stories
          .filter((s): s is Record<string, unknown> => !!s && typeof s === "object")
          .map((s) => ({
            quote: String(s.quote ?? s.text ?? "").trim(),
            name: String(s.name ?? "").trim(),
            city: String(s.city ?? "").trim(),
            treat: String(s.treat ?? s.treatment ?? "").trim(),
          }))
          .filter((s) => s.quote || s.name)
      : [];

    return {
      hero_title: String(data.hero_title ?? "Global Patient Services").trim() || "Global Patient Services",
      hero_subtitle: String(data.hero_subtitle ?? "").trim(),
      why_title: String(data.why_title ?? "Why choose us?").trim() || "Why choose us?",
      why_intro: String(data.why_intro ?? "").trim(),
      why_items: asTitleTextList(data.why_items),
      deliver_title: String(data.deliver_title ?? "How we deliver what we promise").trim() || "How we deliver what we promise",
      deliver_intro: String(data.deliver_intro ?? "").trim(),
      deliver_items: asTextList(data.deliver_items),
      support_title: String(data.support_title ?? "Complete support for international patients").trim() || "Complete support for international patients",
      support_intro: String(data.support_intro ?? "").trim(),
      support_items: asTitleTextList(data.support_items),
      journey_title: String(data.journey_title ?? "Your journey to recovery").trim() || "Your journey to recovery",
      journey_steps: journeySteps,
      stories_title: String(data.stories_title ?? "Patient stories").trim() || "Patient stories",
      stories_intro: String(data.stories_intro ?? "").trim(),
      stories,
      stories_link_text: String(data.stories_link_text ?? "View all testimonials →").trim() || "View all testimonials →",
      stories_link_url: String(data.stories_link_url ?? "/testimonials").trim() || "/testimonials",
      consult_default_slug: String(data.consult_default_slug ?? "thalassemia").trim() || "thalassemia",
      meta_title: String(data.meta_title ?? "").trim(),
      meta_description: String(data.meta_description ?? "").trim(),
      meta_keywords: String(data.meta_keywords ?? "").trim(),
      schema_json: String(data.schema_json ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
};

export type LegalPageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  updated_label: string;
  intro: string;
  sections: LegalSection[];
  cta_eyebrow: string;
  cta_heading: string;
  cta_text: string;
  cta_phone: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  schema_json: string;
};

export async function fetchLegalPage(slug: string): Promise<LegalPageContent | null> {
  try {
    const res = await fetch(`${API_BASE}/pages/legal/${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const sections = Array.isArray(data.sections)
      ? data.sections
          .filter((s): s is Record<string, unknown> => !!s && typeof s === "object")
          .map((s) => ({
            id: String(s.id ?? s.section_id ?? "").trim(),
            title: String(s.title ?? "").trim(),
            paragraphs: Array.isArray(s.paragraphs)
              ? s.paragraphs.map((p) => String(p).trim()).filter(Boolean)
              : [],
            bullets: Array.isArray(s.bullets)
              ? s.bullets.map((b) => String(b).trim()).filter(Boolean)
              : [],
          }))
          .filter((s) => s.title || s.paragraphs.length || s.bullets.length)
      : [];

    return {
      slug: String(data.slug ?? slug).trim() || slug,
      eyebrow: String(data.eyebrow ?? "").trim(),
      title: String(data.title ?? "").trim() || slug,
      lead: String(data.lead ?? "").trim(),
      updated_label: String(data.updated_label ?? "").trim(),
      intro: String(data.intro ?? "").trim(),
      sections,
      cta_eyebrow: String(data.cta_eyebrow ?? "").trim(),
      cta_heading: String(data.cta_heading ?? "").trim(),
      cta_text: String(data.cta_text ?? "").trim(),
      cta_phone: String(data.cta_phone ?? "").trim(),
      meta_title: String(data.meta_title ?? "").trim(),
      meta_description: String(data.meta_description ?? "").trim(),
      meta_keywords: String(data.meta_keywords ?? "").trim(),
      schema_json: String(data.schema_json ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export type TestimonialItem = {
  id: number;
  name: string;
  position: string;
  country: string;
  treatment: string;
  message: string;
};

export type TestimonialVideo = {
  video_id: string;
  title: string;
};

export type TestimonialsPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  videos_title: string;
  videos: TestimonialVideo[];
  testimonials: TestimonialItem[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  schema_json: string;
};

const AVATAR_COLORS = ["#8BC34A", "#156F9F", "#689F38", "#00897B", "#5C6BC0", "#EF6C00"];

export function testimonialInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function testimonialColor(seed: number | string): string {
  const n = typeof seed === "number" ? seed : seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[Math.abs(n) % AVATAR_COLORS.length];
}

export async function fetchTestimonialsPage(): Promise<TestimonialsPageContent | null> {
  try {
    const res = await fetch(`${API_BASE}/pages/testimonials`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const testimonials = Array.isArray(data.testimonials)
      ? data.testimonials
          .filter((t): t is Record<string, unknown> => !!t && typeof t === "object")
          .map((t) => ({
            id: Number(t.id ?? 0),
            name: String(t.name ?? "").trim(),
            position: String(t.position ?? "").trim(),
            country: String(t.country ?? "").trim(),
            treatment: String(t.treatment ?? "").trim(),
            message: String(t.message ?? "").trim(),
          }))
          .filter((t) => t.name || t.message)
      : [];

    const videos = Array.isArray(data.videos)
      ? data.videos
          .filter((v): v is Record<string, unknown> => !!v && typeof v === "object")
          .map((v) => ({
            video_id: String(v.video_id ?? v.id ?? "").trim(),
            title: String(v.title ?? "").trim() || "Patient story",
          }))
          .filter((v) => v.video_id)
      : [];

    return {
      hero_eyebrow: String(data.hero_eyebrow ?? "Patient Stories").trim() || "Patient Stories",
      hero_title: String(data.hero_title ?? "Testimonials").trim() || "Testimonials",
      hero_subtitle: String(data.hero_subtitle ?? "").trim(),
      videos_title: String(data.videos_title ?? "Video stories").trim() || "Video stories",
      videos,
      testimonials,
      meta_title: String(data.meta_title ?? "").trim(),
      meta_description: String(data.meta_description ?? "").trim(),
      meta_keywords: String(data.meta_keywords ?? "").trim(),
      schema_json: String(data.schema_json ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export type BlogsListingPage = {
  hero_kicker: string;
  hero_title: string;
  hero_subtitle: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  schema_json: string;
};

export type BlogListItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  published_at: string;
};

export type HomeFeaturedBlog = {
  slug: string;
  title: string;
  image: string;
  author: string;
  date: string;
};

export type BlogFaq = { q: string; a: string };

export type BlogDetail = BlogListItem & {
  short_content: string;
  content: string;
  cta_social: string;
  optional_content_1: string;
  cta_1: string;
  optional_content_2: string;
  cta_2: string;
  optional_content_3: string;
  faqs_heading: string;
  faqs: BlogFaq[];
  related_treatments: string[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  schema_json: string;
};

function formatBlogDate(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

function mapBlogListItem(data: Record<string, unknown>): BlogListItem | null {
  const slug = String(data.slug ?? "").trim();
  const title = String(data.title ?? "").trim();
  if (!slug && !title) return null;

  const authorRelation =
    data.author && typeof data.author === "object"
      ? String((data.author as Record<string, unknown>).name ?? "").trim()
      : "";

  return {
    id: Number(data.id ?? 0),
    slug: slug || String(data.id ?? ""),
    title: title || slug,
    excerpt: String(data.excerpt ?? "").trim(),
    image: String(data.image ?? "").trim() || "/blogs/placeholder.png",
    author: authorRelation || String(data.author_name ?? "Admin").trim() || "Admin",
    date: formatBlogDate(data.published_at ?? data.created_at),
    published_at: String(data.published_at ?? data.created_at ?? "").trim(),
  };
}

export async function fetchBlogsListingPage(): Promise<BlogsListingPage | null> {
  try {
    const res = await fetch(`${API_BASE}/pages/blogs`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    return {
      hero_kicker: String(data.hero_kicker ?? "Health tips").trim() || "Health tips",
      hero_title: String(data.hero_title ?? "Blogs").trim() || "Blogs",
      hero_subtitle: String(data.hero_subtitle ?? "").trim(),
      meta_title: String(data.meta_title ?? "").trim(),
      meta_description: String(data.meta_description ?? "").trim(),
      meta_keywords: String(data.meta_keywords ?? "").trim(),
      schema_json: String(data.schema_json ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export async function fetchBlogs(perPage = 50): Promise<BlogListItem[]> {
  try {
    const res = await fetch(`${API_BASE}/blogs?per_page=${perPage}`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>[]>;
    const rows = Array.isArray(json?.data) ? json.data : [];
    return rows
      .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
      .map((row) => mapBlogListItem(row))
      .filter((row): row is BlogListItem => row !== null);
  } catch {
    return [];
  }
}

export async function fetchBlog(slug: string): Promise<BlogDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiEnvelope<Record<string, unknown>>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const base = mapBlogListItem(data);
    if (!base) return null;

    const faqs = Array.isArray(data.faqs)
      ? data.faqs
          .filter((f): f is Record<string, unknown> => !!f && typeof f === "object")
          .map((f) => ({
            q: String(f.q ?? f.question ?? "").trim(),
            a: String(f.a ?? f.answer ?? "").trim(),
          }))
          .filter((f) => f.q || f.a)
      : [];

    const related = Array.isArray(data.related_treatments)
      ? data.related_treatments.map((s) => String(s ?? "").trim()).filter(Boolean)
      : [];

    return {
      ...base,
      short_content: String(data.short_content ?? "").trim(),
      content: String(data.content ?? "").trim(),
      cta_social: String(data.cta_social ?? "").trim(),
      optional_content_1: String(data.optional_content_1 ?? "").trim(),
      cta_1: String(data.cta_1 ?? "").trim(),
      optional_content_2: String(data.optional_content_2 ?? "").trim(),
      cta_2: String(data.cta_2 ?? "").trim(),
      optional_content_3: String(data.optional_content_3 ?? "").trim(),
      faqs_heading: String(data.faqs_heading ?? "Frequently asked questions").trim() || "Frequently asked questions",
      faqs,
      related_treatments: related,
      meta_title: String(data.meta_title ?? "").trim(),
      meta_description: String(data.meta_description ?? data.excerpt ?? "").trim(),
      meta_keywords: String(data.meta_keywords ?? "").trim(),
      schema_json: String(data.schema_json ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export type SiteSocialLink = { name: string; href: string };

export type SiteSettings = {
  site_name: string;
  logo_tagline: string;
  header_logo: string;
  footer_logo: string;
  favicon: string;
  working_hours: string;
  header_cta_text: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  whatsapp: string;
  floating_whatsapp_enabled: boolean;
  footer_about: string;
  footer_copyright: string;
  socials: SiteSocialLink[];
  home_meta_title: string;
  home_meta_description: string;
  home_meta_keywords: string;
  home_og_image: string;
  home_schema_json: string;
  google_search_console_code: string;
  google_analytics_code: string;
};

function buildWhatsappUrl(number: string, message: string, fallbackUrl: string): string {
  const digits = number.replace(/\D+/g, "");
  if (!digits) return fallbackUrl;
  const base = `https://wa.me/${digits}`;
  const text = message.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${API_BASE}/settings`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiEnvelope<Record<string, unknown> | null>;
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    const phone = String(data.phone1 ?? "").trim();
    const email = String(data.email1 ?? "").trim();
    const address = String(data.address ?? "").trim();
    const floatingUrl = String(data.floating_whatsapp_url ?? "").trim();
    const floatingNumber = String(data.floating_whatsapp_number ?? data.phone1 ?? "").trim();
    const floatingMessage = String(data.floating_whatsapp_message ?? "").trim();

    const socials: SiteSocialLink[] = [
      { name: "YouTube", href: String(data.youtube_url ?? "").trim() },
      { name: "Facebook", href: String(data.facebook_url ?? "").trim() },
      { name: "Instagram", href: String(data.instagram_url ?? "").trim() },
      { name: "LinkedIn", href: String(data.linkedin_url ?? "").trim() },
    ].filter((s) => s.href);

    return {
      site_name: String(data.site_name ?? "Dr. Rahul Bhargava").trim() || "Dr. Rahul Bhargava",
      logo_tagline: String(data.logo_tagline ?? "Hematology · BMT").trim() || "Hematology · BMT",
      header_logo: String(data.header_logo ?? "").trim(),
      footer_logo: String(data.footer_logo ?? "").trim(),
      favicon: String(data.favicon ?? "").trim(),
      working_hours: String(data.working_hours ?? "").trim(),
      header_cta_text: String(data.header_cta_text ?? "").trim(),
      phone: phone || "+91 99997 36555",
      phoneHref: phoneToHref(phone || "+91 99997 36555"),
      email: email || "drrahulbhargava@yahoo.com",
      address: address || "Fortis Memorial Research Institute, Near Millennium Metro Station, Gurugram, Haryana 122002",
      whatsapp:
        floatingUrl ||
        buildWhatsappUrl(
          floatingNumber || phone,
          floatingMessage || "Hello, I would like a consultation.",
          "https://wa.me/919999736555?text=Hello%2C%20I%20would%20like%20a%20consultation."
        ),
      floating_whatsapp_enabled: Boolean(data.floating_whatsapp_enabled ?? true),
      footer_about: String(data.footer_after_logo_content ?? "").trim(),
      footer_copyright: String(data.footer_text ?? "").trim(),
      socials,
      home_meta_title: String(data.home_meta_title ?? "").trim(),
      home_meta_description: String(data.home_meta_description ?? "").trim(),
      home_meta_keywords: String(data.home_meta_keywords ?? "").trim(),
      home_og_image: String(data.home_og_image ?? "").trim(),
      home_schema_json: String(data.home_schema_json ?? "").trim(),
      google_search_console_code: String(data.google_search_console_code ?? "").trim(),
      google_analytics_code: String(data.google_analytics_code ?? "").trim(),
    };
  } catch {
    return null;
  }
}


export type EnquiryType = "appointment" | "contact" | "treatment";

export type EnquiryPayload = {
  type: EnquiryType;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  source_page?: string;
  product_name?: string;
  meta?: Record<string, unknown>;
};

/** Combined dial code + number from PhoneField form fields. */
export function phoneFromForm(form: HTMLFormElement, name = "phone"): string {
  const fd = new FormData(form);
  const code = String(fd.get(`${name}_code`) || "").trim();
  const phone = String(fd.get(name) || "").trim();
  return [code, phone].filter(Boolean).join(" ").trim();
}

/** POST enquiry to Laravel admin (saved under /admin/enquiry + email to admin). */
export async function submitEnquiry(
  payload: EnquiryPayload
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: payload.type,
        name: payload.name || undefined,
        email: payload.email || undefined,
        phone: payload.phone || undefined,
        subject: payload.subject || undefined,
        message: payload.message || undefined,
        source_page: payload.source_page || undefined,
        product_name: payload.product_name || undefined,
        meta: payload.meta || undefined,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
      errors?: Record<string, string[]>;
      data?: { message?: string };
    };
    if (!res.ok) {
      const firstError = json.errors
        ? Object.values(json.errors).flat()[0]
        : undefined;
      return {
        ok: false,
        message: firstError || json.message || "Could not submit. Please try again.",
      };
    }
    return {
      ok: true,
      message:
        json.data?.message ||
        json.message ||
        "Thank you! We will get back to you soon.",
    };
  } catch {
    return {
      ok: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
