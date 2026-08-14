import { ApiError } from "../errors/api-errors";
import * as taskRepository from "../repositories/task.repository";
import { CreateTaskInput, ListTasksQueryInput, TaskResponse, UpdateTaskInput } from "../schemas/task.schema";
import { Logger } from "../utils/Logger";

/**
 * Creates a task in the requested workspace.
 *
 * Applies service-level defaults for optional task fields before delegating to
 * the repository. The input should already be validated with createTaskSchema.
 *
 * @param workspaceId UUID of the workspace that will own the task.
 * @param createdBy UUID of the authenticated user creating the task.
 * @param data Validated task creation input from the request body.
 * @returns The newly created task formatted for the API response.
 * @throws ApiError when the task cannot be created.
 */
export async function createTaskService(
  workspaceId: string,
  createdBy: string,
  data: CreateTaskInput,
): Promise<TaskResponse | undefined> {


  const task = await taskRepository.createTask(workspaceId, createdBy, {
    ...data,
    completed: data.completed ?? false,
    priority: data.priority ?? "med",
    tags: data.tags ?? [],
  });

  if (!task) {
    throw ApiError.validationError("TASK_NOT_CREATED", {
        message: "task is not created check data or validation"
    })
  }

  return task;
}

/**
 * Retrieves a single task by ID within a workspace.
 *
 * The workspace ID is passed through to keep task access scoped to the
 * authenticated workspace context.
 *
 * @param workspaceId UUID of the workspace to search.
 * @param taskId UUID of the task to retrieve.
 * @returns The matching task formatted for the API response.
 * @throws ApiError when no task exists for the workspace and task ID.
 */
export async function getTaskByIdService(
  workspaceId: string,
  taskId: string,
) {
  const task = await taskRepository.getTaskById(workspaceId, taskId);

  if (!task) {
    throw ApiError.notFound("TASK_NOT_FOUND", "No task found in the workspace with the id");
  }
  
  return task;
  
}


/**
 * Lists tasks for a workspace using filter and pagination query values.
 *
 * Applies service defaults for status and limit before passing the query to
 * the repository.
 *
 * @param workspaceId UUID of the workspace whose tasks should be listed.
 * @param query Validated task list filters and cursor values.
 * @returns A page of tasks and a cursor for the next page, if one exists.
 * @throws ApiError when no task page can be loaded.
 */
export async function listTasksService(workspaceId: string, query: ListTasksQueryInput): Promise<{
  items: TaskResponse[],
  nextCursor: string | null
}>{

  const status = query.status ?? "all";
  const limit = Number(query.limit ?? 20);

  
  const tasks = await taskRepository.listTasks(workspaceId, {
    ...query,
    status,
    limit
  })

  if (!tasks){
    throw ApiError.notFound("TASK_NOT_FOUND", "no tasks are found")
  }

  return {
    items: tasks.items,
    nextCursor: tasks.nextCursor
  }
}



/**
 * Updates a task within a workspace.
 *
 * Normalizes omitted tags to an empty array before delegating to the
 * repository. The input should already be validated with updateTaskSchema.
 *
 * @param workspaceId UUID of the workspace that owns the task.
 * @param taskId UUID of the task to update.
 * @param data Validated task update input from the request body.
 * @returns The updated task formatted for the API response.
 * @throws ApiError when the task cannot be updated.
 */
export async function updateTaskService(
  workspaceId: string,
  taskId: string,
  data: UpdateTaskInput
): Promise<TaskResponse | undefined>{

  const sanitizedData = {
    ...data,
    tags: data.tags ?? []
  }
  
  const task = await taskRepository.updateTask(workspaceId, taskId, sanitizedData)

  if(!task) {
    throw ApiError.validationError
  }

  return task;
}

/**
 * Deletes a task from a workspace.
 *
 * The workspace ID is passed through so deletion remains scoped to the
 * authenticated workspace context.
 *
 * @param workspaceId UUID of the workspace that owns the task.
 * @param taskId UUID of the task to delete.
 * @returns The repository deletion result.
 * @throws ApiError when the task cannot be deleted.
 */
export async function deleteTaskService(workspaceId: string, taskId: string){
  
  const res = await taskRepository.deleteTask(workspaceId, taskId);

  if (!res) {throw ApiError.conflict}

  return res
}


