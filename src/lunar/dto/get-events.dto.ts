import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetEventsDto {
  @ApiProperty({ description: 'Lunar month to filter events', minimum: 1, maximum: 12, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  lunarMonth?: number;

  @ApiProperty({ description: 'Lunar year to filter events', minimum: 1800, maximum: 2199, required: false })
  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(2199)
  @Type(() => Number)
  lunarYear?: number;

  @ApiProperty({ description: 'Type of event to filter', required: false, example: 'holiday' })
  @IsOptional()
  @IsString()
  type?: string;
}