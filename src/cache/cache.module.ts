import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { cacheConfig } from '../config/cache.config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule.forFeature(cacheConfig)],
      useFactory: async (configService: ConfigService) => {
        const storeType = configService.get('cache.store');
        
        if (storeType === 'redis') {
          return {
            store: await redisStore({
              socket: {
                host: configService.get('cache.host'),
                port: configService.get('cache.port'),
              },
              password: configService.get('cache.password'),
              ttl: configService.get('cache.ttl') * 1000, // convert to milliseconds
            }),
            max: configService.get('cache.max'),
          };
        }
        
        // Default memory store
        return {
          ttl: configService.get('cache.ttl') * 1000,
          max: configService.get('cache.max'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class AppCacheModule {}