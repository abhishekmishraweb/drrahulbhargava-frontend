import { fetchBlogs, fetchTreatmentsNav } from "@/lib/api";
import { siteOrigin } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteOrigin();
  const [treatments, blogs] = await Promise.all([fetchTreatmentsNav(), fetchBlogs(50)]);
  const now = new Date();

  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/profile", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/blogs", priority: 0.8 },
    { path: "/testimonials", priority: 0.7 },
    { path: "/global-patient-services", priority: 0.8 },
    { path: "/disclaimer", priority: 0.3 },
  ];

  return [
    ...staticPaths.map((item) => ({
      url: `${base}${item.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: item.priority,
    })),
    ...treatments.map((item) => ({
      url: `${base}/treatments/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...blogs.map((item) => ({
      url: `${base}/blogs/${item.slug}`,
      lastModified: item.published_at ? new Date(item.published_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
