import express from "express";
import simpleGit from "simple-git";
import { generateId } from "../utils/generateId";
import path from "path";
import { upload } from "../utils/cloudUpload";

const uploadRepository = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { repoUrl } = req.body;
    const id = generateId();
    const uploadDir = path.resolve(__dirname, "../../uploads/", id);
    await simpleGit().clone(repoUrl, uploadDir);
    upload(uploadDir, id);
    res.status(201).json({
      repoId: id,
      message: "Repository uploaded successfully",
      link: `${id}.localhost:3000/index.html`,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const fileUploder = () => {};

export { uploadRepository };
