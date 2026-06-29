import re


def classify_request(text: str):
    t = (text or "").lower()

    def any_term(*terms):
        return any(term in t for term in terms)

    if any_term("salary", "budget approval", "transfer", "payment", "financial", "راتب", "ميزانية", "sueldo", "financ", "paiement"):
        return {"module": "Finance", "risk": "High", "approval": True, "summary": "Finance-sensitive action detected and queued for human approval."}
    if any_term("vendor", "purchase", "quote", "laptop", "procure", "مورد", "مشتريات", "proveedor", "leverancier", "fournisseur"):
        return {"module": "Procurement", "risk": "Medium", "approval": True, "summary": "Procurement request is routed through vendor and threshold checks."}
    if any_term("leave", "vacation", "holiday", "congé", "verlof", "vacaciones", "إجازة"):
        return {"module": "HR", "risk": "Medium", "approval": True, "summary": "HR leave request requires balance and manager review."}
    if any_term("password", "vpn", "device", "access", "ticket", "software", "power bi", "printer", "toegang", "acceso", "accès", "وصول"):
        low = any_term("password", "vpn", "printer")
        return {"module": "IT", "risk": "Low" if low else "Medium", "approval": False, "summary": "IT request is being handled with automatic troubleshooting and provisioning."}
    if any_term("policy", "sop", "documentation", "faq", "knowledge", "evidence", "beleid", "política", "politique", "سياسة"):
        return {"module": "Knowledge", "risk": "Low", "approval": False, "summary": "Knowledge search is retrieving policy and document sources."}
    if any_term("audit", "security", "risk", "compliance", "beveiliging", "seguridad", "sécurité", "أمن"):
        return {"module": "Security", "risk": "Medium", "approval": False, "summary": "Security monitoring and risk review are engaged."}
    return {"module": "Operations", "risk": "Low", "approval": False, "summary": "General request routed to the master orchestrator."}


def build_agents():
    return [
        {"name": "Master AI Agent", "domain": "Orchestration", "role": "Routes requests, merges results, and enforces governance."},
        {"name": "HR Agent", "domain": "HR", "role": "Handles leave, onboarding, documents, and policies."},
        {"name": "IT Agent", "domain": "IT", "role": "Handles access, troubleshooting, devices, and tickets."},
        {"name": "Finance Agent", "domain": "Finance", "role": "Handles expenses, budgets, invoices, and payment approvals."},
        {"name": "Procurement Agent", "domain": "Procurement", "role": "Handles purchase requests, vendors, and purchase orders."},
        {"name": "Knowledge Agent", "domain": "Knowledge", "role": "Retrieves policies, SOPs, and internal documentation."},
        {"name": "Reporting Agent", "domain": "Reporting", "role": "Summarizes KPIs, trends, and executive reports."},
        {"name": "Notification Agent", "domain": "Notification", "role": "Delivers reminders, escalations, and updates."},
        {"name": "Security Agent", "domain": "Security", "role": "Monitors audit, access, and risk behavior."},
    ]


def build_journeys():
    return {
        "employee": [
            "Login securely",
            "Ask in natural language",
            "AI routes to department",
            "Workflow completes or escalates",
            "Audit trail and notification are stored",
        ],
        "manager": [
            "Open approvals dashboard",
            "Review AI recommendation",
            "Accept or reject with note",
            "Audit log updates automatically",
        ],
        "executive": [
            "Open KPI dashboard",
            "Review health, risk, and trends",
            "Read AI recommendations",
            "Act on strategic decisions",
        ],
    }


def build_roadmap():
    return [
        {"phase": "Phase 1", "name": "Minimum viable platform", "status": "covered", "items": ["Authentication", "RBAC", "AI workspace", "Core modules", "Audit logging", "Basic dashboard"]},
        {"phase": "Phase 2", "name": "Enterprise automation", "status": "covered", "items": ["Onboarding", "Offboarding", "Automatic routing", "Reminders", "Escalations"]},
        {"phase": "Phase 3", "name": "Executive intelligence", "status": "covered", "items": ["KPI dashboards", "Insights", "Recommendations", "Trend analysis"]},
        {"phase": "Phase 4", "name": "Knowledge intelligence", "status": "covered", "items": ["Policy retrieval", "Internal documents", "FAQ assistance", "Memory"]},
        {"phase": "Phase 5", "name": "Workflow scale-out", "status": "covered", "items": ["Department expansion", "Reusable templates", "Workflow orchestration", "Notifications"]},
        {"phase": "Phase 6", "name": "Deployment hardening", "status": "partial", "items": ["Containerization", "Reverse proxy", "Persistent sessions", "Managed database"]},
        {"phase": "Phase 7", "name": "Autonomous low-risk ops", "status": "partial", "items": ["Password reset", "FAQ response", "Routine notifications", "Device assignment"]},
        {"phase": "Phase 8", "name": "Enterprise operating system", "status": "partial", "items": ["Cross-department orchestration", "Predictive intelligence", "Extensible agents", "Production integrations"]},
    ]


def build_insights(conn):
    pending_requests = conn.execute("SELECT COUNT(*) AS c FROM requests WHERE status IN ('pending_approval','processing')").fetchone()["c"]
    open_notifications = conn.execute("SELECT COUNT(*) AS c FROM notifications WHERE status='unread'").fetchone()["c"]
    workflow_waiting = conn.execute("SELECT COUNT(*) AS c FROM workflow_runs WHERE status='waiting'").fetchone()["c"]
    return [
        {"scope": "executive", "title": "Operational backlog", "summary": f"{pending_requests} requests are still active across the platform.", "confidence": 91},
        {"scope": "manager", "title": "Notification load", "summary": f"{open_notifications} unread notifications remain for users.", "confidence": 88},
        {"scope": "workflow", "title": "Workflow staging", "summary": f"{workflow_waiting} workflows are waiting on human action.", "confidence": 90},
    ]

