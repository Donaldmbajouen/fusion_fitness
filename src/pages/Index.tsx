import Navbar from "@/components/gym/Navbar";
import HeroSection from "@/components/gym/HeroSection";
import PromotionsSlider from "@/components/gym/PromotionsSlider";
import MarqueeText from "@/components/gym/MarqueeText";
import StatsSection from "@/components/gym/StatsSection";
import EquipmentSection from "@/components/gym/EquipmentSection";
import ServicesSection from "@/components/gym/ServicesSection";
import GallerySection from "@/components/gym/GallerySection";
import ScheduleSection from "@/components/gym/ScheduleSection";
import CoachesSection from "@/components/gym/CoachesSection";
import AthletesSection from "@/components/gym/AthletesSection";
import PricingSection from "@/components/gym/PricingSection";
import TestimonialsSection from "@/components/gym/TestimonialsSection";
import CTASection from "@/components/gym/CTASection";
import ContactSection from "@/components/gym/ContactSection";
import Footer from "@/components/gym/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MarqueeText />
      <PromotionsSlider />
      <StatsSection />
      <EquipmentSection />
      <ServicesSection />
      <ScheduleSection />
      <GallerySection />
      <CoachesSection />
      <AthletesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
