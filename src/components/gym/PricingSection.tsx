import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteConfig, getWhatsAppLink, PricingPlan } from "@/lib/siteConfig";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const config = getSiteConfig();
    setPlans(config.pricing);
  }, []);

  useEffect(() => {
    if (plans.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { y: 100, opacity: 0, rotateY: 10 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [plans]);

  const handleChoosePlan = (planName: string) => {
    const message = `Bonjour, je suis intéressé(e) par le plan ${planName}. Pouvez-vous me donner plus d'informations ?`;
    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_85%_50%_/_0.05)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 md:mb-20">
          <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
            {t("pricing.label")}
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl mb-4 md:mb-6">
            {t("pricing.title1")} <span className="text-gradient">{t("pricing.title2")}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            {t("pricing.desc")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-8xl mx-auto"
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative p-5 md:p-8 border transition-all duration-500 hover-lift ${
                plan.popular
                  ? "bg-card border-primary glow-effect"
                  : "bg-card/50 border-border hover:border-primary/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 bg-primary">
                  <Zap className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-body text-[10px] md:text-xs tracking-widest text-primary-foreground">
                    {t("pricing.popular")}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-xl md:text-2xl mb-1 md:mb-2 mt-2 md:mt-0">{plan.name}</h3>
              <p className="font-body text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
                {plan.description || "Formule adaptée à vos besoins"}
              </p>

              {/* Price */}
              <div className="mb-6 md:mb-8">
                <span className="font-display font-bold text-4xl md:text-6xl text-foreground">
                  {plan.price}FCFA
                </span>
                <span className="font-body text-sm md:text-base text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-primary/20 border border-primary/30 shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                    </div>
                    <span className="font-body text-xs md:text-sm text-foreground/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => handleChoosePlan(plan.name)}
                className={`w-full font-body text-xs md:text-sm tracking-widest py-4 md:py-6 transition-all duration-300 ${
                  plan.popular
                    ? "bg-primary hover:bg-accent"
                    : "bg-transparent border-2 border-primary hover:bg-primary"
                }`}
              >
                {t("pricing.choose")}
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center font-body text-xs md:text-sm text-muted-foreground mt-8 md:mt-12 px-4">
          {t("pricing.note")}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
