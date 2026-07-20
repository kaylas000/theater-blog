import Link from "next/link";
import { getArticlesByCategory } from "@/lib/data/articles.data";
import { HeroArrow } from "@/components/HeroArrow";

const categoryClasses: Record<string, string> = {
  theater: "badge", concert: "badge--purple", festival: "badge--red", interview: "badge--green", events: "badge--red"
};
const gradClasses = ["grad-3","grad-1","grad-4","grad-5","grad-6","grad-7","grad-8","grad-2"];

const categoryNames: Record<string, string> = {
  theater: "Театр", concert: "Концерты", festival: "Фестивали", interview: "Интервью", events: "События"
};

const categoryDescriptions: Record<string, string> = {
  theater: "Обзоры спектаклей, репортажи из театральных залов и аналитика о событиях на сцене",
  concert: "Концертные отчёты, обзоры музыкальных событий и фестивалей",
  festival: "Обзоры культурных фестивалей, ярмарок и масштабных мероприятий",
  interview: "Интервью с деятелями искусства, режиссёрами и актёрами",
  events: "Репортажи с культурных событий и мероприятий",
};

const otherCategories = [
  { slug: "concert", emoji: "🎵", label: "Концерты" },
  { slug: "festival", emoji: "🎪", label: "Фестивали" },
  { slug: "events", emoji: "📅", label: "События" },
  { slug: "interview", emoji: "💬", label: "Интервью" },
];

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const articles = getArticlesByCategory(params.slug);
  const catName = categoryNames[params.slug];

  if (!catName) return <div>Категория не найдена</div>;

  return (
    <>
      <div className="catalog-header hero">
        <HeroArrow />
        <div className="container">
          <span className="badge" style={{ marginBottom: 16 }}>Категория</span>
          <h1 style={{ marginBottom: 20 }}>{catName}</h1>
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", maxWidth: 600 }}>
            {categoryDescriptions[params.slug] || ""}
          </p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="catalog-count">{articles.length} статей в категории «{catName}»</div>
          <div className="grid grid--3">
            {articles.map((article, i) => (
              <Link key={article.id} href={`/news/${article.slug}/`} className="post-card">
                <div className="post-card__image">
                  {article.coverImage ? (
                    <img src={article.coverImage} alt={article.title} />
                  ) : (
                    <div className={`post-card__placeholder ${gradClasses[i % 8]}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                  )}
                </div>
                <div className="post-card__body">
                  <div className="post-card__meta"><span>{article.dateText}</span><span>·</span><span>{article.readTime} мин</span></div>
                  <h3 className="post-card__title">{article.title}</h3>
                  <p className="post-card__excerpt">{article.excerpt}</p>
                  <div className="post-card__footer">
                    <div className="post-card__author"><div className="hero__avatar">{article.author.charAt(0)}</div><span>{article.author}</span></div>
                    <span className="post-card__read-more">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Другие разделы</span>
            <h2 className="section-title">Смотрите также</h2>
          </div>
          <div className="grid grid--4">
            {otherCategories
              .filter((c) => c.slug !== params.slug)
              .map((cat) => (
                <Link key={cat.slug} href={`/news/category/${cat.slug}/`} className="widget" style={{ textAlign: "center", transition: "var(--transition)", cursor: "pointer" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>{cat.emoji}</div>
                  <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>{cat.label}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
