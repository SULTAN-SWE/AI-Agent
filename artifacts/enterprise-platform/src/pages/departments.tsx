import React from "react";
import { useGetDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Shield, Users, Server, DollarSign, FileText, Database } from "lucide-react";

export default function Departments() {
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      </div>
    );
  }

  const getIcon = (name: string) => {
    const icons: Record<string, any> = {
      'HR': Users,
      'IT': Server,
      'Finance': DollarSign,
      'Procurement': FileText,
      'Knowledge': Database,
      'Reports': Building2,
      'Security': Shield,
    };
    const Icon = icons[name] || Building2;
    return <Icon className="w-6 h-6 opacity-70" />;
  };

  const getColorClass = (score: number) => {
    if (score >= 90) return 'text-emerald-500 [&>div]:bg-emerald-500';
    if (score >= 70) return 'text-accent [&>div]:bg-accent';
    return 'text-destructive [&>div]:bg-destructive';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Department Modules</h2>
        <p className="text-muted-foreground mt-1">Live health scores and automation metrics across the organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboard.modules.map((mod, idx) => (
          <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors group cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg mb-1">{mod.name}</CardTitle>
                <p className="text-xs text-muted-foreground line-clamp-2 pr-4">{mod.description}</p>
              </div>
              <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                {getIcon(mod.name)}
              </div>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-medium">Health Score</span>
                <span className={`text-2xl font-bold ${getColorClass(mod.score).split(' ')[0]}`}>{mod.score}</span>
              </div>
              <Progress value={mod.score} className={`h-1.5 ${getColorClass(mod.score).split(' ')[1]}`} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
