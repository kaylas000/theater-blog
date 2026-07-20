import { getSiteConfig } from "@/lib/data/site-config-actions";
import { SocialHero } from "@/components/SocialHero";
import { HeroArrow } from "@/components/HeroArrow";
import { FAQSchema } from "@/components/seo/Schema";

export const metadata = { title: "Контакты — Театры Москвы" };

const faqItems = [
  { question: "Как связаться с редакцией?", answer: "Напишите на editor@theater-stage.ru или позвоните по телефону +7 (495) 123-45-67." },
  { question: "Принимаете ли вы материалы от внешних авторов?", answer: "Да, мы открыты к сотрудничеству. Отправьте примеры работ на нашу почту." },
  { question: "Где найти вас?", answer: "Москва, ул. Арбат, 10, стр. 2. Работаем Пн–Пт, 10:00–19:00." },
  { question: "Можно ли перепечатать статью?", answer: "При цитировании указывайте источник. Полная перепечатка возможна с нашего разрешения." },
];

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);
const VKIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.339-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
);
const DzenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>
);

const defaultContactItems = [
  { label: "Email", value: "editor@theater-stage.ru" },
  { label: "Телефон", value: "+7 (495) 123-45-67" },
  { label: "Адрес", value: "Москва, ул. Арбат, 10, стр. 2" },
  { label: "Часы работы", value: "Пн–Пт, 10:00–19:00" },
];

const contactIcons = [
  <svg key="email" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
  <svg key="phone" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  <svg key="location" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg key="clock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
];

export default function ContactsPage() {
  const config = getSiteConfig();

  const hero = config?.heroes?.contacts;
  const heroBg = config?.hero;
  const heroStyle: React.CSSProperties = {};
  if (heroBg?.bgColor) heroStyle.backgroundColor = heroBg.bgColor;
  if (heroBg?.bgImage) {
    heroStyle.backgroundImage = `url(${heroBg.bgImage})`;
    heroStyle.backgroundSize = "cover";
    heroStyle.backgroundPosition = "center";
  }

  const iconColor = config?.contacts?.iconColor || "var(--gold)";
  const accentColor = config?.logo?.accentColor || "var(--gold)";
  const items = config?.contacts?.items?.length ? config.contacts.items : defaultContactItems;
  const btnColor = config?.buttons?.primaryColor || "";
  const btnTextColor = config?.buttons?.primaryTextColor || "";
  const btnStyle: React.CSSProperties = {};
  if (btnColor) btnStyle.backgroundColor = btnColor;
  if (btnTextColor) btnStyle.color = btnTextColor;

  return (
    <>
      <FAQSchema items={faqItems} />
      <div className="catalog-header hero" style={Object.keys(heroStyle).length ? heroStyle : undefined}>
        <HeroArrow />
        <div className="container">
          <span className="section-label">{hero?.badgeText || "Контакты"}</span>
          <h1 style={{ marginTop: 12, marginBottom: 20 }}>{hero?.title || "Свяжитесь с нами"}</h1>
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", maxWidth: 600 }}>
            {hero?.subtitle || ""}
          </p>
          <SocialHero initialConfig={config} />
        </div>
      </div>

      <section className="section" data-section="contacts-data">
        <div className="container">
          <div className="contacts-grid" style={{ gap: 24 }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: 20 }}>Наша команда</h2>
              {items.map((item, i) => (
                <div key={item.label} className="contact-info__item" style={{ marginBottom: 16 }}>
                  <div className="contact-info__icon" style={{ color: iconColor }}>{contactIcons[i] || contactIcons[0]}</div>
                  <div>
                    <div className="contact-info__label">{item.label}</div>
                    <div className="contact-info__value">{item.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 12 }}>Мы в соцсетях</h3>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Telegram"><TelegramIcon /></a>
                  <a href="#" className="social-link" aria-label="VK"><VKIcon /></a>
                  <a href="#" className="social-link" aria-label="Дзен"><DzenIcon /></a>
                </div>
              </div>
            </div>

            <div>
              <div className="contact-form" style={{ padding: 24 }}>
                <h2 className="contact-form__title" style={{ marginBottom: 16 }}>Напишите нам</h2>
                <form>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Имя *</label>
                      <input type="text" name="name" className="form-input" placeholder="Ваше имя" required />
                    </div>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-input" placeholder="email@example.com" required />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 12 }}>
                    <label className="form-label">Тема</label>
                    <select className="form-input" name="subject" style={{ appearance: "auto" }}>
                      <option value="">Выберите тему</option>
                      <option value="collaboration">Сотрудничество</option>
                      <option value="advertising">Реклама</option>
                      <option value="content">Предложить статью</option>
                      <option value="feedback">Отзыв</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 12 }}>
                    <label className="form-label">Сообщение *</label>
                    <textarea className="form-textarea" name="message" placeholder="Расскажите, чем мы можем помочь..." required style={{ minHeight: 80 }} />
                  </div>
                  <button type="submit" className="btn btn--primary" style={{ width: "100%", ...btnStyle }}>Отправить сообщение</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header">
            <span className="section-label">Вопросы и ответы</span>
            <h2 className="section-title">Частые вопросы</h2>
          </div>
          {faqItems.map((item, i) => (
            <div key={i} style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>{item.question}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
