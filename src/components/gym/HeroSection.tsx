import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { useTranslation } from "@/lib/i18n";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { t } = useTranslation();

  const handleReservation = () => {
    window.open(getWhatsAppLink(), '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        videoRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      )
        .fromTo(
          titleRef.current,
          { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2 },
          "-=1"
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          statsRef.current?.children ?? [],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          "-=0.3"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-50"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Red Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--accent)_/_0.4)_0%,_transparent_60%)] z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--accent)_/_0.35)_0%,_transparent_60%)] z-[1]" />
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Large Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-[1]">
        <span className="font-display text-[18vw] md:text-[15vw] text-foreground/5 whitespace-nowrap">
          FUSION
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6 md:mb-8">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-body text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-primary uppercase">
                {t("hero.badge")}
              </span>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="font-display text-[15vw] md:text-[10vw] lg:text-8xl leading-[0.85] mb-4 md:mb-6"
            >
              <span className="block text-foreground">{t("hero.title1")}</span>
              <span className="block text-gradient">{t("hero.title2")}</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-body text-base md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed px-4 lg:px-0"
            >
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 md:gap-4 mb-8 md:mb-12">
              <Button
                size="lg"
                onClick={handleReservation}
                className="font-body text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] bg-primary hover:bg-accent px-6 md:px-10 py-5 md:py-7 glow-effect transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                {t("hero.cta")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-body text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] border-2 border-muted hover:border-primary bg-background/50 backdrop-blur-sm px-6 md:px-8 py-5 md:py-7 group w-full sm:w-auto"
              >
                <Play className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                {t("hero.tour")}
              </Button>
            </div>

            {/* Mini Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 md:gap-6 max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: "15+", label: t("hero.years") },
                { value: "50+", label: t("hero.coaches") },
                { value: "10K", label: t("hero.members") },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 md:p-4 bg-card/50 backdrop-blur-sm border border-border">
                  <span className="font-display text-2xl md:text-4xl text-primary">
                    {stat.value}
                  </span>
                  <span className="block font-body text-[10px] md:text-xs tracking-widest text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Floating Images */}
          <div className="hidden lg:block relative h-[600px]">
            {/* Main Athlete Image */}
            <div className="absolute top-0 right-0 w-80 h-96 overflow-hidden border-2 border-primary/30 glow-effect">
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80"
                alt="Athlète africain musculation"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Secondary Image */}
            <div className="absolute bottom-20 left-0 w-64 h-72 overflow-hidden border-2 border-border">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
                alt="Entraînement fitness"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Small Accent Image */}
            <div className="absolute top-1/2 left-1/4 w-40 h-40 overflow-hidden border border-primary">
              <img
                src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80"
                alt="Athlète africaine"
                className="w-full h-full object-cover brightness-75"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-20 w-20 h-20 border border-primary/30" />
            <div className="absolute bottom-40 right-20 w-16 h-16 bg-primary/20" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-body text-xs tracking-widest text-muted-foreground">
            {t("hero.scroll")}
          </span>
          <ArrowDown className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-1/4 right-10 w-px h-32 bg-gradient-to-b from-primary/0 via-primary to-primary/0 z-[1] hidden md:block" />
      <div className="absolute bottom-1/4 left-10 w-px h-32 bg-gradient-to-b from-primary/0 via-primary to-primary/0 z-[1] hidden md:block" />
    </section>
  );
};

export default HeroSection;
