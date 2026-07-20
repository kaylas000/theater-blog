import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { GlobalFooter } from "@/components/GlobalFooter";
import { SiteEffects } from "@/components/SiteEffects";
import { PageTransition } from "@/components/PageTransition";
import { OrganizationSchema } from "@/components/seo/Schema";
import { YandexMetrika } from "@/components/seo/YandexMetrika";
import { getSiteConfig } from "@/lib/data/site-config-actions";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Театры Москвы — Блог о театре, концертах и культуре",
    template: "%s | Театры Москвы",
  },
  description: "Обзоры театральных представлений, концертных отчётов, репортажей с фестивалей и интервью с деятелями искусства Москвы.",
  keywords: ["театр", "Москва", "спектакли", "концерты", "фестивали", "культура", "искусство", "обзоры", "репортажи", "интервью"],
  authors: [{ name: "Театры Москвы" }],
  creator: "Театры Москвы",
  publisher: "Театры Москвы",
  metadataBase: new URL("https://театры-москвы.рф"),
  alternates: {
    canonical: "/",
  },
  other: {
    "yandex-verification": process.env.YANDEX_WEBMASTER_ID || "",
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
    "geo.position": "55.7558;37.6173",
    "ICBM": "55.7558, 37.6173",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Театры Москвы",
    title: "Театры Москвы — Блог о театре, концертах и культуре",
    description: "Обзоры театральных представлений, концертных отчётов, репортажей с фестивалей и интервью с деятелями искусства Москвы.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Театры Москвы",
    description: "Обзоры театральных представлений, концертных отчётов, репортажей с фестивалей и интервью.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteConfig();

  const siteBg = config?.siteBg;
  const sectionBg = config?.sections?.bgImage;
  const sectionBgMobile = config?.sections?.bgImageMobile;
  const sectionBgAlt = config?.sections?.bgAltImage;
  const sectionBgAltMobile = config?.sections?.bgAltImageMobile;
  const sectionBorderColor = config?.sections?.borderColor;
  const footerBg = config?.footer?.bgImage;
  const footerBgMobile = config?.footer?.bgImageMobile;
  const v = Date.now();

  function bgUrl(url: string) { return url.includes("?") ? `${url}&v=${v}` : `${url}?v=${v}`; }

  // Два ПОЛНОСТЬЮ НЕЗАВИСИМЫХ набора переменных: d-* (desktop) и m-* (mobile)
  const d: Record<string, string> = {};  // desktop
  const m: Record<string, string> = {};  // mobile

  d["--d-overlay"] = String(siteBg?.overlay ?? 0.5);
  m["--m-overlay"] = String(siteBg?.overlay ?? 0.5);

  if (siteBg?.image) d["--d-body-bg"] = `url(${bgUrl(siteBg.image)})`;
  if (siteBg?.imageMobile) m["--m-body-bg"] = `url(${bgUrl(siteBg.imageMobile)})`;

  if (sectionBg) d["--d-section-bg"] = `url(${bgUrl(sectionBg)})`;
  if (sectionBgMobile) m["--m-section-bg"] = `url(${bgUrl(sectionBgMobile)})`;
  if (sectionBorderColor) {
    d["--d-section-border"] = sectionBorderColor;
    m["--m-section-border"] = sectionBorderColor;
  }

  if (sectionBgAlt) d["--d-section-bg-alt"] = `url(${bgUrl(sectionBgAlt)})`;
  if (sectionBgAltMobile) m["--m-section-bg-alt"] = `url(${bgUrl(sectionBgAltMobile)})`;

  if (footerBg) d["--d-footer-bg"] = `url(${bgUrl(footerBg)})`;
  if (footerBgMobile) m["--m-footer-bg"] = `url(${bgUrl(footerBgMobile)})`;

  // Per-section overrides
  const sectionBgs = config?.sectionBgs || {};
  for (const [key, url] of Object.entries(sectionBgs)) {
    if (url) {
      if (key.endsWith("-mobile")) {
        m[`--m-section-bg-${key.replace("-mobile", "")}`] = `url(${bgUrl(url as string)})`;
      } else {
        d[`--d-section-bg-${key}`] = `url(${bgUrl(url as string)})`;
      }
    }
  }

  const dVars = Object.entries(d).map(([k, v]) => `  ${k}: ${v};`).join("\n");
  const mVars = Object.entries(m).map(([k, v]) => `  ${k}: ${v};`).join("\n");

  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {/* Desktop переменные — только для >768px */}
        <style dangerouslySetInnerHTML={{ __html: `@media (min-width: 768px) {\n:root {\n${dVars}\n}\n}` }} />
        {/* Mobile переменные — только для <768px */}
        <style dangerouslySetInnerHTML={{ __html: `@media (max-width: 767px) {\n:root {\n${mVars}\n}\n}` }} />
        <style>{`
          html::-webkit-scrollbar, body::-webkit-scrollbar, .stacked-inner::-webkit-scrollbar { display: none !important; }
          html, body, .stacked-inner { scrollbar-width: none; }
        `}</style>
        <style id="init-hide">{`
          .section, .section--alt { opacity: 0 !important; }
        `}</style>
        <script dangerouslySetInnerHTML={{ __html: `
          setTimeout(function() {
            var s = document.getElementById('init-hide');
            if (s) s.remove();
          }, 1500);
        `}} />
      </head>
      <body>
        <OrganizationSchema />
        <YandexMetrika counterId={process.env.YANDEX_METRIKA_ID} />
        <SiteEffects />
        <Header initialConfig={config} />
        <PageTransition>{children}</PageTransition>
        <GlobalFooter initialConfig={config} />
      </body>
    </html>
  );
}
