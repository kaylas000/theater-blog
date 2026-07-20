import Link from "next/link";
import { getSiteConfig } from "@/lib/data/site-config-actions";
import { SocialHero } from "@/components/SocialHero";
import { HeroArrow } from "@/components/HeroArrow";
import { FAQSchema } from "@/components/seo/Schema";

export const metadata = { title: "О проекте — Театры Москвы" };

const faqItems = [
  { question: "Что такое «Театры Москвы»?", answer: "Независимый онлайн-журнал о театре, музыке и культурных событиях Москвы. Мы пишем честные обзоры, репортажи и интервью с деятелями искусства." },
  { question: "Кто пишет статьи?", answer: "Наша команда — профессиональные журналисты и критики с многолетним опытом: Елена Соколова (15 лет стажа), Дмитрий Волков (выпускник консерватории), Мария Козлова и Анна Петрова." },
  { question: "Как часто выходят статьи?", answer: "Мы публикуем обзоры, репортажи и интервью регулярно — несколько статей в неделю." },
  { question: "Можно ли сотрудничать с вами?", answer: "Да, мы открыты к сотрудничеству. Свяжитесь с нами через раздел «Контакты»." },
];

const gradClasses = ['grad-3','grad-4','grad-5','grad-8'];

export default function AboutPage() {
  const config = getSiteConfig();

  const hero = config?.heroes?.about;
  const heroBg = config?.hero;
  const heroStyle: React.CSSProperties = {};
  if (heroBg?.bgColor) heroStyle.backgroundColor = heroBg.bgColor;
  if (heroBg?.bgImage) {
    heroStyle.backgroundImage = `url(${heroBg.bgImage})`;
    heroStyle.backgroundSize = "cover";
    heroStyle.backgroundPosition = "center";
  }

  const accentColor = config?.logo?.accentColor || "var(--gold)";
  const about = config?.about;

  function renderTitle(title: string, accents: string[]) {
    if (!accents?.length) return <>{title}</>;
    const parts: React.ReactNode[] = [];
    let remaining = title;
    accents.forEach((word, i) => {
      const idx = remaining.toLowerCase().indexOf(word.toLowerCase());
      if (idx >= 0) {
        if (idx > 0) parts.push(<span key={`t${i}`}>{remaining.slice(0, idx)}</span>);
        parts.push(<em key={`a${i}`} style={{ color: accentColor, fontStyle: "normal" }}>{remaining.slice(idx, idx + word.length)}</em>);
        remaining = remaining.slice(idx + word.length);
      }
    });
    if (remaining) parts.push(<span key="rest">{remaining}</span>);
    return <>{parts}</>;
  }

  return (
    <>
      <FAQSchema items={faqItems} />
      <div className="about-hero hero" style={Object.keys(heroStyle).length ? heroStyle : undefined}>
        <HeroArrow />
        <div className="container">
          <span className="section-label">{hero?.badgeText || "О проекте"}</span>
          <h1 className="about-hero__title" style={{ marginTop: 16 }}>
            {renderTitle(hero?.title || "Мы пишем о том, что волнует", hero?.titleAccentWords || [])}
          </h1>
          <p className="about-hero__subtitle">{hero?.subtitle || ""}</p>
          <SocialHero initialConfig={config} />
        </div>
      </div>

      <section className="section" data-section="about-mission">
        <div className="container">
          <div className="about-mission">
            <div className="about-mission__image">
              <div className="about-mission__placeholder grad-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <circle cx="9" cy="10" r="1" fill="currentColor"/>
                  <circle cx="15" cy="10" r="1" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="about-mission__content">
              <span className="section-label">Миссия</span>
              <h2 style={{ marginTop: 12 }}>{about?.missionTitle || "Делаем театр ближе к людям"}</h2>
              {(about?.missionText || []).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" data-section="about-stats">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Цифры</span>
            <h2 className="section-title">Наш проект в цифрах</h2>
          </div>
          <div className="grid grid--4">
            {(about?.stats || []).map((stat) => (
              <div key={stat.label} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 700, color: "var(--gold)" }}>{stat.value}</div>
                <div style={{ color: "var(--text-muted)", marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-section="about-team">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Команда</span>
            <h2 className="section-title">{about?.teamTitle || "Кто стоит за проектом"}</h2>
            <p className="section-subtitle">{about?.teamSubtitle || ""}</p>
          </div>
          <div className="team-scroll-wrapper">
            <div className="team-grid">
              {(about?.team || []).map((member, i) => (
                <div key={member.name} className="team-card">
                  {member.photo ? (
                    <div className="team-card__avatar" style={{ overflow: "hidden" }}>
                      <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ) : (
                    <div className={`team-card__avatar ${member.grad || gradClasses[i % 4]}`}>{member.initials}</div>
                  )}
                  <h3 className="team-card__name">{member.name}</h3>
                  <div className="team-card__role">{member.role}</div>
                  <p className="team-card__bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" data-section="about-history">
        <div className="container">
          <div className="section-header">
            <span className="section-label">История</span>
            <h2 className="section-title">{about?.historyTitle || "Как всё начиналось"}</h2>
          </div>
          <div className="grid grid--3">
            {(about?.history || []).map((item) => (
              <div key={item.year} className="widget" style={{ border: "none" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--gold)", marginBottom: 12 }}>{item.year}</div>
                <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: "0.9375rem" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-section="about-cta">
        <div className="container">
          <div className="newsletter">
            <h2 className="newsletter__title">{about?.ctaTitle || "Присоединяйтесь к нам"}</h2>
            <p className="newsletter__text">{about?.ctaText || ""}</p>
            <Link href="/contacts" className="btn btn--primary btn--lg">{about?.ctaBtnText || "Связаться с нами"}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
