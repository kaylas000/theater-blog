"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { SiteConfig } from "@/lib/types/site-config";

const navLinks = [
  { href: "/", label: "Главная", page: "home" },
  { href: "/news", label: "Каталог", page: "catalog" },
  { href: "/tickets", label: "Билеты", page: "tickets" },
  { href: "/about", label: "О проекте", page: "about" },
  { href: "/contacts", label: "Контакты", page: "contacts" },
];

export function Header({ initialConfig }: { initialConfig?: SiteConfig | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [config, setConfig] = useState<SiteConfig | null>(initialConfig ?? null);

  useEffect(() => {
    const load = () => fetch("/api/site-config?t=" + Date.now()).then(r => r.json()).then(setConfig).catch(() => {});
    window.addEventListener("site-config-updated", load);
    return () => window.removeEventListener("site-config-updated", load);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const logo = config?.logo;
  const accentColor = logo?.accentColor || "var(--gold)";
  const textColor = logo?.textColor || "var(--text-primary)";
  const textFont = logo?.textFont || undefined;
  const logoText = logo?.text || "Театр и Сцена";
  const accentWord = logo?.accentWord || "и";

  function renderLogoText() {
    if (logoText.includes(accentWord)) {
      return logoText.split(accentWord).map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && <span style={{ color: accentColor }}>{accentWord}</span>}
        </span>
      ));
    }
    const words = logoText.split(" ");
    return words.map((word, i) => (
      <span key={i}>
        {i > 0 && <span style={{ color: accentColor }}> {accentWord} </span>}
        {word}
      </span>
    ));
  }

  return (
    <header className="header" id="header">
      <div className="container header__inner">
        <Link href="/" className="logo" data-nav style={{ color: textColor, fontFamily: textFont }}>
          {logo?.iconSvg && (
            <span dangerouslySetInnerHTML={{ __html: logo.iconSvg }} style={{ width: 32, height: 32, color: accentColor, display: "inline-flex" }} />
          )}
          {renderLogoText()}
        </Link>
        <nav className={`nav${menuOpen ? " active" : ""}`} id="nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(link.href) ? " active" : ""}`}
              data-nav
              data-page={link.page}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <Link href="/search" className="search-toggle" aria-label="Поиск" data-nav>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </Link>
          <Link href="/news" className="btn btn--primary btn--sm" data-nav>Читать</Link>
        </div>
        <button className="burger" id="burger" aria-label="Меню" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
