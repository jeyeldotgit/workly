import { Request, Response, NextFunction } from "express";
import { db } from "../db/drizzle";
import { workspaceMembers } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { ApiError } from "../errors/api-errors";
import { WorkspaceRole } from "../types";

export function requireWorkspaceMembership(allowedRoles?: WorkspaceRole[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { workspaceId } = req.params;
      const userId = req.user?.id;

      if (!workspaceId || !userId) {
        return next(ApiError.validationError("Workspace ID is required."));
      }

      const member = await db.query.workspaceMembers.findFirst({
        where: and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      });

      if (!member) {
        // Obfuscate workspace existence to unauthorized users
        return next(
          ApiError.notFound("WORKSPACE_NOT_FOUND", "Workspace was not found."),
        );
      }

      req.workspaceRole = member.role as WorkspaceRole;

      if (allowedRoles && !allowedRoles.includes(req.workspaceRole)) {
        return next(
          ApiError.forbidden(
            "Your role does not allow modifying tasks in this workspace.",
          ),
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
