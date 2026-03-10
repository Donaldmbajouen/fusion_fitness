import { useState, useEffect } from "react";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { getSocialLinks } from "@/components/admin/SettingsManager";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.78a4.84 4.84 0 0 1-1-.09z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const [social, setSocial] = useState(getSocialLinks());

  useEffect(() => {
    setSocial(getSocialLinks());
  }, []);

  const socialLinks = [
    { icon: Instagram, href: social.instagram, label: "Instagram" },
    { icon: FacebookIcon, href: social.facebook, label: "Facebook" },
    { icon: TikTokIcon, href: social.tiktok, label: "TikTok" },
    { icon: Twitter, href: social.twitter, label: "Twitter" },
    { icon: Youtube, href: social.youtube, label: "Youtube" },
  ];

  const footerLinks = [
    { label: t("footer.legal"), href: "#" },
    { label: t("footer.privacy"), href: "#" },
    { label: t("footer.terms"), href: "#" },
    { label: t("footer.faq"), href: "#" },
  ];

  return (
    <footer className="py-8 md:py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 border border-border rounded-full overflow-hidden">
            <img src="/power.jpg" alt="Power logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-display text-lg md:text-xl tracking-[0.3em] block">POWER</span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">FITNESS CLUB</span>
          </div>
        </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-[10px] md:text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3 md:gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all duration-300"
                aria-label={s.label}
              >
                <s.icon className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border text-center">
          <p className="font-body text-[10px] md:text-xs text-muted-foreground tracking-wider">
            © {currentYear} POWER FITNESS CLUB. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
