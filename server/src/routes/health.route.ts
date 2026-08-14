import { Request, Response } from "express";
import { Router } from "express";
import { db } from "../db/drizzle";
import { sql } from "drizzle-orm";

const router = Router();

// Basic route
router.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

router.get("/health", async (req: Request, res: Response) => {
  let dbStatus = "up";

  try {
    await db.execute(sql`SELECT * 1`);
  } catch (error) {
    dbStatus = "down";
  }

  const statusCode = dbStatus === "up" ? 200 : 503;

  res.status(statusCode).json({
    status: dbStatus === "up" ? "healthy" : "not connected",
    database: dbStatus,
    timeStamp: new Date().toISOString(),
  });
});

export default router;
