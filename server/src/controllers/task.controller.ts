import { NextFunction, Response, Request } from "express";
import * as taskService from "../services/task.service";
import { Logger } from "../utils/Logger";
import {
  CreateTaskInput,
  ListTasksQueryInput,
  TaskResponse,
  UpdateTaskInput,
} from "../schemas/task.schema";
import { ApiError } from "../errors/api-errors";
import { ApiResponse, PaginatedApiResponse } from "../types";

export async function createTaskController(
  // Explicitly typing req.user inside the handler parameters ensures TypeScript captures it
  req: Request<
    { workspaceId: string },
    ApiResponse<TaskResponse>,
    CreateTaskInput
  >,
  res: Response<ApiResponse<TaskResponse>>,
  next: NextFunction,
): Promise<void> {
  try {
    const { workspaceId } = req.params;

    // 1. Capture the user safely
    const user = req.user;

    // 2. Defensive Guard Check: Stops the 500 internal crash
    if (!user || !user.id) {
      throw ApiError.unauthenticated(
        "User context is missing. Ensure requireAuth middleware is running before this handler.",
      );
    }

    // 3. This is now fully safe to run
    const newTask = await taskService.createTaskService(
      workspaceId,
      user.id,
      req.body,
    );

    if (!newTask) {
      throw ApiError.validationError("TASK_NOT_CREATED", {
        message:
          "The server successfully executed the pipeline but no task resource was returned.",
      });
    }

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTaskByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { workspaceId, taskId } = req.params;

    const user = req.user;

    if (!user || !user.id) {
      throw ApiError.unauthenticated(
        "User context is missing. Ensure requireAuth middleware is running before this handler.",
      );
    }

    const task = await taskService.getTaskByIdService(workspaceId, taskId);

    if (!task) {
      throw ApiError.notFound(
        "TASK_NOT_FOUND",
        "Invalid task id - no task is found",
      );
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handles HTTP GET requests to list tasks for a workspace with sorting, filters, and pagination.
 *
 * Route Path: GET /api/v1/workspaces/:workspaceId/tasks
 * Query Strings: ListTasksQueryInput
 */
export async function listTasksController(
  req: Request<
    { workspaceId: string }, // 1. Path Params
    PaginatedApiResponse<TaskResponse>, // 2. Response Body
    never, // 3. Request Body (GET requests have no body)
    ListTasksQueryInput // 4. Query Strings (Enforces type-safety on req.query)
  >,
  res: Response<PaginatedApiResponse<TaskResponse>>,
  next: NextFunction,
): Promise<void> {
  try {
    const { workspaceId } = req.params;

    // Trigger the service layer passing URL param and the strongly-typed req.query
    const tasks = await taskService.listTasksService(workspaceId, req.query);

    // If result or items array is missing for an unexpected structural reason
    if (!tasks) {
      throw ApiError.conflict("TASK_LOAD_FAILED", {
        message: "Failed to retrieve the task execution matrix.",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        items: tasks.items,
        nextCursor: tasks.nextCursor,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTaskController(
  req: Request<
    { workspaceId: string; taskId: string },
    ApiResponse<TaskResponse>,
    UpdateTaskInput
  >,
  res: Response<ApiResponse<TaskResponse>>,
  next: NextFunction,
) {
  try {
    const { workspaceId, taskId } = req.params;

    const updatedTask = await taskService.updateTaskService(
      workspaceId,
      taskId,
      req.body,
    );

    if (!updatedTask) {
      throw ApiError.validationError("UPDATE_FAILED");
    }

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTaskController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { workspaceId, taskId } = req.params;

    //  guard to catch bad route parameters cleanly
    if (!taskId || !workspaceId) {
      throw ApiError.validationError("MISSING_PATH_PARAMETERS", {
        message: `Required parameter missing. Received taskId: ${taskId}, workspaceId: ${workspaceId}`,
      });
    }

    const deletedTask = await taskService.deleteTaskService(
      workspaceId,
      taskId,
    );

    if (!deletedTask) {
      throw ApiError.notFound(
        "TASK_NOT_FOUND",
        "The requested task does not exist.",
      );
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
