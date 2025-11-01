import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LunarToSolarDto {
  @ApiProperty({ description: 'Day of lunar date', minimum: 1, maximum: 30, example: 15 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(30)
  day: number;

  @ApiProperty({ description: 'Month of lunar date', minimum: 1, maximum: 12, example: 8 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ description: 'Year of lunar date', minimum: 1800, maximum: 2199, example: 2023 })
  @IsNotEmpty()
  @IsInt()
  @Min(1800)
  @Max(2199)
  year: number;

  @ApiProperty({ description: 'Whether this is a leap month', required: false, default: false, example: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  @IsBoolean()
  leap: boolean = false;
}