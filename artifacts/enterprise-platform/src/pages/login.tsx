import React from "react";
import { useLocation } from "wouter";
import { useLogin, useGetMe } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminalSquare, Shield, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [location, setLocation] = useLocation();
  const { data: user } = useGetMe();
  const login = useLogin();
  const { toast } = useToast();
  
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (user) setLocation("/dashboard");
  }, [user, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ data: { username, password } }, {
      onSuccess: () => {
        setLocation("/dashboard");
      },
      onError: () => {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials. Please check your username and password.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 bg-card border-r border-border items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 text-primary mb-8">
            <TerminalSquare className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">Nexus AI Operations</h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            The intelligent operating layer connecting your entire organization. Precision-engineered for scale.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-border/50 bg-background/50 backdrop-blur rounded-xl p-5">
              <Shield className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">Bank-grade encryption and full audit logging.</p>
            </div>
            <div className="border border-border/50 bg-background/50 backdrop-blur rounded-xl p-5">
              <Activity className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="font-semibold mb-1">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">Live health scores and cross-department insights.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md border-border/50 shadow-2xl bg-card/80 backdrop-blur">
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="md:hidden flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <TerminalSquare className="w-6 h-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight">Access Command Center</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access the secure operations hub.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Operator ID</label>
                <Input 
                  placeholder="e.g. manager" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="bg-background/50 border-border/50 h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Passkey</label>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-background/50 border-border/50 h-11"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full h-11 text-base font-medium shadow-lg" disabled={login.isPending}>
                {login.isPending ? "Authenticating..." : "Initialize Session"}
              </Button>
            </form>

            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground text-center">
              <p className="font-medium text-foreground mb-1">Demo Credentials</p>
              <p>Accounts: <span className="text-primary font-mono">employee</span>, <span className="text-primary font-mono">manager</span>, <span className="text-primary font-mono">executive</span>, <span className="text-primary font-mono">admin</span></p>
              <p>Password: <span className="text-primary font-mono">Demo123!</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
