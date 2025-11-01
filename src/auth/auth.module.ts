import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { PhoneStrategy } from './strategies/phone.strategy';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import type { ConfigType } from '@nestjs/config';
import { appConfig, authConfig } from '../config/config';

@Module({
  imports: [
    PassportModule,
    DrizzleModule,
    ConfigModule.forFeature(authConfig),
    ConfigModule.forFeature(appConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      useFactory: async (authConfiguration: ConfigType<typeof authConfig>) => ({
        secret: authConfiguration.jwtSecret,
        signOptions: { expiresIn: authConfiguration.jwtExpirationTime },
      }),
      inject: [authConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    PhoneStrategy,
    {
      provide: authConfig.KEY,
      useFactory: () => authConfig(),
    },
    {
      provide: appConfig.KEY,
      useFactory: () => appConfig(),
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
