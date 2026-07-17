import crypto from "crypto";
import { db, sessionsTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: number): Promise<string> {
  const token = generateToken();
  await db.insert(sessionsTable).values({ token, userId });
  return token;
}

export async function destroySession(token: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
}

export function getTokenFromRequest(req: Request): string | null {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/platform_session=([^;]+)/);
  return match ? match[1] : null;
}

export async function getSessionUser(req: Request) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  const [session] = await db.select().from(sessionsTable).where(eq(sessionsTable.token, token));
  if (!session) return null;
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
  return user || null;
}

export function setSessionCookie(res: Response, token: string): void {
  res.setHeader(
    "Set-Cookie",
    `platform_session=${token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=86400`
  );
}

export function clearSessionCookie(res: Response): void {
  res.setHeader(
    "Set-Cookie",
    "platform_session=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0"
  );
}
