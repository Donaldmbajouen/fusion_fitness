import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, TrendingUp, AlertTriangle, Calendar, MessageSquare } from "lucide-react";
import { getSubscriptions, getExpiringSubscriptions, Subscription } from "@/lib/siteConfig";
import { getPendingTestimonials } from "@/lib/testimonials";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const DashboardOverview = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [expiringSubscriptions, setExpiringSubscriptions] = useState<Subscription[]>([]);
  const [pendingReviews, setPendingReviews] = useState(0);

  useEffect(() => {
    setSubscriptions(getSubscriptions());
    setExpiringSubscriptions(getExpiringSubscriptions(8)); // Changed to 8 days
    setPendingReviews(getPendingTestimonials().length);
  }, []);

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
  const expiredSubscriptions = subscriptions.filter(s => s.status === 'expired');
  const totalRevenue = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);
  const pendingSubscriptions = subscriptions.filter(s => s.status === 'pending');

  const getDaysUntilExpiry = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const stats = [
    {
      title: "Abonnés Actifs",
      value: activeSubscriptions.length.toString(),
      change: "+12%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Revenus Mensuels",
      value: `${totalRevenue}€`,
      change: "+8%",
      icon: CreditCard,
      color: "text-green-500",
    },
    {
      title: "Expirés",
      value: expiredSubscriptions.length.toString(),
      change: "À renouveler",
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      title: "Avis en attente",
      value: pendingReviews.toString(),
      change: "À modérer",
      icon: MessageSquare,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl">Tableau de Bord</h2>
        <p className="text-muted-foreground text-sm md:text-base">Vue d'ensemble de l'activité</p>
      </div>

      {/* Expiring Subscriptions Alert */}
      {expiringSubscriptions.length > 0 && (
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <AlertTitle className="text-yellow-500 font-display">
            Abonnements arrivant à expiration ({expiringSubscriptions.length})
          </AlertTitle>
          <AlertDescription className="mt-3">
            <div className="space-y-2">
              {expiringSubscriptions.map((sub) => {
                const daysLeft = getDaysUntilExpiry(sub.endDate);
                return (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-card rounded border border-border gap-2"
                  >
                    <div>
                      <p className="font-medium text-foreground">{sub.clientName}</p>
                      <p className="text-sm text-muted-foreground">{sub.planName}</p>
                    </div>
                    <Badge
                      variant={daysLeft <= 3 ? "destructive" : "secondary"}
                      className="font-body w-fit"
                    >
                      {daysLeft === 0
                        ? "Expire aujourd'hui"
                        : daysLeft === 1
                        ? "Expire demain"
                        : `${daysLeft} jours restants`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-body text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
              <div className="font-display text-2xl md:text-4xl">{stat.value}</div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="font-display text-lg md:text-xl">Activité Récente</CardTitle>
          <CardDescription className="text-sm">Derniers abonnements enregistrés</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          {subscriptions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Aucun abonnement enregistré pour le moment
            </p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {subscriptions.slice(0, 5).map((sub) => {
                const expired = isExpired(sub.endDate);
                const daysLeft = getDaysUntilExpiry(sub.endDate);
                const isWarning = daysLeft > 0 && daysLeft <= 8;

                return (
                  <div
                    key={sub.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded border gap-3 ${
                      expired 
                        ? "bg-destructive/10 border-destructive/50" 
                        : isWarning 
                        ? "bg-yellow-500/10 border-yellow-500/50" 
                        : "bg-background border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                        expired 
                          ? "bg-destructive/20" 
                          : isWarning 
                          ? "bg-yellow-500/20" 
                          : "bg-primary/20"
                      }`}>
                        <Users className={`w-4 h-4 md:w-5 md:h-5 ${
                          expired 
                            ? "text-destructive" 
                            : isWarning 
                            ? "text-yellow-500" 
                            : "text-primary"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm md:text-base">{sub.clientName}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{sub.planName}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:text-right">
                      <p className="font-display text-base md:text-lg">{sub.amount}€</p>
                      <Badge
                        variant={
                          expired ? 'destructive' :
                          isWarning ? 'secondary' :
                          sub.status === 'active' ? 'default' :
                          sub.status === 'pending' ? 'secondary' :
                          sub.status === 'cancelled' ? 'destructive' : 'outline'
                        }
                        className={`font-body text-xs ${
                          expired ? 'bg-destructive text-destructive-foreground' : 
                          isWarning ? 'bg-yellow-500 text-yellow-950' : ''
                        }`}
                      >
                        {expired 
                          ? 'Expiré' 
                          : isWarning 
                          ? `${daysLeft}j restants`
                          : sub.status === 'active' ? 'Actif' :
                            sub.status === 'pending' ? 'En attente' :
                            sub.status === 'cancelled' ? 'Annulé' : 'Expiré'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
