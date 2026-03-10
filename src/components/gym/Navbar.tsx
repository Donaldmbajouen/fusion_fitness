import { useState, useEffect } from "react";
import { Menu, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { getSocialLinks } from "@/components/admin/SettingsManager";

// TikTok icon (not in lucide)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.78a4.84 4.84 0 0 1-1-.09z" />
  </svg>
);

// Facebook icon inline
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// WhatsApp icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.227l-.356.214-3.71-.973.992 3.617-.235.374a9.884 9.884 0 001.516 5.031c1.44 1.79 3.51 2.942 5.675 2.942 1.563 0 3.029-.471 4.26-1.357l.355-.21 3.699.979-.989-3.602.236-.374a9.87 9.87 0 00-1.523-5.084c-1.44-1.79-3.51-2.942-5.675-2.942" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [social, setSocial] = useState(getSocialLinks());

  useEffect(() => {
    setSocial(getSocialLinks());
  }, []);

  const navLinks = [
    { label: t("nav.programs"), href: "#services" },
    { label: t("nav.schedule"), href: "#planning" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-dark py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border border-border overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src="/CFF.jpg" alt="Logo Complexe Fusion Fitness Club" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-display text-2xl md:text-xl uppercase">COMPLEXE FUSION</span>
            <span className="block font-body text-xl uppercase text-muted-foreground">FITNESS CLUB</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Social Icons */}
          <div className="flex items-center gap-2 ml-2">
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all duration-300">
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all duration-300">
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Admin Icon */}
          <Link to="/admin" className="w-8 h-8 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all duration-300" title="Admin">
            <Lock className="w-3.5 h-3.5" />
          </Link>

          <Button className="font-body text-sm tracking-widest border-2 border-primary bg-transparent hover:bg-primary transition-all duration-300 px-6">
            {t("nav.join")}
          </Button>
        </div>

        {/* Mobile Icons and Menu */}
        <div className="md:hidden flex items-center gap-0">
          {/* Mobile Social Icons */}
          {/* <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors">
            <TikTokIcon className="w-4 h-4" />
          </a>
          <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors">
            <FacebookIcon className="w-4 h-4" />
          </a> */}
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Menu Button */}
          <button
            className="text-foreground ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-dark transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[600px] py-6" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-lg tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <Button className="font-body text-sm tracking-widest border-2 border-primary bg-transparent hover:bg-primary transition-all duration-300 mt-2">
            {t("nav.join")}
          </Button>

          {/* Mobile social + lang + theme + admin - Below navigation */}
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all">
                <TikTokIcon className="w-4 h-4" />
              </a>
              <LanguageSwitcher />
              <ThemeToggle />
              <Link to="/admin" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                <Lock className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
