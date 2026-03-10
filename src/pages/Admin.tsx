import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, FileText, CreditCard, Users, LogOut, Calendar, Image, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import CMSEditor from "@/components/admin/CMSEditor";
import SubscriptionsManager from "@/components/admin/SubscriptionsManager";
import DashboardOverview from "@/components/admin/DashboardOverview";
import CoachesManager from "@/components/admin/CoachesManager";
import ScheduleManager from "@/components/admin/ScheduleManager";
import GalleryManager from "@/components/admin/GalleryManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import AdminLogin from "@/components/admin/AdminLogin";
import SettingsManager from "@/components/admin/SettingsManager";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check for existing session
    const authStatus = localStorage.getItem("forge_admin_auth");
    const sessionTime = localStorage.getItem("forge_admin_session");
    
    if (authStatus === "true" && sessionTime) {
      // Session expires after 24 hours
      const sessionAge = Date.now() - parseInt(sessionTime);
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge < maxSessionAge) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem("forge_admin_auth");
        localStorage.removeItem("forge_admin_session");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("forge_admin_auth");
    localStorage.removeItem("forge_admin_session");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1 md:gap-2 px-2 md:px-3">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Retour au site</span>
              </Button>
            </Link>
            <div className="hidden sm:block h-6 w-px bg-border" />
            <h1 className="font-display text-xl md:text-2xl text-primary">POWER</h1>
            <span className="font-body text-[10px] md:text-xs tracking-widest text-muted-foreground hidden sm:inline">BACKOFFICE</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1 md:gap-2 text-muted-foreground hover:text-foreground px-2 md:px-3">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-8">
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="inline-flex w-auto min-w-full md:grid md:w-full md:max-w-5xl md:grid-cols-8 bg-card border border-border">
              <TabsTrigger value="dashboard" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <LayoutDashboard className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="cms" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <FileText className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">CMS</span>
              </TabsTrigger>
              <TabsTrigger value="coaches" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Coachs</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Planning</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <Image className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Galerie</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Avis</span>
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Abonnements</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1 md:gap-2 text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 md:px-4">
                <Settings className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Paramètres</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="cms" className="space-y-6">
            <CMSEditor />
          </TabsContent>

          <TabsContent value="coaches" className="space-y-6">
            <CoachesManager />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <ScheduleManager />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <SubscriptionsManager />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
