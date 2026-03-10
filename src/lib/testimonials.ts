// Testimonials management with localStorage persistence

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

const TESTIMONIALS_KEY = 'forge_gym_testimonials';

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "AMADOU K.",
    role: "Membre depuis 2 ans",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content: "La qualité des équipements et le professionnalisme des coachs sont exceptionnels. J'ai transformé mon corps en 6 mois.",
    rating: 5,
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "FATOU D.",
    role: "Membre depuis 1 an",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80",
    content: "Les cours collectifs sont incroyables ! L'ambiance est motivante et les résultats au rendez-vous. Je recommande à 100%.",
    rating: 5,
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "MOUSSA T.",
    role: "Membre depuis 3 ans",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    content: "Le meilleur investissement pour ma santé. L'espace récupération avec sauna et cryothérapie fait vraiment la différence.",
    rating: 5,
    approved: true,
    createdAt: new Date().toISOString(),
  },
];

export const getTestimonials = (): Testimonial[] => {
  try {
    const stored = localStorage.getItem(TESTIMONIALS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with defaults
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(defaultTestimonials));
    return defaultTestimonials;
  } catch (e) {
    console.error('Error loading testimonials:', e);
    return defaultTestimonials;
  }
};

export const getApprovedTestimonials = (): Testimonial[] => {
  return getTestimonials().filter(t => t.approved);
};

export const getPendingTestimonials = (): Testimonial[] => {
  return getTestimonials().filter(t => !t.approved);
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'approved'>): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: crypto.randomUUID(),
    approved: false, // New testimonials need approval
    createdAt: new Date().toISOString(),
  };
  testimonials.push(newTestimonial);
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  return newTestimonial;
};

export const updateTestimonial = (id: string, updates: Partial<Testimonial>): Testimonial | null => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  testimonials[index] = { ...testimonials[index], ...updates };
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  return testimonials[index];
};

export const deleteTestimonial = (id: string): boolean => {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  if (filtered.length === testimonials.length) return false;
  
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(filtered));
  return true;
};

export const approveTestimonial = (id: string): Testimonial | null => {
  return updateTestimonial(id, { approved: true });
};
