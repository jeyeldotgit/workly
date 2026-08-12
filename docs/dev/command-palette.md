# Global command palette specification

## Purpose

Provide a single keyboard-accessible entry point for navigation and task actions on every authenticated screen.

## Trigger and lifecycle

- Listen at the application shell for `Meta+K` on macOS and `Control+K` on Windows/Linux.
- Call `preventDefault()` only for the matching combination and only when the user is not in a native browser-controlled context such as a password field.
- Open the overlay, focus the search input, and select the first available item.
- `ArrowUp`/`ArrowDown` move selection, `Enter` execute, and `Escape` close and restore focus to the invoking element.
- Do not register duplicate listeners when routes change.

The overlay uses `cmdk` with a dialog semantics layer. The dialog traps focus while open and has a visible close affordance for pointer users.

## Command registry

Commands are data, not conditionals spread across components:

```ts
type Command = {
  id: string;
  group: "actions" | "navigation" | "recent-tasks";
  label: string;
  keywords: string[];
  shortcut?: string;
  isVisible: (context: CommandContext) => boolean;
  execute: (context: CommandContext) => void | Promise<void>;
};
```

Required commands:

| Group | Command | Shortcut/keyword | Behavior |
| --- | --- | --- | --- |
| Actions | Create task | `Cmd/Ctrl+N` | Focus Smart Input. |
| Actions | AI goal breakdown | `/breakdown` | Open AI breakdown flow with current input/context. |
| Actions | Filter by tag | `tag`, `#` | Open tag filter selection. |
| Navigation | Workspace settings | `settings` | Navigate to the active workspace settings route. |
| Navigation | Today's tasks | `today` | Navigate to Today view. |
| Recent tasks | Task entities | title, tags, assignee | Navigate to/select the matching task. |

`Cmd/Ctrl+N` should be handled by the same command registry, with browser default suppression only when the application can execute the action.

## Search and recent tasks

- `cmdk` performs fuzzy matching over label and keywords for static commands.
- Recent task results come from the active workspace task query and are limited to the latest 20 active/recent items.
- Search is client-side over the loaded result set; server-side task filtering remains the source for large lists.
- Show an explicit empty state and a loading state. Never show results from another workspace.
- Selecting a recent task navigates to its detail route or opens the task detail panel, whichever the app shell standardizes on.

## Accessibility

Required semantics:

- Dialog has an accessible name and description.
- Search field has a visible or programmatic label.
- Results use `role="option"` within a `role="listbox"` or the semantics supplied by the chosen command component.
- The active result is exposed with `aria-selected`.
- Group labels are not used as interactive controls.
- Focus remains visible in dark mode with a contrast ratio meeting WCAG 2.1 AA.
- Screen readers receive a concise result-count update, not every keyboard movement.

## Acceptance tests

- `Meta+K` opens the palette on macOS and `Control+K` opens it on Windows/Linux.
- The same listener works after client-side navigation and is removed on unmount.
- All required commands can be reached without a pointer and execute on `Enter`.
- `Escape` closes the dialog and returns focus to the trigger.
- Fuzzy search finds a task by title and tag, with no cross-workspace results.
- An empty result set is announced and remains keyboard dismissible.
