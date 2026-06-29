from datetime import datetime, timezone

from .ai_core import build_agents, build_insights, build_journeys, build_roadmap, classify_request
from .workflow_engine import enqueue_notification, record_workflow


def _rows(cursor):
    return [dict(row) for row in cursor.fetchall()]


def _now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def build_dashboard(conn, user, get_settings_fn, get_memory_fn, get_notifications_fn, get_workflows_fn, role_labels, translations, modules):
    lang, theme = get_settings_fn(conn, user["id"])
    pack = translations.get(lang, translations["en"])
    requests = _rows(conn.execute("SELECT * FROM requests ORDER BY id DESC LIMIT 20"))
    approvals = _rows(conn.execute("SELECT a.*, r.title AS request_title, r.module AS request_module FROM approvals a JOIN requests r ON r.id=a.request_id ORDER BY a.id DESC LIMIT 10"))
    audit_rows = _rows(conn.execute("SELECT * FROM audit_log ORDER BY id DESC LIMIT 30"))
    knowledge = _rows(conn.execute("SELECT * FROM knowledge ORDER BY id ASC"))
    reports = _rows(conn.execute("SELECT * FROM reports ORDER BY id ASC"))
    memory = get_memory_fn(conn, user["id"], 12)
    notifications = get_notifications_fn(conn, user["id"], 12)
    workflows = get_workflows_fn(conn, user["id"], 12)
    completed = conn.execute("SELECT COUNT(*) AS c FROM requests WHERE status='completed'").fetchone()["c"]
    pending = conn.execute("SELECT COUNT(*) AS c FROM requests WHERE status IN ('pending_approval','processing')").fetchone()["c"]
    pending_approvals = conn.execute("SELECT COUNT(*) AS c FROM approvals WHERE status='pending'").fetchone()["c"]
    return {
        "user": {
            "id": user["id"],
            "display_name": user["display_name"],
            "username": user["username"],
            "role": user["role"],
            "role_label": role_labels[user["role"]].get(lang, role_labels[user["role"]]["en"]),
            "department": user["department"],
        },
        "roles": {role: role_labels[role].get(lang, role_labels[role]["en"]) for role in role_labels},
        "settings": {"lang": lang, "theme": theme},
        "translation": pack,
        "summary": {
            "company_health": 96,
            "pending_approvals": pending_approvals + pending,
            "automation_success": 87,
            "resolved_today": completed,
            "sla": 98,
        },
        "modules": [{"name": n, "description": d, "score": s} for n, d, s in modules],
        "requests": requests,
        "approvals": approvals,
        "knowledge": knowledge,
        "reports": reports,
        "audit": audit_rows,
        "memory": memory,
        "notifications": notifications,
        "workflow_runs": workflows,
        "insights": build_insights(conn),
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
    }


def handle_chat(conn, user, text, audit_fn, memory_fn, workflow_fn, notify_fn, now_fn):
    result = classify_request(text)
    memory_fn(conn, user["id"], user["role"], text, result["module"], result["summary"])
    workflow_fn(conn, user["id"], "Master Orchestrator", result["module"], "waiting" if result["approval"] else "completed", {"text": text, "module": result["module"]})
    notify_fn(conn, user["id"], "in-app", "warning" if result["approval"] else "info", f"{result['module']} request routed", result["summary"])
    audit_fn(conn, user["username"], "AI chat", result["module"], result["summary"])
    return {"module": result["module"], "risk": result["risk"], "approval_required": result["approval"], "summary": result["summary"], "response": result["summary"]}


def handle_request(conn, user, text, audit_fn, memory_fn, workflow_fn, notify_fn, now_fn):
    result = classify_request(text)
    title = text.split(".")[0][:60]
    status = "pending_approval" if result["approval"] else "completed"
    conn.execute(
        "INSERT INTO requests(user_id,title,details,module,risk,status,approval_required,created_at,resolved_at,summary) VALUES (?,?,?,?,?,?,?,?,?,?)",
        (user["id"], title, text, result["module"], result["risk"], status, 1 if result["approval"] else 0, now_fn(), None if result["approval"] else now_fn(), result["summary"]),
    )
    req_id = conn.execute("SELECT last_insert_rowid() AS id").fetchone()["id"]
    if result["approval"]:
        conn.execute(
            "INSERT INTO approvals(request_id, approver_role, status, decision_note, created_at) VALUES (?,?,?,?,?)",
            (req_id, "manager", "pending", "Human review required.", now_fn()),
        )
        notify_fn(conn, user["id"], "email", "warning", f"{result['module']} approval pending", result["summary"])
    else:
        audit_fn(conn, user["username"], "Request completed", result["module"], result["summary"])
        notify_fn(conn, user["id"], "in-app", "info", f"{result['module']} completed", result["summary"])
    memory_fn(conn, user["id"], user["role"], text, result["module"], result["summary"])
    workflow_fn(conn, user["id"], "Department workflow", result["module"], "waiting" if result["approval"] else "completed", {"request_id": req_id, "title": title})
    audit_fn(conn, user["username"], "Request routed", result["module"], f"{title} -> {result['summary']}")
    return {"ok": True, "module": result["module"], "approval": result["approval"]}


def handle_approval(conn, user, approval_id, decision, note, audit_fn, notify_fn, now_fn):
    approval = conn.execute("SELECT * FROM approvals WHERE id=?", (approval_id,)).fetchone()
    if not approval:
        return None
    approved = decision == "approve"
    conn.execute(
        "UPDATE approvals SET status=?, decision_note=?, decided_at=? WHERE id=?",
        ("approved" if approved else "rejected", note or ("Approved" if approved else "Rejected"), now_fn(), approval_id),
    )
    if approved:
        conn.execute("UPDATE requests SET status='completed', resolved_at=? WHERE id=?", (now_fn(), approval["request_id"]))
        audit_fn(conn, user["username"], "Approval granted", f"Request {approval['request_id']}", note or "Approved through manager review")
        notify_fn(conn, user["id"], "in-app", "info", "Approval granted", f"Request {approval['request_id']} was approved.")
    else:
        conn.execute("UPDATE requests SET status='rejected', resolved_at=? WHERE id=?", (now_fn(), approval["request_id"]))
        audit_fn(conn, user["username"], "Approval rejected", f"Request {approval['request_id']}", note or "Rejected through manager review")
        notify_fn(conn, user["id"], "in-app", "warning", "Approval rejected", f"Request {approval['request_id']} was rejected.")
    return {"ok": True}
