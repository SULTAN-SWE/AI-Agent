import { Router } from "express";
import { db, approvalsTable, requestsTable, auditLogTable, notificationsTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { getSessionUser } from "../lib/session";

const router: Router = Router();

const serializeApproval = (a: typeof approvalsTable.$inferSelect & { requestTitle?: string | null; requestModule?: string | null }) => ({
  id: a.id,
  requestId: a.requestId,
  approverRole: a.approverRole,
  status: a.status,
  decisionNote: a.decisionNote ?? null,
  createdAt: a.createdAt?.toISOString() ?? "",
  decidedAt: a.decidedAt?.toISOString() ?? null,
  requestTitle: a.requestTitle ?? null,
  requestModule: a.requestModule ?? null,
});

router.get("/approvals", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { status } = req.query as { status?: string };

  let query = db
    .select({
      id: approvalsTable.id,
      requestId: approvalsTable.requestId,
      approverRole: approvalsTable.approverRole,
      status: approvalsTable.status,
      decisionNote: approvalsTable.decisionNote,
      createdAt: approvalsTable.createdAt,
      decidedAt: approvalsTable.decidedAt,
      requestTitle: requestsTable.title,
      requestModule: requestsTable.module,
    })
    .from(approvalsTable)
    .leftJoin(requestsTable, eq(approvalsTable.requestId, requestsTable.id))
    .$dynamic();

  if (status) query = query.where(eq(approvalsTable.status, status));

  const rows = await query.orderBy(sql`${approvalsTable.createdAt} DESC`);
  res.json(rows.map(serializeApproval));
});

router.post("/approvals/:id/decide", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { decision, note } = req.body || {};

  if (!decision || !["approve", "reject"].includes(decision)) {
    res.status(400).json({ error: "decision must be 'approve' or 'reject'" });
    return;
  }

  const [approval] = await db.select().from(approvalsTable).where(eq(approvalsTable.id, id));
  if (!approval) { res.status(404).json({ error: "Approval not found" }); return; }

  const now = new Date();
  const approved = decision === "approve";

  await db.update(approvalsTable).set({
    status: approved ? "approved" : "rejected",
    decisionNote: note || (approved ? "Approved" : "Rejected"),
    decidedAt: now,
  }).where(eq(approvalsTable.id, id));

  await db.update(requestsTable).set({
    status: approved ? "completed" : "rejected",
    resolvedAt: now,
  }).where(eq(requestsTable.id, approval.requestId));

  await db.insert(auditLogTable).values({
    actor: user.username,
    action: approved ? "Approval granted" : "Approval rejected",
    target: `Request ${approval.requestId}`,
    detail: note || (approved ? "Approved through manager review" : "Rejected through manager review"),
  });

  await db.insert(notificationsTable).values({
    userId: user.id,
    channel: "in-app",
    severity: approved ? "info" : "warning",
    title: approved ? "Approval granted" : "Approval rejected",
    body: `Request ${approval.requestId} was ${approved ? "approved" : "rejected"}.`,
    status: "unread",
  });

  res.json({ ok: true });
});

export default router;
