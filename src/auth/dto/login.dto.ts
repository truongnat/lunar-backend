import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email đăng nhập', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Mật khẩu', minLength: 6, example: 'P@ssw0rd' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}