import Link from "next/link";
import { getAllArticles } from "@/lib/data/articles.data";
import { getSiteConfig } from "@/lib/data/site-config-actions";
import { SocialHero } from "@/components/SocialHero";
import { HeroArrow } from "@/components/HeroArrow";

const categoryClasses: Record<string, string> = {
  theater: 'badge', concert: 'badge--purple', festival: 'badge--red', interview: 'badge--green', events: 'badge--red'
};

const gradClasses = ['grad-3','grad-1','grad-4','grad-5','grad-6','grad-7','grad-8','grad-2'];

export default function NewsPage() {
  const allArticles = getAllArticles();
  const config = getSiteConfig();

  const hero = config?.heroes?.news;
  const heroBg = config?.hero;
  const heroStyle: React.CSSProperties = {};
  if (heroBg?.bgColor) heroStyle.backgroundColor = heroBg.bgColor;
  if (heroBg?.bgImage) {
    heroStyle.backgroundImage = `url(${heroBg.bgImage})`;
    heroStyle.backgroundSize = "cover";
    heroStyle.backgroundPosition = "center";
  }

  return (
    <>
      <div className="catalog-header hero" style={Object.keys(heroStyle).length ? heroStyle : undefined}>
        <HeroArrow />
        <div className="container">
          <span className="section-label">{hero?.badgeText || "Каталог"}</span>
          <h1 style={{marginTop:12,marginBottom:20}}>{hero?.title || "Все статьи"}</h1>
          <p style={{fontSize:'1.125rem',color:'var(--text-secondary)',maxWidth:'600px'}}>{hero?.subtitle || ""}</p>
          <SocialHero initialConfig={config} />
        </div>
      </div>

      <section className="section" data-section="news-articles">
        <div className="container">
          <div className="catalog-filters reveal">
            <button className="filter-btn active" data-filter="all">Все</button>
            <button className="filter-btn" data-filter="theater">Театр</button>
            <button className="filter-btn" data-filter="concert">Концерты</button>
            <button className="filter-btn" data-filter="events">События</button>
            <button className="filter-btn" data-filter="festival">Фестивали</button>
            <button className="filter-btn" data-filter="interview">Интервью</button>
          </div>
          <div className="catalog-filters-hint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div className="catalog-count reveal">{allArticles.length} статей</div>
          <div className="grid grid--3">
            {allArticles.map((article, i) => (
              <Link key={article.id} href={`/news/${article.slug}/`} className={`post-card reveal delay-${(i % 3) + 1}`} data-category={article.category} data-title={article.title}>
                <div className="post-card__image">
                  {article.coverImage ? (
                    <img src={article.coverImage} alt={article.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  ) : (
                    <div className={`post-card__placeholder ${gradClasses[i % 8]}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                  )}
                  <span className={`post-card__category ${categoryClasses[article.category] || 'badge'} badge`}>{article.category}</span>
                </div>
                <div className="post-card__body">
                  <div className="post-card__meta">
                    <span>{article.dateText}</span>
                    <span>·</span>
                    <span>{article.readTime} мин</span>
                  </div>
                  <h3 className="post-card__title">{article.title}</h3>
                  <p className="post-card__excerpt">{article.excerpt}</p>
                  <div className="post-card__footer">
                    <div className="post-card__author">
                      <div className="hero__avatar">{article.author.charAt(0)}</div>
                      <span>{article.author}</span>
                    </div>
                    <span className="post-card__read-more">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" data-section="news-newsletter">
        <div className="container">
          <div className="newsletter reveal">
            <h2 className="newsletter__title">{config?.newsletter?.title || "Не пропустите новое"}</h2>
            <p className="newsletter__text">{config?.newsletter?.text || "Подпишитесь и получайте обзоры каждую неделю"}</p>
            <form className="newsletter__form">
              <input type="email" className="newsletter__input" placeholder="Ваш email" required />
              <button type="submit" className="btn btn--primary">Подписаться</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
