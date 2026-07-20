"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Скрыть СРАЗУ
    el.style.visibility = "hidden";

    // Показать через足够 время для stacked scroll
    // (buildPhases + render + requestAnimationFrame)
    const timer = setTimeout(() => {
      el.style.visibility = "visible";
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <main ref={ref}>
      {children}
    </main>
  );
}
