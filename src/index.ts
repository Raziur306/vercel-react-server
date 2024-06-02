import { Response } from "express";
import { app } from "./config/express.config";
import cors from "cors";
import express from "express";
import { uploadRouter } from "./routes/deployRoutes";
import { watchRedisQueue } from "./deployment";
import { s3 } from "./config/aws.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { streamToString } from "./utils/fileConverter";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", uploadRouter);

//watch redis queue
watchRedisQueue();

// Universal route handler for unmatched routes
app.use("*", async (req, res: Response) => {
  try {
    const host = req.hostname;
    const id = host.split(".")[0];
    const filePath = req.originalUrl;
    const modPath = filePath === "/" ? "index.html" : filePath;
    const contents = await s3
      .getObject({
        Bucket: "vercel",
        Key: `build/${id}${modPath}`,
      })
      .then((data) => {
        const type = filePath.endsWith(".html") ? "text/html" :
        filePath.endsWith(".css") ? "text/css" :
        filePath.endsWith(".js") ? "application/javascript" :
        filePath.endsWith(".png") ? "image/png" :
        filePath.endsWith(".jpg") || filePath.endsWith(".jpeg") ? "image/jpeg" :
        filePath.endsWith(".svg") ? "image/svg+xml" :
        "application/octet-stream";

        res.set("Content-Type", type);
        (data.Body as NodeJS.ReadableStream).pipe(res);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send("Not Found");
      });
  } catch (error) {
    console.log(error);
    res.status(404).send("Not Found");
  }
});
