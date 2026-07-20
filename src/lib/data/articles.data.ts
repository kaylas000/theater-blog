import { Article } from "@/lib/types";
import articlesData from "./articles.json";

const articles = articlesData as Article[];

export function getAllArticles(): Article[] {
  return articles
    .filter((a) => a.isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestArticles(count: number = 9, excludeSlug?: string): Article[] {
  const all = getAllArticles();
  const filtered = excludeSlug ? all.filter((a) => a.slug !== excludeSlug) : all;
  return filtered.slice(0, count);
}

export function getFeaturedArticle(): Article | null {
  const all = getAllArticles();
  return all.length > 0 ? all[0] : null;
}

export function getPopularArticles(count: number = 6): Article[] {
  const all = getAllArticles();
  return all.slice(0, count);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && a.isPublished);
}

export function getArticlesByCategory(category: string): Article[] {
  const all = getAllArticles();
  return all.filter((a) => a.category === category);
}

export function getRelatedArticles(currentSlug: string, count: number = 3): Article[] {
  const all = getAllArticles();
  const current = all.find((a) => a.slug === currentSlug);
  if (!current) return all.filter((a) => a.slug !== currentSlug).slice(0, count);

  const scored = all
    .filter((a) => a.slug !== currentSlug)
    .map((a) => {
      let score = 0;
      if (a.category === current.category) score += 3;
      const commonTags = a.tags.filter((t) => current.tags.includes(t));
      score += commonTags.length * 2;
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.article);
}

export function generateSlug(title: string): string {
  const map: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z',
    'и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r',
    'с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh',
    'щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
  };
  return title.toLowerCase()
    .replace(/[а-яё]/g, (c) => map[c] || c)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function calculateReadTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDateText(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
