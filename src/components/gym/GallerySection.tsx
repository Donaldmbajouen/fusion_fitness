import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getGallery, GalleryImage } from "@/components/admin/GalleryManager";
import ImageLightbox from "@/components/ui/image-lightbox";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setGalleryImages(getGallery());
  }, []);

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

      const images = galleryRef.current?.querySelectorAll('.gallery-item');
      if (images) {
        gsap.fromTo(
          images,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [galleryImages]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = galleryImages.map(img => ({
    url: img.url,
    title: img.title,
  }));

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="py-16 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div ref={titleRef} className="text-center mb-10 md:mb-16">
            <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
              {t("gallery.label")}
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl mb-4">
              {t("gallery.title1")} <span className="text-gradient">{t("gallery.title2")}</span>
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
              {t("gallery.desc")}
            </p>
          </div>

          {/* Gallery Grid - Masonry Style */}
          <div
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]"
          >
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => openLightbox(index)}
                className={`gallery-item group relative overflow-hidden cursor-pointer ${
                  image.size === 'large' ? 'col-span-2 row-span-2' :
                  image.size === 'medium' ? 'col-span-2 md:col-span-1 row-span-1' : 'col-span-1 row-span-1'
                }`}
              >
                {/* Image with darker overlay */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-50 group-hover:brightness-75"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Red Accent on Hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-display text-2xl md:text-5xl text-primary/20 absolute top-2 md:top-4 right-2 md:right-4 group-hover:text-primary/40 transition-colors">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-sm md:text-2xl mb-1">
                      {image.title}
                    </h3>
                    <p className="font-body text-[10px] md:text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {image.subtitle}
                    </p>
                  </div>
                </div>

                {/* Border Animation */}
                <div className="absolute inset-0 border border-transparent md:border-2 group-hover:border-primary/50 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </>
  );
};

export default GallerySection;
