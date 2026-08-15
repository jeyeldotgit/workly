import { z } from "zod";

const UUIDSchema = z.string().uuid({ message: "Invalid UUID format." });

const isoTimestampSchema = z.string().datetime({
  offset: true,
  message: "Timestamp must be a valid ISO-8601 UTC timestamp.",
});

/** Roles stored in workspace_members.role. */
export const workspaceRoleSchema = z.enum([
  "owner",
  "admin",
  "editor",
  "viewer",
]);

/** Validated input for creating a workspace. */
export const createWorkspaceSchema = z
  .object({
    name: z
      .string()
      .transform((value) => value.trim())
      .refine((value) => value.length >= 1 && value.length <= 255, {
        message: "Name must be between 1 and 255 characters long.",
      }),
    slug: z.preprocess(
      (value) =>
        typeof value === "string" ? value.trim().toLowerCase() : value,
      z
        .string()
        .min(1)
        .max(255, { message: "Slug must be at most 255 characters long." })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          message:
            "Slug must contain only lowercase letters, numbers, and single hyphens.",
        })
        .optional(),
    ),
  })
  .strict();
/** Validated input for updating a workspace. */
export const updateWorkspaceSchema = createWorkspaceSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

/** Workspace metadata returned by the workspace endpoints. */
export const workspaceSchema = z
  .object({
    id: UUIDSchema,
    slug: z.string().min(1).max(255),
    name: z.string().min(1).max(255),
    createdAt: isoTimestampSchema,
  })
  .strict();

/** Workspace metadata together with the authenticated user's role. */
export const workspaceWithRoleSchema = workspaceSchema
  .extend({
    role: workspaceRoleSchema,
  })
  .strict();

/** Member data needed to resolve task assignees. */
export const workspaceMemberSchema = z
  .object({
    userId: UUIDSchema,
    email: z.string().email(),
    name: z.string().min(1),
    avatarUrl: z.string().url().nullable(),
    role: workspaceRoleSchema,
  })
  .strict();

/** Parameters shared by workspace-scoped routes. */
export const workspaceIdParamSchema = z
  .object({
    workspaceId: UUIDSchema,
  })
  .strict();

export const workspaceListResponseSchema = z.array(workspaceWithRoleSchema);
export const workspaceDetailResponseSchema = workspaceWithRoleSchema;
export const workspaceMembersResponseSchema = z.array(workspaceMemberSchema);

export type Workspace = z.infer<typeof workspaceSchema>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type WorkspaceRole = z.infer<typeof workspaceRoleSchema>;
export type WorkspaceWithRole = z.infer<typeof workspaceWithRoleSchema>;
export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
