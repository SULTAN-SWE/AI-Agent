import React from "react";
import { useGetDashboard, useGetMe } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckSquare, Zap, Clock, ShieldAlert, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: user } = useGetMe();
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="col-span-2 h-96 rounded-xl" />
          <Skeleton className="col-span-1 h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  const { summary, recentRequests, pendingApprovals, insights, roadmap } = dashboard;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Executive Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {user?.displayName}. Here is your operations overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Company Health</CardTitle>
            <Activity className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.companyHealth}%</div>
            <Progress value={summary.companyHealth} className="h-1.5 mt-3 [&>div]:bg-emerald-500" />
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
            <CheckSquare className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Automation Success</CardTitle>
            <Zap className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.automationSuccess}%</div>
            <Progress value={summary.automationSuccess} className="h-1.5 mt-3 [&>div]:bg-primary" />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Today</CardTitle>
            <Clock className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.resolvedToday}</div>
            <p className="text-xs text-muted-foreground mt-2">SLA Adherence: {summary.sla}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Latest automated routings across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${req.status === 'resolved' ? 'bg-emerald-500' : req.status === 'pending' ? 'bg-accent' : 'bg-primary'}`} />
                      <div>
                        <p className="font-medium text-sm">{req.title}</p>
                        <p className="text-xs text-muted-foreground">{req.module} • {new Date(req.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">{req.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {insights && insights.length > 0 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {insights.map((insight, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-primary mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.summary}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-[10px] bg-background/50">{insight.scope}</Badge>
                          <span className="text-xs text-muted-foreground">Confidence: {insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Action Required</CardTitle>
                <CardDescription>Pending Approvals</CardDescription>
              </div>
              <Link href="/approvals" className="text-xs text-primary hover:underline flex items-center">
                View all <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No pending approvals.</p>
                ) : (
                  pendingApprovals.slice(0, 3).map(app => (
                    <div key={app.id} className="p-3 rounded-lg border border-accent/20 bg-accent/5">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-[10px] text-accent border-accent/30 bg-accent/10">{app.requestModule}</Badge>
                        <span className="text-xs text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm font-medium">{app.requestTitle}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {roadmap && roadmap.length > 0 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>System Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roadmap.map((phase, idx) => (
                    <div key={idx} className="relative pl-6 pb-4 last:pb-0">
                      <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full z-10 ${phase.status === 'covered' ? 'bg-emerald-500' : 'bg-muted-foreground border-2 border-background'}`} />
                      {idx < roadmap.length - 1 && (
                        <div className="absolute left-[4px] top-3.5 bottom-0 w-0.5 bg-border" />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">{phase.phase}</p>
                        <p className="text-sm font-medium mb-1">{phase.name}</p>
                        <p className="text-xs text-muted-foreground">{phase.items.join(" • ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
