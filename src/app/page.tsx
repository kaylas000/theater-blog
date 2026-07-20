import Link from "next/link";
import { getFeaturedArticle, getLatestArticles, getPopularArticles } from "@/lib/data/articles.data";
import { getSiteConfig } from "@/lib/data/site-config-actions";
import { LatestNews } from "@/components/home/LatestNews";
import { PopularNews } from "@/components/home/PopularNews";
import { HeroArrow } from "@/components/HeroArrow";

export default function HomePage() {
  const featured = getFeaturedArticle();
  const freshArticles = getLatestArticles(6);
  const popularArticles = getPopularArticles(3);
  const config = getSiteConfig();

  const hero = config?.heroes?.home;
  const heroBg = config?.hero;
  const heroStyle: React.CSSProperties = {};
  if (heroBg?.bgColor) heroStyle.backgroundColor = heroBg.bgColor;
  if (heroBg?.bgImage) {
    heroStyle.backgroundImage = `url(${heroBg.bgImage})`;
    heroStyle.backgroundSize = "cover";
    heroStyle.backgroundPosition = "center";
  }

  const accentColor = config?.logo?.accentColor || "var(--gold)";
  const btnColor = config?.buttons?.primaryColor || "";
  const btnTextColor = config?.buttons?.primaryTextColor || "";
  const btnStyle: React.CSSProperties = {};
  if (btnColor) btnStyle.backgroundColor = btnColor;
  if (btnTextColor) btnStyle.color = btnTextColor;

  const nlBtnStyle: React.CSSProperties = {};
  if (config?.newsletter?.btnColor) nlBtnStyle.backgroundColor = config.newsletter.btnColor;

  function renderTitle(title: string, accents: string[]) {
    if (!accents?.length) return <>{title}</>;
    const parts: React.ReactNode[] = [];
    let remaining = title;
    accents.forEach((word, i) => {
      const idx = remaining.toLowerCase().indexOf(word.toLowerCase());
      if (idx >= 0) {
        if (idx > 0) parts.push(<span key={`t${i}`}>{remaining.slice(0, idx)}</span>);
        parts.push(<em key={`a${i}`} style={{ color: accentColor, fontStyle: "normal" }}>{remaining.slice(idx, idx + word.length)}</em>);
        remaining = remaining.slice(idx + word.length);
      }
    });
    if (remaining) parts.push(<span key="rest">{remaining}</span>);
    return <>{parts}</>;
  }

  return (
    <>
      <section className="hero" style={Object.keys(heroStyle).length ? heroStyle : undefined}>
        <HeroArrow />
        <div className="container hero__content">
          <span className="badge hero__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/></svg>
            {hero?.badgeText || "Онлайн-журнал о культуре"}
          </span>
          <h1 className="hero__title">{renderTitle(hero?.title || "Мир театра, музыки и сцены", hero?.titleAccentWords || [])}</h1>
          <p className="hero__subtitle">{hero?.subtitle || ""}</p>
          <div className="hero__buttons">
            <Link href="/news" className="btn btn--primary btn--lg" data-nav style={Object.keys(btnStyle).length ? btnStyle : undefined}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Все статьи
            </Link>
            <Link href="/about" className="btn btn--outline btn--lg" data-nav>О проекте</Link>
          </div>
          {config?.homeStats && config.homeStats.length > 0 && (
            <div className="hero__meta">
              {config.homeStats.map((s, i) => (
                <div key={i} className="hero__meta-item"><div className="hero__meta-value">{s.value}</div><div className="hero__meta-label">{s.label}</div></div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section home-video-section" data-section="home-video">
        {config?.homeVideo?.desktop && (
          <video
            className="home-video-desktop"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={config.homeVideo.desktop} type="video/mp4" />
          </video>
        )}
        {config?.homeVideo?.mobile && (
          <video
            className="home-video-mobile"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={config.homeVideo.mobile} type="video/mp4" />
          </video>
        )}
      </section>

      {featured && (
        <section className="section" data-section="home-featured">
          <div className="container">
            <Link href={`/news/${featured.slug}`} className="hero__featured reveal" style={{textDecoration:'none',color:'inherit'}}>
              <div className="hero__featured-image">
                {featured.coverImage ? (
                  <img src={featured.coverImage} alt={featured.title} />
                ) : (
                  <div className="hero__featured-placeholder grad-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>
                  </div>
                )}
              </div>
              <div>
                <div className="hero__featured-meta">
                  <span className="badge">{featured.category}</span>
                  <span className="font-mono text-muted">{featured.dateText}</span>
                </div>
                <h2 className="hero__featured-title">{featured.title}</h2>
                <p className="hero__featured-excerpt">{featured.excerpt}</p>
                <div className="hero__featured-footer">
                  <div className="hero__featured-author">
                    <div className="hero__avatar">{featured.author.charAt(0)}</div>
                    <span>{featured.author}</span>
                  </div>
                  <span>{featured.readTime} мин чтения</span>
                  <span className="post-card__read-more">Читать далее →</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="section section--alt" data-section="home-fresh">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">{config?.freshArticles?.sectionLabel || "Последние публикации"}</span>
            <h2 className="section-title">{config?.freshArticles?.sectionTitle || "Свежие статьи"}</h2>
            <p className="section-subtitle">{config?.freshArticles?.sectionSubtitle || ""}</p>
          </div>
          <LatestNews articles={freshArticles} />
          <div style={{textAlign:'center',marginTop:40}} className="reveal">
            <Link href="/news" className="btn btn--outline" data-nav>Все статьи →</Link>
          </div>
        </div>
      </section>

      {popularArticles.length > 0 && (
        <section className="section" data-section="home-popular">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-label">{config?.popular?.sectionLabel || "Популярное"}</span>
              <h2 className="section-title">{config?.popular?.sectionTitle || "Читают чаще всего"}</h2>
            </div>
            <PopularNews articles={popularArticles} />
          </div>
        </section>
      )}

      <section className="section section--alt" data-section="home-newsletter">
        <div className="container">
          <div className="newsletter reveal">
            <h2 className="newsletter__title">{config?.newsletter?.title || "Подпишитесь на рассылку"}</h2>
            <p className="newsletter__text">{config?.newsletter?.text || ""}</p>
            <form className="newsletter__form">
              <input type="email" className="newsletter__input" placeholder="Ваш email" required />
              <button type="submit" className="btn btn--primary" style={Object.keys(nlBtnStyle).length ? nlBtnStyle : undefined}>Подписаться</button>
            </form>
            {config?.socialLinks && (
              <div className="newsletter__social">
                <span className="newsletter__social-label">{config.socialHero?.title || "Подписывайтесь на нас в соцсетях"}</span>
                {config.socialHero?.description && (
                  <div className="newsletter__social-desc">
                    {config.socialHero.description.split("\n").map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
                <div className="newsletter__social-links">
                  {config.socialLinks.telegram && (
                    <a href={config.socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="newsletter__social-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                  )}
                  {config.socialLinks.vk && (
                    <a href={config.socialLinks.vk} target="_blank" rel="noopener noreferrer" aria-label="VK" className="newsletter__social-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.339-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
                    </a>
                  )}
                  {config.socialLinks.dzen && (
                    <a href={config.socialLinks.dzen} target="_blank" rel="noopener noreferrer" aria-label="Дзен" className="newsletter__social-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
