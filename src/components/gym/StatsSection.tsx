import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const useStats = (): StatItem[] => {
  const { t } = useTranslation();
  return [
    { value: 2500, suffix: "m²", label: t("stats.space") },
    { value: 200, suffix: "+", label: t("stats.equipment") },
    { value: 98, suffix: "%", label: t("stats.satisfaction") },
    { value: 24, suffix: "/7", label: t("stats.access") },
  ];
};

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to({}, {
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
              setCount(Math.round(this.progress() * value));
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-6xl lg:text-8xl text-foreground">
      {count}
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stats = useStats();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-primary" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group p-4 md:p-8 bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 hover-lift text-center"
            >
              <div className="mb-2 md:mb-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-body text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              {/* Hover Accent */}
              <div className="h-0.5 md:h-1 w-0 bg-primary mx-auto mt-3 md:mt-6 transition-all duration-500 group-hover:w-8 md:group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
