import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSiteConfig, Coach } from "@/lib/siteConfig";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const CoachesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const config = getSiteConfig();
    setCoaches(config.coaches);
  }, []);

  useEffect(() => {
    if (coaches.length === 0) return;

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
        cardsRef.current?.children ?? [],
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
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
  }, [coaches]);

  if (coaches.length === 0) return null;

  return (
    <section
      id="coaches"
      ref={sectionRef}
      className="py-16 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(0_85%_50%_/_0.06)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 md:mb-20">
          <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
            {t("coaches.label")}
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl mb-4 md:mb-6">
            {t("coaches.title1")} <span className="text-gradient">{t("coaches.title2")}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            {t("coaches.desc")}
          </p>
        </div>

        {/* Coaches Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {coaches.map((coach, index) => (
            <div
              key={coach.id}
              className="group relative overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-110 transition-all duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                <span className="font-body text-[10px] md:text-xs tracking-[0.2em] text-primary mb-1 md:mb-2 block">
                  {coach.specialty}
                </span>
                <h3 className="font-display text-lg md:text-2xl mb-1 md:mb-2 group-hover:text-primary transition-colors">
                  {coach.name}
                </h3>
                <p className="font-body text-xs md:text-sm text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                  {coach.bio}
                </p>
              </div>

              {/* Number accent */}
              <span className="absolute top-2 md:top-4 right-2 md:right-4 font-display text-3xl md:text-6xl text-foreground/[0.03] group-hover:text-primary/10 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;
