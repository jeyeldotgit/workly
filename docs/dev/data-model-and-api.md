# Data model and API specification

## Domain model

The PRD schema is the baseline. Use Drizzle migrations to create it; do not rely on `CREATE TABLE` calls at application startup.

### Tables

| Table | Required fields and constraints |
| --- | --- |
| `users` | `id` UUID primary key, unique `email`, required `name`, optional `avatar_url`, `created_at`. |
| `workspaces` | `id` UUID primary key, unique `slug`, required `name`, `created_at`. |
| `workspace_members` | Composite primary key `(workspace_id, user_id)`, role enum `owner \| admin \| editor \| viewer`, cascading workspace/user references. |
| `tasks` | `id` UUID primary key, required `workspace_id`, `title`, `completed`, `priority`, `tags`, timestamps; nullable `created_by`, `assigned_to`. |

Use database enums or constrained text for `priority` (`low`, `med`, `high`, `urgent`) and `role`. Store tags normalized to lowercase, without the leading `#`, and deduplicated.

Add these indexes in addition to the PRD indexes:

- `(workspace_id, completed, due_date)` for active-list and Today/Upcoming queries.
- `(workspace_id, updated_at DESC)` for recent task search results.
- A GIN index on `tags` if tag filtering is implemented with PostgreSQL array operators.

## Shared types

```ts
type TaskPriority = "low" | "med" | "high" | "urgent";
type WorkspaceRole = "owner" | "admin" | "editor" | "viewer";

type Task = {
  id: string;
  workspaceId: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: string | null; // ISO-8601 UTC timestamp
  tags: string[];
  createdBy: string | null;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
};
```

Use camelCase in JSON and map to snake_case only in the Drizzle/database layer. All timestamps crossing the API are ISO-8601 UTC strings.

## REST conventions

Base path: `/api/v1`. Every protected request includes the HTTP-only session cookie and an explicit workspace id in the path.

### Authentication and session

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/auth/session` | Return the current user and selected workspace memberships, or `401`. |
| `POST` | `/api/v1/auth/logout` | Clear the session cookie. |
| `GET` | `/api/v1/auth/:provider/start` | Begin GitHub or Google OAuth flow. |
| `GET` | `/api/v1/auth/:provider/callback` | Validate provider response, upsert user, establish session, redirect to client. |

### Workspaces and members

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/workspaces` | List workspaces available to the current user. |
| `GET` | `/api/v1/workspaces/:workspaceId` | Return workspace metadata and the current user's role. |
| `GET` | `/api/v1/workspaces/:workspaceId/members` | List members for assignee resolution. |

### Tasks

| Method | Path | Body/query | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/v1/workspaces/:workspaceId/tasks` | `status`, `tag`, `q`, `due`, `limit`, `cursor` | List tasks with filters and cursor pagination. |
| `POST` | `/api/v1/workspaces/:workspaceId/tasks` | `CreateTaskInput` | Create one task. Client may provide a UUID. |
| `GET` | `/api/v1/workspaces/:workspaceId/tasks/:taskId` | — | Read one task. |
| `PATCH` | `/api/v1/workspaces/:workspaceId/tasks/:taskId` | Partial `UpdateTaskInput` | Update title, completion, priority, due date, tags, or assignee. |
| `DELETE` | `/api/v1/workspaces/:workspaceId/tasks/:taskId` | — | Delete one task. |

`CreateTaskInput`:

```ts
{
  id?: string;
  title: string;             // trimmed, 1-500 characters
  completed?: boolean;
  priority?: TaskPriority;
  dueDate?: string | null;
  tags?: string[];           // max 20, each 1-50 characters
  assignedTo?: string | null;
}
```

`UpdateTaskInput` must reject an empty object and unknown fields. A viewer may read but cannot create, update, or delete. Editors may manage tasks; admins/owners additionally manage membership and workspace settings.

## Error contract

All non-2xx responses use:

```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task was not found in this workspace.",
    "details": {}
  },
  "requestId": "req_..."
}
```

Required codes include `UNAUTHENTICATED`, `FORBIDDEN`, `VALIDATION_ERROR`, `TASK_NOT_FOUND`, `WORKSPACE_NOT_FOUND`, `CONFLICT`, `RATE_LIMITED`, and `INTERNAL_ERROR`. `details` may contain field-level Zod issues but must never contain secrets or raw provider responses.

## Concurrency and idempotency

- `POST` with a client-supplied task UUID is idempotent: repeat requests return the existing task when it belongs to the same workspace/user context.
- Include `updatedAt` in update requests or use an `If-Match`/version check when a task is edited. Return `409 CONFLICT` when the server detects a stale update.
- The client must reconcile a successful response rather than blindly merging a stale optimistic object.
- Never allow a workspace id from the URL to be bypassed by a body field or query parameter.

## API acceptance tests

- A user cannot read or mutate a task outside a workspace where they are a member.
- Invalid dates, priorities, tags, UUIDs, and oversized titles return `400 VALIDATION_ERROR`.
- Replaying a create request with the same task UUID does not create a duplicate.
- Task list filters compose correctly and remain workspace-scoped.
- All protected endpoints reject missing/expired sessions with `401`.
