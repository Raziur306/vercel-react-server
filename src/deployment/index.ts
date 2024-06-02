import { commandOptions } from "redis";
import { redisPublisher } from "../config/redis.config";
import { downloadS3Folder } from "./download";
import { buildReact, uploadFinalBuild } from "../utils/buildReact";

export const watchRedisQueue = async () => {
  try {
    while (true) {
      const response = await redisPublisher.brPop(
        commandOptions({ isolated: true }),
        "build-queue",
        0
      );
      await downloadS3Folder(`uploads/${response?.element}`);
      await buildReact(`${response?.element}`);
      await uploadFinalBuild(`${response?.element}`);
    }
  } catch (error) {
    console.log(error);
  }
};
