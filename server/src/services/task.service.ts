import { ApiError } from "../errors/api-errors";
import * as taskRepository from "../repositories/task.repository";
import { ListTasksQueryInput, TaskResponse } from "../schemas/task.schema";

export async function getTaskService(
  workspaceId: string,
  taskId: string,
): Promise<TaskResponse> {
  const task = await taskRepository.getTaskById(workspaceId, taskId);

  if (!task) {
    throw ApiError.notFound(
      "TASK_NOT_FOUND",
      "Task was not found in the workspace",
    );
  }

  return task;
}

export async function listTasksService(
  workspaceId: string,
  query: ListTasksQueryInput,
) {}
