import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../config/config';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {}