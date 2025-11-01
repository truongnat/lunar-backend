import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { cacheConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forFeature(cacheConfig),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (
        cacheConfiguration: ConfigType<typeof cacheConfig>,
      ) => {
        const storeType = cacheConfiguration.store;

        if (storeType === 'redis') {
          return {
            store: await redisStore({
              socket: {
                host: cacheConfiguration.host,
                port: cacheConfiguration.port,
              },
              password: cacheConfiguration.password,
              ttl: cacheConfiguration.ttl * 1000, // convert to milliseconds
            }),
            max: cacheConfiguration.max,
          };
        }

        // Default memory store
        return {
          ttl: cacheConfiguration.ttl * 1000,
          max: cacheConfiguration.max,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: cacheConfig.KEY,
      useFactory: () => cacheConfig(),
    },
  ],
  exports: [CacheModule],
})
export class AppCacheModule {}
