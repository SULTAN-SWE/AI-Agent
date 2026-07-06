import React from "react";
import { useListReports } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Reports() {
  const { data: reports, isLoading } = useListReports();
  const [selectedReport, setSelectedReport] = React.useState<any | null>(null);
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div><Skeleton className="h-8 w-48 mb-2" /><Skeleton className="h-4 w-96" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-40 rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          {t.ExecutiveReports}
        </h2>
        <p className="text-muted-foreground mt-1">{t.ExecutiveReportsDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports?.map((report) => (
          <Card 
            key={report.id} 
            className="border-border/50 bg-card/40 hover:bg-card/70 backdrop-blur transition-all cursor-pointer group"
            onClick={() => setSelectedReport(report)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" />
                  {report.period}
                </div>
                <TrendingUp className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                {report.summary}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border/50">
          <DialogHeader>
            <div className="flex items-center gap-2 text-xs font-medium text-primary mb-2">
              <Calendar className="w-3 h-3" />
              {selectedReport?.period}
            </div>
            <DialogTitle className="text-xl">{selectedReport?.title}</DialogTitle>
            <DialogDescription className="text-base pt-4 text-foreground leading-relaxed">
              {selectedReport?.summary}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> {t.AIStrategicInsight}
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {selectedReport?.insight}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
