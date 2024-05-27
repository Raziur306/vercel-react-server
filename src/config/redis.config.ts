import { createClient } from "redis";
const redisPublisher = createClient();
redisPublisher
  .connect()
  .then(() => {
    console.log("Redis Connected");
  })
  .catch((err) => {
   console.log( "Error in Redis Connection");
  });

export { redisPublisher };
