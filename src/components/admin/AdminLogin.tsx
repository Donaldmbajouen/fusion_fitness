import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Default admin credentials (in production, use proper authentication)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "forge2024"
};

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem("forge_admin_auth", "true");
        localStorage.setItem("forge_admin_session", Date.now().toString());
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans le backoffice POWER FITNESS CLUB",
        });
        onLogin();
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Identifiants incorrects",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary mx-auto flex items-center justify-center mb-4">
            <span className="font-display text-3xl text-primary-foreground">P</span>
          </div>
          <h1 className="font-display text-4xl tracking-wider">POWER</h1>
          <span className="font-body text-xs tracking-[0.3em] text-muted-foreground">BACKOFFICE</span>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 mx-auto flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">Connexion Admin</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder au backoffice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Identifiant</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-background pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-accent font-body tracking-widest py-6"
              >
                {isLoading ? "CONNEXION..." : "SE CONNECTER"}
              </Button>
            </form>
            <p className="text-center text-xs text-muted-foreground mt-6">
              Identifiants par défaut: admin / forge2024
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
