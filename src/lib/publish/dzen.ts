import type { PublishResult } from "./vk";

export async function publishToDzen(article: {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  coverImage?: string;
}): Promise<PublishResult> {
  const token = process.env.DZEN_TOKEN;
  const channelId = process.env.DZEN_CHANNEL_ID;

  if (!token || !channelId) {
    return { platform: "dzen", ok: false, error: "Не настроены DZEN_TOKEN или DZEN_CHANNEL_ID", timestamp: new Date().toISOString() };
  }

  const htmlContent = `
    <p>${article.excerpt}</p>
    <p><a href="https://театры-москвы.рф/news/${article.slug}">Читать полную версию на сайте →</a></p>
  `;

  const body = {
    title: article.title,
    contentHtml: htmlContent,
    channel_id: channelId,
    access_token: token,
  };

  try {
    const res = await fetch("https://api.dzen.ru/v1/content/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.error) {
      return { platform: "dzen", ok: false, error: data.error.message || JSON.stringify(data.error), timestamp: new Date().toISOString() };
    }

    return { platform: "dzen", ok: true, postId: data.id, timestamp: new Date().toISOString() };
  } catch (e: any) {
    return { platform: "dzen", ok: false, error: e.message, timestamp: new Date().toISOString() };
  }
}
