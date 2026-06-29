import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const requestsTable = pgTable("requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  details: text("details").notNull(),
  module: text("module").notNull(),
  risk: text("risk").notNull(),
  status: text("status").notNull(),
  approvalRequired: boolean("approval_required").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  summary: text("summary").notNull(),
});

export const insertRequestSchema = createInsertSchema(requestsTable).omit({ id: true, createdAt: true, resolvedAt: true });
export type InsertRequest = z.infer<typeof insertRequestSchema>;
export type Request = typeof requestsTable.$inferSelect;

export const approvalsTable = pgTable("approvals", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull(),
  approverRole: text("approver_role").notNull(),
  status: text("status").notNull(),
  decisionNote: text("decision_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
});
export type Approval = typeof approvalsTable.$inferSelect;
