# Security, accessibility, performance, and release specification

## Security

- Use HTTP-only, `Secure`, `SameSite=Lax` session cookies; use a CSRF defense for state-changing requests when the deployment topology requires it.
- Allow only configured OAuth redirect URLs for GitHub and Google. Validate `state` and provider responses server-side.
- Configure strict CORS with an explicit client origin and `credentials: true`; never use wildcard origins with credentials.
- Validate every request path parameter, query parameter, body, and external provider response with Zod.
- Authorize workspace membership in middleware and re-check resource ownership in repositories/services.
- Escape/render user task titles as text. Do not render task content as HTML.
- Rate-limit login, task mutation bursts, and AI breakdown requests. Add request ids to every response.
- Keep secrets in server environment configuration. Do not log cookies, tokens, task content, prompts, or provider payloads.
- Enable PostgreSQL foreign keys and daily backups; document restore testing before public beta.

## Accessibility

Target WCAG 2.1 AA for all V1 screens.

- Every form control has an accessible name and a useful validation message.
- All functionality is usable with keyboard only, including task rows, badges, command palette, and AI preview.
- Focus moves into modals on open, is trapped while open, and returns to the invoking control on close.
- Do not rely on color alone for priority, completion, pending sync, or errors.
- Provide visible focus styles and sufficient contrast in the dark theme.
- Respect `prefers-reduced-motion`; avoid animation as the only indication of optimistic changes.
- Announce meaningful async transitions through concise polite live regions.
- Task completion controls expose their current state and an actionable label.

## Performance budgets

| Measure | Gate |
| --- | --- |
| Local task mutation render | Visible in the next frame; target <=16 ms on a reference laptop. |
| REST API | p95 <100 ms for ordinary task list and mutation endpoints, excluding cold starts. |
| Initial JavaScript | <180 KB gzipped for the initial route; lazy-load AI and non-critical route code. |
| Task search interaction | Keyboard input remains responsive at 60 FPS with 1,000 loaded task results. |
| Startup | Restore persisted task data without waiting for the first network response. |

Measure with production builds and representative data. Track p50/p95/p99 rather than relying on a single local run.

## Reliability and observability

- Expose `GET /health` for process health and a separate dependency/readiness check for PostgreSQL and Redis.
- Instrument API latency, status code, DB query time, queue latency, job failure rate, mutation rollback count, and cache restore failures.
- Use structured logs with request/job ids and workspace/user ids hashed or otherwise non-identifying.
- Add an error boundary around the application shell and feature-level failure states around task and AI surfaces.
- Daily backups must have a documented restore procedure and periodic restore verification.

## Test matrix

| Area | Required coverage |
| --- | --- |
| Parser | Unit tests for token grammar, dates, normalization, malformed input, and timezone behavior. |
| API | Contract tests for validation, auth, role permissions, workspace isolation, idempotency, and error envelopes. |
| Mutations | Tests for optimistic create/toggle/update/delete, rollback, retries, conflicts, and cache persistence. |
| UI | Keyboard and accessibility tests for input, palette, task list, notifications, and AI modal. |
| End-to-end | Login, create task, reload, offline/reconnect, filter/search, command navigation, and AI accept flow. |
| Performance | Production bundle-size check, API p95 check, and 1,000-task interaction profile. |

## V1.0 release gates

Release is blocked until:

- P0 Smart Input, command palette, and optimistic task workflows pass their acceptance tests.
- Workspace authorization and HTTP-only session behavior are verified in integration tests.
- Offline persistence does not expose data after logout or workspace/account switch.
- Accessibility checks report no known critical/serious issues on supported V1 routes.
- Performance budgets are met on a production build.
- Database backup/restore and rollback procedures are documented.
- AI P1 can be disabled by configuration without breaking core task workflows.
