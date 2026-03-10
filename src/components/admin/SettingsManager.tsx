import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getSiteConfig, saveSiteConfig } from "@/lib/siteConfig";

export interface SocialLinks {
  facebook: string;
  tiktok: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

const SOCIAL_LINKS_KEY = "forge_social_links";

export const getSocialLinks = (): SocialLinks => {
  try {
    const stored = localStorage.getItem(SOCIAL_LINKS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  };
};

export const saveSocialLinks = (links: SocialLinks) => {
  localStorage.setItem(SOCIAL_LINKS_KEY, JSON.stringify(links));
};

const SettingsManager = () => {
  const [contact, setContact] = useState(getSiteConfig().contact);
  const [social, setSocial] = useState<SocialLinks>(getSocialLinks());

  useEffect(() => {
    setContact(getSiteConfig().contact);
    setSocial(getSocialLinks());
  }, []);

  const handleSaveContact = () => {
    saveSiteConfig({ contact });
    toast.success("Informations de contact mises à jour");
  };

  const handleSaveSocial = () => {
    saveSocialLinks(social);
    toast.success("Liens sociaux mis à jour");
  };

  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <div className="bg-card border border-border p-6">
        <h3 className="font-display text-xl mb-6 text-primary">Informations de contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Adresse</Label>
            <Input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Téléphone</Label>
            <Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Numéro WhatsApp</Label>
            <Input value={contact.whatsappNumber} onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value })} />
          </div>
        </div>
        <Button onClick={handleSaveContact} className="mt-4">Enregistrer le contact</Button>
      </div>

      {/* Social Links */}
      <div className="bg-card border border-border p-6">
        <h3 className="font-display text-xl mb-6 text-primary">Réseaux sociaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} placeholder="https://facebook.com/..." />
          </div>
          <div className="space-y-2">
            <Label>TikTok</Label>
            <Input value={social.tiktok} onChange={(e) => setSocial({ ...social, tiktok: e.target.value })} placeholder="https://tiktok.com/@..." />
          </div>
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <Label>Twitter / X</Label>
            <Input value={social.twitter} onChange={(e) => setSocial({ ...social, twitter: e.target.value })} placeholder="https://x.com/..." />
          </div>
          <div className="space-y-2">
            <Label>YouTube</Label>
            <Input value={social.youtube} onChange={(e) => setSocial({ ...social, youtube: e.target.value })} placeholder="https://youtube.com/..." />
          </div>
        </div>
        <Button onClick={handleSaveSocial} className="mt-4">Enregistrer les réseaux</Button>
      </div>
    </div>
  );
};

export default SettingsManager;
