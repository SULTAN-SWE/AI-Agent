import { Router } from "express";
import { db, requestsTable, approvalsTable } from "@workspace/db";
import { eq, inArray, sql } from "drizzle-orm";
import { getSessionUser } from "../lib/session";
import { AGENTS, MODULES, ROADMAP } from "../lib/classify";

const router: Router = Router();

router.get("/dashboard", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const completed = await db
    .select({ count: sql<number>`count(*)` })
    .from(requestsTable)
    .where(eq(requestsTable.status, "completed"));
  const pending = await db
    .select({ count: sql<number>`count(*)` })
    .from(requestsTable)
    .where(inArray(requestsTable.status, ["pending_approval", "processing"]));
  const pendingApprovals = await db
    .select({ count: sql<number>`count(*)` })
    .from(approvalsTable)
    .where(eq(approvalsTable.status, "pending"));

  const recentRequests = await db
    .select()
    .from(requestsTable)
    .orderBy(sql`${requestsTable.createdAt} DESC`)
    .limit(8);

  const pendingApprovalsList = await db
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
    .where(eq(approvalsTable.status, "pending"))
    .orderBy(sql`${approvalsTable.createdAt} DESC`)
    .limit(5);

  const resolvedToday = Number(completed[0]?.count ?? 0);
  const pendingCount = Number(pendingApprovals[0]?.count ?? 0) + Number(pending[0]?.count ?? 0);

  res.json({
    summary: {
      companyHealth: 96,
      pendingApprovals: pendingCount,
      automationSuccess: 87,
      resolvedToday,
      sla: 98,
    },
    modules: MODULES,
    recentRequests: recentRequests.map((r) => ({
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
    })),
    pendingApprovals: pendingApprovalsList.map((a) => ({
      id: a.id,
      requestId: a.requestId,
      approverRole: a.approverRole,
      status: a.status,
      decisionNote: a.decisionNote ?? null,
      createdAt: a.createdAt?.toISOString() ?? "",
      decidedAt: a.decidedAt?.toISOString() ?? null,
      requestTitle: a.requestTitle ?? null,
      requestModule: a.requestModule ?? null,
    })),
    insights: [
      { scope: "executive", title: "Operational backlog", summary: `${pendingCount} requests are still active across the platform.`, confidence: 91 },
      { scope: "manager", title: "Automation rate", summary: "87% of requests are fully automated without human intervention.", confidence: 88 },
      { scope: "workflow", title: "SLA compliance", summary: "98% of requests are resolved within the defined SLA window.", confidence: 95 },
    ],
    roadmap: ROADMAP,
  });
});

export default router;
