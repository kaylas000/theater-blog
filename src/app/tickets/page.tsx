import { getSiteConfig } from "@/lib/data/site-config-actions";
import { SocialHero } from "@/components/SocialHero";
import { HeroArrow } from "@/components/HeroArrow";

export const metadata = { title: "Билеты — Театры Москвы" };

const categoryLabels: Record<string, string> = { theater: "Театр", concert: "Концерт", festival: "Фестиваль", event: "Событие" };

export default function TicketsPage() {
  const config = getSiteConfig();

  const hero = config?.tickets;
  const heroBg = config?.hero;
  const heroStyle: React.CSSProperties = {};
  if (heroBg?.bgColor) heroStyle.backgroundColor = heroBg.bgColor;
  if (heroBg?.bgImage) {
    heroStyle.backgroundImage = `url(${heroBg.bgImage})`;
    heroStyle.backgroundSize = "cover";
    heroStyle.backgroundPosition = "center";
  }

  const items = hero?.items || [];

  return (
    <>
      {/* HERO */}
      <div className="catalog-header hero" style={Object.keys(heroStyle).length ? heroStyle : undefined}>
        <HeroArrow />
        <div className="container">
          <span className="section-label">Билеты</span>
          <h1 style={{ marginTop: 12, marginBottom: 20 }}>{hero?.heroTitle || "Билеты на мероприятия"}</h1>
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", maxWidth: 600 }}>
            {hero?.heroSubtitle || ""}
          </p>
          <SocialHero initialConfig={config} />
        </div>
      </div>

      {/* КАТАЛОГ БИЛЕТОВ */}
      <section className="section" data-section="tickets-events">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Расписание</span>
            <h2 className="section-title">Доступные мероприятия</h2>
          </div>
          <div className="grid grid--3">
            {items.map((item) => (
              <div key={item.id} className="ticket-card reveal">
                <div className="ticket-card__image">
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <div className="ticket-card__placeholder grad-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
                    </div>
                  )}
                  {item.category && (
                    <span className="ticket-card__category">{categoryLabels[item.category] || item.category}</span>
                  )}
                </div>
                <div className="ticket-card__body">
                  <h3 className="ticket-card__title">{item.title}</h3>
                  <p className="ticket-card__desc">{item.description}</p>
                  <div className="ticket-card__footer">
                    <span className="ticket-card__price">{item.price}</span>
                    <button className="btn btn--primary btn--sm ticket-card__btn">Купить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {items.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              Мероприятия скоро появятся
            </div>
          )}
        </div>
      </section>
    </>
  );
}
