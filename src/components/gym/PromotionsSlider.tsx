import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PromotionsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const promotions = [
    { id: "1", image: "/cff3.jpg", label: "Séance cardio ciblée" },
    { id: "2", image: "/cff12.jpg", label: "Coaching personnalisé" },
    { id: "3", image: "/cff14.jpg", label: "Force et équilibre" },
    { id: "4", image: "/cff34.jpg", label: "Ambiance Studio" },
    { id: "5", image: "/CFF.jpg", label: "Logo Complexe Fusion" },
    { id: "6", image: "/ff.jpg", label: "Énergie collective" },
    { id: "7", image: "/fcf1.jpg", label: "Mobilité et détente" },
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(promotions.length / itemsPerSlide);

  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
            PROMOTIONS
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            NOS OFFRES DU MOMENT
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full flex justify-center gap-4 md:gap-6"
                >
                  {promotions
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((promo) => (
                      <div
                        key={promo.id}
                        className="w-full md:w-1/3 aspect-[3/4] overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        <img
                          src={promo.image}
                          alt={promo.label}
                          className="w-full h-full object-cover"
                        />
                        <span className="sr-only">{promo.label}</span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-background border border-border hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-background border border-border hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/50 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PromotionsSlider;
