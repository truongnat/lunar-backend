import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class PhoneStrategy extends PassportStrategy(Strategy, 'phone') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phone',
      passwordField: 'code',
    });
  }

  async validate(phone: string, code: string): Promise<any> {
    const user = await this.authService.validatePhoneUser(phone, code);
    if (!user) {
      throw new Error('Invalid verification code');
    }
    return user;
  }
}