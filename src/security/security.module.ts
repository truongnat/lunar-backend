import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import type { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { securityConfig } from '../config/config';
import { CsrfMiddleware } from './middlewares/csrf.middleware';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [securityConfig.KEY],
      useFactory: (
        securityConfiguration: ConfigType<typeof securityConfig>,
      ) => ({
        throttlers: [
          {
            ttl: securityConfiguration.rateLimit.ttl,
            limit: securityConfiguration.rateLimit.limit,
          },
        ],
      }),
    }),
  ],
  providers: [
    CsrfMiddleware,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: securityConfig.KEY,
      useFactory: () => securityConfig(),
    },
  ],
})
export class SecurityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CsrfMiddleware).forRoutes('*');
  }
}
