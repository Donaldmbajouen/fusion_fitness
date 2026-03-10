import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { 
  Subscription, 
  getSubscriptions, 
  saveSubscription, 
  updateSubscription, 
  deleteSubscription,
  getSiteConfig 
} from "@/lib/siteConfig";
import { toast } from "@/hooks/use-toast";

const SubscriptionsManager = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    planId: "",
    planName: "",
    startDate: "",
    endDate: "",
    status: "active" as Subscription['status'],
    amount: 0,
  });

  const config = getSiteConfig();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = () => {
    setSubscriptions(getSubscriptions());
  };

  const handleSubmit = () => {
    if (editingSubscription) {
      updateSubscription(editingSubscription.id, formData);
      toast({ title: "Abonnement modifié", description: "Les modifications ont été enregistrées." });
    } else {
      saveSubscription(formData);
      toast({ title: "Abonnement créé", description: "Le nouvel abonnement a été ajouté." });
    }
    loadSubscriptions();
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setFormData({
      clientName: subscription.clientName,
      clientEmail: subscription.clientEmail,
      clientPhone: subscription.clientPhone,
      planId: subscription.planId,
      planName: subscription.planName,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      status: subscription.status,
      amount: subscription.amount,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet abonnement ?")) {
      deleteSubscription(id);
      loadSubscriptions();
      toast({ title: "Abonnement supprimé", description: "L'abonnement a été supprimé." });
    }
  };

  const resetForm = () => {
    setEditingSubscription(null);
    setFormData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      planId: "",
      planName: "",
      startDate: "",
      endDate: "",
      status: "active",
      amount: 0,
    });
  };

  const handlePlanChange = (planId: string) => {
    const plan = config.pricing.find(p => p.id === planId);
    if (plan) {
      setFormData(prev => ({
        ...prev,
        planId: plan.id,
        planName: plan.name,
        amount: parseInt(plan.price) || 0,
      }));
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Subscription['status']) => {
    const variants: Record<Subscription['status'], { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      active: { variant: "default", label: "Actif" },
      expired: { variant: "secondary", label: "Expiré" },
      cancelled: { variant: "destructive", label: "Annulé" },
      pending: { variant: "outline", label: "En attente" },
    };
    const { variant, label } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl">Gestion des Abonnements</h2>
          <p className="text-muted-foreground">Gérez les abonnements de vos clients</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-accent">
              <Plus className="w-4 h-4" />
              Nouvel abonnement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-card">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                {editingSubscription ? "Modifier l'abonnement" : "Nouvel abonnement"}
              </DialogTitle>
              <DialogDescription>
                {editingSubscription ? "Modifiez les informations de l'abonnement" : "Créez un nouvel abonnement pour un client"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du client</Label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input
                    value={formData.clientPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  className="bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plan</Label>
                  <Select value={formData.planId} onValueChange={handlePlanChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Sélectionner un plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {config.pricing.map(plan => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - {plan.price}€
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Subscription['status'] }))}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="expired">Expiré</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Montant (€)</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                  className="bg-background"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                Annuler
              </Button>
              <Button onClick={handleSubmit} className="bg-primary hover:bg-accent">
                {editingSubscription ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-background">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="expired">Expiré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Client</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun abonnement trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{sub.clientName}</p>
                        <p className="text-sm text-muted-foreground">{sub.clientEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{sub.planName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(sub.startDate).toLocaleDateString('fr-FR')}</p>
                        <p className="text-muted-foreground">→ {new Date(sub.endDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{sub.amount}€</TableCell>
                    <TableCell>{getStatusBadge(sub.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(sub)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(sub.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionsManager;
