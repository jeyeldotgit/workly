import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api-errors";
import { ZodError } from "zod";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const requestId = req.requestId || "req_unknown";

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      requestId,
    });
  }

  if (err instanceof ZodError) {
    const formattedDetails = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input parameters.",
        details: { fields: formattedDetails },
      },
      requestId,
    });
  }

  console.error(`[UnhandledError] [${requestId}]:`, err);

  return res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "An internal server error occurred.",
      details: {},
    },
    requestId,
  });
}
