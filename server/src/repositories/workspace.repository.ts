import { db } from "../db/drizzle";
import { users, workspaceMembers, workspaces } from "../../drizzle/schema";
import type {
  CreateWorkspaceInput,
  Workspace,
  WorkspaceMember,
} from "../schemas/workspace.schema";
import { slugify } from "../utils/slugify";
import { eq } from "drizzle-orm";

/**
 * Creates a workspace and makes the creating user its owner atomically.
 *
 * The input should be validated with createWorkspaceSchema before calling
 * this repository function. Database constraint errors, such as a duplicate
 * slug or an unknown ownerId, are intentionally left for the service layer
 * to translate into the appropriate API error.
 */
export async function createWorkspace(
  input: CreateWorkspaceInput,
  ownerId: string,
): Promise<Workspace | undefined> {
  const workspaceSlug =
    !input.slug || input.slug.trim() === "" ? slugify(input.name) : input.slug;

  const createdWorkspace = await db.transaction(async (tx) => {
    const [workspace] = await tx
      .insert(workspaces)
      .values({
        name: input.name,
        slug: workspaceSlug,
      })
      .returning();

    await tx.insert(workspaceMembers).values({
      workspaceId: workspace.id,
      userId: ownerId,
      role: "owner",
    });

    return workspace;
  });

  return {
    ...createdWorkspace,
    createdAt: createdWorkspace.createdAt.toISOString(),
  };
}

export async function listWorkspaceMembers(
  workspaceId: string,
): Promise<WorkspaceMember[] | undefined> {
  const members = await db
    .select({
      userId: users.id,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      role: workspaceMembers.role,
    })
    .from(workspaceMembers)
    .innerJoin(users, eq(workspaceMembers.userId, users.id))
    .where(eq(workspaceMembers.workspaceId, workspaceId));

  if (!members) {
    throw new Error("Members Not Fetched");
  }

  return members;
}
