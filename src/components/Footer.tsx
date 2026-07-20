"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { SiteConfig } from "@/lib/types/site-config";

export function Footer({ initialConfig }: { initialConfig?: SiteConfig | null }) {
  const [config, setConfig] = useState<SiteConfig | null>(initialConfig ?? null);

  useEffect(() => {
    const load = () => fetch("/api/site-config?t=" + Date.now()).then(r => r.json()).then(setConfig).catch(() => {});
    window.addEventListener("site-config-updated", load);
    return () => window.removeEventListener("site-config-updated", load);
  }, []);

  const logo = config?.logo;
  const accentColor = logo?.accentColor || "var(--gold)";
  const textColor = logo?.textColor || "var(--text-primary)";
  const textFont = logo?.textFont || undefined;
  const logoText = logo?.text || "Театр и Сцена";
  const accentWord = logo?.accentWord || "и";
  const brandDesc = config?.footer?.brandDesc || "Независимый онлайн-журнал о театре, музыке и культурных событиях. Пишем для тех, кому искусство близко.";
  const contacts = config?.contacts?.items || [];
  const iconColor = config?.contacts?.iconColor || "var(--gold)";
  const socialLinks = config?.socialLinks;

  function renderLogoText() {
    if (logoText.includes(accentWord)) {
      return logoText.split(accentWord).map((part: string, i: number, arr: string[]) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && <span style={{ color: accentColor }}>{accentWord}</span>}
        </span>
      ));
    }
    const words = logoText.split(" ");
    return words.map((word: string, i: number) => (
      <span key={i}>
        {i > 0 && <span style={{ color: accentColor }}> {accentWord} </span>}
        {word}
      </span>
    ));
  }

  const contactIcons: Record<string, JSX.Element> = {
    Email: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
    Телефон: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    Адрес: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    "Часы работы": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  };

  return (
    <footer className="footer" id="global-footer">
      {/* Десктопный футер — 5 колонок */}
      <div className="container footer__desktop">
        <div className="footer__grid" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.2fr" }}>
          <div className="footer__brand">
            <Link href="/" className="logo" data-nav style={{ color: textColor, fontFamily: textFont }}>
              {logo?.iconSvg && (
                <span dangerouslySetInnerHTML={{ __html: logo.iconSvg }} style={{ width: 32, height: 32, color: accentColor, display: "inline-flex" }} />
              )}
              {renderLogoText()}
            </Link>
            <p>{brandDesc}</p>
          </div>
          <div className="footer__col">
            <h4>Разделы</h4>
            <Link href="/news" data-nav>Все статьи</Link>
            <Link href="/news/category/theater" data-nav>Театр</Link>
            <Link href="/news/category/concert" data-nav>Концерты</Link>
            <Link href="/news/category/festival" data-nav>Фестивали</Link>
            <Link href="/news/category/interview" data-nav>Интервью</Link>
          </div>
          <div className="footer__col">
            <h4>Проект</h4>
            <Link href="/about" data-nav>О нас</Link>
            <Link href="/tickets" data-nav>Билеты</Link>
            <Link href="/contacts" data-nav>Контакты</Link>
            <Link href="/search" data-nav>Поиск</Link>
            <Link href="#" data-nav>Авторам</Link>
            <Link href="#" data-nav>Реклама</Link>
          </div>
          <div className="footer__col">
            <h4>Контакты</h4>
            {contacts.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: "0.875rem" }}>
                <span style={{ color: iconColor, flexShrink: 0 }}>{contactIcons[item.label] || contactIcons["Email"]}</span>
                <span style={{ color: "var(--text-secondary)" }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="footer__col">
            <h4>Подписка</h4>
            <p className="footer__newsletter-text">Свежие обзоры каждую неделю</p>
            <form className="newsletter__form" style={{maxWidth:'100%'}}>
              <input type="email" className="newsletter__input" placeholder="Email" style={{flex:1}} />
              <button type="submit" className="btn btn--primary btn--sm">→</button>
            </form>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© <span id="current-year">2026</span> {logoText}. Все права защищены.</span>
          <div className="footer__social">
            <a href={socialLinks?.telegram || "#"} className="social-link" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
            <a href={socialLinks?.vk || "#"} className="social-link" aria-label="VK" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.339-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
            </a>
            <a href={socialLinks?.dzen || "#"} className="social-link" aria-label="Дзен" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Мобильный футер */}
      <div className="container footer__mobile">
        <div className="footer__brand">
          <Link href="/" className="logo" data-nav style={{ color: textColor, fontFamily: textFont }}>
            {logo?.iconSvg && (
              <span dangerouslySetInnerHTML={{ __html: logo.iconSvg }} style={{ width: 32, height: 32, color: accentColor, display: "inline-flex" }} />
            )}
            {renderLogoText()}
          </Link>
          <p>{brandDesc}</p>
        </div>
        <div className="footer__col">
          <h4>Разделы</h4>
          <Link href="/news" data-nav>Все статьи</Link>
          <Link href="/news/category/theater" data-nav>Театр</Link>
          <Link href="/news/category/concert" data-nav>Концерты</Link>
          <Link href="/news/category/festival" data-nav>Фестивали</Link>
          <Link href="/news/category/interview" data-nav>Интервью</Link>
        </div>
        <div className="footer__col">
          <h4>Проект</h4>
          <Link href="/about" data-nav>О нас</Link>
          <Link href="/contacts" data-nav>Контакты</Link>
          <Link href="/search" data-nav>Поиск</Link>
        </div>
        <div className="footer__col">
          <h4>Контакты</h4>
          {contacts.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: "0.875rem" }}>
              <span style={{ color: iconColor, flexShrink: 0 }}>{contactIcons[item.label] || contactIcons["Email"]}</span>
              <span style={{ color: "var(--text-secondary)" }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="footer__col">
          <h4>Подписка</h4>
          <p className="footer__newsletter-text">Свежие обзоры каждую неделю</p>
          <form className="newsletter__form" style={{ maxWidth: "100%" }}>
            <input type="email" className="newsletter__input" placeholder="Email" style={{ flex: 1 }} />
            <button type="submit" className="btn btn--primary btn--sm">→</button>
          </form>
        </div>
        <div className="footer__bottom">
          <span>© <span>2026</span> {logoText}. Все права защищены.</span>
          <div className="footer__social">
            {socialLinks?.telegram && (
              <a href={socialLinks.telegram} className="social-link" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            )}
            {socialLinks?.vk && (
              <a href={socialLinks.vk} className="social-link" aria-label="VK" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.339-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
              </a>
            )}
            {socialLinks?.dzen && (
              <a href={socialLinks.dzen} className="social-link" aria-label="Дзен" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
