"use client";

import { useState, useEffect } from "react";
import type { SiteConfig } from "@/lib/types/site-config";

export function SocialBlock({ initialConfig }: { initialConfig?: SiteConfig | null }) {
  const [config, setConfig] = useState<SiteConfig | null>(initialConfig ?? null);

  useEffect(() => {
    const load = () => fetch("/api/site-config?t=" + Date.now()).then(r => r.json()).then(setConfig).catch(() => {});
    window.addEventListener("site-config-updated", load);
    return () => window.removeEventListener("site-config-updated", load);
  }, []);

  const accentColor = config?.logo?.accentColor || "var(--gold)";

  const socials = [
    { label: "Telegram", href: "#", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
    { label: "VK", href: "#", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.339-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg> },
    { label: "Дзен", href: "#", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg> },
  ];

  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: 24 }}>
        Подписывайтесь на наши страницы в социальных сетях
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16 }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `2px solid ${accentColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: accentColor,
              transition: "all 0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "var(--bg-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accentColor; }}
          >
            {s.icon}
          </a>
        ))}
      </div>
      <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
        Будьте в курсе лучших обзоров и анонсов мероприятий
      </p>
    </div>
  );
}
