import { db } from "../db/drizzle";
import { workspaceMembers, workspaces } from "../../drizzle/schema";
import type { CreateWorkspaceInput } from "../schemas/workspace.schema";
import { slugify } from "../utils/slugify";

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
) {
  const workspaceSlug = slugify(input.name);

  return db.transaction(async (tx) => {
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
}
