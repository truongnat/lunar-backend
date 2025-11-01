import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ description: 'ID người dùng', example: 1 })
  id: number;

  @ApiProperty({ description: 'Email người dùng', example: 'user@example.com', required: false, nullable: true })
  email?: string | null;

  @ApiProperty({ description: 'Số điện thoại', example: '+84901234567', required: false, nullable: true })
  phone?: string | null;

  @ApiProperty({ description: 'Tên hiển thị', example: 'Nguyễn Văn A', required: false, nullable: true })
  displayName?: string | null;
}