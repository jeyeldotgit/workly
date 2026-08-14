// src/utils/async-handler.ts
import { Request, Response, NextFunction, RequestHandler } from "express";

export function asyncHandler<P, ResB, ReqB, ReqQ>(
  fn: (
    req: Request<P, ResB, ReqB, ReqQ>,
    res: Response<ResB>,
    next: NextFunction,
  ) => Promise<unknown>,
): RequestHandler<P, ResB, ReqB, ReqQ> {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
