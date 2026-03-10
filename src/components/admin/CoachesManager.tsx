import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, User } from "lucide-react";
import { getSiteConfig, saveSiteConfig, Coach } from "@/lib/siteConfig";
import { toast } from "@/hooks/use-toast";

const CoachesManager = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const config = getSiteConfig();
    setCoaches(config.coaches);
  }, []);

  const handleSave = () => {
    saveSiteConfig({ coaches });
    setHasChanges(false);
    toast({
      title: "Coachs enregistrés",
      description: "Les modifications ont été sauvegardées avec succès.",
    });
  };

  const addCoach = () => {
    const newCoach: Coach = {
      id: crypto.randomUUID(),
      name: "Nouveau Coach",
      specialty: "SPÉCIALITÉ",
      bio: "Description du coach...",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    };
    setCoaches([...coaches, newCoach]);
    setHasChanges(true);
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    setCoaches(coaches.map(c => c.id === id ? { ...c, ...updates } : c));
    setHasChanges(true);
  };

  const removeCoach = (id: string) => {
    setCoaches(coaches.filter(c => c.id !== id));
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl">Gestion des Coachs</h2>
          <p className="text-muted-foreground">Ajoutez et modifiez les profils des coachs</p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges} className="gap-2 bg-primary hover:bg-accent">
          <Save className="w-4 h-4" />
          Enregistrer
        </Button>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coaches.map((coach) => (
          <Card key={coach.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  {coach.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCoach(coach.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              <div className="flex gap-4">
                <div className="w-24 h-32 bg-background border border-border overflow-hidden flex-shrink-0">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Nom</Label>
                    <Input
                      value={coach.name}
                      onChange={(e) => updateCoach(coach.id, { name: e.target.value })}
                      className="bg-background h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Spécialité</Label>
                    <Input
                      value={coach.specialty}
                      onChange={(e) => updateCoach(coach.id, { specialty: e.target.value })}
                      className="bg-background h-9"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">URL de l'image</Label>
                <Input
                  value={coach.image}
                  onChange={(e) => updateCoach(coach.id, { image: e.target.value })}
                  className="bg-background"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Biographie</Label>
                <Textarea
                  value={coach.bio}
                  onChange={(e) => updateCoach(coach.id, { bio: e.target.value })}
                  className="bg-background"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Button */}
      <Button variant="outline" onClick={addCoach} className="w-full gap-2 py-6">
        <Plus className="w-4 h-4" />
        Ajouter un coach
      </Button>
    </div>
  );
};

export default CoachesManager;
