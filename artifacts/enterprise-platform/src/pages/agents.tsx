import { useListAgents, useGetDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Cpu, Radio, ShieldCheck, Zap } from "lucide-react";

const domainColor: Record<string, string> = {
  Orchestration: "border-primary/40 bg-primary/10 text-primary",
  HR: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  IT: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  Finance: "border-accent/40 bg-accent/10 text-accent",
  Procurement: "border-orange-500/40 bg-orange-500/10 text-orange-400",
  Knowledge: "border-violet-500/40 bg-violet-500/10 text-violet-400",
  Reporting: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
  Notification: "border-pink-500/40 bg-pink-500/10 text-pink-400",
  Security: "border-red-500/40 bg-red-500/10 text-red-400",
};

export default function Agents() {
  const { data: agents, isLoading } = useListAgents();
  const { data: dashboard } = useGetDashboard();

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-44 rounded-xl" />)}
    </div>
  );

  const totalRequests = (dashboard?.summary.resolvedToday ?? 0) + (dashboard?.summary.pendingApprovals ?? 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary" />
            AI Agent Network
          </h2>
          <p className="text-muted-foreground">Phase 8 — Extensible autonomous agents handling cross-department operations</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">All agents online</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur text-center">
          <CardContent className="pt-5">
            <div className="text-2xl font-bold text-primary">{agents?.length ?? 9}</div>
            <p className="text-xs text-muted-foreground mt-1">Active Agents</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur text-center">
          <CardContent className="pt-5">
            <div className="text-2xl font-bold text-emerald-400">{totalRequests}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Requests</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur text-center">
          <CardContent className="pt-5">
            <div className="text-2xl font-bold text-accent">{dashboard?.summary.automationSuccess ?? 87}%</div>
            <p className="text-xs text-muted-foreground mt-1">Automation Rate</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur text-center">
          <CardContent className="pt-5">
            <div className="text-2xl font-bold text-blue-400">{dashboard?.summary.sla ?? 98}%</div>
            <p className="text-xs text-muted-foreground mt-1">SLA Compliance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agents?.map((agent, idx) => (
          <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/40 transition-colors group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${domainColor[agent.domain] ?? "border-border bg-muted"}`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors">
                      {agent.name}
                    </CardTitle>
                    <CardDescription className="text-xs">{agent.domain}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-400">Live</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">{agent.role}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className={`text-[10px] ${domainColor[agent.domain] ?? ""}`}>
                  {agent.domain}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  <Zap className="w-2.5 h-2.5 mr-1" /> Autonomous
                </Badge>
                {agent.domain === "Orchestration" && (
                  <Badge variant="outline" className="text-[10px] border-primary/30">
                    <ShieldCheck className="w-2.5 h-2.5 mr-1" /> Master
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Phase 8 — Enterprise Operating System
          </CardTitle>
          <CardDescription>
            Cross-department orchestration, predictive intelligence, and extensible production integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Cross-dept orchestration", "Predictive intelligence", "Extensible agents", "Production integrations"].map((item) => (
              <div key={item} className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
