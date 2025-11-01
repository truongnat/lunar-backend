import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';
import type { ConfigType } from '@nestjs/config';
import { securityConfig } from 'src/config';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private csrfProtection: ReturnType<typeof doubleCsrf>;
  constructor(
    private securityConfiguration: ConfigType<typeof securityConfig>,
  ) {
    const csrfConfig = this.securityConfiguration.csrf;
    const skipRoutes = ['/api/auth/login', '/api/auth/register'];
    this.csrfProtection = doubleCsrf({
      cookieName: csrfConfig.cookieName || 'x-csrf-token-hash',
      cookieOptions: {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
      ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
      getSecret: (req: Request) => req.signedCookies[csrfConfig.cookieName],
      getSessionIdentifier: (req: Request) => req.ip!,
      csrfTokenDelimiter: ':',
      errorConfig: {
        message: 'CSRF token missing or invalid',
        statusCode: 403,
      },
      getCsrfTokenFromRequest: (req: Request) =>
        req.body[csrfConfig.headerName],
      hmacAlgorithm: 'sha256',
      size: 32,
      messageDelimiter: ':',
      skipCsrfProtection: (req: Request) =>
        skipRoutes.includes(req.path) || req.method === 'GET',
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { doubleCsrfProtection } = this.csrfProtection;
    cookieParser(this.securityConfiguration.csrf.secret)(req, res, next);
    doubleCsrfProtection(req, res, next);
  }
}
