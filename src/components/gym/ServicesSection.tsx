import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dumbbell, Users, Heart, Zap, Clock, Trophy } from "lucide-react";
import { getSiteConfig, ServiceItem } from "@/lib/siteConfig";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  Users,
  Heart,
  Zap,
  Clock,
  Trophy,
};

const defaultServices = [
  {
    icon: Dumbbell,
    title: "MUSCULATION",
    description: "Équipements Technogym et Hammer Strength de dernière génération. Zone libre et guidée.",
    accent: "01",
    image: "https://images.unsplash.com/photo-1534368786749-b63e05c90863?w=600&q=80"
  },
  {
    icon: Heart,
    title: "CARDIO TRAINING",
    description: "Tapis, vélos, rameurs connectés avec programmes personnalisés et suivi en temps réel.",
    accent: "02",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
  },
  {
    icon: Users,
    title: "COURS COLLECTIFS",
    description: "Plus de 50 cours par semaine : CrossFit, HIIT, Yoga, Boxing, Spinning et plus encore.",
    accent: "03",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80"
  },
  {
    icon: Zap,
    title: "PERSONAL TRAINING",
    description: "Coachs certifiés pour un accompagnement sur-mesure et des résultats garantis.",
    accent: "04",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80"
  },
  {
    icon: Clock,
    title: "RÉCUPÉRATION",
    description: "Sauna, hammam, cryothérapie et massage pour une récupération optimale.",
    accent: "05",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
  },
  {
    icon: Trophy,
    title: "COMPÉTITION",
    description: "Préparation aux compétitions et accompagnement des athlètes de haut niveau.",
    accent: "06",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80"
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cmsServices, setCmsServices] = useState<ServiceItem[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const config = getSiteConfig();
    setCmsServices(config.services);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Merge CMS services with default services for display
  const services = defaultServices.map((defaultService, index) => {
    const cmsService = cmsServices[index];
    if (cmsService) {
      const IconComponent = iconMap[cmsService.icon] || defaultService.icon;
      return {
        ...defaultService,
        icon: IconComponent,
        title: cmsService.title.toUpperCase(),
        description: cmsService.description,
        image: cmsService.image || defaultService.image,
      };
    }
    return defaultService;
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 md:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_hsl(0_85%_50%_/_0.08)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="max-w-3xl mb-10 md:mb-20">
          <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
            {t("services.label")}
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl leading-[0.9] mb-4 md:mb-6">
            {t("services.title1")}<br />
            <span className="text-gradient">{t("services.title2")}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl">
            {t("services.desc")}
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-36 md:h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover brightness-50 group-hover:brightness-75 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                
                {/* Accent Number */}
                <span className="absolute top-3 md:top-4 right-3 md:right-4 font-display text-3xl md:text-5xl text-white/10 group-hover:text-primary/30 transition-colors duration-500">
                  {service.accent}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 relative">
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary/10 border border-primary/20 mb-3 md:mb-4 group-hover:bg-primary/20 transition-all duration-300 -mt-8 md:-mt-12 relative z-10">
                  <service.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>

                <h3 className="font-display text-lg md:text-xl mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
