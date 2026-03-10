import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Image, GripVertical, Eye } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  size: 'small' | 'medium' | 'large';
}

const STORAGE_KEY = 'forge_gym_gallery';

const defaultGallery: GalleryImage[] = [
  { id: '1', url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80", title: "SALLE PRINCIPALE", subtitle: "2500m² d'espace", size: "large" },
  { id: '2', url: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80", title: "ESPACE COMBAT", subtitle: "Ring & sacs", size: "small" },
  { id: '3', url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80", title: "MUSCULATION", subtitle: "Équipements premium", size: "small" },
  { id: '4', url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", title: "ZONE CARDIO", subtitle: "Machines connectées", size: "medium" },
  { id: '5', url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80", title: "COURS COLLECTIFS", subtitle: "50+ cours/semaine", size: "medium" },
  { id: '6', url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80", title: "HALTÈRES & BARRES", subtitle: "Zone libre", size: "small" },
  { id: '7', url: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800&q=80", title: "KETTLEBELLS", subtitle: "Functional training", size: "small" },
  { id: '8', url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80", title: "NOS ATHLÈTES", subtitle: "Champions formés ici", size: "medium" },
];

export const getGallery = (): GalleryImage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading gallery:', e);
  }
  return defaultGallery;
};

export const saveGallery = (gallery: GalleryImage[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
  } catch (e) {
    console.error('Error saving gallery:', e);
  }
};

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    url: '',
    title: '',
    subtitle: '',
    size: 'small' as GalleryImage['size'],
  });

  useEffect(() => {
    setImages(getGallery());
  }, []);

  const resetForm = () => {
    setFormData({
      url: '',
      title: '',
      subtitle: '',
      size: 'small',
    });
    setEditingImage(null);
  };

  const handleSubmit = () => {
    if (!formData.url.trim() || !formData.title.trim()) {
      toast.error("Veuillez remplir l'URL et le titre");
      return;
    }

    let newImages: GalleryImage[];
    
    if (editingImage) {
      newImages = images.map(img => 
        img.id === editingImage.id 
          ? { ...img, ...formData }
          : img
      );
      toast.success("Image modifiée avec succès");
    } else {
      const newImage: GalleryImage = {
        ...formData,
        id: crypto.randomUUID(),
      };
      newImages = [...images, newImage];
      toast.success("Image ajoutée avec succès");
    }

    setImages(newImages);
    saveGallery(newImages);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      url: image.url,
      title: image.title,
      subtitle: image.subtitle,
      size: image.size,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      const newImages = images.filter(img => img.id !== id);
      setImages(newImages);
      saveGallery(newImages);
      toast.success("Image supprimée");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-primary">Galerie d'images</h2>
          <p className="font-body text-sm text-muted-foreground">
            {images.length} images dans la galerie
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-accent gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Ajouter une image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl md:text-2xl">
                {editingImage ? 'Modifier l\'image' : 'Nouvelle image'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>URL de l'image *</Label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="bg-background border-border"
                />
                {formData.url && (
                  <div className="mt-2 border border-border overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={formData.url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Image+invalide';
                        }}
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Titre *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: SALLE PRINCIPALE"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Sous-titre</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Ex: 2500m² d'espace"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Taille dans la grille</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => setFormData({ ...formData, size: value as GalleryImage['size'] })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Petit (1x1)</SelectItem>
                    <SelectItem value="medium">Moyen (2x1)</SelectItem>
                    <SelectItem value="large">Grand (2x2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-accent">
                {editingImage ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {images.map((image) => (
          <Card 
            key={image.id} 
            className={`bg-card border-border group relative overflow-hidden ${
              image.size === 'large' ? 'col-span-2 row-span-2' :
              image.size === 'medium' ? 'col-span-2 md:col-span-1' : ''
            }`}
          >
            <div className="relative aspect-square">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover brightness-75"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Image+invalide';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewImage(image.url)}
                    className="h-7 w-7 md:h-8 md:w-8 bg-background/50 hover:bg-background/80"
                  >
                    <Eye className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(image)}
                    className="h-7 w-7 md:h-8 md:w-8 bg-background/50 hover:bg-background/80"
                  >
                    <GripVertical className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                    className="h-7 w-7 md:h-8 md:w-8 bg-background/50 hover:bg-destructive/80 text-destructive"
                  >
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
                
                <div>
                  <p className="font-display text-sm md:text-base">{image.title}</p>
                  <p className="font-body text-xs text-muted-foreground">{image.subtitle}</p>
                  <span className="inline-block mt-1 text-[10px] font-body bg-primary/20 text-primary px-2 py-0.5">
                    {image.size === 'large' ? 'GRAND' : image.size === 'medium' ? 'MOYEN' : 'PETIT'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="bg-card border-border max-w-4xl p-2">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManager;
