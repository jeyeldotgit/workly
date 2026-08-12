# System architecture

## Goal

Deliver a keyboard-first task application with immediate local feedback while keeping PostgreSQL and the REST API authoritative. The architecture is online-first with durable client caching, not a multi-writer CRDT system.

## Runtime components

```text
React client
  Router / pages / feature components
  Zustand: transient UI state only
  TanStack Query: server state, optimistic mutations, persistence
  IndexedDB: persisted query cache and paused mutation state
          |
          | JSON over HTTPS, credentials included
          v
Express API
  auth + workspace middleware
  Zod request/response validation
  task and workspace controllers
  Drizzle repositories
          |
          +--> PostgreSQL: users, workspaces, memberships, tasks
          +--> Redis/BullMQ: AI breakdown jobs
          +--> LLM provider: structured breakdown generation
```

## Repository target layout

The current client can be incrementally moved toward this layout without changing the public behavior of the starter routes:

```text
client/src/
  app/                 providers, router, query client, error boundaries
  components/          shared UI primitives
  features/
    tasks/              list, task row, task mutations, task types
    smart-input/        parser and input UI
    command-palette/    command registry and overlay
    ai-breakdown/       trigger, preview, and mutations
    workspace/          workspace switcher and membership UI
  lib/                 API client, persistence, keyboard helpers
server/src/
  app.ts               Express composition
  server.ts            process bootstrap
  db/                  Drizzle schema, client, migrations
  middleware/          auth, workspace access, errors
  modules/
    auth/
    workspaces/
    tasks/
    ai-breakdown/
  queues/               BullMQ connection and workers
shared/
  domain/               task and workspace types
  contracts/            Zod schemas and API response types
```

## Request lifecycle

1. A feature component calls a typed mutation hook.
2. The hook cancels conflicting task queries and snapshots the relevant cache.
3. The hook applies the local change and persists the query cache.
4. The API client sends an authenticated JSON request.
5. A successful response replaces the optimistic entity with the server entity and invalidates affected list queries.
6. A permanent error restores the snapshot and emits an actionable notification.
7. An offline or retryable failure leaves the mutation paused for retry and exposes sync status in the shell.

## State ownership

| State | Owner | Examples |
| --- | --- | --- |
| Server state | TanStack Query | tasks, members, workspace metadata, job status |
| Transient UI state | Zustand or component state | active workspace id, modal visibility, input draft, palette query |
| Durable local state | IndexedDB persister | query cache, paused mutations |
| Authoritative persisted state | PostgreSQL | users, memberships, tasks |
| Async job state | Redis/BullMQ plus API | breakdown job status and result |

Do not duplicate task entities in Zustand. Do not put credentials, JWTs, or sensitive AI prompts in IndexedDB.

## Environment configuration

The client and server should read configuration from environment variables and fail fast on missing server secrets. At minimum:

```text
VITE_API_BASE_URL
DATABASE_URL
REDIS_URL
SESSION_SECRET
OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET
OAUTH_GOOGLE_CLIENT_ID / OAUTH_GOOGLE_CLIENT_SECRET
LLM_API_KEY
```

Only `VITE_API_BASE_URL` is exposed to the browser. Provider secrets and database credentials stay server-side.

## Delivery slices

Each slice should be independently testable:

| Slice | Exit condition |
| --- | --- |
| Foundation | Client providers, API client, shared contracts, server health endpoint, and migration runner work locally. |
| Tasks | An authenticated user can list/create/complete/update/delete tasks in one workspace. |
| Offline-first UX | Reload and offline task creation preserve local state; reconnect reconciles successfully. |
| Navigation | `Cmd/Ctrl+K`, `Cmd/Ctrl+N`, search, and route actions work from every authenticated screen. |
| AI | A breakdown can be queued, previewed, edited, accepted, and recovered from provider failure. |
