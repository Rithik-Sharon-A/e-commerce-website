import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.register(body.name, body.email, body.password);
  }

  @Post('admin')
  adminLogin(@Body() body: { email: string; password: string }) {
    return this.usersService.adminLogin(
      body.email,
      body.password,
      this.configService.get<string>('ADMIN_EMAIL') ?? '',
      this.configService.get<string>('ADMIN_PASSWORD') ?? '',
    );
  }
}
