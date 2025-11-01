import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { MediaType } from './create-media.dto';

export class GetMediaDto {
  @ApiProperty({ description: 'Lọc theo loại media', enum: MediaType, required: false })
  @IsEnum(MediaType)
  @IsOptional()
  type?: MediaType;

  @ApiProperty({ description: 'Chỉ hiển thị media công khai', required: false })
  @IsOptional()
  isPublic?: boolean;
}