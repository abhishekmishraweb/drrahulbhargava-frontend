import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { JsonLd } from "@/components/JsonLd";
import { fetchContactPage, type ContactPageContent } from "@/lib/api";
import { site } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

function fallbackContact(): ContactPageContent {
  return {
    hero_title: "Contact & global patients",
    hero_subtitle:
      "OPD at Fortis Memorial Research Institute, Gurugram. International families get visa letters, estimates and translator support.",
    info_cards: [
      {
        icon: "map",
        label: "OPD address",
        value: site.address,
        href: "https://maps.google.com/?q=Fortis+Memorial+Research+Institute+Gurugram",
      },
      { icon: "phone", label: "Call", value: site.phone, href: site.phoneHref },
      { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
      { icon: "clock", label: "Hours", value: `${site.hours} · Sunday by appointment`, href: "" },
    ],
    call_btn_text: "Call now",
    whatsapp_btn_text: "WhatsApp us",
    whatsapp_url: site.whatsapp,
    map_title: "Fortis Memorial Research Institute, Gurugram",
    map_embed_url:
      "https://maps.google.com/maps?q=Fortis%20Memorial%20Research%20Institute%20Gurugram&t=&z=15&ie=UTF8&iwloc=&output=embed",
    global_eyebrow: "International patients",
    global_title: "Global patient services",
    global_text:
      "Share passport copy and medical reports. A coordinator will outline stay length, attendant policy and an indicative package before you fly.",
    global_points: [
      "Pre-arrival report review and cost estimate",
      "Medical visa invitation letter",
      "Airport pickup and nearby stay options",
      "Translators and attendant guidance",
      "English discharge summary for home doctors",
      "Tele-follow-up after you fly back",
    ],
    global_link_text: "Read Global Patient Services →",
    global_link_url: "/global-patient-services",
    disclaimer_text:
      "This website is for information only and is not a substitute for professional medical advice, diagnosis or treatment. Always consult Dr. Rahul Bhargava or your treating physician for decisions about your care.",
    disclaimer_link_text: "Full disclaimer",
    disclaimer_link_url: "/disclaimer",
    form_heading: "Send a query",
    form_intro: "We typically respond the same working day.",
    form_subjects: [
      "Thalassemia",
      "Leukemia",
      "Sickle Cell Anemia (SCA)",
      "Bone Marrow Transplant",
      "Multiple Myeloma",
      "CAR-T cell therapy",
      "Lymphoma",
    ],
    form_btn_text: "Send",
    form_success_title: "Query sent",
    form_success_text: `A coordinator will reply shortly. For urgent queries, call ${site.phone}.`,
    meta_title: "Contact",
    meta_description: "",
    meta_keywords: "",
    schema_json: "",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = (await fetchContactPage()) ?? fallbackContact();
  return pageMetadata({
    title: page.meta_title || "Contact",
    description: page.meta_description,
    keywords: page.meta_keywords,
  });
}

export default async function ContactPage() {
  const content = (await fetchContactPage()) ?? fallbackContact();
  return (
    <>
      <JsonLd json={content.schema_json} />
      <ContactPageClient content={content} />
    </>
  );
}
