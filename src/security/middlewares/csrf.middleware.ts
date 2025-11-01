import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as csrf from 'csurf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private csrfProtection: any;

  constructor(private configService: ConfigService) {
    const csrfConfig = this.configService.get('securityConfig.csrf');
    
    this.csrfProtection = csrf({
      cookie: {
        key: csrfConfig?.cookieName || '_csrf',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Skip CSRF protection for specific routes
    if (req.path.includes('/api/auth/login') || 
        req.path.includes('/api/auth/register') ||
        req.method === 'GET') {
      return next();
    }
    
    this.csrfProtection(req, res, next);
  }
}