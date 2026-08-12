import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      user?: { id: string; email: string; name: string };
      workspaceRole?: "owner" | "admin" | "editor" | "viewer";
    }
  }
}

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.requestId =
    (req.headers["x-request-id"] as string) ||
    `req_${randomUUID().replace(/-/g, "")}`;
  res.setHeader("X-Request-Id", req.requestId);
  next();
}
