import { PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import fs from "fs";
import { s3 } from "../config/aws.config";


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
