# AI task breakdown specification

## Scope

AI breakdown is a P1 feature. It must be isolated from ordinary task creation and degrade gracefully when the provider, queue, or network is unavailable.

## User flow

1. The user enters a broad goal in Smart Input or chooses AI Goal Breakdown from the command palette.
2. The client submits the goal and active workspace id to the API.
3. The API validates the request, authorizes workspace access, and enqueues a BullMQ job.
4. The client opens a preview modal and polls the job status or uses a future push channel.
5. The worker calls the LLM with a strict structured-output schema.
6. The client renders editable sub-tasks with duration and recommended tags.
7. The user accepts all, edits individual items, removes items, or regenerates.
8. Acceptance creates tasks through the normal task-create mutation contract; a failed item can be retried without duplicating successful items.

## Contracts

Request:

```ts
{
  goal: string;              // trimmed, 1-2000 characters
  workspaceId: string;
  source: "smart-input" | "command-palette";
  context?: {                // bounded, optional
    existingTags?: string[];
  };
}
```

Response from `POST /api/v1/workspaces/:workspaceId/ai-breakdowns`:

```json
{
  "jobId": "job_...",
  "status": "queued"
}
```

Status response from `GET /api/v1/workspaces/:workspaceId/ai-breakdowns/:jobId`:

```ts
type BreakdownStatus =
  | { status: "queued" | "processing" }
  | { status: "completed"; items: BreakdownItem[] }
  | { status: "failed"; code: string; message: string };

type BreakdownItem = {
  clientId: string;
  title: string;
  estimatedMinutes: number;
  recommendedTags: string[];
  priority: "low" | "med" | "high" | "urgent";
};
```

The server validates both the incoming request and the worker/provider response with Zod. Reject or repair nothing silently: an invalid model response is a failed job with a safe user-facing message and a server diagnostic.

## Worker behavior

- Use a bounded prompt containing the goal and optional tag vocabulary; do not send unrelated workspace task content by default.
- Set provider timeouts, retry only transient provider/rate-limit errors, and cap total attempts.
- Make jobs idempotent by `jobId`; retries must not create tasks.
- Store only the validated result and operational metadata needed for the preview lifetime. Apply a short retention policy.
- Redact goal text and model output from ordinary logs; use request/job ids for tracing.
- Rate-limit breakdown requests per user/workspace and enforce maximum item count and duration range.

## Preview modal behavior

- Show queued and processing states with cancel/close controls.
- Each item has editable title, duration, priority, tags, and a remove control.
- The modal must not create tasks until the user explicitly accepts.
- Accepting uses the task API and client mutation layer, with a deterministic client id per item.
- If some creates succeed and some fail, retain failed items in the preview and clearly identify successful items; retrying must reuse their client ids.
- Regenerate replaces only the current preview after confirmation if the user has edited items.

## Security and privacy

Enforce workspace authorization before enqueueing and when reading job status. Do not expose provider keys, internal prompts, raw exceptions, or another member's private data. The feature is unavailable when no authenticated workspace context exists.

## Acceptance tests

- `/breakdown` works from both required entry points.
- Invalid or oversized goals return a validated error without enqueueing a job.
- A completed job always conforms to the `BreakdownItem` schema.
- Provider timeout and malformed output produce a recoverable failed state.
- Preview edits are preserved until accept/regenerate/cancel is chosen.
- Accepting creates exactly one task per retained item, even after network retry.
- AI failure does not block ordinary task capture or task list use.
