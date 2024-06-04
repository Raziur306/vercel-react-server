import { PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import fs from "fs";
import { s3 } from "../config/aws.config";
import { getAllFiles } from "./getAllFiles";
import { redisPublisher } from "../config/redis.config";
import { rm } from "fs/promises";

export const upload = async (uploadDir: string, id: string) => {
  const files = await getAllFiles(uploadDir);

  const uploadPromises = files.map(async (file) => {
    await uploadFileCloud(file.slice(uploadDir.length - 15), file);
  });

  // Wait for all uploads to complete
  await Promise.all(uploadPromises);

  await rm(uploadDir, { recursive: true });
  console.log(`File uploaded and directory ${uploadDir} has been deleted ✔`);

  redisPublisher.lPush("build-queue", id);
};

export const uploadFileCloud = async (fileName: string, localPath: string) => {
  try {
    const fileContent = fs.readFileSync(localPath);
    const response = await s3.send(
      new PutObjectCommand({
        Bucket: "vercel",
        Key: fileName,
        Body: fileContent,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
