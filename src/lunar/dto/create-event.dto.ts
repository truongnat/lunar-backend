import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty({ description: 'Title of the event', example: 'Tết Nguyên Đán' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  title: string;

  @ApiProperty({ description: 'Description of the event', example: 'Lễ hội đầu năm', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Lunar day', minimum: 1, maximum: 30, example: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(30)
  @Type(() => Number)
  lunarDay: number;

  @ApiProperty({ description: 'Lunar month', minimum: 1, maximum: 12, example: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  lunarMonth: number;

  @ApiProperty({ description: 'Lunar year', minimum: 1800, maximum: 2199, example: 2023 })
  @IsNotEmpty()
  @IsInt()
  @Min(1800)
  @Max(2199)
  @Type(() => Number)
  lunarYear: number;

  @ApiProperty({ description: 'Is leap month', example: false, required: false, default: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isLeapMonth?: boolean;

  @ApiProperty({ description: 'Type of event', example: 'holiday', required: false, default: 'personal' })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  type?: string;

  @ApiProperty({ description: 'Is private event', example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isPrivate?: boolean;
  
  @ApiProperty({ description: 'Number of days before the event to send a reminder', example: 3, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(30)
  @Type(() => Number)
  reminderDays?: number;
}