import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import { createSession, destroySession, getSessionUser, setSessionCookie, clearSessionCookie, getTokenFromRequest } from "../lib/session";
import { logger } from "../lib/logger";

const router: Router = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    res.status(400).json({ error: "Username and password required" });
    return;
  }
  const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username));
  if (!user || user.password !== password) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const token = await createSession(user.id);
  setSessionCookie(res, token);
  res.json({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    department: user.department,
    lang: user.lang,
    theme: user.theme,
  });
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  const token = getTokenFromRequest(req);
  if (token) {
    await destroySession(token);
  }
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const user = await getSessionUser(req);
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    department: user.department,
    lang: user.lang,
    theme: user.theme,
  });
});

export default router;
