"use client";

import { useEffect } from "react";

export function YandexMetrika({ counterId }: { counterId?: string }) {
  useEffect(() => {
    if (!counterId) return;

    const w = window as any;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(script);

    script.onload = () => {
      w.ym(Number(counterId), "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    };
  }, [counterId]);

  if (!counterId) return null;

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${counterId}`}
          style={{ position: "absolute", left: -9999 }}
          alt=""
        />
      </div>
    </noscript>
  );
}
