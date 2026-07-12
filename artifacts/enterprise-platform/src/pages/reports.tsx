import React from "react";
import { useListReports } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Reports() {
  const { data: reports, isLoading } = useListReports();
  const [selectedReport, setSelectedReport] = React.useState<any | null>(null);
  const { t } = useLanguage();

  const totalReports = reports?.length ?? 0;

  const aiReports =
    reports?.filter((report) =>
      report.title.toLowerCase().includes("ai")
    ).length ?? 0;

  const reportsThisMonth = reports?.length ?? 0;

  const averageConfidence = 96;

const [reportFilter, setReportFilter] = React.useState("all");

const filteredReports = reports?.filter((report) => {

  if (reportFilter === "all") return true;

  const period = report.period.toLowerCase();

  switch (reportFilter) {

    case "today":
      return period.includes("today");

    case "week":
      return period.includes("week");

    case "month":
      return period.includes("month");

    case "year":
      return period.includes("year");

    default:
      return true;

  }

}) ?? [];

 if (isLoading) {
  return (
    <div className="space-y-6">

      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            className="h-40 rounded-xl"
          />
        ))}
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
        <p className="text-muted-foreground mt-1">
          {t.ExecutiveReportsDescription}
          </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
    <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">
        {t.TotalReports}
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {totalReports}
      </h2>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">
        {t.AIReports}
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {aiReports}
      </h2>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">
        {t.ReportsThisMonth}
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {reportsThisMonth}
      </h2>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">
        {t.AverageConfidence}
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {averageConfidence}%
      </h2>
    </CardContent>
  </Card>

</div>

<div className="flex flex-wrap gap-3">

  <Button>

    {t.GenerateReport}

  </Button>

  <Button variant="outline">

    {t.ExportPDF}

  </Button>

  <Button variant="outline">

    {t.ExportExcel}

  </Button>

  <Button variant="outline">

    {t.ExportCSV}

  </Button>

</div>

<div className="flex flex-wrap gap-3 mb-6">

  <Button
    variant={reportFilter === "all" ? "default" : "outline"}
    onClick={() => setReportFilter("all")}
  >
    {t.All}
  </Button>

  <Button
    variant={reportFilter === "today" ? "default" : "outline"}
    onClick={() => setReportFilter("today")}
  >
    {t.Today}
  </Button>

  <Button
    variant={reportFilter === "week" ? "default" : "outline"}
    onClick={() => setReportFilter("week")}
  >
    {t.ThisWeek}
  </Button>

  <Button
    variant={reportFilter === "month" ? "default" : "outline"}
    onClick={() => setReportFilter("month")}
  >
    {t.ThisMonth}
  </Button>

  <Button
    variant={reportFilter === "year" ? "default" : "outline"}
    onClick={() => setReportFilter("year")}
  >
    {t.ThisYear}
  </Button>

</div>

<Card className="border-border/50 bg-card/40">

  <CardHeader>

    <CardTitle>

      {t.ExecutiveAnalytics}

    </CardTitle>

    <CardDescription>

      {t.ExecutiveAnalyticsDescription}

    </CardDescription>

  </CardHeader>

  <CardContent>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      <div className="rounded-xl border border-border p-5">

        <p className="text-sm text-muted-foreground">

          {t.ReportGrowth}

        </p>

        <h3 className="text-2xl font-bold text-emerald-500">

          +18%

        </h3>

      </div>

      <div className="rounded-xl border border-border p-5">

        <p className="text-sm text-muted-foreground">

          {t.AIUsage}

        </p>

        <h3 className="text-2xl font-bold">

          72%

        </h3>

      </div>

      <div className="rounded-xl border border-border p-5">

        <p className="text-sm text-muted-foreground">

          {t.ExecutiveEngagement}

        </p>

        <h3 className="text-2xl font-bold">

          94%

        </h3>

      </div>

      <div className="rounded-xl border border-border p-5">

        <p className="text-sm text-muted-foreground">

          {t.DataAccuracy}

        </p>

        <h3 className="text-2xl font-bold text-primary">

          99.4%

        </h3>

      </div>

    </div>

  </CardContent>

</Card>

<Card className="border-border/50 bg-card/40">

  <CardHeader>

    <CardTitle>

      {t.ExecutiveInsights}

    </CardTitle>

    <CardDescription>

      {t.ExecutiveInsightsDescription}

    </CardDescription>

  </CardHeader>

  <CardContent>

    <div className="space-y-4">

      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">

        <p className="font-medium text-emerald-500">

          ▲ {t.AIUsageIncrease}

        </p>

      </div>

      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">

        <p className="font-medium text-blue-500">

          ✓ {t.ExecutivePerformanceImproved}

        </p>

      </div>

      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">

        <p className="font-medium text-amber-500">

          ⚠ {t.SecurityRecommendation}

        </p>

      </div>

    </div>

  </CardContent>

</Card>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  <Card>

    <CardHeader>

      <CardTitle>{t.ReportsTrend}</CardTitle>

    </CardHeader>

    <CardContent>

      <div className="h-72 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">

        {t.ChartComingSoon}

      </div>

    </CardContent>

  </Card>

  <Card>

    <CardHeader>

      <CardTitle>{t.AIReportsDistribution}</CardTitle>

    </CardHeader>

    <CardContent>

      <div className="h-72 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">

        {t.ChartComingSoon}

      </div>

    </CardContent>

  </Card>

</div>

<Card className="border-border/50 bg-card/40">

  <CardHeader>

    <CardTitle>

      {t.RecentExecutiveActivity}

    </CardTitle>

    <CardDescription>

      {t.RecentExecutiveActivityDescription}

    </CardDescription>

  </CardHeader>

  <CardContent>

    <div className="space-y-4">

      <div className="flex items-center justify-between border-b border-border pb-3">

        <div>

          <p className="font-medium">

            {t.ExecutiveReportGenerated}

          </p>

          <p className="text-sm text-muted-foreground">

            5 min ago

          </p>

        </div>

      </div>

      <div className="flex items-center justify-between border-b border-border pb-3">

        <div>

          <p className="font-medium">

            {t.SecurityReportUpdated}

          </p>

          <p className="text-sm text-muted-foreground">

            18 min ago

          </p>

        </div>

      </div>

      <div className="flex items-center justify-between">

        <div>

          <p className="font-medium">

            {t.AIInsightGenerated}

          </p>

          <p className="text-sm text-muted-foreground">

            42 min ago

          </p>

        </div>

      </div>

    </div>

  </CardContent>

</Card>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {filteredReports.map((report) => (

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

        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">

          {report.title}

        </CardTitle>

      </CardHeader>

      <CardContent>

        <CardDescription className="text-sm line-clamp-3 leading-relaxed">

          {report.summary}

        </CardDescription>

      </CardContent>

    </Card>

  ))}

</div>

      <Card className="border-border/50 bg-card/40">

  <CardHeader>

    <CardTitle>

      {t.ReportHistory}

    </CardTitle>

    <CardDescription>

      {t.ReportHistoryDescription}

    </CardDescription>

  </CardHeader>

  <CardContent>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b border-border">

            <th className="text-left p-3">{t.Name}</th>

            <th className="text-left p-3">{t.Status}</th>

            <th className="text-left p-3">{t.Date}</th>

            <th className="text-right p-3">{t.Actions}</th>

          </tr>

        </thead>

        <tbody>

          {filteredReports.map((report) => (

            <tr
              key={report.id}
              className="border-b border-border"
            >

              <td className="p-3">

                {report.title}

              </td>

              <td className="p-3">

                <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs">

                  {t.Completed}

                </span>

              </td>

              <td className="p-3">

                {report.period}

              </td>

              <td className="p-3 text-right">

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedReport(report)}
                >

                  {t.View}

                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </CardContent>

</Card>

<Dialog
  open={!!selectedReport}
  onOpenChange={(open) => !open && setSelectedReport(null)}
>
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
