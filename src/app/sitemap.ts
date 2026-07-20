import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/data/articles.data";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://театры-москвы.рф";

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/news/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contacts/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tickets/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const articles = getAllArticles();
  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.isPublished)
    .map((article) => ({
      url: `${BASE_URL}/news/${article.slug}/`,
      lastModified: new Date(article.dateModified || article.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...articlePages];
}
