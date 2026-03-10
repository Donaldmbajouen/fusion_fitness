// Site configuration with localStorage persistence for CMS

export interface HeroContent {
  title1: string;
  title2: string;
  subtitle: string;
  badgeText: string;
  stats: { value: string; label: string }[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  image: string;
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description?: string;
  features: string[];
  popular: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsappNumber: string;
}

export interface Subscription {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  amount: number;
  createdAt: string;
}

export interface SiteConfig {
  hero: HeroContent;
  services: ServiceItem[];
  coaches: Coach[];
  pricing: PricingPlan[];
  contact: ContactInfo;
  galleryImages: string[];
}

const defaultConfig: SiteConfig = {
  hero: {
    title1: "POWER",
    title2: "FITNESS CLUB",
    subtitle: "Une salle de sport d'élite où la technologie de pointe rencontre l'expertise des meilleurs coachs. Transformez-vous.",
    badgeText: "L'excellence du fitness",
    stats: [
      { value: "15+", label: "Années" },
      { value: "50+", label: "Coachs" },
      { value: "10K", label: "Membres" },
    ],
  },
  services: [
    { icon: "Dumbbell", title: "Musculation", description: "Équipements haut de gamme et coaching personnalisé", image: "https://images.unsplash.com/photo-1534368786749-b63e05c90863?w=600&q=80" },
    { icon: "Heart", title: "Cardio", description: "Zone cardio avec machines dernière génération", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80" },
    { icon: "Users", title: "Cours Collectifs", description: "Plus de 50 cours par semaine", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80" },
    { icon: "Zap", title: "Personal Training", description: "Coaching personnalisé avec nos experts", image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80" },
  ],
  coaches: [
    { id: "1", name: "AMADOU DIALLO", specialty: "MUSCULATION", bio: "Champion d'Afrique de bodybuilding, 15 ans d'expérience en coaching personnalisé.", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80" },
    { id: "2", name: "FATOU NDIAYE", specialty: "CROSSFIT & HIIT", bio: "Certifiée CrossFit Level 3, spécialiste en préparation physique.", image: "https://images.unsplash.com/photo-1609895048068-91eb3c5fcccc?w=400&q=80" },
    { id: "3", name: "MOUSSA KEITA", specialty: "BOXE & MMA", bio: "Ancien champion régional, formateur en arts martiaux mixtes.", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80" },
    { id: "4", name: "AWA TRAORE", specialty: "YOGA & PILATES", bio: "Professeur certifiée, experte en bien-être et récupération.", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80" },
  ],
  pricing: [
    {
      id: "basic",
      name: "ESSENTIEL",
      price: "10000",
      period: "/mois",
      description: "L'accès à l'essentiel pour commencer",
      features: ["Accès salle musculation", "Accès espace cardio", "Casier personnel", "1 bilan mensuel"],
      popular: false,
    },
    {
      id: "pro",
      name: "PREMIUM",
      price: "15000",
      period: "/mois",
      description: "L'expérience complète pour les passionnés",
      features: ["Tout ESSENTIEL inclus", "Cours collectifs illimités", "Accès spa & sauna", "2 sessions coaching", "Nutrition personnalisée", "Accès 24h/24"],
      popular: true,
    },
    {
      id: "elite",
      name: "ÉLITE",
      price: "25000",
      period: "/mois",
      description: "Le summum pour les athlètes exigeants",
      features: ["Tout PREMIUM inclus", "Personal training illimité", "Suivi médical complet", "Cryothérapie incluse", "Accès VIP lounge", "Conciergerie sportive"],
      popular: false,
    },
  ],
  contact: {
    address: "Yaoundé, Golf-Bastos (face station Neptune), Cameroun",
    phone: "+237 6 57 00 00 07 / +237 6 95 32 22 90",
    email: "contact@powerfitness.cm",
    whatsappNumber: "+237 6 57 00 00 07",
  },
  galleryImages: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80",
    "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&q=80",
  ],
};

// Helper to check expiring subscriptions (within 7 days)
export const getExpiringSubscriptions = (daysThreshold: number = 7): Subscription[] => {
  const subscriptions = getSubscriptions();
  const now = new Date();
  const thresholdDate = new Date(now.getTime() + daysThreshold * 24 * 60 * 60 * 1000);
  
  return subscriptions.filter(sub => {
    if (sub.status !== 'active') return false;
    const endDate = new Date(sub.endDate);
    return endDate <= thresholdDate && endDate >= now;
  });
};

const STORAGE_KEY = 'forge_gym_config';
const SUBSCRIPTIONS_KEY = 'forge_gym_subscriptions';

export const getSiteConfig = (): SiteConfig => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultConfig, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error loading site config:', e);
  }
  return defaultConfig;
};

export const saveSiteConfig = (config: Partial<SiteConfig>): void => {
  try {
    const current = getSiteConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving site config:', e);
  }
};

export const resetSiteConfig = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Subscriptions CRUD
export const getSubscriptions = (): Subscription[] => {
  try {
    const stored = localStorage.getItem(SUBSCRIPTIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading subscriptions:', e);
  }
  return [];
};

export const saveSubscription = (subscription: Omit<Subscription, 'id' | 'createdAt'>): Subscription => {
  const subscriptions = getSubscriptions();
  const newSubscription: Subscription = {
    ...subscription,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  subscriptions.push(newSubscription);
  localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
  return newSubscription;
};

export const updateSubscription = (id: string, updates: Partial<Subscription>): Subscription | null => {
  const subscriptions = getSubscriptions();
  const index = subscriptions.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  subscriptions[index] = { ...subscriptions[index], ...updates };
  localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
  return subscriptions[index];
};

export const deleteSubscription = (id: string): boolean => {
  const subscriptions = getSubscriptions();
  const filtered = subscriptions.filter(s => s.id !== id);
  if (filtered.length === subscriptions.length) return false;
  
  localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(filtered));
  return true;
};

export const getWhatsAppLink = (message: string = "Salut, Je viens de Power Fitness Club et je souhaite réserver une séance d'essai gratuite."): string => {
  const config = getSiteConfig();
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${config.contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
};
