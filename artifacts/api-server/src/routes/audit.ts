import { Router } from "express";
import { db, auditLogTable, notificationsTable, workflowRunsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { getSessionUser } from "../lib/session";
import { AGENTS } from "../lib/classify";

const router: Router = Router();

router.get("/audit", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { limit } = req.query as { limit?: string };
  const lim = Math.min(parseInt(limit ?? "50", 10), 200);

  const rows = await db.select().from(auditLogTable).orderBy(sql`${auditLogTable.createdAt} DESC`).limit(lim);
  res.json(rows.map((r) => ({
    id: r.id,
    actor: r.actor,
    action: r.action,
    target: r.target,
    detail: r.detail,
    createdAt: r.createdAt?.toISOString() ?? "",
  })));
});

router.get("/notifications", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const rows = await db.select().from(notificationsTable)
    .where(eq(notificationsTable.userId, user.id))
    .orderBy(sql`${notificationsTable.createdAt} DESC`)
    .limit(30);

  res.json(rows.map((r) => ({
    id: r.id,
    userId: r.userId,
    channel: r.channel,
    severity: r.severity,
    title: r.title,
    body: r.body,
    status: r.status,
    createdAt: r.createdAt?.toISOString() ?? "",
    readAt: r.readAt?.toISOString() ?? null,
  })));
});

router.post("/notifications/:id/read", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  await db.update(notificationsTable).set({ status: "read", readAt: new Date() }).where(eq(notificationsTable.id, id));
  res.json({ ok: true });
});

router.get("/workflows", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const rows = await db.select().from(workflowRunsTable)
    .where(eq(workflowRunsTable.userId, user.id))
    .orderBy(sql`${workflowRunsTable.createdAt} DESC`)
    .limit(20);

  res.json(rows.map((r) => ({
    id: r.id,
    userId: r.userId,
    workflowName: r.workflowName,
    module: r.module,
    status: r.status,
    payload: r.payload,
    createdAt: r.createdAt?.toISOString() ?? "",
    finishedAt: r.finishedAt?.toISOString() ?? null,
  })));
});

router.get("/agents", async (_req, res): Promise<void> => {
  res.json(AGENTS);
});

router.get("/insights", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  res.json([
    { id: 1, scope: "executive", title: "Operational efficiency", summary: "Platform is operating at 96% health with strong automation rates across all departments.", confidence: 91 },
    { id: 2, scope: "manager", title: "Approval throughput", summary: "Average approval turnaround time is under 2 hours for medium-risk requests.", confidence: 88 },
    { id: 3, scope: "workflow", title: "IT self-service rate", summary: "72% of IT requests are resolved automatically without human escalation.", confidence: 90 },
    { id: 4, scope: "executive", title: "HR compliance", summary: "All leave requests are processed within the defined SLA window with full audit trail.", confidence: 95 },
  ]);
});

export default router;
