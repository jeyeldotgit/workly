import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { ApiError } from "../errors/api-errors";
import { supabase } from "../utils/supabase";
import { getBearerToken, getUserName } from "../utils/auth.utils";

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const accessToken = getBearerToken(req);

  if (!accessToken) {
    return next(ApiError.unauthenticated("Missing bearer access token."));
  }

  try {
    // getUser validates the token with Supabase and returns the identity from
    // the verified token. No user identity is accepted from the client.
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      return next(ApiError.unauthenticated("Invalid or expired access token."));
    }

    req.user = {
      id: data.user.id,
      email: data.user.email || "",
      name: getUserName(data.user),
    };

    return next();
  } catch {
    // Do not expose Supabase errors or token contents to the client.
    return next(ApiError.unauthenticated("Invalid or expired access token."));
  }
}
