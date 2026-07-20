export interface HeroConfig {
  badgeText: string;
  title: string;
  titleAccentWords: string[];
  subtitle: string;
}

export interface SiteConfig {
  logo: {
    iconSvg: string;
    text: string;
    textFont: string;
    textColor: string;
    accentWord: string;
    accentColor: string;
  };
  hero: {
    bgColor: string;
    bgImage: string;
  };
  siteBg: {
    image: string;
    imageMobile: string;
    overlay: number;
  };
  heroes: {
    home: HeroConfig;
    about: HeroConfig;
    contacts: HeroConfig;
    news: HeroConfig;
  };
  homeStats: { value: string; label: string }[];
  featured: {
    sectionLabel: string;
    sectionTitle: string;
  };
  freshArticles: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
  };
  popular: {
    sectionLabel: string;
    sectionTitle: string;
  };
  newsletter: {
    title: string;
    text: string;
    btnColor: string;
  };
  footer: {
    brandText: string;
    brandDesc: string;
    bgImage: string;
    bgImageMobile: string;
  };
  sections: {
    bgImage: string;
    bgImageMobile: string;
    bgAltImage: string;
    bgAltImageMobile: string;
    borderColor: string;
  };
  sectionBgs: Record<string, string>;
  contacts: {
    iconColor: string;
    items: { label: string; value: string }[];
  };
  buttons: {
    primaryColor: string;
    primaryTextColor: string;
  };
  socialHero: {
    title: string;
    description: string;
  };
  socialLinks: {
    telegram: string;
    vk: string;
    dzen: string;
  };
  about: {
    missionTitle: string;
    missionText: string[];
    stats: { value: string; label: string }[];
    teamTitle: string;
    teamSubtitle: string;
    team: { initials: string; name: string; role: string; bio: string; grad: string; photo: string }[];
    historyTitle: string;
    history: { year: string; title: string; text: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaBtnText: string;
  };
  tickets: {
    heroTitle: string;
    heroSubtitle: string;
    items: { id: string; title: string; description: string; price: string; image: string; category: string }[];
  };
  homeVideo: {
    desktop: string;
    mobile: string;
  };
  freshVideo: {
    desktop: string;
    mobile: string;
  };
}
