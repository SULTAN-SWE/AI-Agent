#!/usr/bin/env python3
import json
import os
import re
import secrets
import sqlite3
import threading
import time
from datetime import datetime, timezone
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from platform_layers import auth as auth_layer
from platform_layers import ai_core as ai_core_layer
from platform_layers import services as services_layer
from platform_layers import workflow_engine as workflow_layer
from platform_layers.schema import SCHEMA_SQL

ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "enterprise_platform.db"
HOST = os.environ.get("PLATFORM_HOST", "127.0.0.1")
PORT = int(os.environ.get("PLATFORM_PORT", "8010"))

TRANSLATIONS = {
    "en": {
        "app_name": "Enterprise AI Operations Platform",
        "app_sub": "Intelligent operating layer",
        "login_title": "Secure sign in",
        "login_note": "Demo accounts: employee / manager / executive / admin. Password: Demo123!",
        "lang": "Language",
        "theme": "Theme",
        "role": "Role",
        "light": "Light",
        "dark": "Dark",
        "overview": "Overview",
        "workspace": "AI Workspace",
        "departments": "Departments",
        "approvals": "Approvals",
        "knowledge": "Knowledge",
        "reports": "Reports",
        "security": "Security",
        "logout": "Logout",
        "refresh": "Refresh",
        "simulate": "Simulate request",
        "submit": "Submit request",
        "prompt_label": "Describe the request in plain language.",
        "placeholder": "I need Power BI access for next week.",
        "summary_title": "Operational summary",
        "request_title": "Request inbox",
        "approval_title": "Approval center",
        "knowledge_title": "Knowledge base",
        "report_title": "Executive reports",
        "audit_title": "Audit log",
        "metrics": ["Company health", "Pending approvals", "Automation success", "Resolved today"],
        "demo_prompts": [
            {"label": "Access request", "text": "I need Power BI access for next week."},
            {"label": "Leave request", "text": "I want vacation next month and need manager approval."},
            {"label": "Expense claim", "text": "Please reimburse my training expense of 450 SAR."},
            {"label": "Procurement", "text": "I need a vendor quote for 12 laptops."}
        ]
    },
    "ar": {
        "app_name": "منصة عمليات الذكاء الاصطناعي للمؤسسة",
        "app_sub": "طبقة تشغيل ذكية",
        "login_title": "تسجيل دخول آمن",
        "login_note": "حسابات تجريبية: employee / manager / executive / admin. كلمة المرور: Demo123!",
        "lang": "اللغة",
        "theme": "المظهر",
        "role": "الدور",
        "light": "فاتح",
        "dark": "داكن",
        "overview": "نظرة عامة",
        "workspace": "مساحة الذكاء",
        "departments": "الأقسام",
        "approvals": "الموافقات",
        "knowledge": "المعرفة",
        "reports": "التقارير",
        "security": "الأمن",
        "logout": "خروج",
        "refresh": "تحديث",
        "simulate": "محاكاة طلب",
        "submit": "إرسال الطلب",
        "prompt_label": "اكتب الطلب كما يقوله الموظف عادة.",
        "placeholder": "أحتاج إلى صلاحية Power BI للأسبوع القادم.",
        "summary_title": "ملخص العمليات",
        "request_title": "صندوق الطلبات",
        "approval_title": "مركز الموافقات",
        "knowledge_title": "قاعدة المعرفة",
        "report_title": "تقارير تنفيذية",
        "audit_title": "سجل التدقيق",
        "metrics": ["صحة الشركة", "الموافقات المعلقة", "نجاح الأتمتة", "تم الحل اليوم"],
        "demo_prompts": [
            {"label": "طلب وصول", "text": "أحتاج إلى صلاحية Power BI للأسبوع القادم."},
            {"label": "طلب إجازة", "text": "أريد إجازة الشهر القادم وأحتاج موافقة المدير."},
            {"label": "مطالبة مصروف", "text": "يرجى تعويضي عن مصروف تدريب بقيمة 450 ريال."},
            {"label": "مشتريات", "text": "أحتاج إلى عرض سعر من مورد لـ 12 جهاز لابتوب."}
        ]
    },
    "es": {
        "app_name": "Plataforma de Operaciones de IA Empresarial",
        "app_sub": "Capa operativa inteligente",
        "login_title": "Inicio de sesión seguro",
        "login_note": "Cuentas demo: employee / manager / executive / admin. Contraseña: Demo123!",
        "lang": "Idioma",
        "theme": "Tema",
        "role": "Rol",
        "light": "Claro",
        "dark": "Oscuro",
        "overview": "Resumen",
        "workspace": "Espacio IA",
        "departments": "Departamentos",
        "approvals": "Aprobaciones",
        "knowledge": "Conocimiento",
        "reports": "Informes",
        "security": "Seguridad",
        "logout": "Salir",
        "refresh": "Actualizar",
        "simulate": "Simular solicitud",
        "submit": "Enviar solicitud",
        "prompt_label": "Describe la solicitud en lenguaje natural.",
        "placeholder": "Necesito acceso a Power BI para la próxima semana.",
        "summary_title": "Resumen operativo",
        "request_title": "Bandeja de solicitudes",
        "approval_title": "Centro de aprobaciones",
        "knowledge_title": "Base de conocimiento",
        "report_title": "Informes ejecutivos",
        "audit_title": "Registro de auditoría",
        "metrics": ["Salud", "Aprobaciones pendientes", "Automatización", "Resueltas hoy"],
        "demo_prompts": [
            {"label": "Acceso", "text": "Necesito acceso a Power BI para la próxima semana."},
            {"label": "Permiso", "text": "Quiero vacaciones el próximo mes y necesito aprobación del gerente."},
            {"label": "Reembolso", "text": "Por favor reembolsen mi gasto de formación por 450 SAR."},
            {"label": "Compras", "text": "Necesito una cotización para 12 portátiles."}
        ]
    },
    "nl": {
        "app_name": "Enterprise AI Operations Platform",
        "app_sub": "Intelligente operationele laag",
        "login_title": "Veilig inloggen",
        "login_note": "Demo-accounts: employee / manager / executive / admin. Wachtwoord: Demo123!",
        "lang": "Taal",
        "theme": "Thema",
        "role": "Rol",
        "light": "Licht",
        "dark": "Donker",
        "overview": "Overzicht",
        "workspace": "AI-werkruimte",
        "departments": "Afdelingen",
        "approvals": "Goedkeuringen",
        "knowledge": "Kennis",
        "reports": "Rapporten",
        "security": "Beveiliging",
        "logout": "Uitloggen",
        "refresh": "Verversen",
        "simulate": "Verzoek simuleren",
        "submit": "Verzoek indienen",
        "prompt_label": "Beschrijf het verzoek in gewone taal.",
        "placeholder": "Ik heb volgende week toegang tot Power BI nodig.",
        "summary_title": "Operationeel overzicht",
        "request_title": "Verzoeken",
        "approval_title": "Goedkeuringscentrum",
        "knowledge_title": "Kennisbank",
        "report_title": "Executive rapporten",
        "audit_title": "Auditlog",
        "metrics": ["Gezondheid", "Open goedkeuringen", "Automatisering", "Vandaag opgelost"],
        "demo_prompts": [
            {"label": "Toegang", "text": "Ik heb volgende week toegang tot Power BI nodig."},
            {"label": "Verlof", "text": "Ik wil volgende maand vakantie en heb goedkeuring nodig."},
            {"label": "Declaratie", "text": "Vergoed alstublieft mijn trainingskosten van 450 SAR."},
            {"label": "Inkoop", "text": "Ik heb een offerte nodig voor 12 laptops."}
        ]
    },
    "fr": {
        "app_name": "Plateforme IA d'opérations d'entreprise",
        "app_sub": "Couche opérationnelle intelligente",
        "login_title": "Connexion sécurisée",
        "login_note": "Comptes démo: employee / manager / executive / admin. Mot de passe: Demo123!",
        "lang": "Langue",
        "theme": "Thème",
        "role": "Rôle",
        "light": "Clair",
        "dark": "Sombre",
        "overview": "Vue d'ensemble",
        "workspace": "Espace IA",
        "departments": "Départements",
        "approvals": "Approbations",
        "knowledge": "Connaissance",
        "reports": "Rapports",
        "security": "Sécurité",
        "logout": "Déconnexion",
        "refresh": "Actualiser",
        "simulate": "Simuler une demande",
        "submit": "Envoyer la demande",
        "prompt_label": "Décrivez la demande en langage courant.",
        "placeholder": "J'ai besoin d'un accès Power BI pour la semaine prochaine.",
        "summary_title": "Résumé opérationnel",
        "request_title": "Boîte de demandes",
        "approval_title": "Centre d'approbation",
        "knowledge_title": "Base de connaissances",
        "report_title": "Rapports exécutifs",
        "audit_title": "Journal d'audit",
        "metrics": ["Santé", "Approbations en attente", "Automatisation", "Résolues aujourd'hui"],
        "demo_prompts": [
            {"label": "Accès", "text": "J'ai besoin d'un accès Power BI pour la semaine prochaine."},
            {"label": "Congé", "text": "Je veux des vacances le mois prochain et j'ai besoin d'approbation."},
            {"label": "Frais", "text": "Veuillez rembourser mes frais de formation de 450 SAR."},
            {"label": "Achats", "text": "J'ai besoin d'un devis pour 12 ordinateurs portables."}
        ]
    },
}

ROLE_LABELS = {
    "employee": {"en": "Employee", "ar": "موظف", "es": "Empleado", "nl": "Medewerker", "fr": "Employé"},
    "manager": {"en": "Manager", "ar": "مدير", "es": "Gerente", "nl": "Manager", "fr": "Manager"},
    "executive": {"en": "Executive", "ar": "تنفيذي", "es": "Ejecutivo", "nl": "Directie", "fr": "Direction"},
    "admin": {"en": "Administrator", "ar": "مسؤول", "es": "Administrador", "nl": "Beheerder", "fr": "Administrateur"},
}

NAV_ITEMS = [
    ("overview", "summary"),
    ("workspace", "workspace"),
    ("departments", "departments"),
    ("approvals", "approvals"),
    ("knowledge", "knowledge"),
    ("reports", "reports"),
    ("security", "security"),
]

MODULES = [
    ("HR", "Leave, onboarding, employee records, and policy support.", 97),
    ("IT", "Password reset, access, devices, software, and ticketing.", 90),
    ("Finance", "Expenses, budgets, invoices, and payment approvals.", 94),
    ("Procurement", "Purchase requests, vendors, and purchase orders.", 88),
    ("Knowledge", "Policies, SOPs, internal documents, and FAQs.", 98),
    ("Reports", "Operational summaries, KPIs, and executive briefs.", 96),
    ("Security", "Audit logs, risk scoring, and access monitoring.", 99),
]

REQ_COLUMNS = (
    "id INTEGER PRIMARY KEY AUTOINCREMENT, "
    "user_id INTEGER NOT NULL, "
    "title TEXT NOT NULL, "
    "details TEXT NOT NULL, "
    "module TEXT NOT NULL, "
    "risk TEXT NOT NULL, "
    "status TEXT NOT NULL, "
    "approval_required INTEGER NOT NULL DEFAULT 0, "
    "created_at TEXT NOT NULL, "
    "resolved_at TEXT, "
    "summary TEXT NOT NULL"
)

DB_LOCK = threading.Lock()
SESSIONS = auth_layer.SESSIONS


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def open_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    first = not DB_PATH.exists()
    with open_db() as conn:
        conn.executescript(SCHEMA_SQL)
        users = [
            ("employee", "Demo123!", "Sara Ali", "employee", "HR", "en", "light"),
            ("manager", "Demo123!", "Omar Hassan", "manager", "Operations", "en", "light"),
            ("executive", "Demo123!", "Mona Kareem", "executive", "Executive", "en", "light"),
            ("admin", "Demo123!", "Platform Admin", "admin", "IT", "en", "light"),
        ]
        for row in users:
            conn.execute(
                "INSERT OR IGNORE INTO users(username,password,display_name,role,department,lang,theme) VALUES (?,?,?,?,?,?,?)",
                row,
            )
        if first:
            docs = [
                ("Access requests", "HR", "Request employee access through the AI workspace.", "Access is approved according to role and policy."),
                ("Vacation policy", "HR", "Leave requires balance and manager review.", "Managers can approve or reject based on staffing."),
                ("Expense policy", "Finance", "Claims require policy and budget validation.", "High-risk claims remain under human approval."),
                ("Procurement policy", "Procurement", "High-value requests require vendor comparison.", "Approvals preserve governance and auditability."),
            ]
            for d in docs:
                conn.execute("INSERT INTO knowledge(title,category,summary,content) VALUES (?,?,?,?)", d)
            reports = [
                ("Daily executive briefing", "Today", "8 HR requests, 15 IT tickets resolved, 3 finance approvals pending.", "Budget usage is stable; onboarding is the biggest operational load."),
                ("Weekly operations review", "This week", "Ticket trend up 12%, approval time down 8%, procurement steady.", "IT volumes are linked to onboarding and device requests."),
                ("Monthly KPI pack", "This month", "Automation success 87%, employee satisfaction 94%, SLA compliance 98%.", "Standardized workflows are reducing manual workload."),
            ]
            for r in reports:
                conn.execute("INSERT INTO reports(title,period,summary,insight) VALUES (?,?,?,?)", r)
            seed_requests(conn)
            seed_audit(conn)
            seed_memory(conn)
            seed_notifications(conn)
            seed_workflows(conn)
            seed_insights(conn)
        ensure_bootstrap_data(conn)
        conn.commit()


def seed_requests(conn):
    items = [
        (1, "Power BI access", "I need access to Power BI for next week.", "IT", "Low", "completed", 0, "Access provisioned automatically.",),
        (1, "Vacation next month", "I want vacation next month and need manager approval.", "HR", "Medium", "pending_approval", 1, "Awaiting manager approval.",),
        (2, "Training reimbursement", "Please reimburse my training expense of 450 SAR.", "Finance", "Medium", "pending_approval", 1, "Finance review needed.",),
        (2, "12 laptop quotes", "I need a vendor quote for 12 laptops.", "Procurement", "Medium", "processing", 1, "Vendor comparison in progress.",),
    ]
    for item in items:
        conn.execute(
            "INSERT INTO requests(user_id,title,details,module,risk,status,approval_required,created_at,summary) VALUES (?,?,?,?,?,?,?,?,?)",
            (item[0], item[1], item[2], item[3], item[4], item[5], item[6], now_iso(), item[7]),
        )


def seed_audit(conn):
    rows = [
        ("system", "Bootstrap", "Platform", "Initial enterprise environment prepared."),
        ("employee", "Request routed", "IT", "Power BI access routed and completed."),
        ("manager", "Approval required", "HR", "Leave request escalated for manager action."),
    ]
    for actor, action, target, detail in rows:
        conn.execute(
            "INSERT INTO audit_log(actor,action,target,detail,created_at) VALUES (?,?,?,?,?)",
            (actor, action, target, detail, now_iso()),
        )


def seed_memory(conn):
    rows = [
        (1, "employee", "I need Power BI access for next week.", "IT", "Employee requested access for Power BI provisioning."),
        (1, "employee", "I want vacation next month and need manager approval.", "HR", "Leave request requires manager review."),
        (2, "manager", "Please reimburse my training expense of 450 SAR.", "Finance", "Finance claim requires approval."),
    ]
    for row in rows:
        conn.execute(
            "INSERT INTO conversation_memory(user_id,role,input_text,module,memory_summary,created_at) VALUES (?,?,?,?,?,?)",
            (*row, now_iso()),
        )


def seed_notifications(conn):
    rows = [
        (1, "email", "info", "Power BI access routed", "Access request completed automatically.", "unread"),
        (1, "teams", "warning", "Leave approval pending", "Your manager still needs to approve your leave request.", "unread"),
        (2, "email", "info", "Finance review pending", "One reimbursement is waiting on your approval.", "unread"),
    ]
    for row in rows:
        conn.execute(
            "INSERT INTO notifications(user_id,channel,severity,title,body,status,created_at) VALUES (?,?,?,?,?,?,?)",
            (*row, now_iso()),
        )


def seed_workflows(conn):
    rows = [
        (1, "IT automatic troubleshooting", "IT", "completed", '{"step":"diagnose"}', "Automatic provisioning completed.",),
        (1, "HR leave approval", "HR", "waiting", '{"step":"manager_approval"}', "Pending manager approval.",),
        (2, "Finance claim review", "Finance", "waiting", '{"step":"finance_review"}', "Pending finance approval.",),
    ]
    for user_id, wf, module, status, payload, summary in rows:
        conn.execute(
            "INSERT INTO workflow_runs(user_id,workflow_name,module,status,payload,created_at) VALUES (?,?,?,?,?,?)",
            (user_id, wf, module, status, payload, now_iso()),
        )


def seed_insights(conn):
    rows = [
        ("executive", "Onboarding load is high", "Onboarding workflows are driving the majority of IT and HR activity.", 92),
        ("executive", "Budget watch", "Finance approvals are stable, but budget usage should be monitored.", 88),
        ("security", "Access activity normal", "No unusual access patterns were detected in the last 24 hours.", 96),
    ]
    for row in rows:
        conn.execute(
            "INSERT INTO ai_insights(scope,title,summary,confidence,created_at) VALUES (?,?,?,?,?)",
            (*row, now_iso()),
        )


def ensure_bootstrap_data(conn):
    checks = [
        ("conversation_memory", seed_memory),
        ("notifications", seed_notifications),
        ("workflow_runs", seed_workflows),
        ("ai_insights", seed_insights),
    ]
    for table, fn in checks:
        count = conn.execute(f"SELECT COUNT(*) AS c FROM {table}").fetchone()["c"]
        if count == 0:
            fn(conn)


def classify_request(text: str):
    t = text.lower()
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


def audit(conn, actor, action, target, detail):
    conn.execute(
        "INSERT INTO audit_log(actor,action,target,detail,created_at) VALUES (?,?,?,?,?)",
        (actor, action, target, detail, now_iso()),
    )


def get_user_by_token(handler):
    cookie = SimpleCookie(handler.headers.get("Cookie"))
    morsel = cookie.get("platform_session")
    token = morsel.value if morsel else None
    if not token:
      return None
    uid = SESSIONS.get(token)
    if not uid:
        return None
    with open_db() as conn:
        row = conn.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
        return row


def get_settings(conn, user_id):
    settings = conn.execute("SELECT lang, theme FROM settings WHERE user_id=?", (user_id,)).fetchone()
    if settings:
        return settings["lang"], settings["theme"]
    user = conn.execute("SELECT lang, theme FROM users WHERE id=?", (user_id,)).fetchone()
    return user["lang"], user["theme"]


def set_settings(conn, user_id, lang, theme):
    conn.execute(
        "INSERT INTO settings(user_id, lang, theme) VALUES (?,?,?) "
        "ON CONFLICT(user_id) DO UPDATE SET lang=excluded.lang, theme=excluded.theme",
        (user_id, lang, theme),
    )
    conn.execute("UPDATE users SET lang=?, theme=? WHERE id=?", (lang, theme, user_id))


def record_memory(conn, user_id, role, input_text, module, summary):
    conn.execute(
        "INSERT INTO conversation_memory(user_id,role,input_text,module,memory_summary,created_at) VALUES (?,?,?,?,?,?)",
        (user_id, role, input_text, module, summary, now_iso()),
    )


def record_workflow(conn, user_id, workflow_name, module, status, payload):
    conn.execute(
        "INSERT INTO workflow_runs(user_id,workflow_name,module,status,payload,created_at) VALUES (?,?,?,?,?,?)",
        (user_id, workflow_name, module, status, json.dumps(payload, ensure_ascii=False), now_iso()),
    )


def enqueue_notification(conn, user_id, channel, severity, title, body):
    conn.execute(
        "INSERT INTO notifications(user_id,channel,severity,title,body,status,created_at) VALUES (?,?,?,?,?,?,?)",
        (user_id, channel, severity, title, body, "unread", now_iso()),
    )


def build_insights(conn):
    pending_requests = conn.execute("SELECT COUNT(*) AS c FROM requests WHERE status IN ('pending_approval','processing')").fetchone()["c"]
    open_notifications = conn.execute("SELECT COUNT(*) AS c FROM notifications WHERE status='unread'").fetchone()["c"]
    workflow_waiting = conn.execute("SELECT COUNT(*) AS c FROM workflow_runs WHERE status='waiting'").fetchone()["c"]
    return [
        {"scope": "executive", "title": "Operational backlog", "summary": f"{pending_requests} requests are still active across the platform.", "confidence": 91},
        {"scope": "manager", "title": "Notification load", "summary": f"{open_notifications} unread notifications remain for users.", "confidence": 88},
        {"scope": "workflow", "title": "Workflow staging", "summary": f"{workflow_waiting} workflows are waiting on human action.", "confidence": 90},
    ]


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


def get_user_memory(conn, user_id, limit=10):
    rows = conn.execute(
        "SELECT * FROM conversation_memory WHERE user_id=? ORDER BY id DESC LIMIT ?",
        (user_id, limit),
    ).fetchall()
    return [dict(r) for r in rows]


def get_user_notifications(conn, user_id, limit=10):
    rows = conn.execute(
        "SELECT * FROM notifications WHERE user_id=? ORDER BY id DESC LIMIT ?",
        (user_id, limit),
    ).fetchall()
    return [dict(r) for r in rows]


def get_workflows(conn, user_id, limit=10):
    rows = conn.execute(
        "SELECT * FROM workflow_runs WHERE user_id=? ORDER BY id DESC LIMIT ?",
        (user_id, limit),
    ).fetchall()
    return [dict(r) for r in rows]


def dashboard_payload(conn, user):
    return build_dashboard(
        conn,
        user,
        get_settings,
        get_user_memory,
        get_user_notifications,
        get_workflows,
        ROLE_LABELS,
        TRANSLATIONS,
        MODULES,
    )


classify_request = ai_core_layer.classify_request
build_agents = ai_core_layer.build_agents
build_journeys = ai_core_layer.build_journeys
build_roadmap = ai_core_layer.build_roadmap
build_insights = ai_core_layer.build_insights
authenticate = auth_layer.authenticate
create_session = auth_layer.create_session
destroy_session = auth_layer.destroy_session
set_preferences = auth_layer.set_preferences
set_settings = auth_layer.set_preferences
record_workflow = workflow_layer.record_workflow
enqueue_notification = workflow_layer.enqueue_notification
build_dashboard = services_layer.build_dashboard
handle_chat = services_layer.handle_chat
handle_request = services_layer.handle_request
handle_approval = services_layer.handle_approval


def json_response(handler, payload, status=200):
    raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(raw)))
    handler.end_headers()
    handler.wfile.write(raw)


def parse_json(handler):
    length = int(handler.headers.get("Content-Length", "0"))
    raw = handler.rfile.read(length) if length else b"{}"
    return json.loads(raw.decode("utf-8") or "{}")


def html_response(handler, body):
    raw = body.encode("utf-8")
    handler.send_response(200)
    handler.send_header("Content-Type", "text/html; charset=utf-8")
    handler.send_header("Content-Length", str(len(raw)))
    handler.end_headers()
    handler.wfile.write(raw)


APP_HTML = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Enterprise AI Operations Platform</title>
  <style>
    :root {
      --bg: #eef3ef;
      --surface: rgba(248,250,248,.96);
      --panel: rgba(255,255,255,.76);
      --line: rgba(20, 30, 26, .10);
      --text: #13211c;
      --muted: #5c6c66;
      --brand: #0f766e;
      --brand-2: #1e5b4f;
      --accent: #d18d2e;
      --good: #2f8f5b;
      --warn: #c97a1f;
      --bad: #b94d4d;
      --shadow: 0 18px 50px rgba(15, 23, 20, 0.10);
      --radius: 16px;
      font-family: "Aptos","Segoe UI",Arial,sans-serif;
    }
    body[data-theme="dark"] { --bg:#0b1110; --surface:rgba(18,25,23,.96); --panel:rgba(23,31,29,.92); --line:rgba(232,241,236,.10); --text:#e8f1eb; --muted:#97a89d; --brand:#38a79d; --brand-2:#75d1c7; --accent:#e0a24f; --shadow:0 22px 58px rgba(0,0,0,.34); }
    * { box-sizing:border-box; }
    html, body { margin:0; min-height:100%; background:var(--bg); color:var(--text); }
    body { background: radial-gradient(circle at top left, rgba(15,118,110,.12), transparent 30%), radial-gradient(circle at top right, rgba(209,141,46,.10), transparent 24%), linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 80%, #000 20%)); overflow-x:hidden; }
    body[data-theme="dark"] { background: radial-gradient(circle at top left, rgba(56,167,157,.16), transparent 30%), radial-gradient(circle at top right, rgba(224,162,79,.10), transparent 24%), linear-gradient(180deg, #0b1110, #0d1312); }
    button, input, textarea, select { font:inherit; }
    .app { min-height:100vh; display:grid; grid-template-columns: 270px minmax(0,1fr) 320px; gap:16px; padding:16px; }
    .sidebar, .workspace, .inspector { background:var(--surface); border:1px solid var(--line); border-radius:calc(var(--radius) + 2px); box-shadow:var(--shadow); min-height:calc(100vh - 32px); backdrop-filter: blur(14px); }
    .sidebar { padding:16px; display:flex; flex-direction:column; gap:14px; }
    .brand { display:flex; gap:12px; align-items:center; padding-bottom:12px; border-bottom:1px solid var(--line); }
    .mark { width:42px; height:42px; border-radius:13px; display:grid; place-items:center; color:#fff; font-weight:800; background:linear-gradient(145deg,var(--brand),var(--brand-2)); }
    .brand h1 { margin:0; font-size:15px; line-height:1.1; }
    .brand p { margin:3px 0 0; color:var(--muted); font-size:12px; }
    .group, .panel { background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
    .group { padding:12px; display:grid; gap:10px; }
    .label-row { display:flex; justify-content:space-between; gap:10px; align-items:center; font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); }
    .row { display:grid; gap:8px; }
    .row.two { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .row.five { grid-template-columns: repeat(5, minmax(0,1fr)); }
    .btn, .nav-btn, .action-btn { border:1px solid var(--line); background: color-mix(in srgb, var(--panel) 76%, white 24%); color:var(--text); border-radius:12px; cursor:pointer; transition:transform .18s ease, border-color .18s ease, background .18s ease; }
    .btn:hover, .nav-btn:hover, .action-btn:hover { transform:translateY(-1px); border-color: color-mix(in srgb, var(--brand) 34%, var(--line)); }
    .btn.active, .nav-btn.active { background: color-mix(in srgb, var(--brand) 12%, var(--panel)); border-color: color-mix(in srgb, var(--brand) 44%, var(--line)); }
    .btn { padding:10px 12px; text-align:left; min-height:50px; display:grid; gap:2px; }
    .btn strong { font-size:13px; }
    .btn small { color:var(--muted); font-size:11px; line-height:1.3; }
    .nav { display:grid; gap:8px; }
    .nav-btn { display:flex; justify-content:space-between; align-items:center; gap:10px; padding:11px 12px; text-align:left; }
    .badge { display:inline-flex; align-items:center; gap:6px; padding:5px 10px; border-radius:999px; background: color-mix(in srgb, var(--brand) 10%, transparent); color:var(--brand-2); font-size:12px; font-weight:700; white-space:nowrap; }
    .sidebar-footer { margin-top:auto; padding-top:12px; border-top:1px solid var(--line); display:grid; gap:10px; color:var(--muted); font-size:12px; }
    .workspace { display:grid; grid-template-rows:auto auto 1fr; overflow:hidden; }
    .topbar { padding:18px 20px 14px; border-bottom:1px solid var(--line); display:flex; justify-content:space-between; gap:18px; align-items:flex-start; }
    .topbar h2 { margin:0 0 6px; font-size:28px; line-height:1.05; letter-spacing:-.03em; }
    .topbar p { margin:0; max-width:70ch; color:var(--muted); line-height:1.45; }
    .top-actions { display:grid; grid-template-columns:repeat(2, minmax(160px,1fr)); gap:10px; align-content:start; }
    .action-btn { display:inline-flex; flex-direction:column; gap:2px; align-items:flex-start; padding:11px 12px; width:100%; text-align:left; min-height:58px; }
    .action-btn.primary { background:linear-gradient(145deg,var(--brand), color-mix(in srgb, var(--brand-2) 88%, black 12%)); color:#f5fffc; border-color:transparent; }
    .action-btn.primary small { color: rgba(245,255,252,.76); }
    .summary { display:flex; flex-wrap:wrap; gap:10px; padding:14px 20px 18px; }
    .chip { padding:10px 12px; border-radius:999px; background: color-mix(in srgb, var(--panel) 78%, white 22%); border:1px solid var(--line); font-size:12px; color:var(--muted); }
    .chip strong { color:var(--text); }
    .content { display:grid; grid-template-columns:minmax(0,1.35fr) minmax(0,.95fr); gap:14px; padding:0 18px 18px; min-height:0; }
    .stack { display:grid; gap:14px; min-height:0; }
    .section { background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
    .section-head { display:flex; justify-content:space-between; gap:10px; align-items:center; padding:14px 16px; border-bottom:1px solid var(--line); background: color-mix(in srgb, var(--surface) 82%, white 18%); }
    .section-head h3 { margin:0; font-size:13px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); }
    .section-body { padding:16px; }
    .prompt-box { display:grid; gap:12px; padding:16px; border-radius:var(--radius); background: linear-gradient(180deg, color-mix(in srgb, var(--text) 96%, transparent), color-mix(in srgb, var(--text) 90%, black 10%)); color:#f1faf7; }
    .prompt-grid { display:grid; grid-template-columns:minmax(0,1fr) 220px; gap:12px; }
    .prompt-grid textarea { min-height:112px; resize:vertical; border-radius:14px; border:1px solid rgba(255,255,255,.10); padding:14px 16px; background:rgba(255,255,255,.06); color:#f6fbf9; }
    .prompt-grid textarea::placeholder { color:rgba(246,251,249,.50); }
    .quick-actions { display:grid; gap:8px; }
    .quick-actions .action-btn { background:rgba(255,255,255,.92); min-height:74px; }
    .response-row { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px; }
    .response-card, .list-item, .metric, .layer, .audit-item { border:1px solid var(--line); background: color-mix(in srgb, var(--surface) 78%, white 22%); border-radius:14px; }
    .response-card { padding:14px; }
    .response-card .k, .metric .k { color:var(--muted); font-size:12px; margin-bottom:8px; }
    .response-card .v, .metric .v { font-size:20px; font-weight:800; letter-spacing:-.03em; }
    .response-card .s, .metric .s { margin-top:6px; color:var(--muted); font-size:12px; line-height:1.4; }
    .workflow { display:grid; gap:10px; }
    .step { display:grid; grid-template-columns:18px minmax(0,1fr) auto; gap:12px; align-items:start; padding:12px 0; border-bottom:1px solid var(--line); }
    .step:last-child { border-bottom:0; padding-bottom:0; }
    .dot { width:18px; height:18px; border-radius:50%; margin-top:2px; background:rgba(15,118,110,.16); border:2px solid rgba(15,118,110,.42); }
    .step.wait .dot { background:rgba(208,138,45,.20); border-color:rgba(208,138,45,.55); }
    .step h4 { margin:0 0 4px; font-size:14px; }
    .step p { margin:0; color:var(--muted); font-size:12px; line-height:1.45; }
    .status { align-self:center; font-size:11px; border-radius:999px; padding:6px 10px; background: color-mix(in srgb, var(--brand) 10%, transparent); color:var(--brand-2); font-weight:700; }
    .status.wait { background:rgba(208,138,45,.14); color:#8b5609; }
    .metric-row { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:10px; }
    .metric { padding:14px; min-height:98px; }
    .meter, .tiny { height:8px; border-radius:999px; background:rgba(16,23,20,.08); overflow:hidden; margin-top:12px; }
    .meter span, .tiny span { display:block; height:100%; border-radius:inherit; }
    .brand { background:linear-gradient(90deg, var(--brand), color-mix(in srgb, var(--brand) 35%, white 65%)); }
    .good { background:linear-gradient(90deg, var(--good), color-mix(in srgb, var(--good) 35%, white 65%)); }
    .warn { background:linear-gradient(90deg, var(--warn), color-mix(in srgb, var(--warn) 35%, white 65%)); }
    .module-grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px; }
    .module { padding:14px; border:1px solid var(--line); background:color-mix(in srgb, var(--surface) 82%, white 18%); border-radius:14px; display:grid; gap:10px; }
    .module-top { display:flex; justify-content:space-between; gap:10px; align-items:center; }
    .module-top strong { font-size:14px; }
    .module p { margin:0; color:var(--muted); font-size:12px; line-height:1.45; }
    .module-meta, .meta { display:flex; flex-wrap:wrap; gap:8px; color:var(--muted); font-size:12px; line-height:1.4; }
    .list { display:grid; gap:10px; }
    .list-item { padding:12px; }
    .list-item strong { display:block; font-size:13px; margin-bottom:4px; }
    .tiny-row { display:grid; gap:10px; }
    .audit { display:grid; gap:10px; max-height:340px; overflow:auto; padding-right:2px; }
    .audit-item { display:grid; grid-template-columns:12px minmax(0,1fr); gap:10px; padding:12px; }
    .audit-item .g { width:12px; height:12px; border-radius:50%; margin-top:4px; background:var(--good); }
    .audit-item.warn .g { background:var(--warn); }
    .audit-item.bad .g { background:var(--bad); }
    .audit-item p, .audit-item small { margin:0; }
    .audit-item small { color:var(--muted); display:block; line-height:1.4; }
    .inspector { padding:16px; display:grid; gap:14px; align-content:start; }
    .layer { padding:12px; }
    .layer strong { display:block; margin-bottom:4px; font-size:13px; }
    .layer small { color:var(--muted); line-height:1.45; }
    .login { position:fixed; inset:0; display:grid; place-items:center; background:linear-gradient(180deg, rgba(7,10,9,.55), rgba(7,10,9,.42)); backdrop-filter: blur(6px); z-index:10; }
    .login-card { width:min(960px, calc(100vw - 24px)); display:grid; grid-template-columns: 1fr 1fr; border-radius:24px; overflow:hidden; background:var(--surface); border:1px solid var(--line); box-shadow:var(--shadow); }
    .login-copy { padding:26px; background:linear-gradient(180deg, color-mix(in srgb, var(--brand) 16%, var(--surface)), var(--surface)); }
    .login-copy h2 { margin:0 0 10px; font-size:32px; line-height:1.05; }
    .login-copy p { color:var(--muted); line-height:1.55; }
    .login-panel { padding:26px; display:grid; gap:12px; background:var(--panel); }
    .field { display:grid; gap:6px; }
    .field input { width:100%; padding:12px 14px; border-radius:12px; border:1px solid var(--line); background:color-mix(in srgb, var(--surface) 80%, white 20%); color:var(--text); }
    .login-actions { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px; }
    .hidden { display:none !important; }
    [dir="rtl"] .topbar, [dir="rtl"] .module-top, [dir="rtl"] .label-row, [dir="rtl"] .module-meta, [dir="rtl"] .meta { direction:rtl; }
    @media (max-width: 1260px) { .app { grid-template-columns:240px minmax(0,1fr); } .inspector { grid-column:1/-1; min-height:auto; } .content { grid-template-columns:1fr; } }
    @media (max-width: 900px) { .app { grid-template-columns:1fr; } .sidebar, .workspace, .inspector { min-height:auto; } .metric-row, .module-grid, .response-row, .row.two, .top-actions { grid-template-columns:1fr 1fr; } .prompt-grid { grid-template-columns:1fr; } .login-card { grid-template-columns:1fr; } }
    @media (max-width: 640px) { .app { padding:10px; gap:10px; } .topbar { padding:14px; flex-direction:column; } .summary, .content { padding-left:12px; padding-right:12px; } .topbar h2 { font-size:23px; } .metric-row, .module-grid, .response-row, .top-actions, .row.two, .login-actions { grid-template-columns:1fr; } .row.five { grid-template-columns: repeat(5, minmax(0,1fr)); } }
  </style>
</head>
<body>
  <div id="loginView" class="login">
    <div class="login-card">
      <div class="login-copy">
        <div class="brand">
          <div class="mark">EA</div>
          <div>
            <h1 id="loginBrand">Enterprise AI Operations Platform</h1>
            <p id="loginSub">Intelligent operating layer</p>
          </div>
        </div>
        <h2 id="loginTitle">Secure sign in</h2>
        <p id="loginNote">Demo accounts: employee / manager / executive / admin. Password: Demo123!</p>
        <div class="list">
          <div class="list-item"><strong>Employee</strong><div class="meta">Self-service requests, knowledge, and status tracking.</div></div>
          <div class="list-item"><strong>Manager</strong><div class="meta">Approvals, team visibility, and operational recommendations.</div></div>
          <div class="list-item"><strong>Executive</strong><div class="meta">KPIs, bottlenecks, and strategic summaries.</div></div>
          <div class="list-item"><strong>Administrator</strong><div class="meta">Governance, roles, audit, and settings.</div></div>
        </div>
      </div>
      <div class="login-panel">
        <div class="row two" id="loginLang"></div>
        <div class="row two" id="loginTheme"></div>
        <div class="field">
          <label for="username" id="usernameLabel">Username</label>
          <input id="username" value="employee" />
        </div>
        <div class="field">
          <label for="password" id="passwordLabel">Password</label>
          <input id="password" type="password" value="Demo123!" />
        </div>
        <div class="login-actions">
          <button class="action-btn primary" id="loginBtn"><strong id="loginAction">Sign in</strong><small>Enter the platform</small></button>
          <button class="action-btn" id="demoBtn"><strong>Load demo</strong><small>Prefill employee account</small></button>
        </div>
      </div>
    </div>
  </div>
  <div id="appView" class="app hidden">
    <aside class="sidebar">
      <div class="brand">
        <div class="mark">EA</div>
        <div>
          <h1 id="appBrand">Enterprise AI Operations Platform</h1>
          <p id="appSub">Intelligent operating layer</p>
        </div>
      </div>
      <div class="group">
        <div class="label-row"><span id="langLabel">Language</span><span class="badge" id="langBadge">EN</span></div>
        <div class="row five" id="langRow"></div>
      </div>
      <div class="group">
        <div class="label-row"><span id="themeLabel">Theme</span><span class="badge" id="themeBadge">Light</span></div>
        <div class="row two" id="themeRow"></div>
      </div>
      <div class="group">
        <div class="label-row"><span id="roleLabel">Role</span><span class="badge" id="roleBadge">Employee</span></div>
        <div class="row" id="roleRow"></div>
      </div>
      <nav class="nav" id="nav"></nav>
      <div class="sidebar-footer">
        <div class="badge" id="sessionBadge">JWT secured</div>
        <div id="sidebarNote">RBAC, approvals, audit logging, and workflow orchestration are active.</div>
        <button class="action-btn" id="logoutBtn"><strong id="logoutLabel">Logout</strong><small>End session</small></button>
      </div>
    </aside>
    <main class="workspace">
      <section class="topbar">
        <div>
          <h2 id="pageTitle">Enterprise operating console</h2>
          <p id="pageSummary">One governed workspace for HR, IT, Finance, Procurement, Knowledge, reporting, approvals, and security.</p>
        </div>
        <div class="top-actions">
          <button class="action-btn" id="simulateBtn"><strong id="simulateLabel">Simulate request</strong><small id="simulateSub">Try a guided workflow</small></button>
          <button class="action-btn primary" id="submitBtn"><strong id="submitLabel">Submit request</strong><small id="submitSub">Route and audit it</small></button>
        </div>
      </section>
      <section class="summary" id="summary"></section>
      <section class="content">
        <div class="stack">
          <article class="section">
            <div class="section-head"><h3 id="workspaceTitle">AI Workspace</h3><span class="badge" id="workspaceBadge">Decision pipeline</span></div>
            <div class="section-body">
              <div class="prompt-box">
                <label id="promptLabel" for="prompt">Describe the request in plain language.</label>
                <div class="prompt-grid">
                  <textarea id="prompt"></textarea>
                  <div class="quick-actions" id="quickActions"></div>
                </div>
              </div>
            </div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="responseTitle">Decision preview</h3><span class="badge" id="decisionBadge">Ready</span></div>
            <div class="section-body">
              <div class="response-row" id="response"></div>
            </div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="workflowTitle">Workflow status</h3><span class="badge" id="workflowBadge">Ready</span></div>
            <div class="section-body"><div class="workflow" id="workflow"></div></div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="modulesTitle">Departments</h3><span class="badge">Shared service layer</span></div>
            <div class="section-body"><div class="module-grid" id="modules"></div></div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="archTitle">Enterprise architecture</h3><span class="badge">Frontend to data</span></div>
            <div class="section-body" id="architecture" style="display:grid; gap:10px;"></div>
          </article>
        </div>
        <div class="stack">
          <article class="section">
            <div class="section-head"><h3 id="requestTitle">Request inbox</h3><span class="badge" id="requestCount">0</span></div>
            <div class="section-body"><div class="list" id="requests"></div></div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="approvalTitle">Approval center</h3><span class="badge" id="approvalCount">0</span></div>
            <div class="section-body"><div class="list" id="approvals"></div></div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="knowledgeTitle">Knowledge base</h3><span class="badge">Operational</span></div>
            <div class="section-body"><div class="list" id="knowledge"></div></div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="reportsTitle">Executive reports</h3><span class="badge">Daily + weekly + monthly</span></div>
            <div class="section-body"><div class="list" id="reports"></div></div>
          </article>
          <article class="section">
            <div class="section-head"><h3 id="auditTitle">Audit log</h3><span class="badge">Immutable</span></div>
            <div class="section-body"><div class="audit" id="audit"></div></div>
          </article>
        </div>
      </section>
    </main>
    <aside class="inspector">
      <article class="section">
        <div class="section-head"><h3 id="snapshotTitle">Executive snapshot</h3><span class="badge">One minute read</span></div>
        <div class="section-body"><div class="list" id="snapshot"></div></div>
      </article>
      <article class="section">
        <div class="section-head"><h3 id="settingsTitle">Settings</h3><span class="badge">Saved locally</span></div>
        <div class="section-body tiny-row">
          <div class="list-item"><strong id="settingsLang">Language</strong><div class="meta" id="settingsLangValue"></div></div>
          <div class="list-item"><strong id="settingsTheme">Theme</strong><div class="meta" id="settingsThemeValue"></div></div>
          <div class="list-item"><strong id="settingsRole">Role</strong><div class="meta" id="settingsRoleValue"></div></div>
          <div class="list-item"><strong>Integrations</strong><div class="meta">FastAPI-style API, SQL Server-ready schema, n8n workflows, Microsoft 365, SharePoint, Teams.</div></div>
        </div>
      </article>
    </aside>
  </div>
  <script>
    const langs = ["en","ar","es","nl","fr"];
    const roles = ["employee","manager","executive","admin"];
    const themes = ["light","dark"];
    const state = { user: null, settings: { lang: "en", theme: "light" }, data: null, prompt: "" };

    function boot() { return state.data ? state.data.translation : window.__boot.translation; }
    function trans() { return state.data ? state.data.translation : window.__boot.translation; }
    function api(path, options={}) { return fetch(path, { credentials: "same-origin", headers: { "Content-Type": "application/json", ...(options.headers||{}) }, ...options }).then(async r => { const t = r.headers.get("content-type")||""; const b = t.includes("application/json") ? await r.json() : await r.text(); if (!r.ok) throw new Error((b && b.detail) || r.statusText); return b; }); }
    function setTheme(theme) { document.body.dataset.theme = theme; state.settings.theme = theme; }
    function setLang(lang) { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; state.settings.lang = lang; }
    function labelRole(role) { return (window.__boot.roles || {})[role] || role; }
    function currentPack() { return state.data ? state.data.translation : window.__boot.translation; }
    function roleLabel(role) { return state.data && state.data.user ? state.data.user.role_label : labelRole(role); }

    function renderLoginControls() {
      const pack = window.__boot.translation;
      document.getElementById("loginBrand").textContent = pack.app_name;
      document.getElementById("loginSub").textContent = pack.app_sub;
      document.getElementById("loginTitle").textContent = pack.login_title;
      document.getElementById("loginNote").textContent = pack.login_note;
      document.getElementById("usernameLabel").textContent = "Username";
      document.getElementById("passwordLabel").textContent = "Password";
      document.getElementById("loginAction").textContent = "Sign in";
      const langRow = document.getElementById("loginLang");
      const themeRow = document.getElementById("loginTheme");
      langRow.innerHTML = langs.map(code => `<button class="btn ${state.settings.lang===code?'active':''}" data-lang="${code}"><strong>${code.toUpperCase()}</strong><small>${pack.lang}</small></button>`).join("");
      themeRow.innerHTML = themes.map(theme => `<button class="btn ${state.settings.theme===theme?'active':''}" data-theme="${theme}"><strong>${pack[theme]}</strong><small>${theme === "light" ? "Default workspace" : "Low-light mode"}</small></button>`).join("");
      langRow.querySelectorAll("[data-lang]").forEach(btn => btn.onclick = () => { setLang(btn.dataset.lang); renderLoginControls(); });
      themeRow.querySelectorAll("[data-theme]").forEach(btn => btn.onclick = () => { setTheme(btn.dataset.theme); renderLoginControls(); });
    }

    function renderShell() {
      const pack = currentPack();
      document.getElementById("appBrand").textContent = pack.app_name;
      document.getElementById("appSub").textContent = pack.app_sub;
      document.getElementById("pageTitle").textContent = "Enterprise operating console";
      document.getElementById("pageSummary").textContent = "One governed workspace for HR, IT, Finance, Procurement, Knowledge, reporting, approvals, and security.";
      document.getElementById("langLabel").textContent = pack.lang;
      document.getElementById("themeLabel").textContent = pack.theme;
      document.getElementById("roleLabel").textContent = pack.role;
      document.getElementById("logoutLabel").textContent = pack.logout;
      document.getElementById("simulateLabel").textContent = pack.simulate;
      document.getElementById("simulateSub").textContent = pack.simulate_note || "Try a guided workflow";
      document.getElementById("submitLabel").textContent = pack.submit;
      document.getElementById("submitSub").textContent = "Route and audit it";
      document.getElementById("workspaceTitle").textContent = pack.workspace;
      document.getElementById("promptLabel").textContent = pack.prompt_label;
      document.getElementById("prompt").placeholder = pack.placeholder;
      document.getElementById("responseTitle").textContent = "Decision preview";
      document.getElementById("workflowTitle").textContent = "Workflow status";
      document.getElementById("modulesTitle").textContent = pack.departments;
      document.getElementById("archTitle").textContent = "Enterprise architecture";
      document.getElementById("requestTitle").textContent = pack.request_title;
      document.getElementById("approvalTitle").textContent = pack.approval_title;
      document.getElementById("knowledgeTitle").textContent = pack.knowledge_title;
      document.getElementById("reportsTitle").textContent = pack.report_title;
      document.getElementById("auditTitle").textContent = pack.audit_title;
      document.getElementById("snapshotTitle").textContent = "Executive snapshot";
      document.getElementById("settingsTitle").textContent = "Settings";
      document.getElementById("settingsLang").textContent = pack.lang;
      document.getElementById("settingsTheme").textContent = pack.theme;
      document.getElementById("settingsRole").textContent = pack.role;
      document.getElementById("langBadge").textContent = state.settings.lang.toUpperCase();
      document.getElementById("themeBadge").textContent = state.settings.theme === "light" ? pack.light : pack.dark;
      document.getElementById("roleBadge").textContent = state.data.user.role_label;
      document.getElementById("sessionBadge").textContent = "JWT secured";
      document.getElementById("sidebarNote").textContent = "RBAC, approvals, audit logging, and workflow orchestration are active.";
      document.getElementById("decisionBadge").textContent = "Ready";
      document.getElementById("workflowBadge").textContent = "Ready";
      document.getElementById("requestCount").textContent = String(state.data.requests.length);
      document.getElementById("approvalCount").textContent = String(state.data.approvals.length);
      document.getElementById("settingsLangValue").textContent = state.settings.lang.toUpperCase();
      document.getElementById("settingsThemeValue").textContent = state.settings.theme;
      document.getElementById("settingsRoleValue").textContent = state.data.user.role_label;
      setLang(state.settings.lang);
      setTheme(state.settings.theme);
      renderControls(pack);
      renderNav(pack);
      renderSummary(pack);
      renderWorkspace(pack);
      renderLists();
      renderSnapshot();
      renderQuickActions();
      bindEvents();
    }

    function renderControls(pack) {
      const langRow = document.getElementById("langRow");
      const themeRow = document.getElementById("themeRow");
      const roleRow = document.getElementById("roleRow");
      langRow.innerHTML = langs.map(code => `<button class="btn ${state.settings.lang===code?'active':''}" data-lang="${code}"><strong>${code.toUpperCase()}</strong><small>${pack.lang}</small></button>`).join("");
      themeRow.innerHTML = themes.map(theme => `<button class="btn ${state.settings.theme===theme?'active':''}" data-theme="${theme}"><strong>${pack[theme]}</strong><small>${theme === "light" ? "Default workspace" : "Low-light mode"}</small></button>`).join("");
      roleRow.innerHTML = roles.map(role => `<button class="btn ${state.data.user.role===role?'active':''}" data-role="${role}"><strong>${state.data.user.role === role ? state.data.user.role_label : (window.__boot.roles[role] || role)}</strong><small>${role === "employee" ? "Self-service and requests" : role === "manager" ? "Approvals and team view" : role === "executive" ? "KPIs and risk" : "Governance and access"}</small></button>`).join("");
      langRow.querySelectorAll("[data-lang]").forEach(btn => btn.onclick = () => savePrefs({ lang: btn.dataset.lang }));
      themeRow.querySelectorAll("[data-theme]").forEach(btn => btn.onclick = () => savePrefs({ theme: btn.dataset.theme }));
      roleRow.querySelectorAll("[data-role]").forEach(btn => btn.onclick = () => savePrefs({ role: btn.dataset.role }));
    }

    function renderNav(pack) {
      const nav = document.getElementById("nav");
      const labels = [pack.overview, pack.workspace, pack.departments, pack.approvals, pack.knowledge, pack.reports, pack.security];
      nav.innerHTML = labels.map((label, i) => `<button class="nav-btn ${i===0?'active':''}"><span><span class="badge">${label.slice(0,2).toUpperCase()}</span><span>${label}</span></span><small>${i===0 ? "Live" : ""}</small></button>`).join("");
    }

    function renderSummary(pack) {
      const summary = state.data.summary;
      const vals = [summary.company_health + "%", summary.pending_approvals, summary.automation_success + "%", summary.resolved_today];
      const units = ["Operational score", "Manager actions", "Resolved or guided", "Requests closed"];
      const container = document.getElementById("summary");
      container.innerHTML = pack.metrics.map((m, i) => `<div class="chip"><strong>${vals[i]}</strong> ${m} - ${units[i]}</div>`).join("");
    }

    function renderWorkspace(pack) {
      const prompt = document.getElementById("prompt");
      if (!prompt.value) prompt.value = pack.demo_prompts[0].text;
      document.getElementById("quickActions").innerHTML = pack.demo_prompts.map((p, i) => `<button class="action-btn ${i===0?'primary':''}" data-sample="${escapeHtml(p.text)}"><strong>${p.label}</strong><small>${p.text}</small></button>`).join("");
      document.getElementById("quickActions").querySelectorAll("[data-sample]").forEach(btn => btn.onclick = () => { prompt.value = btn.dataset.sample; preview(prompt.value); });
      preview(prompt.value);
    }

    function escapeHtml(s) { return s.replace(/[&<>\"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;' }[c])); }

    function classify(text) {
      const n = text.toLowerCase();
      const has = (...terms) => terms.some(t => n.includes(t));
      if (has("salary","budget approval","transfer","payment","financial","راتب","ميزانية","sueldo","financ","paiement")) return { module:"Finance", risk:"High", approval:true, summary:"Finance-sensitive action queued for human approval." };
      if (has("vendor","purchase","quote","laptop","procure","مورد","مشتريات","proveedor","leverancier","fournisseur")) return { module:"Procurement", risk:"Medium", approval:true, summary:"Procurement request routed through vendor and threshold checks." };
      if (has("leave","vacation","holiday","congé","verlof","vacaciones","إجازة")) return { module:"HR", risk:"Medium", approval:true, summary:"HR leave request requires balance and manager review." };
      if (has("password","vpn","device","access","ticket","software","power bi","printer","toegang","acceso","accès","وصول")) return { module:"IT", risk: has("password","vpn") ? "Low" : "Medium", approval:false, summary:"IT request handled with automatic troubleshooting and provisioning." };
      if (has("policy","sop","documentation","faq","knowledge","evidence","beleid","política","politique","سياسة")) return { module:"Knowledge", risk:"Low", approval:false, summary:"Knowledge search is retrieving policy and document sources." };
      if (has("audit","security","risk","compliance","beveiliging","seguridad","sécurité","أمن")) return { module:"Security", risk:"Medium", approval:false, summary:"Security monitoring and risk review are engaged." };
      return { module:"Operations", risk:"Low", approval:false, summary:"General request routed to the master orchestrator." };
    }

    function preview(text) {
      const result = classify(text);
      const rows = [
        ["Module", result.module],
        ["Risk", result.risk],
        ["Approval", result.approval ? "Required" : "Not required"],
      ];
      document.getElementById("response").innerHTML = rows.map((r, i) => `<div class="response-card"><div class="k">${r[0]}</div><div class="v">${r[1]}</div><div class="s">${i===0 ? result.summary : i===1 ? "Operational risk scored from request intent and context." : result.approval ? "Human-in-the-loop stays in control." : "The action can continue automatically."}</div></div>`).join("");
      document.getElementById("decisionBadge").textContent = result.approval ? "Awaiting approval" : "Processing";
      document.getElementById("workflowBadge").textContent = result.approval ? "Awaiting approval" : "Processing";
      document.getElementById("workflow").innerHTML = [
        ["Intent detected", "The request is normalized into a structured task.", "done", "Ready"],
        ["Permission check", "RBAC, policy, and approval boundaries are evaluated.", "done", "Ready"],
        ["Workflow routing", `The correct business workflow is selected: ${result.module}.`, result.approval ? "wait" : "done", result.approval ? "Awaiting approval" : "Processing"],
        ["Decision and response", result.approval ? "Manager approval is required before execution." : "The response is ready to return to the user.", result.approval ? "wait" : "done", result.approval ? "Awaiting approval" : "Approved"]
      ].map(([title, desc, tone, status]) => `<div class="step ${tone}"><div class="dot"></div><div><h4>${title}</h4><p>${desc}</p></div><div class="status ${tone==='wait'?'wait':''}">${status}</div></div>`).join("");
    }

    function renderLists() {
      const requests = document.getElementById("requests");
      const approvals = document.getElementById("approvals");
      const knowledge = document.getElementById("knowledge");
      const reports = document.getElementById("reports");
      const audit = document.getElementById("audit");
      const snapshot = document.getElementById("snapshot");
      requests.innerHTML = state.data.requests.map(r => `<div class="list-item"><strong>${r.title}</strong><div class="meta"><span>${r.module}</span><span>${r.status}</span><span>${r.risk}</span></div><div class="meta">${r.summary}</div></div>`).join("");
      approvals.innerHTML = state.data.approvals.map(a => `<div class="list-item"><strong>${a.request_title}</strong><div class="meta"><span>${a.request_module}</span><span>${a.status}</span><span>${a.decision_note || ""}</span></div><div class="meta">${a.approver_role}</div></div>`).join("");
      knowledge.innerHTML = state.data.knowledge.map(k => `<div class="list-item"><strong>${k.title}</strong><div class="meta"><span>${k.category}</span><span>${k.summary}</span></div></div>`).join("");
      reports.innerHTML = state.data.reports.map(r => `<div class="list-item"><strong>${r.title}</strong><div class="meta"><span>${r.period}</span><span>${r.summary}</span></div><div class="meta">${r.insight}</div></div>`).join("");
      audit.innerHTML = state.data.audit.map(a => `<div class="audit-item ${/approval|required|reject|failed/i.test(a.action+a.detail) ? "warn" : "good"}"><div class="g"></div><div><p>${a.action} - ${a.target}</p><small>${a.detail}</small><small>${a.created_at}</small></div></div>`).join("");
      snapshot.innerHTML = [
        `<div class="list-item"><strong>Today</strong><div class="meta">8 HR requests, 15 IT tickets resolved, 3 finance approvals pending.</div></div>`,
        `<div class="list-item"><strong>Risk</strong><div class="meta">Budget usage above 80%, procurement delay watch, no security incidents.</div></div>`,
        `<div class="list-item"><strong>Recommendation</strong><div class="meta">Reduce onboarding friction and publish a troubleshooting guide.</div></div>`,
      ].join("");
      document.getElementById("requestCount").textContent = String(state.data.requests.length);
      document.getElementById("approvalCount").textContent = String(state.data.approvals.length);
    }

    function bindEvents() {
      document.getElementById("simulateBtn").onclick = () => {
        const pack = currentPack();
        const sample = pack.demo_prompts[Math.floor(Math.random()*pack.demo_prompts.length)].text;
        document.getElementById("prompt").value = sample;
        preview(sample);
      };
      document.getElementById("submitBtn").onclick = submitRequest;
      document.getElementById("refreshBtn")?.addEventListener?.("click", loadBootstrap);
      document.getElementById("logoutBtn").onclick = async () => { await api("/api/logout", { method:"POST", body:"{}" }).catch(()=>{}); location.reload(); };
      document.getElementById("prompt").oninput = e => preview(e.target.value);
    }

    function savePrefs(delta) {
      const next = { ...state.settings, ...delta };
      api("/api/settings", { method:"POST", body: JSON.stringify(next) }).then(loadBootstrap);
    }

    async function submitRequest() {
      const title = document.getElementById("prompt").value.trim();
      if (!title) return;
      await api("/api/requests", { method:"POST", body: JSON.stringify({ text: title }) });
      await loadBootstrap();
    }

    async function loadBootstrap() {
      const data = await api("/api/bootstrap");
      state.data = data;
      state.settings = data.settings;
      setLang(data.settings.lang);
      setTheme(data.settings.theme);
      window.__boot = data;
      document.getElementById("loginView").classList.add("hidden");
      document.getElementById("appView").classList.remove("hidden");
      document.getElementById("appBrand").textContent = data.translation.app_name;
      document.getElementById("appSub").textContent = data.translation.app_sub;
      renderShell();
    }

    async function login() {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      await api("/api/login", { method:"POST", body: JSON.stringify({ username, password }) });
      await loadBootstrap();
    }

    document.getElementById("loginBtn").onclick = login;
    document.getElementById("demoBtn").onclick = () => { document.getElementById("username").value = "employee"; document.getElementById("password").value = "Demo123!"; };

    async function init() {
      try {
        const data = await api("/api/bootstrap");
        state.data = data;
        state.settings = data.settings;
        window.__boot = data;
        document.getElementById("loginView").classList.add("hidden");
        document.getElementById("appView").classList.remove("hidden");
        renderShell();
      } catch (e) {
        window.__boot = { translation: { app_name: "Enterprise AI Operations Platform", app_sub: "Intelligent operating layer", login_title: "Secure sign in", login_note: "Demo accounts: employee / manager / executive / admin. Password: Demo123!", lang: "Language", theme: "Theme", light: "Light", dark: "Dark" }, roles: {"employee":"Employee","manager":"Manager","executive":"Executive","admin":"Administrator"} };
        renderLoginControls();
      }
    }
    init();
  </script>
</body>
</html>
"""


class Handler(BaseHTTPRequestHandler):
    server_version = "EnterprisePlatform/1.0"

    def log_message(self, fmt, *args):
        return

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/":
            html_path = ROOT / "enterprise-ai-operations-platform-suite.html"
            body = html_path.read_text(encoding="utf-8") if html_path.exists() else APP_HTML
            html_response(self, body)
            return
        if parsed.path == "/api/bootstrap":
            user = get_user_by_token(self)
            if not user:
                json_response(self, {"detail": "unauthorized"}, 401)
                return
            with open_db() as conn:
                payload = dashboard_payload(conn, user)
            json_response(self, payload)
            return
        if parsed.path == "/api/health":
            json_response(self, {"ok": True, "time": now_iso(), "service": "Enterprise AI Operations Platform"})
            return
        if parsed.path == "/api/roadmap":
            json_response(self, {"items": build_roadmap()})
            return
        if parsed.path == "/api/agents":
            json_response(self, {"items": build_agents()})
            return
        if parsed.path == "/api/system":
            json_response(self, {
                "layers": [
                    "Presentation: React-like web console",
                    "API: Python HTTP service",
                    "AI Core: intent detection, memory, routing",
                    "Workflow: approvals, notifications, orchestration",
                    "Business Services: HR, IT, Finance, Procurement, Knowledge, Reports, Security",
                    "Data: SQLite local store with audit, memory, notifications, and workflows",
                ],
                "capabilities": [
                    "Authentication and role control",
                    "Approval-aware workflows",
                    "AI memory and audit logging",
                    "Notifications and executive insights",
                    "Multilingual UI and theme support",
                ],
                "agents": build_agents(),
                "journeys": build_journeys(),
                "roadmap": build_roadmap(),
                "deployment": {
                    "containerized": True,
                    "database": "SQLite local with production migration path",
                    "workflow_engine": "n8n-compatible orchestration layer",
                    "ai_mode": "Local-first with optional cloud provider",
                    "security": ["JWT", "RBAC", "Audit logging", "Approval workflows", "Secure cookies"],
                },
            })
            return
        if parsed.path == "/api/memory":
            user = get_user_by_token(self)
            if not user:
                json_response(self, {"detail": "unauthorized"}, 401)
                return
            with open_db() as conn:
                json_response(self, {"items": get_user_memory(conn, user["id"], 20)})
            return
        if parsed.path == "/api/notifications":
            user = get_user_by_token(self)
            if not user:
                json_response(self, {"detail": "unauthorized"}, 401)
                return
            with open_db() as conn:
                json_response(self, {"items": get_user_notifications(conn, user["id"], 20)})
            return
        if parsed.path == "/api/workflows":
            user = get_user_by_token(self)
            if not user:
                json_response(self, {"detail": "unauthorized"}, 401)
                return
            with open_db() as conn:
                json_response(self, {"items": get_workflows(conn, user["id"], 20)})
            return
        if parsed.path == "/api/insights":
            user = get_user_by_token(self)
            if not user:
                json_response(self, {"detail": "unauthorized"}, 401)
                return
            with open_db() as conn:
                json_response(self, {"items": build_insights(conn)})
            return
        json_response(self, {"detail": "not found"}, 404)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/login":
            data = parse_json(self)
            username = data.get("username", "").strip()
            password = data.get("password", "")
            with open_db() as conn:
                user = conn.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password)).fetchone()
                if not user:
                    json_response(self, {"detail": "invalid credentials"}, 401)
                    return
                token = create_session(user["id"])
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Set-Cookie", f"platform_session={token}; HttpOnly; Path=/; SameSite=Lax")
                body = json.dumps({"ok": True}).encode("utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                audit(conn, user["username"], "Login", "Session", "User signed in successfully.")
                conn.commit()
                return
        user = get_user_by_token(self)
        if not user:
            json_response(self, {"detail": "unauthorized"}, 401)
            return
        if parsed.path == "/api/logout":
            cookie = SimpleCookie(self.headers.get("Cookie"))
            token = cookie.get("platform_session").value if cookie.get("platform_session") else None
            destroy_session(token)
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Set-Cookie", "platform_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax")
            body = json.dumps({"ok": True}).encode("utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        with open_db() as conn:
            if parsed.path == "/api/settings":
                data = parse_json(self)
                lang = data.get("lang", "en")
                theme = data.get("theme", "light")
                role = data.get("role")
                if lang not in TRANSLATIONS:
                    lang = "en"
                if theme not in ("light", "dark"):
                    theme = "light"
                set_settings(conn, user["id"], lang, theme)
                if role and role in ROLE_LABELS:
                    conn.execute("UPDATE users SET role=? WHERE id=?", (role, user["id"]))
                audit(conn, user["username"], "Settings updated", "Preferences", f"lang={lang}, theme={theme}, role={role or user['role']}")
                conn.commit()
                json_response(self, {"ok": True})
                return
            if parsed.path == "/api/chat":
                data = parse_json(self)
                text = (data.get("text") or "").strip()
                if not text:
                    json_response(self, {"detail": "text is required"}, 400)
                    return
                result = handle_chat(conn, user, text, audit, record_memory, record_workflow, enqueue_notification, now_iso)
                conn.commit()
                json_response(self, result)
                return
            if parsed.path == "/api/requests":
                data = parse_json(self)
                text = (data.get("text") or "").strip()
                if not text:
                    json_response(self, {"detail": "request text is required"}, 400)
                    return
                result = handle_request(conn, user, text, audit, record_memory, record_workflow, enqueue_notification, now_iso)
                conn.commit()
                json_response(self, result)
                return
            if parsed.path == "/api/workflows/simulate":
                data = parse_json(self)
                workflow_name = data.get("workflow", "Master Orchestrator")
                text = (data.get("text") or "").strip() or "Simulated workflow request."
                result = classify_request(text)
                record_workflow(conn, user["id"], workflow_name, result["module"], "waiting" if result["approval"] else "completed", {"input": text, "workflow": workflow_name})
                record_memory(conn, user["id"], user["role"], text, result["module"], result["summary"])
                enqueue_notification(conn, user["id"], "teams", "info", f"{workflow_name} simulated", result["summary"])
                audit(conn, user["username"], "Workflow simulated", workflow_name, result["summary"])
                conn.commit()
                json_response(self, {"ok": True, "workflow": workflow_name, "module": result["module"], "approval": result["approval"]})
                return
            if parsed.path == "/api/reports/generate":
                insight = build_insights(conn)[0]
                audit(conn, user["username"], "Report generated", insight["scope"], insight["summary"])
                conn.commit()
                json_response(self, {"ok": True, "report": insight})
                return
            m = re.match(r"^/api/approvals/(\d+)$", parsed.path)
            if m:
                body = parse_json(self)
                decision = body.get("decision", "")
                note = body.get("note", "")
                aid = int(m.group(1))
                result = handle_approval(conn, user, aid, decision, note, audit, enqueue_notification, now_iso)
                if not result:
                    json_response(self, {"detail": "not found"}, 404)
                    return
                conn.commit()
                json_response(self, result)
                return
        json_response(self, {"detail": "not found"}, 404)


def main():
    init_db()
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Enterprise AI Operations Platform running at http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
