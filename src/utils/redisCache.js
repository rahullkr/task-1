import redis from "redis";
let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.log(error));
  await redisClient.connect();
})();

export default redisClient;

