import { registerAs } from '@nestjs/config';

export const cacheConfig = registerAs('cache', () => ({
  ttl: parseInt((process.env.CACHE_TTL || '60'), 10), // seconds
  max: parseInt((process.env.CACHE_MAX_ITEMS || '100'), 10), // maximum number of items in cache
  isGlobal: true,
  store: process.env.CACHE_STORE || 'memory',
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt((process.env.REDIS_PORT || '6379'), 10),
  password: process.env.REDIS_PASSWORD || '',
}));