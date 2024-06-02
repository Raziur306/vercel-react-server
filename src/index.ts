import { Response } from "express";
import { app } from "./config/express.config";
import cors from "cors";
import express from "express";
import { uploadRouter } from "./routes/deployRoutes";
import { watchRedisQueue } from "./deployment";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", uploadRouter);

//watch redis queue
watchRedisQueue();

// Universal route handler for unmatched routes
app.use("*", (_, res: Response) => {
  res.status(404).json({
    error:
      "404 - Not Found: The requested resource could not be found on this server.",
  });
});
