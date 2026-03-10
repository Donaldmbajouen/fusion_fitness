import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Calendar, Clock, Users } from "lucide-react";
import { toast } from "sonner";
import { getSchedule, addClass, updateClass, deleteClass, DAYS, ClassSession } from "@/lib/classSchedule";
import { getSiteConfig } from "@/lib/siteConfig";

const COLORS = [
  { value: 'bg-primary', label: 'Rouge' },
  { value: 'bg-accent', label: 'Rouge vif' },
  { value: 'bg-destructive', label: 'Orange' },
  { value: 'bg-secondary', label: 'Gris' },
];

const ScheduleManager = () => {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassSession | null>(null);
  const [coaches, setCoaches] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    day: 'Lundi' as ClassSession['day'],
    startTime: '09:00',
    endTime: '10:00',
    maxCapacity: 20,
    color: 'bg-primary',
    description: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setClasses(getSchedule());
    const config = getSiteConfig();
    setCoaches(config.coaches.map(c => c.name));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      instructor: coaches[0] || '',
      day: 'Lundi',
      startTime: '09:00',
      endTime: '10:00',
      maxCapacity: 20,
      color: 'bg-primary',
      description: '',
    });
    setEditingClass(null);
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.instructor.trim()) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    if (editingClass) {
      updateClass(editingClass.id, formData);
      toast.success("Cours modifié avec succès");
    } else {
      addClass(formData);
      toast.success("Cours ajouté avec succès");
    }

    loadData();
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (classSession: ClassSession) => {
    setEditingClass(classSession);
    setFormData({
      name: classSession.name,
      instructor: classSession.instructor,
      day: classSession.day,
      startTime: classSession.startTime,
      endTime: classSession.endTime,
      maxCapacity: classSession.maxCapacity,
      color: classSession.color,
      description: classSession.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      deleteClass(id);
      loadData();
      toast.success("Cours supprimé");
    }
  };

  // Group classes by day
  const classesByDay = DAYS.reduce((acc, day) => {
    acc[day] = classes
      .filter(c => c.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {} as Record<string, ClassSession[]>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-primary">Planning des cours</h2>
          <p className="font-body text-sm text-muted-foreground">
            {classes.length} cours programmés
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-accent gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Ajouter un cours
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl md:text-2xl">
                {editingClass ? 'Modifier le cours' : 'Nouveau cours'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nom du cours *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: HIIT Extreme"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Instructeur *</Label>
                <Select
                  value={formData.instructor}
                  onValueChange={(value) => setFormData({ ...formData, instructor: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner un coach" />
                  </SelectTrigger>
                  <SelectContent>
                    {coaches.map((coach) => (
                      <SelectItem key={coach} value={coach}>
                        {coach}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Jour</Label>
                <Select
                  value={formData.day}
                  onValueChange={(value) => setFormData({ ...formData, day: value as ClassSession['day'] })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Début</Label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fin</Label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Capacité max</Label>
                  <Input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) || 0 })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Couleur</Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => setFormData({ ...formData, color: value })}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 ${color.value}`} />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description du cours..."
                  className="bg-background border-border"
                  rows={2}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-accent">
                {editingClass ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Schedule by Day */}
      <div className="space-y-6">
        {DAYS.map((day) => (
          <Card key={day} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-lg md:text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {day}
                <span className="text-sm font-body text-muted-foreground ml-2">
                  ({classesByDay[day]?.length || 0} cours)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {classesByDay[day]?.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">Aucun cours ce jour</p>
              ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-xs">Horaire</TableHead>
                        <TableHead className="text-xs">Cours</TableHead>
                        <TableHead className="text-xs hidden md:table-cell">Instructeur</TableHead>
                        <TableHead className="text-xs hidden sm:table-cell">Places</TableHead>
                        <TableHead className="text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classesByDay[day]?.map((classSession) => (
                        <TableRow key={classSession.id} className="border-border">
                          <TableCell className="font-body text-xs md:text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-primary hidden sm:inline" />
                              {classSession.startTime}-{classSession.endTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 ${classSession.color}`} />
                              <span className="font-display text-xs md:text-sm">{classSession.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-body text-xs text-muted-foreground hidden md:table-cell">
                            {classSession.instructor}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center gap-1 text-xs">
                              <Users className="w-3 h-3" />
                              {classSession.currentEnrollment}/{classSession.maxCapacity}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(classSession)}
                                className="h-8 w-8"
                              >
                                <Pencil className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(classSession.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScheduleManager;
