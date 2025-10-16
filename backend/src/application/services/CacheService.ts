import { ICacheServices } from '../../domain/services/ICacheService';
import { createClient, RedisClientType } from 'redis';

export class cacheService implements ICacheServices {
  private redisClient: RedisClientType;
  constructor() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.error('❌ Missing REDIS_URL in .env file');
      process.exit(1);
    }

    this.redisClient = createClient({
      url: redisUrl,
    });

    this.redisClient.on('error', () => {
      console.log('redis connection error');
    });
    this.redisClient.connect().then(() => {
      console.log('connected to redis');
    });
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redisClient.set(key, value, { EX: ttl });
  }
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }
  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
