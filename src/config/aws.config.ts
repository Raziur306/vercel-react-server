import dotenv from "dotenv";
dotenv.config();

import { S3 } from "@aws-sdk/client-s3";
export const s3 = new S3({
  region: "auto",
  credentials: {
    accessKeyId: `${process.env.CLOUDFLARE_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.CLOUDFLARE_SECRET_ACCESS_KEY}`,
  },
  endpoint: process.env.CLOUDFLARE_S3_END_POINTS,
});
