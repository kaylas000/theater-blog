"use client";

import { useState } from "react";

export function SubscribeForm({ style }: { style?: React.CSSProperties }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setMessage(data.message || "Подписка оформлена!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Ошибка");
      }
    } catch {
      setStatus("error");
      setMessage("Ошибка сети");
    }
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      <input
        type="email"
        className="newsletter__input"
        placeholder="Ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn--primary" disabled={status === "loading"}>
        {status === "loading" ? "..." : status === "success" ? "✓ Готово!" : "Подписаться"}
      </button>
      {status === "error" && <p style={{ color: "var(--red)", fontSize: "0.8125rem" }}>{message}</p>}
    </form>
  );
}
