// import { ICacheService } from '../../application/interfaces/services/ICacheService';
// import { createClient, RedisClientType } from 'redis';


// export class CacheService implements ICacheService {
//   private redisClient: RedisClientType;
//   constructor() {
//     const redisUrl = process.env.REDIS_URL;
//     if (!redisUrl) {
//       console.error('❌ Missing REDIS_URL in .env file');
//       process.exit(1);
//     }

//     this.redisClient = createClient({
//       url: redisUrl,
//     });
//     this.redisClient.on('error', (err) => {
//       console.log('redis connection error',err);
//     });
//     this.redisClient.connect().then(() => {
//       console.log('connected to redis');
//     });
//   }

//   async set(key: string, value: string, ttl: number): Promise<void> {
//     await this.redisClient.set(key, value , { EX: ttl });
//   }
//   async get(key:string): Promise<string | null> {
//     return await this.redisClient.get(key);
//   }
//   async delete(key:string): Promise<void> {
//     await this.redisClient.del(key);
//   }
// }

import { Redis } from "ioredis";
import { ICacheService } from "../../application/interfaces/services/ICacheService";
import { config } from "../config/env";

export class CacheService implements ICacheService {
  private client: Redis;

  constructor() {
    if (!config.redisURL) throw new Error("❌ Missing REDIS_URL in .env");
    this.client = new Redis(config.redisURL);

    this.client.on("connect", () => console.log("✅ Connected to Redis Cloud"));
    this.client.on("error", (err) => console.error("❌ Redis Error:", err));
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.client.set(key, value, "EX", ttlSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
