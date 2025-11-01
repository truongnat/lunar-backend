import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LunarModule } from './lunar/lunar.module';
import { HealthModule } from './health/health.module';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppCacheModule } from './cache/cache.module';
import { SecurityModule } from './security/security.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    DrizzleModule,
    AuthModule,
    LunarModule,
    HealthModule,
    MediaModule,
    AppCacheModule,
    // SecurityModule,
  ],
})
export class AppModule {}
