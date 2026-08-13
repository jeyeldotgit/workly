import { z } from "zod";

// Reusable schemas
export const uuidSchema = z.string().uuid({
  message: "Invalid UUID format.",
});

export const taskPrioritySchema = z.enum(["low", "med", "high", "urgent"]);

export const taskStatusSchema = z.enum(["all", "active", "completed"]);

export const taskDueFilterSchema = z.enum(["today", "upcoming", "overdue"]);
