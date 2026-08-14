import { db } from "../db/drizzle";
import { tasks } from "../../drizzle/schema";
import type {
  CreateTaskData,
  ListTasksQuery,
  TaskResponse,
  UpdateTaskData,
} from "../schemas/task.schema";
import { and, eq, gt, ilike } from "drizzle-orm";
import { Task } from "../types";

/**
 * Creates a task inside a workspace.
 *
 * The data should be validated with createTaskSchema before calling this
 * repository function. The workspace ID and creator ID are supplied by the
 * authenticated request context rather than the request body. Database
 * constraint errors are intentionally left for the service layer to
 * translate into the appropriate API error.
 *
 * @param workspaceId UUID of the workspace that owns the task.
 * @param createdBy UUID of the authenticated user creating the task.
 * @param data Validated and normalized task creation data.
 * @returns The newly created task formatted for the API response.
 */
export async function createTask(
  workspaceId: string,
  createdBy: string,
  data: CreateTaskData,
): Promise<Task> {
  const [task] = await db
    .insert(tasks)
    .values({
      workspaceId,
      createdBy,
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    })
    .returning();

  return {
    ...task,
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}

/**
 * Retrieves one task from a workspace.
 *
 * Both IDs are used to enforce workspace scoping. A task from another
 * workspace is treated as not found by the service layer.
 *
 * @param workspaceId UUID of the workspace to search.
 * @param taskId UUID of the task to retrieve.
 * @returns The matching task formatted for the API response.
 * @throws Error when the task does not exist in the workspace.
 */
export async function getTaskById(
  workspaceId: string,
  taskId: string,
): Promise<TaskResponse | undefined> {
  const [task] = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.workspaceId, workspaceId), eq(tasks.id, taskId)));

  if (!task) {
    throw new Error(
      `Task with ID ${taskId} not found in workspace ${workspaceId}`,
    );
  }

  return {
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    createdAt: new Date(task.createdAt).toISOString(),
    updatedAt: new Date(task.updatedAt).toISOString(),
  } as TaskResponse;
}

/**
 * Lists workspace tasks using the supplied filters and cursor.
 *
 * The query should be parsed with listTasksQuerySchema before calling this
 * repository function. Every result is restricted to the requested workspace.
 *
 * @param workspaceId UUID of the workspace whose tasks should be listed.
 * @param query Validated list filters, page size, and optional cursor.
 * @returns A page of formatted tasks and the cursor for the next page, if any.
 */
export async function listTasks(
  workspaceId: string,
  query: ListTasksQuery,
): Promise<{
  items: TaskResponse[];
  nextCursor: string | null;
}> {
  const conditions = [eq(tasks.workspaceId, workspaceId)];

  // If a cursor exists, only fetch records created AFTER the cursor ID
  if (query.cursor) {
    conditions.push(gt(tasks.id, query.cursor));
  }

  if (query.q) {
    conditions.push(ilike(tasks.title, `%${query.q}%`));
  }

  const data = await db
    .select()
    .from(tasks)
    .where(and(...conditions))
    .orderBy(tasks.id)
    .limit(query.limit);

  const nextCursor =
    data.length === query.limit ? data[data.length - 1].id : null;

  // 1. Format each item's date fields from Date objects to ISO strings
  const formattedItems: TaskResponse[] = data.map((task) => ({
    ...task,
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }));

  // 2. Return 'items' instead of 'tasks' to match your Promise type signature
  return {
    items: formattedItems,
    nextCursor,
  };
}

/**
 * Updates a task within a workspace.
 *
 * The data should be validated with updateTaskSchema before calling this
 * repository function. Only fields supplied in the input are updated.
 *
 * @param workspaceId UUID of the workspace that owns the task.
 * @param taskId UUID of the task to update.
 * @param data Validated and normalized task update data.
 * @returns The updated task formatted for the API response.
 */
export async function updateTask(
  workspaceId: string,
  taskId: string,
  data: UpdateTaskData,
): Promise<TaskResponse | undefined> {
  const { dueDate, ...rest } = data;

  const updateData = {
    ...rest,
    updatedAt: new Date(),
    ...(dueDate !== undefined && {
      dueDate: dueDate ? new Date(dueDate) : null,
    }),
  };

  const [updatedTask] = await db
    .update(tasks)
    .set(updateData)
    .where(
      and(
        eq(tasks.id, taskId),
        eq(tasks.workspaceId, workspaceId), // Multitenancy safety check
      ),
    )
    .returning();

  return {
    ...updatedTask,
    dueDate: updatedTask.dueDate ? updatedTask.dueDate.toISOString() : null,
    createdAt: updatedTask.createdAt.toISOString(),
    updatedAt: updatedTask.updatedAt.toISOString(),
  };
}

/**
 * Deletes a task from a workspace.
 *
 * The workspace condition prevents deleting a task outside the caller's
 * workspace scope. Database errors are intentionally left for the service
 * layer to translate into the appropriate API error.
 *
 * @param workspaceId UUID of the workspace that owns the task.
 * @param taskId UUID of the task to delete.
 * @returns The UUID of the deleted task.
 */
export async function deleteTask(
  workspaceId: string,
  taskId: string,
): Promise<string> {
  const [deletedTask] = await db
    .delete(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.workspaceId, workspaceId)))
    .returning();

  return deletedTask.id;
}
