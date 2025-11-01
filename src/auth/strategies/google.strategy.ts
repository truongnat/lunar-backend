import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import type { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { authConfig } from '../../config/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: authConfiguration.google.clientId,
      clientSecret: authConfiguration.google.clientSecret,
      callbackURL: authConfiguration.google.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      displayName: name.givenName + ' ' + name.familyName,
      googleId: profile.id,
      accessToken,
    };

    return this.authService.validateGoogleUser(user);
  }
}
