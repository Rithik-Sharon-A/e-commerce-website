import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly configService;
    constructor(usersService: UsersService, configService: ConfigService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        message: string;
        token?: undefined;
    } | {
        success: boolean;
        token: string;
        message?: undefined;
    }>;
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        message: string;
        token?: undefined;
    } | {
        success: boolean;
        token: string;
        message?: undefined;
    }>;
    adminLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        token: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        token?: undefined;
    }>;
}
