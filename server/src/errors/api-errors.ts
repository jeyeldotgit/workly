import { ErrorCode } from "../types";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details: Record<string, any>;

  constructor(
    statusCode: number,
    code: ErrorCode,
    message: string,
    details: Record<string, any> = {},
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static unauthenticated(message = "Authentication required.") {
    return new ApiError(401, "UNAUTHENTICATED", message);
  }

  static forbidden(
    message = "You do not have permission to perform this action.",
  ) {
    return new ApiError(403, "FORBIDDEN", message);
  }

  static validationError(message: string, details: Record<string, any> = {}) {
    return new ApiError(400, "VALIDATION_ERROR", message, details);
  }

  static notFound(
    code: "TASK_NOT_FOUND" | "WORKSPACE_NOT_FOUND",
    message: string,
  ) {
    return new ApiError(404, code, message);
  }

  static conflict(message: string, details: Record<string, any> = {}) {
    return new ApiError(409, "CONFLICT", message, details);
  }
}
