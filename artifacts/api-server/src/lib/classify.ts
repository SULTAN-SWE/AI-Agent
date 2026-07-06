export type ClassificationResult = {
  module: string;   // translation key
  risk: string;     // translation key
  approval: boolean;
  summary: string;  // translation key
};

export function classifyRequest(text: string): ClassificationResult {
  const t = (text || "").toLowerCase();

  const anyTerm = (...terms: string[]) => terms.some((term) => t.includes(term));

  if (anyTerm("salary", "budget approval", "transfer", "payment", "financial", "راتب", "ميزانية", "sueldo", "financ", "paiement")) {
    return { module: "FINANCE", risk: "HIGH", approval: true, summary: "FINANCE_APPROVAL_REQUIRED" };
  }
  if (anyTerm("vendor", "purchase", "quote", "laptop", "procure", "مورد", "مشتريات", "proveedor", "leverancier", "fournisseur")) {
    return { module: "PROCUREMENT", risk: "MEDIUM", approval: true, summary: "PROCUREMENT_ROUTED" };
  }
  if (anyTerm("leave", "vacation", "holiday", "congé", "verlof", "vacaciones", "إجازة")) {
    return { module: "HR", risk: "MEDIUM", approval: true, summary: "HR_LEAVE_REQUEST" };
  }
  if (anyTerm("password", "vpn", "device", "access", "ticket", "software", "power bi", "printer", "toegang", "acceso", "accès", "وصول")) {
    const low = anyTerm("password", "vpn", "printer");
    return { module: "IT", risk: low ? "LOW" : "MEDIUM", approval: false, summary: "IT_REQUEST_HANDLED" };
  }
  if (anyTerm("policy", "sop", "documentation", "faq", "knowledge", "evidence", "beleid", "política", "politique", "سياسة")) {
    return { module: "KNOWLEDGE", risk: "LOW", approval: false, summary: "KNOWLEDGE_SEARCH" };
  }
  if (anyTerm("audit", "security", "risk", "compliance", "beveiliging", "seguridad", "sécurité", "أمن")) {
    return { module: "SECURITY", risk: "MEDIUM", approval: false, summary: "SECURITY_REVIEW" };
  }
  return { module: "OPERATIONS", risk: "LOW", approval: false, summary: "GENERAL_REQUEST_ROUTED" };
}

export const AGENTS = [
  { name: "MASTER_AI_AGENT", domain: "ORCHESTRATION", role: "MASTER_AI_AGENT_ROLE" },
  { name: "HR_AGENT", domain: "HR", role: "HR_AGENT_ROLE"},
  { name: "IT_AGENT", domain: "IT", role: "IT_AGENT_ROLE" },
  { name: "FINANCE_AGENT", domain: "FINANCE", role: "FINANCE_AGENT_ROLE" },
  { name: "PROCUREMENT_AGENT", domain: "PROCUREMENT", role: "PROCUREMENT_AGENT_ROLE" },
  { name: "KNOWLEDGE_AGENT", domain: "KNOWLEDGE", role: "KNOWLEDGE_AGENT_ROLE" },
  { name: "REPORTING_AGENT", domain: "REPORTING", role: "REPORTING_AGENT_ROLE" },
  { name: "NOTIFICATION_AGENT", domain: "NOTIFICATION", role: "NOTIFICATION_AGENT_ROLE"},
  { name: "SECURITY_AGENT", domain: "SECURITY", role: "SECURITY_AGENT_ROLE" },
];

export const MODULES = [
  { name: "Operations Office", description: "Coordinates enterprise-wide operational activities and execution.", score: 98 },
  { name: "HR & Admin Department", description: "Manages employees, administration, attendance, and HR services.", score: 96 },
  { name: "PMO Office", description: "Oversees project governance, planning, and portfolio management.", score: 95 },
  { name: "Projects Delivery Department", description: "Executes and delivers strategic projects.", score: 94 },
  { name: "Finance Department", description: "Handles budgets, accounting, payments, and financial reporting.", score: 97 },
  { name: "Strategic Partnerships Development Department", description: "Develops and expands strategic partnerships.", score: 92 },
  { name: "Business Development Department", description: "Identifies new business opportunities and growth initiatives.", score: 91 },
  { name: "Quality and Governance Department", description: "Ensures quality standards, compliance, and governance.", score: 95 },
  { name: "IT Department", description: "Supports infrastructure, applications, cybersecurity, and IT services.", score: 97 },
  { name: "Procurement & Contracts", description: "Manages procurement activities and contractual agreements.", score: 93 },
  { name: "Training Entities Department", description: "Coordinates training providers and educational institutions.", score: 90 },
  { name: "Strategic Partnerships Follow-up Department", description: "Monitors and follows up strategic partnership initiatives.", score: 91 },
  { name: "Training Solutions Department", description: "Designs and delivers professional training solutions.", score: 92 },
  { name: "Marketing Department", description: "Leads branding, marketing campaigns, and communications.", score: 94 },
  { name: "Facility Management Department", description: "Maintains facilities, assets, and workplace operations.", score: 93 },
  { name: "Account Management Department", description: "Manages customer relationships and strategic accounts.", score: 92 },
  { name: "Projects Department", description: "Coordinates ongoing internal and external projects.", score: 91 },
];

export const ROADMAP = [
  { phase: "PHASE_1", name: "MINIMUM_VIABLE_PLATFORM", status: "covered", items: ["AUTHENTICATION", "RBAC", "AI_WORKSPACE", "CORE_MODULES", "AUDIT_LOGGING", "BASIC_DASHBOARD"] },
  { phase: "PHASE_2", name: "ENTERPRISE_AUTOMATION", status: "covered", items: ["ONBOARDING", "OFFBOARDING", "AUTOMATIC_ROUTING", "REMINDERS", "ESCALATIONS"] },
  { phase: "PHASE_3", name: "EXECUTIVE_INTELLIGENCE", status: "covered", items: ["KPI_DASHBOARDS", "INSIGHTS", "RECOMMENDATIONS", "TREND_ANALYSIS"] },
  { phase: "PHASE_4", name: "KNOWLEDGE_INTELLIGENCE", status: "covered", items: ["POLICY_RETRIEVAL", "INTERNAL_DOCUMENTS", "FAQ_ASSISTANCE", "MEMORY"] },
  { phase: "PHASE_5", name: "WORKFLOW_SCALE_OUT", status: "covered", items: ["DEPARTMENT_EXPANSION", "REUSABLE_TEMPLATES", "WORKFLOW_ORCHESTRATION", "NOTIFICATIONS"] },
  { phase: "PHASE_6", name: "DEPLOYMENT_HARDENING", status: "covered", items: ["CONTAINERIZATION", "REVERSE_PROXY", "PERSISTENT_SESSIONS", "MANAGED_DATABASE"] },
  { phase: "PHASE_7", name: "AUTONOMOUS_LOW_RISK_OPS", status: "covered", items: ["PASSWORD_RESET", "FAQ_RESPONSE", "ROUTINE_NOTIFICATIONS", "DEVICE_ASSIGNMENT"] },
  { phase: "PHASE_8", name: "ENTERPRISE_OPERATING_SYSTEM", status: "covered", items: ["CROSS_DEPARTMENT_ORCHESTRATION", "PREDICTIVE_INTELLIGENCE", "EXTENSIBLE_AGENTS", "PRODUCTION_INTEGRATIONS"] },
];
