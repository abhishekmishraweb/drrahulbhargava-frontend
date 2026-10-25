import { Suspense } from "react";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { fetchHomeContent, fetchSiteSettings } from "@/lib/api";

async function HomeFromAdmin() {
  const {
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
  } = await fetchHomeContent();
  return (
    <HomePage
      sliders={sliders}
      marqueeItems={marquee}
      services={services}
      about={about}
      awards={awards}
      highlights={highlights}
      expertise={expertise}
      journey={journey}
      secondOpinion={secondOpinion}
      patientStories={patientStories}
      videoTestimonials={videoTestimonials}
      faq={faq}
      appointment={appointment}
      featuredBlogs={featuredBlogs}
    />
  );
}

async function HomeSchema() {
  const settings = await fetchSiteSettings();
  return <JsonLd json={settings?.home_schema_json} />;
}

export default function Page() {
  return (
    <>
      <Suspense>
        <HomeSchema />
      </Suspense>
      <Suspense fallback={<HomePage />}>
        <HomeFromAdmin />
      </Suspense>
    </>
  );
}
