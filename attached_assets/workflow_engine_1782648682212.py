import json

from .ai_core import classify_request


def record_workflow(conn, user_id, workflow_name, module, status, payload):
    conn.execute(
        "INSERT INTO workflow_runs(user_id,workflow_name,module,status,payload,created_at) VALUES (?,?,?,?,?,datetime('now'))",
        (user_id, workflow_name, module, status, json.dumps(payload, ensure_ascii=False)),
    )


def enqueue_notification(conn, user_id, channel, severity, title, body):
    conn.execute(
        "INSERT INTO notifications(user_id,channel,severity,title,body,status,created_at) VALUES (?,?,?,?,?,?,?,'unread',datetime('now'))",
        (user_id, channel, severity, title, body),
    )


def simulate_route(conn, user_id, role, text, workflow_name="Master Orchestrator"):
    result = classify_request(text)
    record_workflow(conn, user_id, workflow_name, result["module"], "waiting" if result["approval"] else "completed", {"text": text, "module": result["module"]})
    return result

