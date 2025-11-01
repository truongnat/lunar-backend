import { registerAs } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';

export const appConfig = registerAs('app', () => ({
  port: parseInt((process.env.PORT || '5000'), 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/lunar_calendar',
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

export default () => ({
  app: appConfig(),
  database: databaseConfig(),
  auth: authConfig(),
});