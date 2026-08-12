# Smart natural-language input specification

## Purpose

Provide one fast input for capturing a task title and optional metadata. Parsing runs on every client-side input change and never blocks typing or submission.

## Component contract

Suggested component: `SmartInput`.

```ts
type ParsedTaskInput = {
  title: string;
  tags: string[];
  assigneeQuery: string | null;
  priority: "low" | "med" | "high" | "urgent";
  dueDate: string | null;
  tokens: ParsedToken[];
};

type ParsedToken = {
  kind: "tag" | "assignee" | "priority" | "date";
  raw: string;
  value: string;
  start: number;
  end: number;
  valid: boolean;
};
```

The input owns only the draft string and parse result. Task creation belongs to the task mutation hook described in [optimistic-state-and-persistence.md](optimistic-state-and-persistence.md).

## Parsing rules

Run parsers in this order:

1. Extract `#tag` tokens with `/(^|\s)#([\p{L}\p{N}_-]{1,50})/gu`.
2. Extract `@assignee` tokens with `/(^|\s)@([\p{L}\p{N}._-]{1,100})/gu`.
3. Extract priority tokens with `/(^|\s)!((?:high|med|low|urgent|p[1-4]))\b/giu`.
4. Pass the remaining input to `chrono-node` using the user's locale/time zone and select the first unambiguous date expression.
5. Remove recognized token text from the title, collapse whitespace, and trim. Keep a token's raw text in the preview so the user can see what was recognized.

Priority normalization:

| Input | Stored value |
| --- | --- |
| `!urgent`, `!p1` | `urgent` |
| `!high`, `!p2` | `high` |
| `!med`, `!p3` | `med` |
| `!low`, `!p4` | `low` |

If multiple priority tokens occur, the last valid token wins and all priority tokens remain visible in the parse preview. If a date is ambiguous or invalid, leave it in the title and show no due-date badge. Never silently invent a date.

Assignee tokens initially produce `assigneeQuery`; resolve them against workspace members on submit or selection. An unresolved assignee must not cause task creation to fail: show the unresolved badge and allow the user to remove it.

## Interaction behavior

- `Enter` submits when the normalized title is non-empty and no IME composition is active.
- `Shift+Enter` inserts a newline only if multiline input is enabled; otherwise it has no submit side effect.
- `Escape` clears the current draft only after a confirmation affordance when the draft is non-empty.
- Badges are interactive, keyboard-focusable, and removable. Removing a badge removes its source token from the draft.
- The preview updates within one animation frame for ordinary input lengths. Parsing must be pure and debounced only if profiling shows it is needed.
- `/breakdown` is recognized as a command trigger only when it is the first non-whitespace token; its flow is defined in [ai-breakdown.md](ai-breakdown.md).

## Submit payload

```ts
{
  id: crypto.randomUUID(),
  title: parsed.title,
  tags: parsed.tags,
  priority: parsed.priority,
  dueDate: parsed.dueDate,
  assignedTo: resolvedMemberId ?? null,
  completed: false,
}
```

After submit, clear the draft immediately, insert the optimistic task into the active list, and focus the input again. If submission rolls back, restore the task only through the mutation error notification; do not silently restore the user's cleared draft.

## Accessibility and test cases

Use a visible label or `aria-label="Create a task"`, an `aria-describedby` relationship for parse guidance/errors, and `aria-live="polite"` for parse-status changes that matter to screen-reader users. Do not announce every keystroke.

Minimum tests:

- `Ship #billing @alex !high tomorrow at 3pm` produces the expected title, tag, assignee query, priority, and ISO due date.
- `next Monday` uses the configured timezone and a stable reference date in tests.
- `!P1` and `!urgent` normalize to `urgent`.
- Token-like text inside a word, such as `email#launch`, is not extracted.
- Empty or token-only input cannot submit.
- IME composition does not submit on an intermediate Enter event.
- Removing a badge updates both the preview and the underlying draft.
