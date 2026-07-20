import Link from "next/link";
import { Article } from "@/lib/types";

const categoryClasses: Record<string, string> = {
  theater: 'badge', concert: 'badge--purple', festival: 'badge--red', interview: 'badge--green', events: 'badge--red'
};

const gradClasses = ['grad-3','grad-1','grad-4','grad-5','grad-6','grad-7','grad-8','grad-2'];

export function LatestNews({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="grid grid--3">
      {articles.map((article, i) => (
        <Link key={article.id} href={`/news/${article.slug}`} className={`post-card reveal delay-${(i % 3) + 1}`} data-nav data-category={article.category}>
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
  );
}
