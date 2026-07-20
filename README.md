# Театры Москвы — Блог о театре

Независимый онлайн-журнал о театре, музыке и культурных событиях Москвы.

## Функции

- 📰 Каталог статей с фильтрацией по категориям
- 🎭 Обзоры спектаклей, концертов, фестивалей
- 💬 Интервью с деятелями искусства
- 🎫 Билеты на мероприятия
- 🔍 Поиск по статьям
- 📱 Адаптивный дизайн (мобилка + десктоп)
- 🔍 SEO-оптимизация (мета-теги, sitemap, Schema.org)
- 📡 RSS-лента
- 🤖 Инструкции для AI-ботов (llms.txt)

## Технологии

- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**
- **Статический экспорт** — можно хостить где угодно

## Установка

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/theater-blog-static.git
cd theater-blog-static

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Собрать статический сайт
npm run build

# Посмотреть собранный сайт
npx serve out
```

## Структура проекта

```
theater-blog-static/
├── public/              # Статические файлы (изображения, видео, favicon)
├── src/
│   ├── app/             # Страницы (Next.js App Router)
│   ├── components/      # React-компоненты
│   └── lib/
│       ├── data/        # Данные (articles.json, site-config.json)
│       └── types/       # TypeScript-типы
├── scripts/             # Скрипты генерации (RSS, llms-full.txt)
└── out/                 # Собранный статический сайт (после build)
```

## Управление контентом

### Статьи

Редактируйте файл `src/lib/data/articles.json` для добавления/изменения статей.

### Настройки сайта

Редактируйте файл `src/lib/data/site-config.json` для изменения текстов, цветов, изображений.

### Сборка

После изменений в данных:

```bash
# Сгенерировать RSS и llms-full.txt
node scripts/generate-rss.js
node scripts/generate-llms-full.js

# Собрать сайт
npm run build
```

## Деплой

### Yandex Cloud / GitHub Pages / Vercel / Netlify

Загрузите содержимое папки `out/` на любой хостинг статических файлов.

### Nginx

```nginx
server {
    listen 80;
    server_name театр-москвы.рф;
    root /var/www/theater-blog/out;
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
}
```

## Лицензия

MIT
