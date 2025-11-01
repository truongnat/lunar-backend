import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from '../drizzle/drizzle.service';
import { users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private verificationCodes: Map<string, { code: string; expires: Date }> =
    new Map();

  constructor(
    private jwtService: JwtService,
    private drizzleService: DrizzleService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0]);

    if (
      user &&
      user.passwordHash &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(googleUser: any): Promise<any> {
    let user = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.googleId, googleUser.googleId))
      .then((res) => res[0]);

    if (!user) {
      // Check if user exists with the same email
      user = await this.drizzleService.db
        .select()
        .from(users)
        .where(eq(users.email, googleUser.email))
        .then((res) => res[0]);

      if (user) {
        // Update existing user with Google ID
        await this.drizzleService.db
          .update(users)
          .set({ googleId: googleUser.googleId })
          .where(eq(users.id, user.id));
      } else {
        // Create new user
        const newUser = await this.drizzleService.db
          .insert(users)
          .values({
            email: googleUser.email,
            displayName: googleUser.displayName,
            googleId: googleUser.googleId,
            passwordHash: '', // No password for Google users
          })
          .returning()
          .then((res) => res[0]);

        user = newUser;
      }
    }

    return user;
  }

  async sendVerificationCode(phone: string): Promise<boolean> {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the code with 10-minute expiration
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10);

    this.verificationCodes.set(phone, { code, expires });

    // In a real implementation, you would send this code via SMS
    console.log(`Verification code for ${phone}: ${code}`);

    return true;
  }

  async validatePhoneUser(phone: string, code: string): Promise<any> {
    const storedData = this.verificationCodes.get(phone);

    if (
      !storedData ||
      storedData.code !== code ||
      storedData.expires < new Date()
    ) {
      return null;
    }

    // Code is valid, clear it
    this.verificationCodes.delete(phone);

    // Find or create user with this phone number
    let user = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.phone, phone))
      .then((res) => res[0]);

    if (!user) {
      // Create new user
      user = await this.drizzleService.db
        .insert(users)
        .values({
          phone,
          displayName: `User-${phone.substring(phone.length - 4)}`,
          passwordHash: '', // No password for phone users
        })
        .returning()
        .then((res) => res[0]);
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      phone: user.phone,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        displayName: user.displayName,
      },
    };
  }

  async register(email: string, password: string, displayName?: string) {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0])

    if (existingUser) {
      throw new UnauthorizedException('Email đã được sử dụng');
    }

    // Hash mật khẩu
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Tạo user mới
    const newUser = await this.drizzleService.db
      .insert(users)
      .values({
        email,
        passwordHash,
        displayName: displayName || null,
      })
      .returning();

    // Trả về thông tin user mới (không bao gồm password)
    const { passwordHash: _, ...result } = newUser[0];
    return result;
  }
}
