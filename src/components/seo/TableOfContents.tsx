"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const article = document.querySelector(".post-content");
      if (!article) return;

      const headings = article.querySelectorAll("h2, h3");
      const tocItems: TocItem[] = [];

      headings.forEach((heading, i) => {
        const id = `heading-${i}`;
        heading.id = id;
        tocItems.push({
          id,
          text: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        });
      });

      setItems(tocItems);
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  if (items.length < 2) return null;

  return (
    <nav style={{ marginBottom: 32, padding: 20, background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)" }}>
      <h2 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Содержание</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: 6 }}>
            <a
              href={`#${item.id}`}
              style={{
                fontSize: item.level === 2 ? "0.9375rem" : "0.8125rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                paddingLeft: item.level === 3 ? 16 : 0,
                transition: "color 0.2s",
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
