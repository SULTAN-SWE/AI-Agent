export type ClassificationResult = {
  module: string;
  risk: string;
  approval: boolean;
  summary: string;
};

export function classifyRequest(text: string): ClassificationResult {
  const t = (text || "").toLowerCase();

  const anyTerm = (...terms: string[]) => terms.some((term) => t.includes(term));

  if (anyTerm("salary", "budget approval", "transfer", "payment", "financial", "راتب", "ميزانية", "sueldo", "financ", "paiement")) {
    return { module: "Finance", risk: "High", approval: true, summary: "Finance-sensitive action detected and queued for human approval." };
  }
  if (anyTerm("vendor", "purchase", "quote", "laptop", "procure", "مورد", "مشتريات", "proveedor", "leverancier", "fournisseur")) {
    return { module: "Procurement", risk: "Medium", approval: true, summary: "Procurement request is routed through vendor and threshold checks." };
  }
  if (anyTerm("leave", "vacation", "holiday", "congé", "verlof", "vacaciones", "إجازة")) {
    return { module: "HR", risk: "Medium", approval: true, summary: "HR leave request requires balance and manager review." };
  }
  if (anyTerm("password", "vpn", "device", "access", "ticket", "software", "power bi", "printer", "toegang", "acceso", "accès", "وصول")) {
    const low = anyTerm("password", "vpn", "printer");
    return { module: "IT", risk: low ? "Low" : "Medium", approval: false, summary: "IT request is being handled with automatic troubleshooting and provisioning." };
  }
  if (anyTerm("policy", "sop", "documentation", "faq", "knowledge", "evidence", "beleid", "política", "politique", "سياسة")) {
    return { module: "Knowledge", risk: "Low", approval: false, summary: "Knowledge search is retrieving policy and document sources." };
  }
  if (anyTerm("audit", "security", "risk", "compliance", "beveiliging", "seguridad", "sécurité", "أمن")) {
    return { module: "Security", risk: "Medium", approval: false, summary: "Security monitoring and risk review are engaged." };
  }
  return { module: "Operations", risk: "Low", approval: false, summary: "General request routed to the master orchestrator." };
}

export const AGENTS = [
  { name: "Master AI Agent", domain: "Orchestration", role: "Routes requests, merges results, and enforces governance." },
  { name: "HR Agent", domain: "HR", role: "Handles leave, onboarding, documents, and policies." },
  { name: "IT Agent", domain: "IT", role: "Handles access, troubleshooting, devices, and tickets." },
  { name: "Finance Agent", domain: "Finance", role: "Handles expenses, budgets, invoices, and payment approvals." },
  { name: "Procurement Agent", domain: "Procurement", role: "Handles purchase requests, vendors, and purchase orders." },
  { name: "Knowledge Agent", domain: "Knowledge", role: "Retrieves policies, SOPs, and internal documentation." },
  { name: "Reporting Agent", domain: "Reporting", role: "Summarizes KPIs, trends, and executive reports." },
  { name: "Notification Agent", domain: "Notification", role: "Delivers reminders, escalations, and updates." },
  { name: "Security Agent", domain: "Security", role: "Monitors audit, access, and risk behavior." },
];

export const MODULES = [
  { name: "HR", description: "Leave, onboarding, employee records, and policy support.", score: 97 },
  { name: "IT", description: "Password reset, access, devices, software, and ticketing.", score: 90 },
  { name: "Finance", description: "Expenses, budgets, invoices, and payment approvals.", score: 94 },
  { name: "Procurement", description: "Purchase requests, vendors, and purchase orders.", score: 88 },
  { name: "Knowledge", description: "Policies, SOPs, internal documents, and FAQs.", score: 98 },
  { name: "Reports", description: "Operational summaries, KPIs, and executive briefs.", score: 96 },
  { name: "Security", description: "Audit logs, risk scoring, and access monitoring.", score: 99 },
];

export const ROADMAP = [
  { phase: "Phase 1", name: "Minimum viable platform", status: "covered", items: ["Authentication", "RBAC", "AI workspace", "Core modules", "Audit logging", "Basic dashboard"] },
  { phase: "Phase 2", name: "Enterprise automation", status: "covered", items: ["Onboarding", "Offboarding", "Automatic routing", "Reminders", "Escalations"] },
  { phase: "Phase 3", name: "Executive intelligence", status: "covered", items: ["KPI dashboards", "Insights", "Recommendations", "Trend analysis"] },
  { phase: "Phase 4", name: "Knowledge intelligence", status: "covered", items: ["Policy retrieval", "Internal documents", "FAQ assistance", "Memory"] },
  { phase: "Phase 5", name: "Workflow scale-out", status: "covered", items: ["Department expansion", "Reusable templates", "Workflow orchestration", "Notifications"] },
  { phase: "Phase 6", name: "Deployment hardening", status: "covered", items: ["Containerization", "Reverse proxy", "Persistent sessions", "Managed database"] },
  { phase: "Phase 7", name: "Autonomous low-risk ops", status: "covered", items: ["Password reset", "FAQ response", "Routine notifications", "Device assignment"] },
  { phase: "Phase 8", name: "Enterprise operating system", status: "covered", items: ["Cross-department orchestration", "Predictive intelligence", "Extensible agents", "Production integrations"] },
];
