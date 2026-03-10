import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const athletes = [
  {
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",

    name: "IBRAHIMA SOW",
    specialty: "Bodybuilding",
  },
  {
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80",
    name: "MARIAM DIOP",
    specialty: "CrossFit",
  },
  {
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
    name: "OUSMANE BA",
    specialty: "Powerlifting",
  },
  {
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    name: "AÏSSATOU FALL",
    specialty: "Fitness",
  },
];

const AthletesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const athletesRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
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
        athletesRef.current?.children ?? [],
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: athletesRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_85%_50%_/_0.08)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 md:mb-16">
          <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
            {t("athletes.label")}
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl mb-4">
            {t("athletes.title1")} <span className="text-gradient">{t("athletes.title2")}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            {t("athletes.desc")}
          </p>
        </div>

        {/* Athletes Grid */}
        <div
          ref={athletesRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
        >
          {athletes.map((athlete, index) => (
            <div
              key={athlete.name}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
            >
              {/* Image */}
              <img
                src={athlete.image}
                alt={athlete.name}
                className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              {/* Red Accent */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                <span className="font-display text-3xl md:text-5xl text-primary/30 absolute top-2 md:top-4 right-2 md:right-4">
                  0{index + 1}
                </span>
                <h3 className="font-display text-base md:text-xl lg:text-2xl mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {athlete.name}
                </h3>
                <p className="font-body text-xs md:text-sm text-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {athlete.specialty}
                </p>
              </div>

              {/* Border */}
              <div className="absolute inset-0 border border-transparent md:border-2 group-hover:border-primary transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AthletesSection;
