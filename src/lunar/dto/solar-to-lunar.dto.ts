import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SolarToLunarDto {
  @ApiProperty({ description: 'Day of solar date', minimum: 1, maximum: 31, example: 15, default: 15 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(31)
  @Type(() => Number)
  day: number;

  @ApiProperty({ description: 'Month of solar date', minimum: 1, maximum: 12, example: 8, default: 8 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month: number;

  @ApiProperty({ description: 'Year of solar date', minimum: 1800, maximum: 2199, example: 2023, default: 2023 })
  @IsNotEmpty()
  @IsInt()
  @Min(1800)
  @Max(2199)
  @Type(() => Number)
  year: number;
}