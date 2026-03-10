import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Trash2, Check, X, Edit2, Save, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import {
  getTestimonials,
  getApprovedTestimonials,
  getPendingTestimonials,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial,
  Testimonial,
} from "@/lib/testimonials";

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Testimonial>>({});

  const loadTestimonials = () => {
    setTestimonials(getApprovedTestimonials());
    setPendingTestimonials(getPendingTestimonials());
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleApprove = (id: string) => {
    approveTestimonial(id);
    loadTestimonials();
    toast.success("Avis approuvé avec succès");
  };

  const handleReject = (id: string) => {
    deleteTestimonial(id);
    loadTestimonials();
    toast.success("Avis rejeté");
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditForm(testimonial);
  };

  const handleSave = () => {
    if (editingId && editForm) {
      updateTestimonial(editingId, editForm);
      setEditingId(null);
      setEditForm({});
      loadTestimonials();
      toast.success("Avis mis à jour");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) {
      deleteTestimonial(id);
      loadTestimonials();
      toast.success("Avis supprimé");
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );

  const TestimonialCard = ({ testimonial, isPending = false }: { testimonial: Testimonial; isPending?: boolean }) => {
    const isEditing = editingId === testimonial.id;

    return (
      <Card className="bg-card border-border">
        <CardContent className="p-4 md:p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nom</Label>
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Rôle</Label>
                  <Input
                    value={editForm.role || ""}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  value={editForm.image || ""}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                />
              </div>
              <div>
                <Label>Contenu</Label>
                <Textarea
                  value={editForm.content || ""}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>Note (1-5)</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setEditForm({ ...editForm, rating: n })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${n <= (editForm.rating || 0) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm" className="gap-2">
                  <Save className="w-4 h-4" />
                  Sauvegarder
                </Button>
                <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden border-2 border-primary">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-display text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-foreground/80 text-sm md:text-base mb-4">"{testimonial.content}"</p>
                <div className="flex flex-wrap gap-2">
                  {isPending ? (
                    <>
                      <Button onClick={() => handleApprove(testimonial.id)} size="sm" className="gap-2">
                        <Check className="w-4 h-4" />
                        Approuver
                      </Button>
                      <Button onClick={() => handleReject(testimonial.id)} variant="destructive" size="sm" className="gap-2">
                        <X className="w-4 h-4" />
                        Rejeter
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEdit(testimonial)} variant="outline" size="sm" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Modifier
                      </Button>
                      <Button onClick={() => handleDelete(testimonial.id)} variant="destructive" size="sm" className="gap-2">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl">Gestion des Avis</h2>
        <p className="text-muted-foreground text-sm md:text-base">Modérez et gérez les avis clients</p>
      </div>

      <Tabs defaultValue="approved" className="space-y-6">
        <TabsList className="bg-card border border-border w-full md:w-auto">
          <TabsTrigger value="approved" className="flex-1 md:flex-none gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Approuvés</span>
            <Badge variant="secondary" className="ml-1">{testimonials.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 md:flex-none gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <span className="hidden sm:inline">En attente</span>
            {pendingTestimonials.length > 0 && (
              <Badge variant="destructive" className="ml-1">{pendingTestimonials.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approved" className="space-y-4">
          {testimonials.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-8 text-center text-muted-foreground">
                Aucun avis approuvé pour le moment
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingTestimonials.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-8 text-center text-muted-foreground">
                Aucun avis en attente de modération
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} isPending />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestimonialsManager;
