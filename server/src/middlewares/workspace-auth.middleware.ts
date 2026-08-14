import { Request, Response, NextFunction } from "express";
import { db } from "../db/drizzle";
import { workspaceMembers } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import { ApiError } from "../errors/api-errors";

export async function requireWorkspaceMember(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { workspaceId } = req.params;
    const userId = req.user?.id; // Populated upstream by requireAuth

    if (!userId) {
      throw ApiError.unauthenticated("Authentication context missing.");
    }

    if (!workspaceId) {
      throw ApiError.validationError("MISSING_WORKSPACE_ID", {
        message: "Workspace ID is required for this route.",
      });
    }

    // 1. Run the real database query check
    const [membership] = await db
      .select()
      .from(workspaceMembers)
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      );

    // 2. Reject them if they are not in the workspace
    if (!membership) {
      throw ApiError.forbidden(
        "Access Denied: You are not a member of this workspace.",
      );
    }

    // 3. Active Assignment: Fill the bucket you declared in your type definitions!
    req.workspaceRole = membership.role as
      | "owner"
      | "admin"
      | "editor"
      | "viewer";

    // Allow the request to move to your controller safely
    next();
  } catch (error) {
    next(error);
  }
}
