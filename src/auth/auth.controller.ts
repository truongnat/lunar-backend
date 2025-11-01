import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
  Inject,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { PhoneAuthGuard } from './guards/phone-auth.guard';
import type { Request, Response } from 'express';
import { appConfig } from '../config/config';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Version('1')
  @ApiOperation({ summary: 'Đăng nhập bằng email và mật khẩu' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Version('1')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @ApiOkResponse({ type: UserProfileDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.displayName,
    );
  }

  // Google Authentication
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Khởi tạo luồng đăng nhập Google OAuth2' })
  async googleAuth() {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Xử lý callback Google và trả token' })
  @ApiOkResponse({ type: LoginResponseDto })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const loginResult = await this.authService.login(req.user);

    // Redirect to frontend with token
    res.redirect(
      `${this.appConfiguration.frontendUrl}/auth/callback?token=${loginResult.access_token}`,
    );
  }

  // Phone Authentication
  @Post('phone/send-code')
  @Version('1')
  @ApiOperation({ summary: 'Gửi mã xác thực qua điện thoại' })
  async sendVerificationCode(@Body('phone') phone: string) {
    await this.authService.sendVerificationCode(phone);
    return { success: true, message: 'Verification code sent' };
  }

  @UseGuards(PhoneAuthGuard)
  @Post('phone/verify')
  @Version('1')
  @ApiOperation({ summary: 'Xác thực mã điện thoại và đăng nhập' })
  @ApiOkResponse({ type: LoginResponseDto })
  async verifyPhone(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
