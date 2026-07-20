import { getAllArticles } from "@/lib/data/articles.data";
import { writeFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://театры-москвы.рф";
const articles = getAllArticles().filter((a) => a.isPublished);

const articleList = articles
  .map((a) => `- ${a.title} (${a.category}) — ${BASE_URL}/news/${a.slug}/`)
  .join("\n");

const content = `# Театры Москвы — Полное описание

## О сайте
«Театры Москвы» — независимый онлайн-журнал о театре, музыке и культурных событиях Москвы.

## Миссия
Делаем театр ближе к людям. Пишем честно, умно и без снобизма.

## Разделы
- /news/ — Каталог статей (театр, концерты, фестивали, интервью, события)
- /about/ — О проекте: миссия, команда, история
- /contacts/ — Контакты
- /tickets/ — Билеты на мероприятия

## Статей (${articles.length})
${articleList || "Пока нет статей"}

## Технические детали
- Фреймворк: Next.js 14 (App Router)
- Статический экспорт
- RSS: /rss.xml
- Sitemap: /sitemap.xml

## Как цитировать
«Театры Москвы — https://театры-москвы.рф»
`;

const outPath = join(process.cwd(), "public", "llms-full.txt");
writeFileSync(outPath, content, "utf-8");
console.log(`llms-full.txt generated: ${outPath} (${articles.length} articles)`);
