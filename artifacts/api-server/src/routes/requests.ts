import { Router } from "express";
import { db, requestsTable, approvalsTable, auditLogTable, notificationsTable, workflowRunsTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { getSessionUser } from "../lib/session";
import { classifyRequest } from "../lib/classify";

const router: Router = Router();

const serializeRequest = (r: typeof requestsTable.$inferSelect) => ({
  id: r.id,
  userId: r.userId,
  title: r.title,
  details: r.details,
  module: r.module,
  risk: r.risk,
  status: r.status,
  approvalRequired: r.approvalRequired,
  createdAt: r.createdAt?.toISOString() ?? "",
  resolvedAt: r.resolvedAt?.toISOString() ?? null,
  summary: r.summary,
});

router.get("/requests", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { module, status, limit } = req.query as { module?: string; status?: string; limit?: string };
  let query = db.select().from(requestsTable).$dynamic();

  const conditions = [];
  if (module) conditions.push(eq(requestsTable.module, module));
  if (status) conditions.push(eq(requestsTable.status, status));
  if (conditions.length > 0) query = query.where(and(...conditions));

  const rows = await query.orderBy(sql`${requestsTable.createdAt} DESC`).limit(parseInt(limit ?? "20", 10));
  res.json(rows.map(serializeRequest));
});

router.post("/requests/simulate", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { text } = req.body || {};
  if (!text) { res.status(400).json({ error: "text is required" }); return; }

  const result = classifyRequest(text);
  res.json({
    module: result.module,
    risk: result.risk,
    approvalRequired: result.approval,
    summary: result.summary,
  });
});

router.post("/requests", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { text } = req.body || {};
  if (!text) { res.status(400).json({ error: "text is required" }); return; }

  const result = classifyRequest(text);
  const title = text.split(".")[0]?.substring(0, 60) || text.substring(0, 60);
  const status = result.approval ? "pending_approval" : "completed";
  const now = new Date();

  const [req_] = await db.insert(requestsTable).values({
    userId: user.id,
    title,
    details: text,
    module: result.module,
    risk: result.risk,
    status,
    approvalRequired: result.approval,
    summary: result.summary,
    resolvedAt: result.approval ? undefined : now,
  }).returning();

  if (result.approval && req_) {
    await db.insert(approvalsTable).values({
      requestId: req_.id,
      approverRole: "MANAGER",
      status: "pending",
      decisionNote: "HUMAN_REVIEW_REQUIRED",
    });
    await db.insert(notificationsTable).values({
      userId: user.id,
      channel: "EMAIL",
      severity: "warning",
      title: `${result.module}_APPROVAL_PENDING`,
      body: result.summary,
      status: "unread",
    });
  } else {
    await db.insert(notificationsTable).values({
      userId: user.id,
      channel: "IN_APP",
      severity: "info",
      title: `${result.module}_COMPLETED`,
      body: result.summary,
      status: "unread",
    });
  }

  await db.insert(workflowRunsTable).values({
    userId: user.id,
    workflowName: "DEPARTMENT_WORKFLOW",
    module: result.module,
    status: result.approval ? "waiting" : "completed",
    payload: JSON.stringify({ requestId: req_?.id, title }),
    finishedAt: result.approval ? undefined : now,
  });

  await db.insert(auditLogTable).values({
    actor: user.username,
    action: "REQUEST_ROUTED",
    target: result.module,
    detail: result.summary,
  });

  res.status(201).json({ ok: true, module: result.module, approval: result.approval, requestId: req_?.id ?? null });
});

router.get("/requests/:id", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.select().from(requestsTable).where(eq(requestsTable.id, id));
  if (!row) { res.status(404).json({ error: "Request not found" }); return; }
  res.json(serializeRequest(row));
});

export default router;
