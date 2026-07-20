export interface PublishResult {
  platform: "vk" | "dzen";
  ok: boolean;
  postId?: string;
  error?: string;
  timestamp: string;
}

export async function publishToVK(article: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
}): Promise<PublishResult> {
  const groupId = process.env.VK_GROUP_ID;
  const token = process.env.VK_ACCESS_TOKEN;

  if (!groupId || !token) {
    return { platform: "vk", ok: false, error: "Не настроены VK_GROUP_ID или VK_ACCESS_TOKEN", timestamp: new Date().toISOString() };
  }

  const url = `https://api.vk.com/method/wall.post`;
  const message = `${article.title}\n\n${article.excerpt}\n\nЧитать далее: https://театры-москвы.рф/news/${article.slug}`;

  const params = new URLSearchParams({
    owner_id: `-${groupId}`,
    from_group: "1",
    message,
    access_token: token,
    v: "5.199",
  });

  if (article.coverImage) {
    params.append("attachments", article.coverImage);
  }

  try {
    const res = await fetch(url, { method: "POST", body: params });
    const data = await res.json();

    if (data.error) {
      return { platform: "vk", ok: false, error: data.error.error_msg, timestamp: new Date().toISOString() };
    }

    return { platform: "vk", ok: true, postId: String(data.response?.post_id), timestamp: new Date().toISOString() };
  } catch (e: any) {
    return { platform: "vk", ok: false, error: e.message, timestamp: new Date().toISOString() };
  }
}
