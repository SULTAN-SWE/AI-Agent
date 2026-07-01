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
  { name: "OPERATIONS_OFFICE", description: "OPERATIONS_OFFICE_DESCRIPTION", score: 98 },
  { name: "HR_ADMIN_DEPARTMENT", description: "HR_ADMIN_DEPARTMENT_DESCRIPTION", score: 96 },
  { name: "PMO_OFFICE", description: "PMO_OFFICE_DESCRIPTION", score: 95 },
  { name: "PROJECTS_DELIVERY_DEPARTMENT", description: "PROJECTS_DELIVERY_DEPARTMENT_DESCRIPTION", score: 94 },
  { name: "FINANCE_DEPARTMENT", description: "FINANCE_DEPARTMENT_DESCRIPTION", score: 97 },
  { name: "STRATEGIC_PARTNERSHIPS_DEVELOPMENT_DEPARTMENT", description: "STRATEGIC_PARTNERSHIPS_DEVELOPMENT_DEPARTMENT_DESCRIPTION", score: 92 },
  { name: "BUSINESS_DEVELOPMENT_DEPARTMENT", description: "BUSINESS_DEVELOPMENT_DEPARTMENT_DESCRIPTION", score: 91 },
  { name: "QUALITY_AND_GOVERNANCE_DEPARTMENT", description: "QUALITY_AND_GOVERNANCE_DEPARTMENT_DESCRIPTION", score: 95 },
  { name: "IT_DEPARTMENT", description: "IT_DEPARTMENT_DESCRIPTION", score: 97 },
  { name: "PROCUREMENT_CONTRACTS", description: "PROCUREMENT_CONTRACTS_DESCRIPTION", score: 93 },
  { name: "TRAINING_ENTITIES_DEPARTMENT", description: "TRAINING_ENTITIES_DEPARTMENT_DESCRIPTION", score: 90 },
  { name: "STRATEGIC_PARTNERSHIPS_FOLLOW_UP_DEPARTMENT", description: "STRATEGIC_PARTNERSHIPS_FOLLOW_UP_DEPARTMENT_DESCRIPTION", score: 91 },
  { name: "TRAINING_SOLUTIONS_DEPARTMENT", description: "TRAINING_SOLUTIONS_DEPARTMENT_DESCRIPTION", score: 92 },
  { name: "MARKETING_DEPARTMENT", description: "MARKETING_DEPARTMENT_DESCRIPTION", score: 94 },
  { name: "FACILITY_MANAGEMENT_DEPARTMENT", description: "FACILITY_MANAGEMENT_DEPARTMENT_DESCRIPTION", score: 93 },
  { name: "ACCOUNT_MANAGEMENT_DEPARTMENT", description: "ACCOUNT_MANAGEMENT_DEPARTMENT_DESCRIPTION", score: 92 },
  { name: "PROJECTS_DEPARTMENT", description: "PROJECTS_DEPARTMENT_DESCRIPTION", score: 91 },
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
