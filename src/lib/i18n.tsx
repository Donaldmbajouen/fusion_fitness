import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "fr" | "en";

const translations = {
  // Navbar
  "nav.programs": { fr: "PROGRAMMES", en: "PROGRAMS" },
  "nav.schedule": { fr: "PLANNING", en: "SCHEDULE" },
  "nav.gallery": { fr: "GALERIE", en: "GALLERY" },
  "nav.pricing": { fr: "TARIFS", en: "PRICING" },
  "nav.contact": { fr: "CONTACT", en: "CONTACT" },
  "nav.join": { fr: "REJOINDRE", en: "JOIN US" },

  // Hero
  "hero.badge": { fr: "L'excellence du fitness", en: "Fitness excellence" },
  "hero.title1": { fr: "FORGEZ", en: "FORGE" },
  "hero.title2": { fr: "VOTRE CORPS", en: "YOUR BODY" },
  "hero.subtitle": {
    fr: "Une salle de sport d'élite où la technologie de pointe rencontre l'expertise des meilleurs coachs. Transformez-vous.",
    en: "An elite gym where cutting-edge technology meets the expertise of the best coaches. Transform yourself.",
  },
  "hero.cta": { fr: "COMMENCER MAINTENANT", en: "START NOW" },
  "hero.tour": { fr: "VOIR LA VISITE", en: "TAKE A TOUR" },
  "hero.scroll": { fr: "SCROLL", en: "SCROLL" },
  "hero.years": { fr: "Années", en: "Years" },
  "hero.coaches": { fr: "Coachs", en: "Coaches" },
  "hero.members": { fr: "Membres", en: "Members" },

  // Stats
  "stats.space": { fr: "D'ESPACE D'ENTRAÎNEMENT", en: "TRAINING SPACE" },
  "stats.equipment": { fr: "ÉQUIPEMENTS PREMIUM", en: "PREMIUM EQUIPMENT" },
  "stats.satisfaction": { fr: "TAUX DE SATISFACTION", en: "SATISFACTION RATE" },
  "stats.access": { fr: "ACCÈS ILLIMITÉ", en: "UNLIMITED ACCESS" },

  // Equipment
  "equipment.label": { fr: "ÉQUIPEMENTS", en: "EQUIPMENT" },
  "equipment.title1": { fr: "MATÉRIEL", en: "PROFESSIONAL" },
  "equipment.title2": { fr: "PROFESSIONNEL", en: "EQUIPMENT" },
  "equipment.desc": {
    fr: "Nous investissons dans les meilleures marques mondiales pour vous offrir une expérience d'entraînement incomparable.",
    en: "We invest in the world's best brands to offer you an unparalleled training experience.",
  },
  "equipment.machines": { fr: "MACHINES", en: "MACHINES" },
  "equipment.brands": { fr: "MARQUES", en: "BRANDS" },
  "equipment.premium": { fr: "PREMIUM", en: "PREMIUM" },

  // Services
  "services.label": { fr: "NOS SERVICES", en: "OUR SERVICES" },
  "services.title1": { fr: "TOUT CE DONT", en: "EVERYTHING" },
  "services.title2": { fr: "VOUS AVEZ BESOIN", en: "YOU NEED" },
  "services.desc": {
    fr: "Une offre complète pour atteindre tous vos objectifs, du débutant à l'athlète confirmé.",
    en: "A complete offering to reach all your goals, from beginner to advanced athlete.",
  },

  // Schedule
  "schedule.label": { fr: "PLANNING", en: "SCHEDULE" },
  "schedule.title1": { fr: "COURS", en: "GROUP" },
  "schedule.title2": { fr: "COLLECTIFS", en: "CLASSES" },
  "schedule.desc": {
    fr: "Plus de 50 cours par semaine pour tous les niveaux",
    en: "Over 50 classes per week for all levels",
  },
  "schedule.noclass": { fr: "Aucun cours programmé ce jour", en: "No classes scheduled for this day" },
  "schedule.full": { fr: "COMPLET", en: "FULL" },
  "schedule.book": { fr: "RÉSERVER VIA WHATSAPP", en: "BOOK VIA WHATSAPP" },
  "schedule.with": { fr: "avec", en: "with" },

  // Gallery
  "gallery.label": { fr: "GALERIE", en: "GALLERY" },
  "gallery.title1": { fr: "NOTRE", en: "OUR" },
  "gallery.title2": { fr: "ESPACE", en: "SPACE" },
  "gallery.desc": {
    fr: "Découvrez nos installations premium conçues pour votre transformation",
    en: "Discover our premium facilities designed for your transformation",
  },

  // Coaches
  "coaches.label": { fr: "NOTRE ÉQUIPE", en: "OUR TEAM" },
  "coaches.title1": { fr: "NOS", en: "OUR" },
  "coaches.title2": { fr: "COACHS", en: "COACHES" },
  "coaches.desc": {
    fr: "Des experts passionnés pour vous accompagner vers l'excellence.",
    en: "Passionate experts to guide you towards excellence.",
  },

  // Athletes
  "athletes.label": { fr: "COMMUNAUTÉ", en: "COMMUNITY" },
  "athletes.title1": { fr: "NOS", en: "OUR" },
  "athletes.title2": { fr: "ATHLÈTES", en: "ATHLETES" },
  "athletes.desc": {
    fr: "Rejoignez une communauté de passionnés qui repoussent leurs limites",
    en: "Join a community of enthusiasts who push their limits",
  },

  // Pricing
  "pricing.label": { fr: "TARIFS", en: "PRICING" },
  "pricing.title1": { fr: "INVESTISSEZ EN", en: "INVEST IN" },
  "pricing.title2": { fr: "VOUS", en: "YOURSELF" },
  "pricing.desc": {
    fr: "Des formules flexibles adaptées à vos objectifs et votre budget.",
    en: "Flexible plans adapted to your goals and budget.",
  },
  "pricing.popular": { fr: "POPULAIRE", en: "POPULAR" },
  "pricing.choose": { fr: "CHOISIR CE PLAN", en: "CHOOSE THIS PLAN" },
  "pricing.note": {
    fr: "Sans engagement • Résiliation à tout moment • Satisfait ou remboursé 30 jours",
    en: "No commitment • Cancel anytime • 30-day money-back guarantee",
  },

  // Testimonials
  "testimonials.label": { fr: "TÉMOIGNAGES", en: "TESTIMONIALS" },
  "testimonials.title1": { fr: "ILS ONT", en: "THEY" },
  "testimonials.title2": { fr: "TRANSFORMÉ", en: "TRANSFORMED" },
  "testimonials.add": { fr: "Laisser un avis", en: "Leave a review" },
  "testimonials.dialog.title": { fr: "Votre Avis", en: "Your Review" },
  "testimonials.dialog.desc": {
    fr: "Partagez votre expérience avec POWER FITNESS CLUB. Votre avis sera publié après modération.",
    en: "Share your experience with POWER FITNESS CLUB. Your review will be published after moderation.",
  },
  "testimonials.form.name": { fr: "Nom *", en: "Name *" },
  "testimonials.form.name.placeholder": { fr: "Votre nom", en: "Your name" },
  "testimonials.form.role": { fr: "Statut membre", en: "Member status" },
  "testimonials.form.role.placeholder": { fr: "Ex: Membre depuis 1 an", en: "E.g: Member for 1 year" },
  "testimonials.form.rating": { fr: "Note *", en: "Rating *" },
  "testimonials.form.content": { fr: "Votre avis *", en: "Your review *" },
  "testimonials.form.content.placeholder": { fr: "Partagez votre expérience...", en: "Share your experience..." },
  "testimonials.form.image": { fr: "Photo (URL optionnelle)", en: "Photo (optional URL)" },
  "testimonials.form.submitting": { fr: "Envoi en cours...", en: "Submitting..." },
  "testimonials.form.submit": { fr: "Soumettre mon avis", en: "Submit my review" },
  "testimonials.form.success": {
    fr: "Merci pour votre avis ! Il sera publié après validation.",
    en: "Thank you for your review! It will be published after validation.",
  },

  // CTA
  "cta.label": { fr: "COMMENCEZ MAINTENANT", en: "START NOW" },
  "cta.title1": { fr: "PRÊT À", en: "READY TO" },
  "cta.title2": { fr: "FORGER", en: "FORGE" },
  "cta.title3": { fr: "VOTRE LÉGENDE ?", en: "YOUR LEGACY?" },
  "cta.desc": {
    fr: "Réservez votre séance d'essai gratuite et découvrez l'expérience POWER FITNESS CLUB. Nos coachs vous attendent.",
    en: "Book your free trial session and discover the POWER FITNESS CLUB experience. Our coaches are waiting for you.",
  },
  "cta.email": { fr: "Votre email", en: "Your email" },
  "cta.button": { fr: "ESSAI GRATUIT", en: "FREE TRIAL" },
  "cta.address": { fr: "Adresse", en: "Address" },
  "cta.phone": { fr: "Téléphone", en: "Phone" },
  "cta.emailLabel": { fr: "Email", en: "Email" },

  // Contact
  "contact.label": { fr: "NOUS CONTACTER", en: "CONTACT US" },
  "contact.title1": { fr: "RESTONS EN", en: "STAY IN" },
  "contact.title2": { fr: "CONTACT", en: "TOUCH" },
  "contact.desc": {
    fr: "Une question ? Besoin d'informations ? Notre équipe est à votre disposition.",
    en: "Any questions? Need information? Our team is at your service.",
  },
  "contact.address": { fr: "ADRESSE", en: "ADDRESS" },
  "contact.phone": { fr: "TÉLÉPHONE", en: "PHONE" },
  "contact.mobile": { fr: "MOBILE", en: "MOBILE" },
  "contact.email": { fr: "EMAIL", en: "EMAIL" },
  "contact.messenger": { fr: "MESSENGER", en: "MESSENGER" },
  "contact.hours": { fr: "HORAIRES", en: "HOURS" },
  "contact.hours.value": {
    fr: "Lun-Ven: 6h-23h | Sam-Dim: 8h-20h",
    en: "Mon-Fri: 6am-11pm | Sat-Sun: 8am-8pm",
  },
  "contact.whatsapp": { fr: "NOUS ÉCRIRE SUR WHATSAPP", en: "MESSAGE US ON WHATSAPP" },
  "contact.mapHint": {
    fr: "Configurez votre clé API Google Maps pour activer la carte",
    en: "Configure your Google Maps API key to activate the map",
  },

  // Footer
  "footer.legal": { fr: "Mentions légales", en: "Legal notice" },
  "footer.privacy": { fr: "Politique de confidentialité", en: "Privacy policy" },
  "footer.terms": { fr: "CGV", en: "Terms" },
  "footer.faq": { fr: "FAQ", en: "FAQ" },
  "footer.rights": { fr: "TOUS DROITS RÉSERVÉS.", en: "ALL RIGHTS RESERVED." },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem("forge_lang");
    return (stored === "en" ? "en" : "fr") as Language;
  });

  const handleSetLang = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("forge_lang", newLang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[key]?.[lang] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);
