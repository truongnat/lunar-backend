import { IsBoolean, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { Type } from 'class-transformer';

export class UpdateEventDto extends PartialType(CreateEventDto) {}