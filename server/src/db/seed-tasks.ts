import { db, client } from "./drizzle";
import { tasks } from "../../drizzle/schema";

const DEFAULT_WORKSPACE_ID = "0b74166c-dc96-4c5e-92af-b6257abfc865";
const DEFAULT_CREATED_BY = "8c1c411d-ec12-40b8-9feb-01fe0b07f7c1";

type SeedTask = typeof tasks.$inferInsert;

const seedTaskData: Omit<SeedTask, "workspaceId" | "createdBy">[] = [
  {
    id: "a1000000-0000-4000-8000-000000000001",
    title: "Review workspace onboarding flow",
    completed: false,
    priority: "high",
    dueDate: new Date("2026-08-14T09:00:00.000Z"),
    tags: ["product", "onboarding"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000002",
    title: "Fix task list cursor pagination",
    completed: false,
    priority: "urgent",
    dueDate: new Date("2026-08-13T15:00:00.000Z"),
    tags: ["bug", "backend", "pagination"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000003",
    title: "Add empty state for completed tasks",
    completed: false,
    priority: "med",
    dueDate: new Date("2026-08-18T09:00:00.000Z"),
    tags: ["frontend", "ux"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000004",
    title: "Document local development setup",
    completed: true,
    priority: "low",
    dueDate: null,
    tags: ["docs", "developer-experience"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000005",
    title: "Add task priority filter",
    completed: false,
    priority: "med",
    dueDate: new Date("2026-08-20T09:00:00.000Z"),
    tags: ["frontend", "filtering"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000006",
    title: "Run accessibility audit on task row",
    completed: false,
    priority: "high",
    dueDate: new Date("2026-08-12T09:00:00.000Z"),
    tags: ["accessibility", "qa"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000007",
    title: "Create workspace member invitation endpoint",
    completed: false,
    priority: "high",
    dueDate: new Date("2026-08-21T09:00:00.000Z"),
    tags: ["backend", "workspace"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000008",
    title: "Clean up duplicate task tags",
    completed: true,
    priority: "low",
    dueDate: null,
    tags: ["maintenance", "tags"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000009",
    title: "Test optimistic update conflict handling",
    completed: false,
    priority: "urgent",
    dueDate: new Date("2026-08-15T12:00:00.000Z"),
    tags: ["testing", "concurrency"],
  },
  {
    id: "a1000000-0000-4000-8000-000000000010",
    title: "Prepare release notes for the next sprint",
    completed: false,
    priority: "med",
    dueDate: new Date("2026-08-24T09:00:00.000Z"),
    tags: ["release", "docs"],
  },
];

export async function seedTasks(
  workspaceId: string = DEFAULT_WORKSPACE_ID,
  createdBy: string = DEFAULT_CREATED_BY,
) {
  const rows = seedTaskData.map((task) => ({
    ...task,
    workspaceId,
    createdBy,
  }));

  return db
    .insert(tasks)
    .values(rows)
    .onConflictDoNothing({ target: tasks.id })
    .returning();
}

async function main() {
  const workspaceId = process.argv[2] ?? DEFAULT_WORKSPACE_ID;
  const createdBy = process.argv[3] ?? DEFAULT_CREATED_BY;
  const insertedTasks = await seedTasks(workspaceId, createdBy);

  console.log(
    `Inserted ${insertedTasks.length} task(s) for workspace ${workspaceId}.`,
  );
}

main()
  .catch((error) => {
    console.error("Task seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
