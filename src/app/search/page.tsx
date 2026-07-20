"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { HeroArrow } from "@/components/HeroArrow";
import articlesData from "@/lib/data/articles.json";

const categoryClasses: Record<string, string> = {
  theater: "badge", concert: "badge--purple", festival: "badge--red", interview: "badge--green", events: "badge--red"
};
const gradClasses = ["grad-3","grad-1","grad-4","grad-5","grad-6","grad-7","grad-8","grad-2"];

const CATEGORIES = [
  { value: "all", label: "Все" },
  { value: "theater", label: "Театр" },
  { value: "concert", label: "Концерты" },
  { value: "events", label: "События" },
  { value: "festival", label: "Фестивали" },
  { value: "interview", label: "Интервью" },
];

const allArticles = (articlesData as Article[]).filter((a) => a.isPublished);

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = allArticles;
    if (activeCategory !== "all") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [query, activeCategory]);

  return (
    <>
      <div className="search-page hero">
        <HeroArrow />
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span className="section-label">Поиск</span>
          </div>
          <h1 style={{ textAlign: "center", marginBottom: 32 }}>Найти статью</h1>
          <div className="search-box">
            <svg className="search-box__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="search-box__input"
              placeholder="Поиск по заголовкам и описаниям..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="catalog-filters" style={{ justifyContent: "center" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`filter-btn ${activeCategory === cat.value ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-results__count">
            {query ? `Найдено: ${filtered.length}` : "Введите запрос для поиска"}
          </div>

          <div className="grid grid--3">
            {filtered.map((article, i) => (
              <Link key={article.id} href={`/news/${article.slug}/`} className="post-card">
                <div className="post-card__image">
                  {article.coverImage ? (
                    <img src={article.coverImage} alt={article.title} />
                  ) : (
                    <div className={`post-card__placeholder ${gradClasses[i % 8]}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                  )}
                  <span className={`post-card__category ${categoryClasses[article.category] || "badge"} badge`}>{article.category}</span>
                </div>
                <div className="post-card__body">
                  <div className="post-card__meta"><span>{article.dateText}</span></div>
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
    </>
  );
}
