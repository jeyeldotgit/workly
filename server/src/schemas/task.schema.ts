import { z } from "zod";
import { normalizeTags } from "../utils/tag-normalizer";

const UUIDSchema = z.string().uuid({ message: "Invalid UUID format." });

export const createTaskSchema = z
  .object({
    id: UUIDSchema.optional(),
    title: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val.length >= 1 && val.length <= 500, {
        message: "Title must be between 1 and 500 characters long.",
      }),
    completed: z.boolean().optional().default(false),
    priority: z
      .enum(["low", "med", "high", "urgent"])
      .optional()
      .default("med"),
    dueDate: z
      .string()
      .datetime({
        precision: 3,
        offset: true,
        message: "dueDate must be a valid ISO-8601 UTC timestamp.",
      })
      .nullable()
      .optional(),
    tags: z
      .array(
        z
          .string()
          .transform((val) => val.trim().replace(/^#+/, "").toLowerCase())
          .refine((val) => val.length >= 1 && val.length <= 50, {
            message: "Each tag must be 1 to 50 characters long.",
          }),
      )
      .max(20, { message: "Maximum of 20 tags allowed." })
      .optional()
      .transform(normalizeTags),
    assignedTo: UUIDSchema.nullable().optional(),
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val.length >= 1 && val.length <= 500, {
        message: "Title must be between 1 and 500 characters long.",
      })
      .optional(),
    completed: z.boolean().optional(),
    priority: z.enum(["low", "med", "high", "urgent"]).optional(),
    dueDate: z
      .string()
      .datetime({
        precision: 3,
        offset: true,
        message: "dueDate must be a valid ISO-8601 UTC timestamp.",
      })
      .nullable()
      .optional(),
    tags: z
      .array(
        z
          .string()
          .transform((val) => val.trim().replace(/^#+/, "").toLowerCase())
          .refine((val) => val.length >= 1 && val.length <= 50, {
            message: "Each tag must be 1 to 50 characters long.",
          }),
      )
      .max(20, { message: "Maximum of 20 tags allowed." })
      .optional()
      .transform(normalizeTags),
    assignedTo: UUIDSchema.nullable().optional(),
    updatedAt: z
      .string()
      .datetime({
        message:
          "updatedAt string is required for optimistic concurrency check.",
      }),
  })
  .strict()
  .refine(
    (data) => {
      const keys = Object.keys(data).filter((k) => k !== "updatedAt");
      return keys.length > 0;
    },
    { message: "Update body must contain at least one task field to update." },
  );

export const listTasksQuerySchema = z.object({
  status: z.enum(["all", "active", "completed"]).optional().default("all"),
  tag: z.string().optional(),
  q: z.string().optional(),
  due: z.enum(["today", "upcoming", "overdue"]).optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20))
    .refine((val) => val >= 1 && val <= 100, {
      message: "Limit must be between 1 and 100.",
    }),
  cursor: z.string().optional(),
});
