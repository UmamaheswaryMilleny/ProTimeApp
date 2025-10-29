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


import { ICacheService } from '../../application/interfaces/services/ICacheService';
import { createClient, RedisClientType } from 'redis';

export class CacheService implements ICacheService {
  private redisClient: RedisClientType;

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.error('❌ Missing REDIS_URL in .env file');
      process.exit(1);
    }

    // ✅ Add TLS for Redis Cloud
    this.redisClient = createClient({
      url: redisUrl,
      socket: {
        tls: true, // Use TLS (required by Redis Cloud)
        rejectUnauthorized: false, // Allow self-signed certificates (safe in dev)
      },
    });

    this.redisClient.on('error', (err) => {
      console.error('❌ Redis connection error:', err);
    });

    this.redisClient.connect()
      .then(() => console.log('✅ Connected to Redis Cloud'))
      .catch((err) => console.error('❌ Redis connection failed:', err));
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redisClient.set(key, value, { EX: ttl });
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
