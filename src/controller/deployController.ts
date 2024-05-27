import express from "express";
import simpleGit from "simple-git";
import { generateId } from "../utils/generateId";
import path from "path";
import { getAllFiles } from "../utils/getAllFiles";
import { uploadFileCloud } from "../utils/cloudUpload";
import { redisPublisher } from "../config/redis.config";

const uploadRepository = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { repoUrl } = req.body;
    const id = generateId();
    const uploadDir = path.resolve(__dirname, "../../uploads/", id);
    await simpleGit().clone(repoUrl, uploadDir);
    const files = await getAllFiles(uploadDir);

    files.forEach(async (file) => {
      await uploadFileCloud(file.slice(uploadDir.length + 9), file);
    });

    redisPublisher.lPush("build-queue", id);

    res
      .status(201)
      .json({ repoId: id, message: "Repository uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export { uploadRepository };