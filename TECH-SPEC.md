# Техническое задание — theater-blog-next

## Выполнено в сессии

### 1. Видеосекция на главной
- Видео как фон всей секции (position: absolute, object-fit: cover)
- min-height: 100vh для stacked scroll
- border-top с глобальным цветом разделителя

### 2. Логотип
- Театральные маски (комедия + трагедия) на золотом круге
- Файлы: public/theater-masks.svg, src/app/icon.svg
- Favicon: favicon.ico (32x32), apple-touch-icon.png (180x180)
- Android: android-chrome-192x192.png, android-chrome-512x512.png
- Manifest: public/manifest.json
- Metadata в layout.tsx обновлена

### 3. Админка — рефакторинг
- Раздел "Контент сайта" перестроен: глобальные настройки + каждая страница отдельно
- Каждая секция на каждой странице имеет загрузку фона (десктоп/мобилка)
- Все секции с data-section атрибутами: home-video, home-featured, home-fresh, home-popular, home-newsletter, about-mission, about-stats, about-team, about-history, about-cta, news-articles, news-newsletter, tickets-events, contacts-data
- CSS переменные --d-section-bg-* и --m-section-bg-* для каждой секции

### 4. Страница "Инструкция"
- Подробная документация по всем настройкам
- Кнопки скачивания Notepad++ и шаблона статьи
- Шаблон: public/Шаблон статьи.txt

### 5. Авторизация админки
- Middleware защищает /admin/* (кроме /admin/login)
- Cookie-based auth (httpOnly, 7 дней)
- Пароль в .env.local (ADMIN_PASSWORD)
- Кнопка "Выйти" в sidebar

### 6. Цвет разделителя
- Глобальная переменная --d-section-border / --m-section-border
- Работает на всех секциях включая видео
- Настройка в админке

### 7. SEO-инфраструктура (ЧАСТИЧНО)

#### Критично для Яндекса:
- [x] Динамические meta-теги (title, description, OG) — layout.tsx
- [x] sitemap.xml — авто-генерация из articles.json
- [x] robots.txt — разрешения для Яндекса + AI-ботов
- [x] Schema.org — Organization (глобально) + Article (на статьях)
- [ ] Canonical URL — авто-генерация из slug
- [ ] H1-H3 правильная структура
- [ ] Alt-тексты для изображений
- [ ] Региональность (Москва)
- [x] Yandex.Webmaster — мета-тег верификации
- [x] Yandex.Metrica — счётчик

#### Для AI-ботов:
- [x] llms.txt — инструкция для AI
- [ ] llms-full.txt — расширенная инструкция
- [ ] Schema.org FAQ — на страницах
- [ ] Author markup — E-E-A-T
- [ ] Явные факты в контенте

#### Автоматическое:
- [x] meta-теги генерируются из контента статьи — layout.tsx
- [x] OG-image берётся из обложки — news/[slug]/page.tsx
- [ ] Время чтения считается автоматически
- [ ] Таблица содержания из H2/H3
- [ ] Связанные статьи по тегам
- [x] RSS-лента — авто-генерация
- [ ] dateModified обновляется при изменении

### 8. Автопостинг (ЧАСТИЧНО)

#### ВКонтакте:
- [x] API-интеграция (wall.post) — lib/publish/vk.ts
- [x] Формат: заголовок + обложка + краткое описание + ссылка
- [ ] Триггер: публикация статьи → пост в VK
- [ ] Настройка в админке: VK_GROUP_ID, VK_ACCESS_TOKEN

#### Дзен:
- [x] API-интеграция (Dzen Content API) — lib/publish/dzen.ts
- [x] Формат: полная статья на канале
- [ ] Триггер: публикация статьи → статья на Дзен
- [ ] Настройка в админке: DZEN_TOKEN, DZEN_CHANNEL_ID

#### Общее:
- [ ] Кнопка "Опубликовать в соцсети" в админке
- [ ] Автопубликация при сохранении статьи (опционально)
- [ ] Статус публикации: опубликовано / ошибка
- [ ] Лог отправок

### 9. Остальное (НЕ ВЫПОЛНЕНО)
- [ ] Комментарии — замена заглушки на реальное хранилище
- [ ] Подписка — замена заглушки на реальную отправку
- [ ] SEO-мета для всех страниц
- [ ] Дублирование utility-функций — вынести в lib/utils
- [ ] Удалить lucide-react (не используется)
- [ ] Интегрировать черновики из articles-to-add/
- [ ] Настроить socialLinks (сейчас #)
- [ ] Удалить лишние лог-файлы из корня
- [ ] admin/gallery — реализовать или удалить

### 10. Деплой на Yandex Cloud (НЕ ВЫПОЛНЕНО)
- [ ] VM: Ubuntu + Node.js
- [ ] nginx reverse proxy
- [ ] SSL через Let's Encrypt
- [ ] Привязка домена театры-москвы.рф
- [ ] Настройка DNS в Yandex Cloud
- [ ] pm2 или systemd для автозапуска
- [ ] Мониторинг: Yandex.Cloud Logging + Monitoring

---

## Файлы инфраструктуры

- `src/app/robots.ts` — robots.txt для Yandex + AI ботов
- `src/app/sitemap.ts` — авто-генерация sitemap из articles.json
- `src/app/llms.txt/route.ts` — инструкция для AI-ботов
- `src/app/rss.xml/route.ts` — RSS-лента (20 последних статей)
- `src/components/seo/Schema.tsx` — Schema.org компоненты (Organization, Article, FAQ, Breadcrumb)
- `src/components/seo/YandexMetrika.tsx` — клиентский компонент Яндекс.Метрики
- `src/lib/publish/vk.ts` — API-интеграция VK для автопостинга
- `src/lib/publish/dzen.ts` — API-интеграция Дзен для автопостинга
- `src/app/api/publish/route.ts` — API-маршрут публикации в соцсети
- `.env.local` — переменные окружения (пароль, токены Яндекса, VK, Дзен)
- `TECH-SPEC.md` — этот файл

---

## Запланировано (не выполнено)

### 9. Остальное
- [ ] Комментарии — замена заглушки на реальное хранилище
- [ ] Подписка — замена заглушки на реальную отправку
- [ ] SEO-мета для всех страниц
- [ ] Дублирование utility-функций — вынести в lib/utils
- [ ] Удалить lucide-react (не используется)
- [ ] Интегрировать черновики из articles-to-add/
- [ ] Настроить socialLinks (сейчас #)
- [ ] Удалить лишние лог-файлы из корня
- [ ] admin/gallery — реализовать или удалить

### 10. Деплой на Yandex Cloud
- [ ] VM: Ubuntu + Node.js
- [ ] nginx reverse proxy
- [ ] SSL через Let's Encrypt
- [ ] Привязка домена театры-москвы.рф
- [ ] Настройка DNS в Yandex Cloud
- [ ] pm2 или systemd для автозапуска
- [ ] Мониторинг: Yandex.Cloud Logging + Monitoring

---

## Файлы инфраструктуры

- `src/app/robots.ts` — robots.txt для Yandex + AI ботов
- `src/app/sitemap.ts` — авто-генерация sitemap из articles.json
- `src/app/llms.txt/route.ts` — инструкция для AI-ботов
- `src/app/rss.xml/route.ts` — RSS-лента (20 последних статей)
- `src/components/seo/Schema.tsx` — Schema.org компоненты (Organization, Article, FAQ, Breadcrumb)
- `src/components/seo/YandexMetrika.tsx` — клиентский компонент Яндекс.Метрики
- `src/lib/publish/vk.ts` — API-интеграция VK для автопостинга
- `src/lib/publish/dzen.ts` — API-интеграция Дзен для автопостинга
- `src/app/api/publish/route.ts` — API-маршрут публикации в соцсети
- `.env.local` — переменные окружения (пароль, токены Яндекса, VK, Дзен)
- `TECH-SPEC.md` — этот файл
