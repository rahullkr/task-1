import redis from "redis";
let redisClient;
const REDIS_PORT = 6379;
(async () => {
  redisClient = redis.createClient(REDIS_PORT);
  redisClient.on("error", (error) => console.log(error));
  await redisClient.connect();
})();

export default redisClient;
