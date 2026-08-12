export type TaskPriority = "low" | "med" | "high" | "urgent";
export type WorkspaceRole = "owner" | "admin" | "editor" | "viewer";

export type Task = {
  id: string;
  workspaceId: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: string | null;
  tags: string[];
  createdBy: string | null;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "VALIDATION_ERROR"
  | "TASK_NOT_FOUND"
  | "WORKSPACE_NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";
