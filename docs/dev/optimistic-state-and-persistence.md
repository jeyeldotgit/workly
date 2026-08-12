# Optimistic state and persistence specification

## Query keys

Use stable, workspace-scoped keys so cached data cannot leak across workspace switches:

```ts
const taskKeys = {
  all: ["tasks"] as const,
  list: (workspaceId: string, filters: TaskFilters) =>
    ["tasks", "list", workspaceId, filters] as const,
  detail: (workspaceId: string, taskId: string) =>
    ["tasks", "detail", workspaceId, taskId] as const,
};
```

Serialize filters in a stable order. Query functions must receive the workspace id from the query key and use the API path from [data-model-and-api.md](data-model-and-api.md).

## Mutation protocol

Every task mutation follows the same lifecycle:

```ts
onMutate: async (input) => {
  await queryClient.cancelQueries({ queryKey: taskKeys.all });
  const snapshot = captureAffectedTaskQueries();
  applyOptimisticChange(input);
  return { snapshot };
},
onError: (_error, _input, context) => restoreSnapshot(context.snapshot),
onSuccess: (serverTask) => reconcileServerTask(serverTask),
onSettled: (_data, _error, input) => invalidateAffectedQueries(input),
```

Implement for create, completion toggle, task update/tag update, and delete. Snapshot all affected list/detail queries, not just the currently visible list, because Today/Upcoming/tag/search views may contain the same task.

### Create

- Generate the UUID before the mutation begins.
- Insert the task into the active list with `createdAt`/`updatedAt` set to the current client time and mark it as `syncStatus: "pending"` in client-only metadata.
- On success, replace the temporary entity with the API response.
- On duplicate/idempotent replay, accept the server's existing entity.

### Toggle/update

- Update only fields supplied by the action.
- Preserve the prior object in the mutation context.
- If a server conflict (`409`) occurs, restore the snapshot and offer a refresh/review action.

### Delete

- Remove the task from all cached lists immediately.
- Keep the snapshot until success; on failure restore it in its original list position when possible.

## Offline behavior

Configure TanStack Query's `onlineManager` with browser network events. When offline:

- Queries may render persisted data but should not repeatedly hammer the API.
- Mutations remain in the mutation cache and are paused for retry.
- The shell displays a non-blocking offline/sync indicator.
- On reconnection, resume paused mutations in submission order, then invalidate task queries.

Retry policy:

| Failure | Behavior |
| --- | --- |
| Network error | Pause/retry with exponential backoff, capped at 30 seconds. |
| HTTP 408/429/5xx | Retry a bounded number of times; honor `Retry-After` for `429` when present. |
| HTTP 400/401/403/404/409 | Do not auto-retry; roll back or require re-authentication/conflict handling. |

Do not claim a task is permanently saved while it has pending sync. The row needs a subtle pending/failed status that is available to assistive technology.

## IndexedDB persistence

Use `@tanstack/query-persist-client-core` with an IndexedDB persister. Persist only the task/workspace query cache and paused mutation state. Set a bounded cache age and handle quota errors by logging a diagnostic and continuing with in-memory operation.

On startup:

1. Create the query client and persister before rendering routes.
2. Restore the cache.
3. Render the shell from restored data where available.
4. Revalidate when online and resume paused mutations.
5. Clear workspace-scoped cache entries on logout or account switch.

Never persist authentication cookies, access tokens, raw LLM responses, or data from a workspace the current session can no longer access.

## Notifications and observability

Use one consistent notification path for rollback, conflict, expired session, and offline failures. Include the request id when available. Record mutation duration, retry count, rollback count, and cache-restore failures without logging task titles or user-generated prompts.

## Acceptance tests

- A task appears in the active list before the create request resolves.
- A rejected create, toggle, update, or delete restores every affected cache view.
- Reloading while online shows persisted tasks before the network response returns.
- Creating a task offline preserves it as pending and syncs once after reconnection.
- Logout removes protected cached data and paused mutations.
- Two rapid edits do not cause an older response to overwrite a newer local edit.
