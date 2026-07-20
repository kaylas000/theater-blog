"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  articleSlug: string;
  name: string;
  text: string;
  date: string;
}

export function Comments({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/api/comments?slug=${articleSlug}`)
      .then((r) => r.json())
      .then((data) => { setComments(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [articleSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: articleSlug, name, text }),
      });
      const comment = await res.json();
      setComments((prev) => [...prev, comment]);
      setText("");
    } catch {}
    setSubmitting(false);
  }

  return (
    <div className="comments">
      <div className="comments__header">
        <h3 className="comments__count">{comments.length} комментариев</h3>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-muted)", padding: 16 }}>Загрузка...</p>
      ) : comments.length === 0 ? (
        <p style={{ color: "var(--text-muted)", padding: 16 }}>Пока нет комментариев. Будьте первым!</p>
      ) : (
        <div className="comments__list">
          {comments.map((c) => (
            <div key={c.id} className="comment" style={{ padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
              <div className="comment__header" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div className="comment__avatar" style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 600 }}>
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <span className="comment__name" style={{ fontWeight: 600 }}>{c.name}</span>
                <span className="comment__date" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {new Date(c.date).toLocaleDateString("ru", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <p className="comment__text" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="comment-form" style={{ marginTop: 24 }}>
        <h4 className="comment-form__title" style={{ marginBottom: 16 }}>Оставить комментарий</h4>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Имя</label>
              <input type="text" className="form-input" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Комментарий</label>
            <textarea className="form-textarea" placeholder="Ваш комментарий..." required value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}
