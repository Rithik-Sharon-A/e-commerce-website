import { Model } from 'mongoose';
import { User } from './user.schema';
import { AuthService } from '../auth/auth.service';
export declare class UsersService {
    private readonly userModel;
    private readonly authService;
    constructor(userModel: Model<User>, authService: AuthService);
    login(email: string, password: string): Promise<{
        success: boolean;
        message: string;
        token?: undefined;
    } | {
        success: boolean;
        token: string;
        message?: undefined;
    }>;
    register(name: string, email: string, password: string): Promise<{
        success: boolean;
        message: string;
        token?: undefined;
    } | {
        success: boolean;
        token: string;
        message?: undefined;
    }>;
    adminLogin(email: string, password: string, adminEmail: string, adminPassword: string): Promise<{
        success: boolean;
        token: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        token?: undefined;
    }>;
}
