import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createUserToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }

  createAdminToken(): string {
    const email = this.configService.get<string>('ADMIN_EMAIL') ?? '';
    const password = this.configService.get<string>('ADMIN_PASSWORD') ?? '';
    return this.jwtService.sign(email + password);
  }

  verifyToken(token: string): unknown {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  getAdminCredential(): string {
    return (
      (this.configService.get<string>('ADMIN_EMAIL') ?? '') +
      (this.configService.get<string>('ADMIN_PASSWORD') ?? '')
    );
  }
}
