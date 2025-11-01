import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { databaseConfig } from 'src/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [
    DrizzleService,
    {
      provide: databaseConfig.KEY,
      useFactory: () => databaseConfig(),
    },
  ],
  exports: [DrizzleService],
})
export class DrizzleModule {}
