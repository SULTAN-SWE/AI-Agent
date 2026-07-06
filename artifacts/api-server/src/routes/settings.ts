import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { getSessionUser } from "../lib/session";

const router: Router = Router();

router.patch("/settings", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { lang, theme, role } = req.body || {};
  const updates: Partial<typeof usersTable.$inferInsert> = {};
  if (lang) updates.lang = lang;
  if (theme) updates.theme = theme;
  if (role) updates.role = role;

  await db.update(usersTable).set(updates).where(eq(usersTable.id, user.id));
  res.json({ ok: true });
});

export default router;
