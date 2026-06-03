import { Model } from 'mongoose';
import { User } from '../users/user.schema';
export declare class CartService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    addToCart(userId: string, itemId: string, size: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateCart(userId: string, itemId: string, size: string, quantity: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getUserCart(userId: string): Promise<{
        success: boolean;
        cartData: Record<string, Record<string, number>>;
    }>;
}
