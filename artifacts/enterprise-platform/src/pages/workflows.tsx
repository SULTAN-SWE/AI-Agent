import React from "react";
import { useListWorkflowRuns, useCreateRequest } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { GitBranch, UserPlus, UserMinus, Key, Plane, Receipt, Box, RefreshCw, CheckCircle, Clock, XCircle, Zap } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
const TEMPLATES = [
  {
    id: "onboarding",
    name: "Employee Onboarding",
    description: "Provision accounts, assign devices, schedule orientation, and send welcome notifications.",
    icon: UserPlus,
    module: "HR",
    risk: "Low",
    prompt: "Initiate full employee onboarding workflow: create accounts, provision devices, assign buddy, schedule orientation.",
    phase: "PHASE_2",
  },
  {
    id: "offboarding",
    name: "Employee Offboarding",
    description: "Revoke access, collect equipment, process final pay, and archive records.",
    icon: UserMinus,
    module: "HR",
    risk: "High",
    prompt: "Initiate employee offboarding: revoke all system access, collect company devices, process final payroll.",
    phase: "Phase 2",
  },
  {
    id: "password-reset",
    name: "Password Reset",
    description: "Self-service password reset with identity verification. Fully automated, low-risk.",
    icon: Key,
    module: "IT",
    risk: "Low",
    prompt: "I need to reset my password for the corporate systems. Automated reset required.",
    phase: "Phase 7",
  },
  {
    id: "leave-request",
    name: "Leave Request",
    description: "Submit annual or sick leave with balance check and manager routing.",
    icon: Plane,
    module: "HR",
    risk: "Medium",
    prompt: "I would like to request annual leave for next week from Monday to Thursday.",
    phase: "Phase 2",
  },
  {
    id: "expense-claim",
    name: "Expense Reimbursement",
    description: "Submit expenses with receipt validation and automatic threshold routing.",
    icon: Receipt,
    module: "Finance",
    risk: "Medium",
    prompt: "Submitting expense reimbursement claim for client entertainment and travel costs.",
    phase: "Phase 2",
  },
  {
    id: "procurement",
    name: "Procurement Request",
    description: "Raise a purchase request with vendor validation and budget approval routing.",
    icon: Box,
    module: "Procurement",
    risk: "Medium",
    prompt: "We need to procure new equipment for the department. Raising a formal purchase request.",
    phase: "Phase 5",
  },
];

const statusIcon = (s: string) => {
  if (s === "completed") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
  if (s === "failed") return <XCircle className="w-4 h-4 text-destructive" />;
  return <Clock className="w-4 h-4 text-accent" />;
};

const riskBadge = (r: string) => {
  if (r === "High") return "border-destructive/40 bg-destructive/10 text-destructive";
  if (r === "Medium") return "border-accent/40 bg-accent/10 text-accent";
  return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
};

export default function Workflows() {
  const { t } = useLanguage();
  const { data: runs, isLoading: runsLoading, refetch } = useListWorkflowRuns();
  const createRequest = useCreateRequest();
  const { toast } = useToast();
  const [launching, setLaunching] = React.useState<string | null>(null);


  const handleLaunch = async (template: typeof TEMPLATES[0]) => {
    setLaunching(template.id);
    try {
      await createRequest.mutateAsync({ data: { text: template.prompt } });
      toast({ title: `${template.name} launched`, description: "Request routed and workflow initiated." });
      refetch();
    } catch {
      toast({ title: "Launch failed", variant: "destructive" });
    } finally {
      setLaunching(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-primary" />
          {t["Workflow Templates"]}
        </h2>
        <p className="text-muted-foreground">{t["Phase 2 & 5 — Reusable enterprise automation workflows"]}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEMPLATES.map((template) => (
          <Card key={template.id} className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/40 transition-colors group flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <template.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors">{t[template.name as keyof typeof t] ?? template.name}</CardTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge variant="outline" className="text-[10px] px-1.5">{t[template.module as keyof typeof t] ?? template.module}</Badge>
                      <Badge variant="outline" className={`text-[10px] px-1.5 ${riskBadge(template.risk)}`}>{t[template.risk as keyof typeof t] ?? template.risk}</Badge>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] border-primary/20 text-primary whitespace-nowrap">{t[template.phase as keyof typeof t] ?? template.phase}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-4 pt-0">
              <CardDescription className="text-sm leading-relaxed">{t[template.description as keyof typeof t] ?? template.description}</CardDescription>
              <Button
                size="sm"
                className="w-full gap-2"
                disabled={launching === template.id}
                onClick={() => handleLaunch(template)}
              >
                {launching === template.id ? (
                  <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t["Launching..."]}</>
                ) : (
                  <><Zap className="w-3.5 h-3.5" /> {t["Launch Workflow"]}</>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t["Recent Workflow Runs"]}</CardTitle>
            <CardDescription>{t["Your previously executed workflows"]}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {runsLoading ? (
            <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-14 rounded-lg" />)}</div>
          ) : !runs || runs.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <GitBranch className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">{t["No workflow runs yet. Launch one above."]}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {runs.map(run => (
                <div key={run.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-3">
                    {statusIcon(run.status)}
                    <div>
                      <p className="text-sm font-medium">{t[run.workflowName as keyof typeof t] ?? run.workflowName}</p>
                      <p className="text-xs text-muted-foreground">{t[run.module as keyof typeof t] ?? run.module} • {new Date(run.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize text-xs">{t[run.status as keyof typeof t] ?? run.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
