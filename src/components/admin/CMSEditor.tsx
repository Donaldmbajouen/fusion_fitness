import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { getSiteConfig, saveSiteConfig, resetSiteConfig, SiteConfig, PricingPlan } from "@/lib/siteConfig";
import { toast } from "@/hooks/use-toast";

const CMSEditor = () => {
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  const handleSave = () => {
    saveSiteConfig(config);
    setHasChanges(false);
    toast({
      title: "Modifications enregistrées",
      description: "Les changements ont été sauvegardés avec succès.",
    });
  };

  const handleReset = () => {
    resetSiteConfig();
    setConfig(getSiteConfig());
    setHasChanges(false);
    toast({
      title: "Configuration réinitialisée",
      description: "Les valeurs par défaut ont été restaurées.",
    });
  };

  const updateConfig = (updates: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const updateHero = (key: keyof SiteConfig['hero'], value: any) => {
    setConfig(prev => ({
      ...prev,
      hero: { ...prev.hero, [key]: value }
    }));
    setHasChanges(true);
  };

  const updateContact = (key: keyof SiteConfig['contact'], value: string) => {
    setConfig(prev => ({
      ...prev,
      contact: { ...prev.contact, [key]: value }
    }));
    setHasChanges(true);
  };

  const updatePricingPlan = (index: number, updates: Partial<PricingPlan>) => {
    const newPricing = [...config.pricing];
    newPricing[index] = { ...newPricing[index], ...updates };
    updateConfig({ pricing: newPricing });
  };

  const addPricingPlan = () => {
    const newPlan: PricingPlan = {
      id: crypto.randomUUID(),
      name: "NOUVEAU PLAN",
      price: "0",
      period: "/mois",
      features: ["Nouvelle fonctionnalité"],
      popular: false,
    };
    updateConfig({ pricing: [...config.pricing, newPlan] });
  };

  const removePricingPlan = (index: number) => {
    const newPricing = config.pricing.filter((_, i) => i !== index);
    updateConfig({ pricing: newPricing });
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl">Gestion du Contenu</h2>
          <p className="text-muted-foreground">Modifiez le contenu affiché sur le site</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="gap-2 bg-primary hover:bg-accent">
            <Save className="w-4 h-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["hero", "contact"]} className="space-y-4">
        {/* Hero Section */}
        <AccordionItem value="hero" className="border border-border rounded-lg bg-card px-6">
          <AccordionTrigger className="font-display text-xl">Section Hero</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre ligne 1</Label>
                <Input
                  value={config.hero.title1}
                  onChange={(e) => updateHero('title1', e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label>Titre ligne 2</Label>
                <Input
                  value={config.hero.title2}
                  onChange={(e) => updateHero('title2', e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Badge</Label>
              <Input
                value={config.hero.badgeText}
                onChange={(e) => updateHero('badgeText', e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label>Sous-titre</Label>
              <Textarea
                value={config.hero.subtitle}
                onChange={(e) => updateHero('subtitle', e.target.value)}
                className="bg-background"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Statistiques</Label>
              <div className="grid grid-cols-3 gap-4">
                {config.hero.stats.map((stat, i) => (
                  <div key={i} className="space-y-2 p-3 border border-border rounded bg-background">
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...config.hero.stats];
                        newStats[i] = { ...stat, value: e.target.value };
                        updateHero('stats', newStats);
                      }}
                      placeholder="Valeur"
                      className="bg-card"
                    />
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...config.hero.stats];
                        newStats[i] = { ...stat, label: e.target.value };
                        updateHero('stats', newStats);
                      }}
                      placeholder="Label"
                      className="bg-card"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Section */}
        <AccordionItem value="contact" className="border border-border rounded-lg bg-card px-6">
          <AccordionTrigger className="font-display text-xl">Informations de Contact</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input
                  value={config.contact.address}
                  onChange={(e) => updateContact('address', e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input
                  value={config.contact.phone}
                  onChange={(e) => updateContact('phone', e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={config.contact.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label>Numéro WhatsApp (format international)</Label>
                <Input
                  value={config.contact.whatsappNumber}
                  onChange={(e) => updateContact('whatsappNumber', e.target.value)}
                  placeholder="+33612345678"
                  className="bg-background"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Pricing Section */}
        <AccordionItem value="pricing" className="border border-border rounded-lg bg-card px-6">
          <AccordionTrigger className="font-display text-xl">Plans Tarifaires</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {config.pricing.map((plan, index) => (
              <Card key={plan.id} className={`bg-background ${plan.popular ? 'border-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePricingPlan(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Nom</Label>
                      <Input
                        value={plan.name}
                        onChange={(e) => updatePricingPlan(index, { name: e.target.value })}
                        className="bg-card h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Prix</Label>
                      <Input
                        value={plan.price}
                        onChange={(e) => updatePricingPlan(index, { price: e.target.value })}
                        className="bg-card h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Période</Label>
                      <Input
                        value={plan.period}
                        onChange={(e) => updatePricingPlan(index, { period: e.target.value })}
                        className="bg-card h-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Fonctionnalités (une par ligne)</Label>
                    <Textarea
                      value={plan.features.join('\n')}
                      onChange={(e) => updatePricingPlan(index, { features: e.target.value.split('\n').filter(f => f.trim()) })}
                      className="bg-card"
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={plan.popular}
                      onChange={(e) => updatePricingPlan(index, { popular: e.target.checked })}
                      className="accent-primary"
                    />
                    <Label className="text-xs">Plan populaire (mise en avant)</Label>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addPricingPlan} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un plan
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CMSEditor;
