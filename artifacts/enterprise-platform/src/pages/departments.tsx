  import React from "react";
  import { useGetDashboard } from "@workspace/api-client-react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Progress } from "@/components/ui/progress";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Building2, Shield, Users, Server, DollarSign, FileText, Database } from "lucide-react";
  import { useLanguage } from "@/lib/language-context";

  export default function Departments() {
    const { data: dashboard, isLoading } = useGetDashboard();
    const { t } = useLanguage();
    const departmentNames: Record<string, string> = {
    "Operations Office": t.OperationsOffice,
    "HR & Admin Department": t.HRAdminDepartment,
    "PMO Office": t.PMOOffice,
    "Projects Delivery Department": t.ProjectsDeliveryDepartment,
    "Finance Department": t.FinanceDepartment,
    "Strategic Partnerships Development Department": t.StrategicPartnershipsDevelopmentDepartment,
    "Business Development Department": t.BusinessDevelopmentDepartment,
    "Quality and Governance Department": t.QualityAndGovernanceDepartment,
    "IT Department": t.ITDepartment,
    "Procurement & Contracts": t.ProcurementContracts,
    "Training Entities Department": t.TrainingEntitiesDepartment,
    "Strategic Partnerships Follow-up Department": t.StrategicPartnershipsFollowUpDepartment,
    "Training Solutions Department": t.TrainingSolutionsDepartment,
    "Marketing Department": t.MarketingDepartment,
    "Facility Management Department": t.FacilityManagementDepartment,
    "Account Management Department": t.AccountManagementDepartment,
    "Projects Department": t.ProjectsDepartment,
  };

  const departmentDescriptions: Record<string, string> = {
  "Coordinates enterprise-wide operational activities and execution.": t.OperationsOfficeDescription,
  "Manages employees, administration, attendance, and HR services.": t.HRAdminDepartmentDescription,
  "Oversees project governance, planning, and portfolio management.": t.PMOOfficeDescription,
  "Executes and delivers strategic projects.": t.ProjectsDeliveryDepartmentDescription,
  "Handles budgets, accounting, payments, and financial reporting.": t.FinanceDepartmentDescription,
  "Develops and expands strategic partnerships.": t.StrategicPartnershipsDevelopmentDepartmentDescription,
  "Identifies new business opportunities and growth initiatives.": t.BusinessDevelopmentDepartmentDescription,
  "Ensures quality standards, compliance, and governance.": t.QualityAndGovernanceDepartmentDescription,
  "Supports infrastructure, applications, cybersecurity, and IT services.": t.ITDepartmentDescription,
  "Manages procurement activities and contractual agreements.": t.ProcurementContractsDescription,
  "Coordinates training providers and educational institutions.": t.TrainingEntitiesDepartmentDescription,
  "Monitors and follows up strategic partnership initiatives.": t.StrategicPartnershipsFollowUpDepartmentDescription,
  "Designs and delivers professional training solutions.": t.TrainingSolutionsDepartmentDescription,
  "Leads branding, marketing campaigns, and communications.": t.MarketingDepartmentDescription,
  "Maintains facilities, assets, and workplace operations.": t.FacilityManagementDepartmentDescription,
  "Manages customer relationships and strategic accounts.": t.AccountManagementDepartmentDescription,
  "Coordinates ongoing internal and external projects.": t.ProjectsDepartmentDescription,
};

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
          <h2 className="text-2xl font-bold tracking-tight">{t.DepartmentModules}</h2>
          <p className="text-muted-foreground mt-1">{t.DepartmentModulesDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboard.modules.map((mod, idx) => (
            <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors group cursor-pointer">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-lg mb-1">
                    {departmentNames[mod.name] || mod.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground line-clamp-2 pr-4">{departmentDescriptions[mod.description] || mod.description}</p>
                </div>
                <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  {getIcon(mod.name)}
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="flex items-end justify-between mb-2">
                  <span className="text-sm font-medium">{t.HealthScore}</span>
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
