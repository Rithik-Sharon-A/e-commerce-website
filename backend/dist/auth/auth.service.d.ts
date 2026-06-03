import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    createUserToken(userId: string): string;
    createAdminToken(): string;
    verifyToken(token: string): unknown;
    getAdminCredential(): string;
}
