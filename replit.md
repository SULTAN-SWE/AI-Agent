# Nexus AI Operations Platform

A full-stack Enterprise AI Operations Platform where employees submit natural-language requests, managers approve them, and executives get intelligent operational dashboards.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, proxied at `/api`)
- `pnpm --filter @workspace/enterprise-platform run dev` — run the frontend (port 18202, proxied at `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run typecheck:libs` — rebuild lib declarations (run this after changing any `lib/` package)
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — cookie signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Frontend: React 19, Vite 7, TanStack Query, wouter, shadcn/ui, Tailwind v4
- Build: esbuild (CJS bundle for server)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle ORM table definitions (users, requests, knowledge, audit)
- `lib/api-client-react/src/generated/api.ts` — generated TanStack Query hooks
- `lib/api-zod/src/generated/api.ts` — generated Zod validation schemas
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/enterprise-platform/src/pages/` — frontend page components
- `artifacts/enterprise-platform/src/components/layout/app-layout.tsx` — nav, auth guard, theme, i18n
- `artifacts/enterprise-platform/src/lib/i18n.ts` — translation strings (EN/AR/ES/NL/FR)

## Architecture decisions

- **Contract-first API**: OpenAPI spec drives both server validation (Zod schemas) and client data fetching (TanStack Query hooks). Never hand-write fetch calls.
- **Cookie-based sessions**: Session token stored in `platform_session` cookie (httpOnly, signed). The `credentials: "include"` option is set globally in `custom-fetch.ts`.
- **Role-based routing**: Navigation items are filtered client-side by `user.role`. API routes also check role server-side via `requireAuth` middleware.
- **Dark-first theme**: `dark` class is applied to `<html>` at boot in `main.tsx`. AppLayout manages the toggle via state.
- **Lib rebuild rule**: Any change to a `lib/` package requires `pnpm run typecheck:libs` before leaf artifact typechecks will see the updated types.

## Product

- **AI Workspace**: Employees type natural-language requests; the backend classifies them by department and risk level, auto-approves low-risk ones, and routes others to approval queue.
- **Approvals**: Managers and executives see pending requests and can approve/reject with notes.
- **Knowledge Base**: 7 pre-seeded articles covering IT, HR, Finance, Security, Procurement policies.
- **Executive Reports**: 4 pre-seeded operational summaries with AI strategic insights.
- **Audit Log**: Immutable record of every action on the platform.
- **Multi-language**: EN, AR (RTL), ES, NL, FR via i18n translation map.
- **Multi-role**: employee / manager / executive / admin — each with different nav visibility and permissions.

## Demo credentials

| Account    | Password  | Role       |
|------------|-----------|------------|
| employee   | Demo123!  | Employee   |
| manager    | Demo123!  | Manager    |
| executive  | Demo123!  | Executive  |
| admin      | Demo123!  | Admin      |

## Gotchas

- Always run `pnpm run typecheck:libs` after changing anything in `lib/` — stale declarations cause confusing TS2305 "no exported member" errors in route files.
- The shared proxy routes `/api` to port 8080 and `/` to port 18202. Do NOT configure Vite proxy; the platform proxy handles cross-service routing.
- TanStack Query is configured to NOT retry on 401/403/404 — this prevents the auth loading spinner from hanging while retries exhaust.
- Passwords are stored as plaintext in the demo seed. In production, use bcrypt.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
