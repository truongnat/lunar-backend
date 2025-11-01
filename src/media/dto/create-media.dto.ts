import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  ICON = 'icon',
}

export class CreateMediaDto {
  @ApiProperty({ description: 'Loại media', enum: MediaType, example: MediaType.IMAGE })
  @IsEnum(MediaType)
  type: MediaType;

  @ApiProperty({ description: 'Mô tả về file', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Trạng thái công khai của file', required: false, default: false })
  @IsOptional()
  isPublic?: boolean;
}