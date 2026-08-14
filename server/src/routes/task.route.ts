import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import * as taskController from "../controllers/task.controller";
import { requireWorkspaceMember } from "../middlewares/workspace-auth.middleware";

const router = Router();

router.post(
  "/workspaces/:workspaceId/tasks",
  requireAuth,
  requireWorkspaceMember,
  taskController.createTaskController,
);

router.get(
  "/workspaces/:workspaceId/tasks/:taskId",
  requireAuth,
  requireWorkspaceMember,
  taskController.getTaskByIdController,
);

router.get(
  "/workspaces/:workspaceId/tasks",
  requireAuth,
  requireWorkspaceMember,
  taskController.listTasksController,
);

router.patch(
  "/workspaces/:workspaceId/tasks/:taskId",
  requireAuth,
  requireWorkspaceMember,
  taskController.updateTaskController,
);

router.delete(
  "/workspaces/:workspaceId/tasks/:taskId",
  requireAuth,
  requireWorkspaceMember,
  taskController.deleteTaskController,
);

export default router;
