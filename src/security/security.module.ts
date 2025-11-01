import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ConfigType } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { securityConfig } from '../config/config';
import { CsrfMiddleware } from './middlewares/csrf.middleware';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule.forFeature(securityConfig)],
      inject: [securityConfig.KEY],
      useFactory: (authConfiguration: ConfigType<typeof securityConfig>) => ({
        throttlers: [
          {
            ttl: authConfiguration.rateLimit.ttl,
            limit: authConfiguration.rateLimit.limit,
          },
        ],
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: securityConfig.KEY,
      useFactory: () => securityConfig(),
    },
    CsrfMiddleware,
  ],
})
export class SecurityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CsrfMiddleware).forRoutes('*');
  }
}
