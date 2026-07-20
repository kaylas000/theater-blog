import { getAllArticles } from "@/lib/data/articles.data";
import type { Article } from "@/lib/types";
import { writeFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://театры-москвы.рф";
const articles = getAllArticles().filter((a) => a.isPublished).slice(0, 20);

const items = articles
  .map(
    (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${BASE_URL}/news/${a.slug}/</link>
      <guid isPermaLink="true">${BASE_URL}/news/${a.slug}/</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerpt}]]></description>
      <category>${a.category}</category>
    </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Театры Москвы</title>
    <link>${BASE_URL}</link>
    <description>Обзоры театральных представлений, концертных отчётов, репортажей с фестивалей и интервью</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

const outPath = join(process.cwd(), "public", "rss.xml");
writeFileSync(outPath, rss, "utf-8");
console.log(`RSS generated: ${outPath} (${articles.length} articles)`);
