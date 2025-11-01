import { registerAs } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';

export const appConfig = registerAs('app', () => ({
  port: parseInt((process.env.PORT || '5000'), 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

export const databaseConfig = registerAs('database', () => ({
  // Align default with docker-compose (postgres:secret @ vietnam_lunar_db)
  url:
    process.env.DATABASE_URL ||
    'postgresql://postgres:secret@localhost:5432/vietnam_lunar_db',
}));

export const securityConfig = registerAs('security', () => ({
  cors: {
    enabled: process.env.CORS_ENABLED === 'true',
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
  rateLimit: {
    ttl: parseInt((process.env.RATE_LIMIT_TTL || '60'), 10) ,
    limit: parseInt((process.env.RATE_LIMIT_MAX || '100'), 10),
  },
  csrf: {
    enabled: process.env.CSRF_ENABLED === 'true',
    cookieName: process.env.CSRF_COOKIE_NAME || '__Host-psifi.x-csrf-token',
    headerName: process.env.CSRF_HEADER_NAME || 'x-csrf-token',
    secret: process.env.CSRF_SECRET || 'your_32_character_secret_key_here',
  },
}));

export const authConfig = registerAs('auth', () => ({
  jwtSecret: (process.env.JWT_SECRET || 'your-secret-key') as JwtModuleOptions['secret'],
  jwtExpirationTime: (process.env.JWT_EXPIRATION_TIME || '1h') as any,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
  },
}));

export const cacheConfig = registerAs('cache', () => ({
  ttl: parseInt((process.env.CACHE_TTL || '60'), 10), // seconds
  max: parseInt((process.env.CACHE_MAX_ITEMS || '100'), 10), // maximum number of items in cache
  isGlobal: true,
  store: process.env.CACHE_STORE || 'memory',
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt((process.env.REDIS_PORT || '6379'), 10),
  password: process.env.REDIS_PASSWORD || '',
}));

export default () => ({
  app: appConfig(),
  database: databaseConfig(),
  security: securityConfig(),
  auth: authConfig(),
  cache: cacheConfig()
});
