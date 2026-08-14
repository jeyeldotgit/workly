import express, { Application } from "express";

import { requestIdMiddleware } from "./middlewares/request-id.middleware";
import apiRouter from "./routes/index.route";
import { errorHandler } from "./middlewares/error-handler.middleware";

const app: Application = express();
const port = 3000; // The port your express server will be running on.

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(requestIdMiddleware);

// Api Registration
app.use("/v1/api", apiRouter);

// Global Post-execution Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
