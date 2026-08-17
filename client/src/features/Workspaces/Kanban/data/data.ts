import type { KanbanColumn } from "../types/types";

const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    tone: "neutral",
    cards: [
      {
        id: "auth-flow",
        title: "Implement Authentication Flow",
        description:
          "Wire up OAuth providers and establish session management using the new JWT strategy.",
        tag: "Frontend",
        tagType: "frontend",
        assignees: ["SJ"],
        meta: "0/5",
        metaType: "tasks",
      },
      {
        id: "nav-hydration",
        title: "Fix Navigation State Hydration",
        description:
          "Active state styling is dropping on hard reload for nested child routes.",
        tag: "Bug",
        tagType: "bug",
        assignees: ["UN"],
        meta: "Oct 12",
        metaType: "date",
      },
      {
        id: "schema-cleanup",
        title: "Normalize Workspace Schema",
        description:
          "Consolidate project ownership fields before workspace analytics ships.",
        tag: "API",
        tagType: "api",
        assignees: ["MD"],
        meta: "2/7",
        metaType: "tasks",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tone: "active",
    cards: [
      {
        id: "db-cluster",
        title: "Migrate Database Cluster",
        description:
          "Scale Postgres instances and optimize indexing for dashboard queries.",
        tag: "Infrastructure",
        tagType: "infrastructure",
        assignees: ["MD", "AL"],
        meta: "8/12",
        metaType: "tasks",
        progress: 65,
        active: true,
      },
      {
        id: "design-tokens",
        title: "Design System Token Update",
        description:
          "Align semantic color tokens with the new product shell and dark surfaces.",
        tag: "Design",
        tagType: "design",
        assignees: ["JS"],
        meta: "Oct 18",
        metaType: "date",
        progress: 42,
      },
      {
        id: "usage-events",
        title: "Track Usage Events",
        description:
          "Emit project, task, and command palette events for workspace insights.",
        tag: "API",
        tagType: "api",
        assignees: ["RK"],
        meta: "4/9",
        metaType: "tasks",
        progress: 38,
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tone: "review",
    cards: [
      {
        id: "stripe-webhook",
        title: "Stripe Webhook Integration",
        description:
          "Handle subscription lifecycle events and update local user states.",
        tag: "API",
        tagType: "api",
        assignees: ["SJ"],
        meta: "PR #1042",
        metaType: "pr",
      },
      {
        id: "canvas-memory",
        title: "Canvas Memory Patch",
        description:
          "Confirm cleanup behavior after the render loop fix lands in staging.",
        tag: "Bug",
        tagType: "bug",
        assignees: ["AL"],
        meta: "PR #1047",
        metaType: "pr",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tone: "done",
    cards: [
      {
        id: "monorepo",
        title: "Setup Monorepo Structure",
        description:
          "Create shared workspace boundaries and package-level scripts.",
        tag: "Infrastructure",
        tagType: "infrastructure",
        assignees: ["AL"],
        meta: "Oct 01",
        metaType: "done",
        completed: true,
      },
      {
        id: "readme",
        title: "Refresh API README",
        description:
          "Document local environment variables and workspace bootstrap steps.",
        tag: "API",
        tagType: "api",
        assignees: ["SJ"],
        meta: "Oct 04",
        metaType: "done",
        completed: true,
      },
    ],
  },
];

export { KANBAN_COLUMNS };
