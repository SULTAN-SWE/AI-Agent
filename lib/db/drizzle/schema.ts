import { pgTable, unique, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const sessions = pgTable("sessions", {
	id: serial().primaryKey().notNull(),
	token: text().notNull(),
	userId: integer("user_id").notNull(),
}, (table) => [
	unique("sessions_token_unique").on(table.token),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: text().notNull(),
	password: text().notNull(),
	displayName: text("display_name").notNull(),
	role: text().notNull(),
	department: text().notNull(),
	lang: text().default('en').notNull(),
	theme: text().default('dark').notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username),
]);

export const approvals = pgTable("approvals", {
	id: serial().primaryKey().notNull(),
	requestId: integer("request_id").notNull(),
	approverRole: text("approver_role").notNull(),
	status: text().notNull(),
	decisionNote: text("decision_note"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	decidedAt: timestamp("decided_at", { withTimezone: true, mode: 'string' }),
});

export const requests = pgTable("requests", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	title: text().notNull(),
	details: text().notNull(),
	module: text().notNull(),
	risk: text().notNull(),
	status: text().notNull(),
	approvalRequired: boolean("approval_required").default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: 'string' }),
	summary: text().notNull(),
});

export const knowledge = pgTable("knowledge", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	category: text().notNull(),
	summary: text().notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const reports = pgTable("reports", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	period: text().notNull(),
	summary: text().notNull(),
	insight: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const auditLog = pgTable("audit_log", {
	id: serial().primaryKey().notNull(),
	actor: text().notNull(),
	action: text().notNull(),
	target: text().notNull(),
	detail: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	channel: text().notNull(),
	severity: text().notNull(),
	title: text().notNull(),
	body: text().notNull(),
	status: text().default('unread').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	readAt: timestamp("read_at", { withTimezone: true, mode: 'string' }),
});

export const workflowRuns = pgTable("workflow_runs", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	workflowName: text("workflow_name").notNull(),
	module: text().notNull(),
	status: text().notNull(),
	payload: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
});
