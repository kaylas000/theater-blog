"use client";

import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import type { SiteConfig } from "@/lib/types/site-config";

export function GlobalFooter({ initialConfig }: { initialConfig?: SiteConfig | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const onPageReady = () => setVisible(true);
    window.addEventListener("page-ready", onPageReady);
    const fallback = setTimeout(() => setVisible(true), 300);
    return () => {
      window.removeEventListener("page-ready", onPageReady);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div style={{ visibility: visible ? "visible" : "hidden" }}>
      <Footer initialConfig={initialConfig} />
    </div>
  );
}
