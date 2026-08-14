import express, { Application, Request, Response } from "express";

import { db } from "./db/drizzle";
import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";
import { timeStamp } from "console";

const app: Application = express();
const port = 3000; // The port your express server will be running on.

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/health", async (req: Request, res: Response) => {
  let dbStatus = "up";

  try {
    await db.execute(sql`SELECT * 1`)
  }catch (error){
    dbStatus = "down";
  }

  const statusCode = dbStatus === 'up' ? 200 : 503;

  res.status(statusCode).json({
    status: dbStatus === 'up' ? "healthy" : "not connected",
    database: dbStatus,
    timeStamp: new Date().toISOString()
  });
});