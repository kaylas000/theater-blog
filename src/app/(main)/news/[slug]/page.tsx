import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug, getPopularArticles, getRelatedArticles, getAllArticles } from "@/lib/data/articles.data";
import { TrackView } from "@/components/TrackView";
import { TableOfContents } from "@/components/seo/TableOfContents";
import { Comments } from "@/components/Comments";
import { HeroArrow } from "@/components/HeroArrow";
import { ArticleSchema } from "@/components/seo/Schema";

const categoryClasses: Record<string, string> = {
  theater: 'badge', concert: 'badge--purple', festival: 'badge--red', interview: 'badge--green', events: 'badge--red'
};

const gradClasses = ['grad-3','grad-1','grad-4','grad-5','grad-6','grad-7','grad-8','grad-2'];

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: `/news/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://театры-москвы.рф/news/${article.slug}/`,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.dateModified || article.date,
      authors: [article.author],
      images: article.coverImage ? [{ url: article.coverImage, width: 1200, height: 675 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return <div>Статья не найдена</div>;

  const popular = getPopularArticles(6);
  const related = getRelatedArticles(article.slug, 3);

  return (
    <>
      <ArticleSchema article={article} />
      <TrackView slug={article.slug} />

      {/* ===== POST HERO ===== */}
      <div className="post-hero hero">
        <HeroArrow />
        <div className="container">
          <div className="post-hero__meta">
            <Link href={`/news/?category=${article.category}`} className={`badge ${categoryClasses[article.category] || 'badge'}`}>{article.category}</Link>
            <span className="font-mono text-muted">{article.type}</span>
          </div>
          <h1 className="post-hero__title">{article.title}</h1>
          <p className="post-hero__excerpt">{article.excerpt}</p>
          <div className="post-hero__info">
            <div className="post-hero__author">
              <div className="post-hero__author-avatar">{article.author.charAt(0)}</div>
              <div>
                <div style={{fontWeight:600, color:'var(--text-primary)'}}>{article.author}</div>
              </div>
            </div>
            <div className="post-hero__divider" />
            <span className="font-mono">{article.dateText}</span>
            <div className="post-hero__divider" />
            <span className="font-mono">{article.readTime} мин чтения</span>
          </div>
        </div>
      </div>

      {/* ===== POST CONTENT ===== */}
      <section className="section">
        <div className="container">
          <div className="post-image">
            <div className="post-image__main">
              {article.coverImage ? (
                <img src={article.coverImage} alt={article.title} />
              ) : (
                <div className="post-image__placeholder grad-3" />
              )}
            </div>
          </div>

          <div className="post-layout">
            <article className="post-content">
              <TableOfContents content={article.content || ""} />

              {article.contentTitle && <h2>{article.contentTitle}</h2>}
              {article.content && <p>{article.content}</p>}

              {article.eventTitle && <h2>{article.eventTitle}</h2>}
              {article.eventText && <p>{article.eventText}</p>}

              {article.quote && (
                <blockquote>
                  {article.quote}
                  {article.quoteAuthor && <cite>— {article.quoteAuthor}</cite>}
                </blockquote>
              )}

              {article.visualTitle && <h2>{article.visualTitle}</h2>}
              {article.visualText1 && <p>{article.visualText1}</p>}

              <div className="image-gallery" id="image-gallery">
                {article.gallery.length > 0 ? (
                  article.gallery.map((img, i) => (
                    <div key={i} className="gallery-item" data-index={i}>
                      <img src={img} alt={`${article.title} — фото ${i + 1}`} />
                    </div>
                  ))
                ) : (
                  <>
                    <div className="gallery-item" data-index="0"><div className="grad-3" style={{width:'100%',height:'100%'}} /></div>
                    <div className="gallery-item" data-index="1"><div className="grad-1" style={{width:'100%',height:'100%'}} /></div>
                    <div className="gallery-item" data-index="2"><div className="grad-4" style={{width:'100%',height:'100%'}} /></div>
                  </>
                )}
              </div>

              {article.visualText2 && <p>{article.visualText2}</p>}

              {article.personsTitle && <h2>{article.personsTitle}</h2>}
              {article.personsText && <p>{article.personsText}</p>}

              {article.musicTitle && <h2>{article.musicTitle}</h2>}
              {article.musicText && <p>{article.musicText}</p>}

              {article.recommendTitle && <h2>{article.recommendTitle}</h2>}
              {article.recommendText && <p>{article.recommendText}</p>}

              {article.tags.length > 0 && (
                <div className="post-tags">
                  {article.tags.map((tag) => (
                    <Link key={tag} href={`/news/?category=${tag}`} className="tag">{tag}</Link>
                  ))}
                </div>
              )}

              <div className="post-nav">
                <Link href="/news/" className="post-nav__item">
                  <div className="post-nav__label">← На главную</div>
                  <div className="post-nav__title">Все статьи</div>
                </Link>
              </div>

              <Comments articleSlug={article.slug} />
            </article>

            <aside className="sidebar">
              <div className="widget">
                <h4 className="widget__title">Популярное</h4>
                <div className="widget__list">
                  {popular.map((a, i) => (
                    <div key={a.id} className="widget__item">
                      <span className="widget__item-number">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <Link href={`/news/${a.slug}/`} className="widget__item-title">{a.title}</Link>
                        <div className="widget__item-meta">{a.readTime} мин чтения</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {article.tags.length > 0 && (
                <div className="widget">
                  <h4 className="widget__title">Теги</h4>
                  <div className="widget__tags">
                    {article.tags.map((tag) => (
                      <Link key={tag} href={`/news/?category=${tag}`} className="tag">{tag}</Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="widget" style={{background:'linear-gradient(135deg,rgba(201,168,76,0.1),rgba(139,92,246,0.1))'}}>
                <h4 className="widget__title" style={{border:'none',padding:0,marginBottom:8}}>Подписка</h4>
                <p style={{fontSize:'0.875rem',color:'var(--text-muted)',marginBottom:16}}>Лучшие обзоры каждую неделю</p>
                <form style={{display:'flex',flexDirection:'column',gap:8}}>
                  <input type="email" className="form-input" placeholder="Ваш email" style={{fontSize:'0.875rem',padding:'10px 14px'}} />
                  <button type="submit" className="btn btn--primary btn--sm" style={{width:'100%'}}>Подписаться</button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <div className="lightbox" id="lightbox">
        <button className="lightbox__close" id="lightbox-close">&times;</button>
        <button className="lightbox__prev" id="lightbox-prev">&#10094;</button>
        <button className="lightbox__next" id="lightbox-next">&#10095;</button>
        <div className="lightbox__slides" id="lightbox-slides">
          {article.gallery.length > 0 ? (
            article.gallery.map((img, i) => (
              <div key={i} className="lightbox__slide"><img src={img} alt={`${article.title} — фото ${i + 1}`} style={{width:'100%',height:'100%',objectFit:'contain'}} /></div>
            ))
          ) : (
            <>
              <div className="lightbox__slide grad-3" />
              <div className="lightbox__slide grad-1" />
              <div className="lightbox__slide grad-4" />
            </>
          )}
        </div>
      </div>

      {/* ===== RELATED POSTS ===== */}
      {related.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="related-posts">
              <div className="section-header" style={{textAlign:'left'}}>
                <span className="section-label">Читайте также</span>
                <h2 className="section-title">Похожие статьи</h2>
              </div>
              <div className="grid grid--3">
                {related.map((a, i) => (
                  <Link key={a.id} href={`/news/${a.slug}/`} className={`post-card reveal delay-${i + 1}`}>
                    <div className="post-card__image">
                      {a.coverImage ? (
                        <img src={a.coverImage} alt={a.title} />
                      ) : (
                        <div className={`post-card__placeholder ${gradClasses[i % 8]}`}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                      )}
                      <span className={`post-card__category ${categoryClasses[a.category] || 'badge'} badge`}>{a.category}</span>
                    </div>
                    <div className="post-card__body">
                      <div className="post-card__meta"><span>{a.dateText}</span></div>
                      <h3 className="post-card__title">{a.title}</h3>
                      <div className="post-card__footer">
                        <div className="post-card__author">
                          <div className="hero__avatar">{a.author.charAt(0)}</div>
                          <span>{a.author}</span>
                        </div>
                        <span className="post-card__read-more">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
