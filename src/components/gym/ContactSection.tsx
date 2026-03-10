import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteConfig, getWhatsAppLink } from "@/lib/siteConfig";
import { useTranslation } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

// Default coordinates for Supérette Biyem Assi, Yaoundé
const DEFAULT_COORDS = { lat: 3.8366263, lng: 11.4835061 };

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [contact, setContact] = useState(getSiteConfig().contact);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const config = getSiteConfig();
    setContact(config.contact);
  }, []);

  // Load Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if already loaded
      if (window.google?.maps) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      
      window.initGoogleMap = () => {
        setMapLoaded(true);
        initMap();
      };

      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return;
      
      const coords = DEFAULT_COORDS;

      const map = new window.google.maps.Map(mapRef.current, {
        center: coords,
        zoom: 15,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#0a0a0a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0a0a0a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#2a2a2a" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f0f0f" }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#151515" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#151515" }] },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
      });

      // Custom marker
      new window.google.maps.Marker({
        position: coords,
        map,
        title: "Complexe Fusion Fitness",
        icon: {
          path: 0, // google.maps.SymbolPath.CIRCLE
          scale: 12,
          fillColor: "#ef4444",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });
    };

    loadGoogleMaps();
  }, []);

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
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    { icon: MapPin, label: t("contact.address"), value: contact.address },
    { icon: Phone, label: t("contact.mobile"), value: contact.phone },
    { icon: Mail, label: t("contact.email"), value: contact.email },
    { icon: MessageCircle, label: t("contact.messenger"), value: contact.messenger },
    { icon: Clock, label: t("contact.hours"), value: t("contact.hours.value") },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-32 relative overflow-hidden bg-card/50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_85%_50%_/_0.05)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="font-body text-xs tracking-[0.3em] text-primary mb-4 block">
              {t("contact.label")}
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl mb-4 md:mb-6">
              {t("contact.title1")} <span className="text-gradient">{t("contact.title2")}</span>
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
              {t("contact.desc")}
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="group p-4 md:p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary/10 border border-primary/20 mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="font-body text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground block mb-1 md:mb-2">
                  {item.label}
                </span>
                <p className="font-body text-xs md:text-sm text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center mb-10 md:mb-16">
            <a
              href={getWhatsAppLink("Bonjour, j'ai une question concernant Complexe Fusion Fitness.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-accent font-body text-xs md:text-sm tracking-widest py-4 md:py-6 px-6 md:px-10 gap-2 md:gap-3">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                {t("contact.whatsapp")}
              </Button>
            </a>
          </div>

          {/* Google Maps */}
          <div className="aspect-[16/9] md:aspect-[21/9] bg-card border border-border overflow-hidden relative">
            <div 
              ref={mapRef}
              className="absolute inset-0 w-full h-full"
            />
            {/* Fallback if no API key */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-background pointer-events-none" style={{ display: mapLoaded ? 'none' : 'flex' }}>
              <div className="text-center px-4">
                <MapPin className="w-10 h-10 md:w-12 md:h-12 text-primary/30 mx-auto mb-4" />
                <p className="font-body text-xs md:text-sm text-muted-foreground">
                  {contact.address}
                </p>
                <p className="font-body text-[10px] md:text-xs text-muted-foreground/50 mt-2">
                  {t("contact.mapHint")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
