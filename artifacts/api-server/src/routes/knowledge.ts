import { Router } from "express";
import { db, knowledgeTable, reportsTable } from "@workspace/db";
import { eq, ilike, and, sql } from "drizzle-orm";
import { getSessionUser } from "../lib/session";

const router: Router = Router();

router.get("/knowledge", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { category, q } = req.query as { category?: string; q?: string };

  const conditions = [];
  if (category) conditions.push(eq(knowledgeTable.category, category));
  if (q) conditions.push(ilike(knowledgeTable.title, `%${q}%`));

  let rows;
  if (conditions.length > 0) {
    rows = await db.select().from(knowledgeTable).where(and(...conditions)).orderBy(knowledgeTable.id);
  } else {
    rows = await db.select().from(knowledgeTable).orderBy(knowledgeTable.id);
  }

  res.json(rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    summary: r.summary,
    content: r.content,
  })));
});

router.get("/knowledge/:id", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.select().from(knowledgeTable).where(eq(knowledgeTable.id, id));
  if (!row) { res.status(404).json({ error: "Article not found" }); return; }
  res.json({ id: row.id, title: row.title, category: row.category, summary: row.summary, content: row.content });
});

router.get("/reports", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const rows = await db.select().from(reportsTable).orderBy(reportsTable.id);
  res.json(rows.map((r) => ({
    id: r.id, title: r.title, period: r.period, summary: r.summary, insight: r.insight,
  })));
});

router.get("/reports/:id", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.select().from(reportsTable).where(eq(reportsTable.id, id));
  if (!row) { res.status(404).json({ error: "Report not found" }); return; }
  res.json({ id: row.id, title: row.title, period: row.period, summary: row.summary, insight: row.insight });
});

export default router;
