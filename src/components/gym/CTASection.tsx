import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWhatsAppLink, getSiteConfig } from "@/lib/siteConfig";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const config = getSiteConfig();
  const { t } = useTranslation();

  const handleReservation = () => {
    window.open(getWhatsAppLink(), '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { y: 60, opacity: 0 },
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
    <section
      ref={sectionRef}
      className="py-16 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(0_85%_50%_/_0.15)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <span className="inline-block font-body text-xs tracking-[0.3em] text-primary mb-4 md:mb-6">
            {t("cta.label")}
          </span>

          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl xl:text-9xl mb-4 md:mb-8">
            {t("cta.title1")} <span className="text-gradient">{t("cta.title2")}</span><br />
            {t("cta.title3")}
          </h2>

          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 md:mb-12 px-4">
            {t("cta.desc")}
          </p>

          {/* WhatsApp CTA Button */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto mb-10 md:mb-16 px-4">
            <Input
              type="email"
              placeholder={t("cta.email")}
              className="flex-1 font-body bg-card border-border focus:border-primary h-12 md:h-14 px-4 md:px-6 text-sm"
            />
            <Button 
              onClick={handleReservation}
              className="font-body text-xs md:text-sm tracking-widest bg-primary hover:bg-accent px-6 md:px-8 h-12 md:h-14 group"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
