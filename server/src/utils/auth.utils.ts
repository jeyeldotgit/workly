import { Request } from "express";

function getBearerToken(req: Request): string | null {
  const authorization = req.header("authorization")?.trim();

  if (!authorization) {
    return null;
  }

  const [scheme, ...credentials] = authorization.split(/\s+/);
  if (scheme.toLowerCase() !== "bearer") {
    return null;
  }

  const token = credentials.join(" ").trim();
  return token || null;
}

function getUserName(user: {
  id: string;
  email?: string;
  user_metadata?: unknown;
}) {
  const metadata =
    user.user_metadata && typeof user.user_metadata === "object"
      ? (user.user_metadata as Record<string, unknown>)
      : {};

  const metadataName = [metadata.full_name, metadata.name].find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );

  return metadataName || user.email || user.id;
}

export { getBearerToken, getUserName };
