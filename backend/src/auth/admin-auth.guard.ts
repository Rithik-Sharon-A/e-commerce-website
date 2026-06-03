import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token as string | undefined;

    if (!token) {
      throw new HttpException(
        { success: false, message: 'Not Authorized Login Again' },
        HttpStatus.OK,
      );
    }

    try {
      const decoded = this.authService.verifyToken(token);
      if (decoded !== this.authService.getAdminCredential()) {
        throw new Error('Not Authorized Login Again');
      }
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Not Authorized Login Again';
      throw new HttpException(
        { success: false, message },
        HttpStatus.OK,
      );
    }
  }
}
