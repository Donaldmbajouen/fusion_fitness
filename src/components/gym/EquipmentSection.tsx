import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const equipment = [
  {
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&q=80",
    brand: "TECHNOGYM",
    category: "Machines Guidées",
  },
  {
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80",
    brand: "HAMMER STRENGTH",
    category: "Zone Libre",
  },
  {
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    brand: "LIFE FITNESS",
    category: "Cardio Premium",
  },
  {
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=600&q=80",
    brand: "ROGUE FITNESS",
    category: "Functional",
  },
];

const EquipmentSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
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

  return (
    <section ref={sectionRef} className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left - Title */}
          <div ref={titleRef}>
            <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
              {t("equipment.label")}
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl leading-[0.9] mb-4 md:mb-6">
              {t("equipment.title1")}<br />
              <span className="text-gradient">{t("equipment.title2")}</span>
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-md mb-6 md:mb-8">
              {t("equipment.desc")}
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-center">
                <span className="font-display text-2xl md:text-4xl text-primary">200+</span>
                <span className="block font-body text-[10px] md:text-xs text-muted-foreground tracking-widest">{t("equipment.machines")}</span>
              </div>
              <div className="w-px h-8 md:h-12 bg-border" />
              <div className="text-center">
                <span className="font-display text-2xl md:text-4xl text-primary">4</span>
                <span className="block font-body text-[10px] md:text-xs text-muted-foreground tracking-widest">{t("equipment.brands")}</span>
              </div>
              <div className="w-px h-8 md:h-12 bg-border" />
              <div className="text-center">
                <span className="font-display text-2xl md:text-4xl text-primary">100%</span>
                <span className="block font-body text-[10px] md:text-xs text-muted-foreground tracking-widest">{t("equipment.premium")}</span>
              </div>
            </div>
          </div>

          {/* Right - Equipment Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-2 gap-3 md:gap-4"
          >
            {equipment.map((item, index) => (
              <div
                key={item.brand}
                className={`group relative overflow-hidden ${
                  index % 2 === 1 ? 'md:translate-y-8' : ''
                }`}
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={item.image}
                    alt={item.brand}
                    className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <h3 className="font-display text-base md:text-xl mb-1">{item.brand}</h3>
                    <p className="font-body text-[10px] md:text-xs text-muted-foreground tracking-wider">
                      {item.category}
                    </p>
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 border border-border group-hover:border-primary/50 transition-colors duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
