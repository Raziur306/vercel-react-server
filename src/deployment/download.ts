import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws.config";
import path from "path";
import fs from "fs";
import { Readable } from "stream";

export const downloadS3Folder = async (prefix: string) => {
  console.log("Download started...");
  try {
    const allFiles = await s3.send(
      new ListObjectsV2Command({
        Bucket: "vercel",
        Prefix: prefix,
      })
    );

    const allPromises =
      allFiles.Contents?.map(async ({ Key }) => {
        console.log("Downloading...");

        const downloadDir = path
          .resolve(__dirname, `../../${Key}`)
          .replace("/uploads/", "/downloads/");
        const outputFile = fs.createWriteStream(downloadDir);
        const dirName = path.dirname(downloadDir);
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }

        const downloadStream = await s3.send(
          new GetObjectCommand({
            Bucket: "vercel",
            Key,
          })
        );

        return new Promise((resolve, reject) => {
          if (downloadStream.Body) {
            const bodyStream = downloadStream.Body as Readable;
            bodyStream
              .pipe(outputFile)
              .on("finish", () => {
                console.log("Downloaded successfully ✔");
                resolve("");
              })
              .on("error", (error) => {
                reject();
              });
          }
        });
      }) || [];

    await Promise.all(allPromises);
  } catch (error) {
    console.log(error);
  }
};
