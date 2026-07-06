import React from "react";
import { useCreateRequest, useSimulateRequest, ClassificationResult } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TerminalSquare, Zap, Search, Key, Plane, Receipt, Box } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Workspace() {
  const [prompt, setPrompt] = React.useState("");
  const [simulation, setSimulation] = React.useState<ClassificationResult | null>(null);
  
  const createRequest = useCreateRequest();
  const simulateRequest = useSimulateRequest();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSimulate = async () => {
    if (!prompt.trim()) return;
    try {
      const res = await simulateRequest.mutateAsync({ data: { text: prompt } });
      setSimulation(res);
    } catch (err) {
      toast({ title: t.SimulationFailed, variant: "destructive" });
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    try {
      await createRequest.mutateAsync({ data: { text: prompt } });
      toast({ title: t.RequestSubmitted, description: t.RequestSubmittedDescription });
      setPrompt("");
      setSimulation(null);
    } catch (err) {
      toast({ title: t.SubmissionFailed , variant: "destructive" });
    }
  };

  const templates = [
    { title: t.AccessRequest, icon: Key, text: t.AccessRequestExample },
    { title: t.LeaveRequest, icon: Plane, text: t.LeaveRequestExample },
    { title: t.ExpenseClaim, icon: Receipt, text: t.ExpenseClaimExample },
    { title: t.Procurement, icon: Box, text: t.ProcurementExample }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-destructive border-destructive/50 bg-destructive/10';
      case 'medium': return 'text-accent border-accent/50 bg-accent/10';
      default: return 'text-emerald-500 border-emerald-500/50 bg-emerald-500/10';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <TerminalSquare className="w-6 h-6 text-primary" />
          {t.Workspace}
        </h2>
        <p className="text-muted-foreground mt-1">{t.WorkspaceDescription}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {templates.map((tpl, i) => (
          <button
            key={i}
            onClick={() => setPrompt(tpl.text)}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-primary/5 hover:border-primary/30 transition-all text-center group"
          >
            <tpl.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
            <span className="text-xs font-medium">{tpl.title}</span>
          </button>
        ))}
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur shadow-lg">
        <CardHeader>
          <CardTitle>{t.CommandInput}</CardTitle>
          <CardDescription>{t.CommandDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.CommandPlaceholder}
            className="min-h-[150px] bg-background/50 border-border resize-none text-lg p-4 focus-visible:ring-primary"
          />
          
          {simulation && (
            <div className="mt-4 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  {t.RoutingAnalysis}
                </h4>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-background/50 capitalize">{t[simulation.module as keyof typeof t] ?? simulation.module}</Badge>
                  <Badge variant="outline" className={getRiskColor(simulation.risk)}>{t.Risk}: {t[simulation.risk as keyof typeof t] ?? simulation.risk}</Badge>
                  {simulation.approvalRequired && <Badge variant="outline" className="text-accent border-accent/50 bg-accent/10">{t.ApprovalRequired}</Badge>}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{t[simulation.summary as keyof typeof t] ?? simulation.summary}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border/50 pt-4">
          <Button 
            variant="outline" 
            onClick={handleSimulate} 
            disabled={!prompt.trim() || simulateRequest.isPending}
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            {simulateRequest.isPending ? t.Analyzing : t.SimulateRouting}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!prompt.trim() || createRequest.isPending}
            className="gap-2"
          >
            <Zap className="w-4 h-4" />
            {createRequest.isPending ? t.Executing : t.ExecuteCommand}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
