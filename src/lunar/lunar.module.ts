import { Module } from '@nestjs/common';
import { LunarService } from './lunar.service';
import { LunarController } from './lunar.controller';

@Module({
  providers: [LunarService],
  exports: [LunarService],
  controllers: [LunarController],
})
export class LunarModule {}