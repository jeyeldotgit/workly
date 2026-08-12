import { Task } from "../types";
import { tasks } from "../../drizzle/schema";

type TaskSelect = typeof tasks.$inferSelect;

export function mapTaskToResponse(row: TaskSelect): Task {
  return {
    id: row.id,
    workspaceId: row.workspaceId,
    title: row.title,
    completed: row.completed,
    priority: row.priority as Task["priority"],
    dueDate: row.dueDate ? row.dueDate.toISOString() : null,
    tags: row.tags || [],
    createdBy: row.createdBy,
    assignedTo: row.assignedTo,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
