# product-requirement-doc.md

# Product Requirement Document (PRD): Workly

**Brand Name:** Workly

**Tagline:** Manage workflow with ease

**Document Owner:** Lead Product Manager & Engineering Lead

**Status:** Approved for V1.0 Engineering Sprint

**Target Release Date:** Q4 2026

**Version:** 1.1.0 (Architecture Revised: Optimistic Online-First)

---

## 1. Executive Summary & Product Vision

**Workly** is a high-velocity, keyboard-driven task and workflow management platform designed for developers, creative agency teams, and freelancers. Built around the core promise _"Manage workflow with ease"_, Workly combines the instant, tactile feel of a native desktop application with the simplicity of standard web infrastructure.

Rather than imposing the heavy engineering overhead of CRDT (Conflict-free Replicated Data Types) distributed engines, Workly achieves **$0\text{ms}$ perceived UI latency** using **TanStack Query with Optimistic UI Mutations**, backed by persistent client caching (`IndexedDB`) and a standard relational PostgreSQL + Express REST backend.

Workly unifies four core pillars:

1. **Frictionless Smart Input:** Natural language task capture with inline token extraction (`#tags`, `@assignee`, `!priority`, dates).
2. **Global Command Palette (`Cmd+K`):** Complete mouse-free navigation and action execution (`cmdk`).
3. **Zero-Latency Optimistic UI:** Instant $0\text{ms}$ local cache state updates with background network synchronization and automatic failure rollbacks.
4. **Agentic AI Workflow Assistance:** Context-aware task decomposition (`/breakdown`) returning structured JSON sublists via LLM APIs.

---

## 2. Problem Statement & Solution

### The Problem

- **Traditional SaaS Friction:** Standard task management apps (Jira, Asana, ClickUp) force users to wait $200\text{--}500\text{ms}$ for server roundtrips on every click, checkbox, or field update, breaking flow state.
- **Complex CRDT Over-Engineering:** Building full local-first CRDT engines creates immense engineering tax (difficult SQL analytics, complex permission handling, binary state debugging) without adding tangible value for task cards and workflow lists.

### The Workly Solution

- **Optimistic Local Cache Mutations:** Modifying a task updates local memory and the UI instantly ($0\text{ms}$ delay) before firing a background JSON HTTP request.
- **Standard Relational Infrastructure:** Clean PostgreSQL schemas, REST/JSON APIs, and standard SQL queries ensure rapid feature iteration, reliable role-based security, and simple database management.

---

## 3. Target Audience & Personas

| Persona                          | Role                               | Core Needs & Pain Points                                                                                | Primary Product Value                                                                      |
| -------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **The Developer**                | Software Engineer / Technical Lead | Wants to capture bugs and tasks without leaving the keyboard or waiting for slow SaaS forms.            | `Cmd+K` hotkey shortcuts, instant inline token parsing, developer-grade dark UI.           |
| **The Freelancer / Agency Lead** | Creative Director / Consultant     | Constantly switching between client calls, Figma, and docs. Needs rapid task capture and clear scoping. | Quick natural language input, AI goal decomposition (`/breakdown`), client review portals. |
| **The Product Manager**          | Scrum Master / Project Lead        | Needs clear visibility into team workloads and clean relational reporting without sync bugs.            | Reliable PostgreSQL data models, workspace permission controls, active status lists.       |

---

## 4. Architectural Strategy: Optimistic Online-First

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   OPTIMISTIC ONLINE-FIRST ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────────────┘

  CLIENT (React 19 + TypeScript)                 BACKEND (Node.js / Express)
 ┌──────────────────────────────────┐           ┌────────────────────────────┐
 │ 1. User Action (Click/Hotkey)    │           │ • Express.js REST API      │
 │ 2. Mutate Local Cache (0ms UI)   │ ────────► │ • Drizzle ORM / Postgres   │
 │ 3. Persist Cache to IndexedDB    │  (HTTP)   │ • BullMQ (AI Job Queue)    │
 │ 4. Background Sync / Retry Queue │           └─────────────┬──────────────┘
 └──────────────────────────────────┘                         │
                  ▲                                           ▼
                  │ Error Rollback                 DATABASES & CACHING
                  └────────────────────────────── ┌──────────────────────────┐
                                                  │ • PostgreSQL (Main DB)   │
                                                  │ • Redis (Jobs / Cache)   │
                                                  └──────────────────────────┘

```

### Data Flow Lifecycle

1. **User Mutates State:** User toggles a task checkbox or creates a new item.
2. **Optimistic Cache Update:** TanStack Query intercepts the action and updates the local UI state in **$0\text{ms}$**.
3. **Background Network Sync:** A JSON payload (`POST`/`PATCH`) is dispatched asynchronously to the Express API.
4. **Client-Side Persistence:** `persistQueryClient` writes the query cache to browser `IndexedDB`. If Wi-Fi drops, pending mutations pause and auto-retry upon reconnection.
5. **Rollback Safety:** If the server returns an HTTP error (e.g., `403 Forbidden` or `500 Server Error`), TanStack Query rolls back the local UI cache to the exact pre-mutation state and alerts the user.

---

## 5. Technology Stack Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          WORKLY VERIFIED TECH STACK                         │
└─────────────────────────────────────────────────────────────────────────────┘

  FRONTEND LAYER                      BACKEND LAYER
 ┌──────────────────────────┐        ┌──────────────────────────────────┐
 │ • React 19 + TypeScript  │        │ • Node.js + Express.js (TS)      │
 │ • React Router v7        │        │ • Drizzle ORM                    │
 │ • Zustand (UI State)     │  ◄──►  │ • BullMQ (AI Background Queue)   │
 │ • TanStack Query (Server)│ (REST) │ • Zod (Schema Validation)        │
 │ • IndexedDB Persister    │        └─────────────────┬────────────────┘
 │ • cmdk + chrono-node     │                          │
 │ • Tailwind CSS           │                          ▼
 └──────────────────────────┘                DATABASES & INFRASTRUCTURE
                                            ┌───────────────────────────┐
                                            │ • PostgreSQL (Primary DB) │
                                            │ • Redis (Job Queue)       │
                                            └───────────────────────────┘

```

---

## 6. Functional Requirements & Feature Matrix

### Priority Legend

- **P0 (Must-Have):** Essential for MVP launch.
- **P1 (Should-Have):** Core features for full production release.
- **P2 (Nice-to-Have):** Future enhancements post-launch.

---

### Module A: Smart Natural Language Input Bar (P0)

- **REQ-A1:** Accept a single string input field and extract metadata tokens in real-time on the client.
- **REQ-A2:** Parse temporal expressions (_"tomorrow at 3pm"_, _"next Monday"_, _"in 2 hours"_) into standard ISO date objects using `chrono-node`.
- **REQ-A3:** Extract tags (`#project`), assignees (`@user`), and priorities (`!high`, `!med`, `!low` or `!P1`-`!P4`) using regular expressions.
- **REQ-A4:** Render parsed metadata as interactive, color-coded visual badge pills inside/below the input container during typing.
- **REQ-A5:** On submit (`Enter`), execute an optimistic cache mutation that renders the new task in the active list instantly ($0\text{ms}$).

---

### Module B: Global Command Palette Overlay (`Cmd+K`) (P0)

- **REQ-B1:** Intercept global hotkey combinations `Cmd+K` (macOS) and `Ctrl+K` (Windows/Linux) across all application screens.
- **REQ-B2:** Render a accessible, dark-mode fuzzy search menu using `cmdk`.
- **REQ-B3:** Support keyboard navigation (`Up`, `Down`, `Enter`, `Esc`) with visual selection highlights.
- **REQ-B4:** Group commands into clear sections:
- **Actions:** _Create Task (`Cmd+N`)_, _AI Goal Breakdown (`/breakdown`)_, _Filter by Tag_.
- **Navigation:** _Go to Workspace Settings_, _Go to Today's Tasks_.
- **Recent Tasks:** Fuzzy search across all active workspace tasks.

---

### Module C: Optimistic UI Engine & Storage Persistence (P0)

- **REQ-C1:** Manage all server state fetching, caching, and background sync using **TanStack Query**.
- **REQ-C2:** Implement optimistic UI mutations (`onMutate`) for task creation, completion toggles, tag updates, and task deletions.
- **REQ-C3:** Persist TanStack Query cache to browser `IndexedDB` using `@tanstack/query-persist-client-core` to ensure instant application loading during app restarts or offline status.
- **REQ-C4:** Automatically pause network requests when offline and queue retries upon network reconnection (`onlineManager`).
- **REQ-C5:** Provide optimistic failure handling (`onError`) that reverts the local UI state gracefully if the server rejects an edit.

---

### Module D: Agentic AI Task Breakdown Engine (P1)

- **REQ-D1:** Provide a `/breakdown` trigger in the Smart Input Bar and Command Palette.
- **REQ-D2:** Send broad goal strings (e.g., _"Set up Q4 email launch sequence"_) to an Express background endpoint.
- **REQ-D3:** Execute LLM queries with strict Zod structured outputs, returning a JSON array of sub-tasks with estimated durations and recommended tags.
- **REQ-D4:** Display generated sub-tasks in an interactive preview modal allowing users to accept, modify, or regenerate before injecting into their active task list.

---

## 7. Non-Functional Requirements (NFRs)

| Metric                      | Target Specification                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Perceived Input Latency** | $0\text{ms}$ local cache render ($16\text{ms}$ / 60 FPS UI frame limit)                              |
| **API Response Time**       | $< 100\text{ms}$ $p95$ latency for REST JSON endpoints                                               |
| **Bundle Size**             | $< 180\text{ KB}$ gzipped initial JS bundle                                                          |
| **Security**                | Auth via HTTP-Only JWT cookies / OAuth2 (GitHub & Google). Strict CORS and query validation via Zod. |
| **Database Reliability**    | PostgreSQL relational integrity with foreign keys, index-backed search, and automatic daily backups. |
| **Accessibility**           | WCAG 2.1 AA compliance, including ARIA labels on modals and full keyboard navigation.                |

---

## 8. Database Schema Overview (PostgreSQL + Drizzle ORM)

```sql
-- Core Relational Schema

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE workspace_members (
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'editor', -- 'owner', 'admin', 'editor', 'viewer'
  PRIMARY KEY (workspace_id, user_id)
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  priority VARCHAR(20) DEFAULT 'med' NOT NULL, -- 'low', 'med', 'high', 'urgent'
  due_date TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tasks_workspace ON tasks(workspace_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

```

---

## 9. Release Milestones & Phase Roadmap

### Phase 1: Core Optimistic Engine & Smart Input (Sprint 1–2)

- Monorepo setup: React 19 + Express + TypeScript + Drizzle ORM.
- Smart Natural Language Input component with `chrono-node` & regex token parsing.
- TanStack Query optimistic task creation & completion toggles.
- PostgreSQL database setup with Drizzle ORM migrations.

### Phase 2: Command Palette & UI Refinement (Sprint 3–4)

- Integrated `cmdk` global command palette (`Cmd+K`).
- Local cache persistence with `persistQueryClient` + IndexedDB.
- Filter views: Today, Upcoming, Tag filters, Search.
- JWT Authentication & Workspace member management.

### Phase 3: AI Intelligence & Polish (Sprint 5–6)

- LLM endpoint integration for `/breakdown` task decomposition.
- Optimistic error handling, offline retry banners, and performance profiling.
- Public Beta Launch.

---

## 10. Out of Scope for V1.0

- Real-time character-by-character collaborative document editing (Google Docs style).
- Complex Gantt chart timeline dependency graphing (scheduled for V2.0).
- Native mobile applications (iOS/Android) — V1.0 targets responsive mobile web & desktop web.
