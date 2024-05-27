import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3({
  region: "auto",
  credentials: {
    accessKeyId: `${process.env.CLOUDFLARE_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.CLOUDFLARE_SECRET_ACCESS_KEY}`,
  },
  endpoint: process.env.CLOUDFLARE_S3_END_POINTS,
});

export const uploadFileCloud = async (fileName: string, localPath: string) => {
  try {
    const fileContent = fs.readFileSync(localPath);
    console.log("Uploading...");
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
