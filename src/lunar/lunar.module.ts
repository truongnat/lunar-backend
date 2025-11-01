import { Module } from '@nestjs/common';
import { LunarService } from './lunar.service';
import { LunarController } from './lunar.controller';
import { LunarEventsService } from './lunar-events.service';
import { LunarEventsController } from './lunar-events.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [LunarService, LunarEventsService],
  exports: [LunarService, LunarEventsService],
  controllers: [LunarController, LunarEventsController],
})
export class LunarModule {}